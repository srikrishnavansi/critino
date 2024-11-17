import json
import traceback
import logging
from functools import wraps
from typing import Annotated, Literal, cast
import urllib.parse
import uuid
from langchain_openai.chat_models import ChatOpenAI
from pydantic import BaseModel, AfterValidator, Field
from src.interfaces import db, llm
from src.lib.url_utils import get_url, sluggify
from supabase import PostgrestAPIError

from fastapi import APIRouter, Depends, HTTPException, Header
from src.lib import auth, keys, validators as vd

from src.lib.few_shot import (
    find_relevant_critiques,
    StrippedCritique,
)

router = APIRouter(prefix="/critiques")


def handle_error(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            response = func(*args, **kwargs)
            return response
        except HTTPException as e:
            raise e
        except Exception as e:
            tb_str = "".join(traceback.format_exception(e))
            logging.error(f"Error in {func.__name__}: {e}\n{tb_str}")
            raise HTTPException(
                status_code=500, detail={"message": str(e), "traceback": tb_str}
            )

    return wrapper


def ahandle_error(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        try:
            response = await func(*args, **kwargs)
            return response
        except HTTPException as e:
            raise e
        except Exception as e:
            tb_str = "".join(traceback.format_exception(e))
            logging.error(f"Error in {func.__name__}: {e}\n{tb_str}")
            raise HTTPException(
                status_code=500, detail={"message": str(e), "traceback": tb_str}
            )

    return wrapper


@router.get("/ids")
def get_critique_ids() -> list[str]:
    supabase = db.client()
    response = supabase.table("critiques").select("id").execute()
    return [critique["id"] for critique in response.data]


class GetCritiquesQuery(BaseModel):
    team_name: str
    environment_name: str
    workflow_name: str | None = None
    agent_name: str | None = None
    query: str | None = None
    k: int | None = None


class GetCritiquesResult(BaseModel):
    data: list[StrippedCritique]
    count: int


@router.get("")
@ahandle_error
async def list_critiques(
    x_critino_key: Annotated[str, Header()],
    query: Annotated[GetCritiquesQuery, Depends(GetCritiquesQuery)],
) -> GetCritiquesResult:
    logging.info(f"list_critiques: x_critino_key: {x_critino_key} - params: {query}")

    query.team_name = urllib.parse.unquote(query.team_name)
    query.environment_name = urllib.parse.unquote(query.environment_name)
    if query.workflow_name:
        query.workflow_name = urllib.parse.unquote(query.workflow_name)
    if query.agent_name:
        query.agent_name = urllib.parse.unquote(query.agent_name)

    if (query.agent_name is not None) and (query.workflow_name is None):
        raise HTTPException(
            status_code=400,
            detail="If you provide an agent_name, you must also provide a workflow_name",
        )

    if (query.query is None and query.k is not None) or (
        query.k is None and query.query is not None
    ):
        raise HTTPException(
            status_code=400,
            detail="Both 'query' and 'k' must be either set if you want relevant critiques or None if you want all critiques.",
        )

    supabase = db.client()

    auth.authenticate_team_or_environment(
        supabase, query.team_name, query.environment_name, x_critino_key
    )

    request = (
        supabase.table("critiques")
        .select("*")
        .eq("team_name", query.team_name)
        .eq("environment_name", query.environment_name)
    )

    if query.workflow_name is not None:
        request.eq("workflow_name", query.workflow_name)

    if query.agent_name is not None:
        request.eq("agent_name", query.agent_name)

    response = request.execute()

    if query.query is None or query.k is None:
        return GetCritiquesResult(
            data=[
                StrippedCritique(
                    optimal=critique["optimal"] if not None else "",
                    instructions=critique["instructions"] if not None else "",
                    query=critique["query"],
                    context=critique["context"],
                )
                for critique in response.data
            ],
            count=len(response.data),
        )

    critiques = [
        StrippedCritique(
            optimal=critique["optimal"] if not None else "",
            instructions=critique["instructions"] if not None else "",
            query=critique["query"],
            context=critique["context"],
        )
        for critique in response.data
    ]

    relevant_critiques = find_relevant_critiques(critiques, query.query, k=query.k)

    return GetCritiquesResult(data=relevant_critiques, count=len(relevant_critiques))


class PostCritiquesQuery(BaseModel):
    team_name: Annotated[str, AfterValidator(vd.str_empty)]
    environment_name: Annotated[str, AfterValidator(vd.str_empty)]
    workflow_name: Annotated[str, AfterValidator(vd.str_empty)]
    agent_name: Annotated[str, AfterValidator(vd.str_empty)]
    populate_missing: bool = False


class PostCritiquesBody(BaseModel):
    query: Annotated[str, AfterValidator(vd.str_empty)] | None = None
    response: Annotated[str, AfterValidator(vd.str_empty)] | None = None
    context: str | None = None
    optimal: str | None = None
    instructions: str | None = None


class PostCritiquesResponse(BaseModel):
    url: str
    data: dict


def populate_missing(body: PostCritiquesBody, model: ChatOpenAI):
    if body.optimal != "" and body.instructions != "":
        # nothing to populate
        return body

    class Populate(BaseModel):
        chain_of_thought: str = Field(
            description="This is your reasoning, use it to evaluate the current information given. Especially the context and original response 'response'. Evaluate how the response was optimized 'optimal'. Always start this field with `Let's think step by step. `"
        )
        optimal: str = Field(description="The pure optimal response.")
        instructions: str = Field(
            description="The pure tailored instructions for this situation."
        )

    agent = model.with_structured_output(Populate)

    result = cast(
        Populate,
        agent.invoke(
            f"You revise critiques and populate the missing properties inferring them from the current.\n\n"
            f"Fields and context:\n{body.model_dump_json(indent=4)}\n\n"
            f"Please populate the missing fields."
        ),
    )

    print("REUSTTT", result)

    body.instructions = result.instructions
    body.optimal = result.optimal

    return body


@router.post("/{id}")
@ahandle_error
async def upsert(
    id: str,
    body: PostCritiquesBody,
    query: Annotated[PostCritiquesQuery, Depends(PostCritiquesQuery)],
    x_critino_key: Annotated[str, Header()],
    x_openrouter_api_key: Annotated[str | None, Header()],
) -> PostCritiquesResponse:

    if body.instructions is None:
        body.instructions = ""
    if body.optimal is None:
        body.optimal = ""

    if query.populate_missing:
        if body.optimal == "" and body.instructions == "":
            raise HTTPException(
                status_code=400,
                detail="both 'optimal' and 'instructions' cannot be empty when 'populate_missing' is true.",
            )

        if x_openrouter_api_key is None:
            raise HTTPException(
                status_code=400,
                detail="'populate_missing' is true but missing 'x_openrouter_api_key' header.",
            )

        model = llm.chat_open_router(
            model="anthropic/claude-3.5-sonnet:beta",
            api_key=x_openrouter_api_key,
        )

        body = populate_missing(body, model)

    supabase = db.client()

    auth.authenticate_team_or_environment(
        supabase, query.team_name, query.environment_name, x_critino_key
    )

    query.team_name = urllib.parse.unquote(query.team_name)
    query.environment_name = urllib.parse.unquote(query.environment_name)
    query.workflow_name = urllib.parse.unquote(query.workflow_name)
    query.agent_name = urllib.parse.unquote(query.agent_name)

    try:
        (
            supabase.table("workflows")
            .upsert(
                {
                    "team_name": query.team_name,
                    "environment_name": query.environment_name,
                    "name": query.workflow_name,
                }
            )
            .execute()
        )

        (
            supabase.table("agents")
            .upsert(
                {
                    "team_name": query.team_name,
                    "environment_name": query.environment_name,
                    "workflow_name": query.workflow_name,
                    "name": query.agent_name,
                }
            )
            .execute()
        )
        critique = (
            supabase.table("critiques")
            .upsert(
                {
                    "team_name": query.team_name,
                    "environment_name": query.environment_name,
                    "workflow_name": query.workflow_name,
                    "agent_name": query.agent_name,
                    "id": id,
                    **body.model_dump(),
                }
            )
            .execute()
            .data[0]
        )
    except PostgrestAPIError as e:
        logging.error(f"PostgrestAPIError: {e}")
        raise HTTPException(status_code=500, detail={**e.json()})
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail={**e.__dict__})

    return PostCritiquesResponse(
        url=f"{get_url()}{sluggify(query.team_name)}/{sluggify(query.environment_name)}/workflows/{sluggify(query.workflow_name)}/{id}",
        data=critique,
    )
