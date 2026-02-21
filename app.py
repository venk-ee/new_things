"""
VChat — AI Chat Application
Production-ready Flask backend with OpenRouter LLM integration.
"""
import logging
import time

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests as http_requests

from config import Config

# ──────────────────────────────────────────────
# App factory
# ──────────────────────────────────────────────
app = Flask(__name__)
app.config.from_object(Config)

CORS(app, origins=Config.CORS_ORIGINS)

# ──────────────────────────────────────────────
# Logging
# ──────────────────────────────────────────────
logging.basicConfig(
    level=logging.DEBUG if Config.DEBUG else logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("vchat")


# ──────────────────────────────────────────────
# Security headers (after every response)
# ──────────────────────────────────────────────
@app.after_request
def set_security_headers(response):
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), geolocation=()"
    return response


# ──────────────────────────────────────────────
# LLM helper
# ──────────────────────────────────────────────
def ask_llm(question, api_key=None, model=None, image_data=None):
    """Send a prompt to OpenRouter and return the response text."""
    key_to_use = api_key or Config.OPENROUTER_API_KEY
    if not key_to_use:
        return "Error: No API key provided. Please add your OpenRouter API key in Settings."

    model_to_use = model or Config.DEFAULT_MODEL
    headers = {
        "Authorization": f"Bearer {key_to_use}",
        "Content-Type": "application/json",
    }

    # Build user message content (text-only vs multimodal)
    if image_data:
        user_content = [
            {"type": "text", "text": question or "What's in this image?"},
            {"type": "image_url", "image_url": {"url": image_data}},
        ]
    else:
        user_content = question

    payload = {
        "model": model_to_use,
        "messages": [
            {"role": "system", "content": "You are venkkee, a helpful AI assistant."},
            {"role": "user", "content": user_content},
        ],
        "max_tokens": Config.MAX_TOKENS,
        "temperature": Config.TEMPERATURE,
    }

    try:
        response = http_requests.post(
            Config.OPENROUTER_API_URL, headers=headers, json=payload, timeout=60
        )
        if response.status_code == 200:
            data = response.json()
            return data["choices"][0]["message"]["content"].strip()
        else:
            logger.warning("OpenRouter %s: %s", response.status_code, response.text[:200])
            return f"Error: {response.status_code} {response.text}"
    except Exception as exc:
        logger.exception("LLM request failed")
        return f"Exception: {str(exc)}"


# ──────────────────────────────────────────────
# Routes
# ──────────────────────────────────────────────
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Invalid JSON body"}), 400

    question = data.get("question", "")
    user_api_key = data.get("api_key", "")
    user_model = data.get("model", "")
    image_data = data.get("image", None)
    file_context = data.get("file_context", None)

    # Input validation
    if len(question) > Config.MAX_QUESTION_LENGTH:
        return jsonify({"error": "Question too long"}), 400
    if file_context and len(file_context) > Config.MAX_FILE_CONTEXT_LENGTH:
        return jsonify({"error": "File context too long"}), 400

    # Prepend file context if provided
    if file_context:
        file_name = data.get("file_name", "file")
        full_question = (
            f"Here is the content of {file_name}:\n\n```\n{file_context}\n```\n\n"
            f"{question if question else 'Analyze this file.'}"
        )
    else:
        full_question = question

    answer = ask_llm(full_question, api_key=user_api_key, model=user_model, image_data=image_data)
    return jsonify({"answer": answer})


@app.route("/ping")
def ping():
    return jsonify({
        "ok": True,
        "version": "2.0",
        "timestamp": int(time.time()),
    })


# ──────────────────────────────────────────────
# Error handlers
# ──────────────────────────────────────────────
@app.errorhandler(404)
def not_found(_e):
    return jsonify({"error": "Not found"}), 404


@app.errorhandler(500)
def server_error(_e):
    logger.exception("Internal server error")
    return jsonify({"error": "Internal server error"}), 500


# ──────────────────────────────────────────────
# Dev server
# ──────────────────────────────────────────────
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=Config.DEBUG)
