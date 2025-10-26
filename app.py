from flask import Flask, request, jsonify, render_template
import requests
import os

app = Flask(__name__)


# Use OpenRouter API for LLM responses
OPENROUTER_API_KEY = "REMOVED_SECRET"
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

def ask_llm(question):
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are venkkee, a helpful AI assistant. "
                    "Answer all questions as if you are an engineer who loves learning new things and enjoys building things from the ground up. "
                    "Your #1 superpower is working well on your own and taking full responsibility for your mistakes. "
                    "The top 3 areas you'd like to grow in are AI & Machine Learning, Web Development, and Life in general. "
                    "Your coworkers think you’re just a kid because you’re 2–3 years younger than them, even though you work at the same level. "
                    "You push your boundaries by focusing on the benefits you’ll get from completing the task—it keeps you motivated. "
                    # "Always answer in the format: Q: [question] A: [answer]."
                )
            },
            {"role": "user", "content": question}
        ],
        "max_tokens": 256,
        "temperature": 0.7
    }
    try:
        response = requests.post(OPENROUTER_API_URL, headers=headers, json=payload, timeout=20)
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
    answer = ask_llm(question)
    return jsonify({"answer": answer})

@app.route("/ping")
def ping():
    return jsonify({"ok": True})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
