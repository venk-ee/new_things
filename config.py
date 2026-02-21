"""
VChat Configuration Module
Centralizes all configuration from environment variables with sensible defaults.
"""
import os
from dotenv import load_dotenv

# Load .env file if present (dev convenience)
load_dotenv()


class Config:
    """Application configuration loaded from environment variables."""

    # Flask
    SECRET_KEY = os.environ.get("SECRET_KEY", os.urandom(32).hex())
    DEBUG = os.environ.get("FLASK_DEBUG", "false").lower() in ("true", "1", "yes")

    # OpenRouter LLM
    OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
    OPENROUTER_API_URL = os.environ.get(
        "OPENROUTER_API_URL", "https://openrouter.ai/api/v1/chat/completions"
    )
    DEFAULT_MODEL = os.environ.get("DEFAULT_MODEL", "openai/gpt-3.5-turbo")
    MAX_TOKENS = int(os.environ.get("MAX_TOKENS", "1024"))
    TEMPERATURE = float(os.environ.get("TEMPERATURE", "0.7"))

    # Input limits
    MAX_QUESTION_LENGTH = int(os.environ.get("MAX_QUESTION_LENGTH", "50000"))
    MAX_FILE_CONTEXT_LENGTH = int(os.environ.get("MAX_FILE_CONTEXT_LENGTH", "100000"))

    # CORS
    CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "*")
