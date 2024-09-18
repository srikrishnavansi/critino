import logging
from langchain_core import vectorstores
from langchain_core.documents import Document
from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate
from langchain_core.example_selectors import SemanticSimilarityExampleSelector
from langchain_openai import OpenAIEmbeddings
from langchain_core.documents import Document
from langchain_core.vectorstores import InMemoryVectorStore
from pydantic import BaseModel, SecretStr
import os
import markdown

from src.lib import xml_utils


class StrippedCritique(BaseModel):
    context: str
    query: str
    optimal: str


def format_example_string(critiques: list[StrippedCritique]) -> str:
    example_prompt = PromptTemplate.from_template(
        "<example><context>{context}</context><query>{query}</query><output>{optimal}</output></example>"
    )

    few_shot = FewShotPromptTemplate(
        examples=[critique.model_dump() for critique in critiques],
        example_prompt=example_prompt,
        example_separator="",
        prefix="<examples>",
        suffix="</examples>",
    ).format()

    return xml_utils.trim_xml(few_shot)


def find_relevant_critiques(
    critiques: list[StrippedCritique], query: str, k: int = 4
) -> list[StrippedCritique]:
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    if OPENAI_API_KEY is None:
        logging.error("OPENAI_API_KEY is not set")
        raise ValueError("OPENAI_API_KEY is not set")
    OPENAI_API_KEY = SecretStr(OPENAI_API_KEY)

    embeddings = OpenAIEmbeddings(api_key=OPENAI_API_KEY)
    print("1")

    example_selector = SemanticSimilarityExampleSelector.from_examples(
        [critique.model_dump() for critique in critiques],
        embeddings,
        InMemoryVectorStore,
        k=k,
        input_keys=["query"],
    )
    print("2")

    return [
        StrippedCritique(**critique)
        for critique in example_selector.select_examples({"query": query})
    ]
