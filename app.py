import os
import json
import httpx
from typing import List, Dict, Optional
from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_API_URL = os.getenv("OPENROUTER_API_URL", "https://openrouter.ai/api/v1/chat/completions")
DEFAULT_MODEL = os.getenv("DEFAULT_MODEL", "google/gemini-2.0-flash-lite-preview-02-05:free")

app = FastAPI(title="Fashion Recommendtion Bot")

STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
if not os.path.exists(STATIC_DIR):
    os.makedirs(STATIC_DIR, exist_ok=True)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.get("/")
async def get_index():
    return FileResponse(os.path.join(STATIC_DIR, "index.html"))

CATALOG_PATH = os.path.join(os.path.dirname(__file__), "catalog.json")
try:
    with open(CATALOG_PATH, "r") as f:
        FASHION_CATALOG = json.load(f)
except FileNotFoundError:
    FASHION_CATALOG = []

chat_history: Dict[str, List[Dict[str, str]]] = {}

class ChatRequest(BaseModel):
    session_id: str
    message: str

async def call_openrouter(messages: List[Dict[str, str]], model: str = DEFAULT_MODEL) -> str:
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:8000",
        "X-Title": "FashenBot Demo"
    }
    
    payload = {
        "model": model,
        "messages": messages
    }
    
    print(f"Payload: {json.dumps(payload, indent=2)}")
    print(f"Headers: {headers}")
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(OPENROUTER_API_URL, headers=headers, json=payload, timeout=60.0)
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"]
        except Exception as e:
            print(f"Error calling OpenRouter: {e}")
            raise HTTPException(status_code=500, detail=str(e))

async def recognize_intent(user_message: str) -> str:
    system_prompt = (
        "You are an intent classifier. Categorize the user message into exactly one of these: "
        "'recommendation', 'support', or 'chat'. "
        "Recommendation: Asking for fashion advice, clothing items, or matching ideas. "
        "Support: Asking about order status, tracking, returns, or company info. "
        "Chat: Casual conversation, greetings, or off-topic talk. "
        "Return ONLY the word."
        "Keep it short."
    )
    
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_message}
    ]
    
    intent = await call_openrouter(messages)
    return intent.strip().lower()

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    session_id = request.session_id
    user_msg = request.message
    
    intent = await recognize_intent(user_msg)
    print(f"Detected intent: {intent}")
    
    if session_id not in chat_history:
        chat_history[session_id] = []
    
    system_instruction = "You are a helpful fashion assistant."
    
    if intent == "recommendation":
        system_instruction += (
            f"\nUse this catalog to provide tailered recommendatons:\n{json.dumps(FASHION_CATALOG, indent=2)}\n"
            "If the catalog doesn't have exactly what they want, suggest the closest match or general advice."
        )
    elif intent == "support":
        system_instruction += (
            "\nYou are now in support mode. Our pollicy is: Orderes take 3-5 days. "
            "Returns are accepted within 14 days. For tracking, share the order ID."
        )
    else:
        system_instruction += "\nKeep it friendly and professional."

    messages = [{"role": "system", "content": system_instruction}]
    messages.extend(chat_history[session_id][-10:])
    messages.append({"role": "user", "content": user_msg})
    
    bot_reply = await call_openrouter(messages)
    
    chat_history[session_id].append({"role": "user", "content": user_msg})
    chat_history[session_id].append({"role": "assistant", "content": bot_reply})
    
    return {
        "reply": bot_reply,
        "intent": intent,
        "session_id": session_id
    }

@app.get("/health")
async def health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9000)