import logging
from typing import Literal
from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate
from langchain_core.example_selectors import SemanticSimilarityExampleSelector
from langchain_openai import OpenAIEmbeddings
from langchain_core.vectorstores import InMemoryVectorStore
from pydantic import BaseModel, SecretStr
import os

from src.lib import xml_utils


class StrippedCritique(BaseModel):
    context: str
    query: str
    optimal: str
    instructions: str


SimilarityKey = Literal["query"] | Literal["situation"] | Literal["context"]


def find_relevant_critiques(
    critiques: list[StrippedCritique],
    similarity: str,
    k: int = 4,
    similarity_key: SimilarityKey = "query",
) -> list[StrippedCritique]:
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    if OPENAI_API_KEY is None:
        logging.error("OPENAI_API_KEY is not set")
        raise ValueError("OPENAI_API_KEY is not set")
    OPENAI_API_KEY = SecretStr(OPENAI_API_KEY)

    embeddings = OpenAIEmbeddings(api_key=OPENAI_API_KEY)

    example_selector = SemanticSimilarityExampleSelector.from_examples(
        [critique.model_dump() for critique in critiques],
        embeddings,
        InMemoryVectorStore,
        k=k,
        input_keys=[similarity_key],
    )

    return [
        StrippedCritique(**critique)
        for critique in example_selector.select_examples({similarity_key: similarity})
    ]
