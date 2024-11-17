from langchain_openai.chat_models import ChatOpenAI
from pydantic import SecretStr


def chat_open_router(model: str, api_key: str, temperature: float = 0.7):
    return ChatOpenAI(
        model=model,
        temperature=temperature,
        api_key=SecretStr(api_key),
        base_url="https://openrouter.ai/api/v1",
    )
