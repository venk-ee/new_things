from flask import Flask, request, jsonify, render_template
import requests
import os

app = Flask(__name__)

# Use OpenRouter API for LLM responses
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

def ask_llm(question, api_key=None, model=None, image_data=None):
    key_to_use = api_key if api_key else OPENROUTER_API_KEY
    if not key_to_use:
        return "Error: No API key provided. Please add your OpenRouter API key in Settings."
    model_to_use = model if model else "openai/gpt-3.5-turbo"
    headers = {
        "Authorization": f"Bearer {key_to_use}",
        "Content-Type": "application/json"
    }
    
    # Build user message content
    if image_data:
        user_content = [
            {"type": "text", "text": question if question else "What's in this image?"},
            {"type": "image_url", "image_url": {"url": image_data}}
        ]
    else:
        user_content = question
    
    payload = {
        "model": model_to_use,
        "messages": [
            {
                "role": "system",
                "content": "You are venkkee, a helpful AI assistant."
            },
            {"role": "user", "content": user_content}
        ],
        "max_tokens": 1024,
        "temperature": 0.7
    }
    try:
        response = requests.post(OPENROUTER_API_URL, headers=headers, json=payload, timeout=60)
        if response.status_code == 200:
            data = response.json()
            return data["choices"][0]["message"]["content"].strip()
        else:
            return f"Error: {response.status_code} {response.text}"
    except Exception as e:
        return f"Exception: {str(e)}"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    question = data.get("question", "")
    user_api_key = data.get("api_key", "")
    user_model = data.get("model", "")
    image_data = data.get("image", None)
    file_context = data.get("file_context", None)  # text/code file content
    
    # If file context provided, prepend it to the question
    if file_context:
        file_name = data.get("file_name", "file")
        full_question = f"Here is the content of {file_name}:\n\n```\n{file_context}\n```\n\n{question if question else 'Analyze this file.'}"
    else:
        full_question = question
    
    answer = ask_llm(full_question, api_key=user_api_key, model=user_model, image_data=image_data)
    return jsonify({"answer": answer})

@app.route("/ping")
def ping():
    return jsonify({"ok": True})

if __name__ == "__main__":
    # debug=False for production security (prevents RCE via debugger)
    app.run(host="0.0.0.0", port=5000, debug=False)
