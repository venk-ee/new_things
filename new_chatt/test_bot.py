import httpx
import asyncio
import json


############## copilot wrote this ################

BASE_URL = "http://localhost:9000"

async def test_bot():
    session_id = "test_user_123"
    
    # 1. Test Recommendation Intent
    print("--- Testing Recommendation Intent ---")
    payload = {
        "session_id": session_id,
        "message": "What blouse pairs with a blue silk saree?"
    }
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post(f"{BASE_URL}/chat", json=payload, timeout=60.0)
            data = resp.json()
            print(f"User: {payload['message']}")
            print(f"Intent: {data['intent']}")
            print(f"Bot: {data['reply']}")
            print("\n")
        except Exception as e:
            print(f"Error testing recommendation: {e}")

    # 2. Test Context/Follow-up
    print("--- Testing Context (Follow-up) ---")
    payload = {
        "session_id": session_id,
        "message": "Do you have it in red?"
    }
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post(f"{BASE_URL}/chat", json=payload, timeout=60.0)
            data = resp.json()
            print(f"User: {payload['message']}")
            print(f"Intent: {data['intent']}")
            print(f"Bot: {data['reply']}")
            print("\n")
        except Exception as e:
            print(f"Error testing follow-up: {e}")

    # 3. Test Support Intent
    print("--- Testing Support Intent ---")
    payload = {
        "session_id": session_id,
        "message": "How do I track my order?"
    }
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post(f"{BASE_URL}/chat", json=payload, timeout=60.0)
            data = resp.json()
            print(f"User: {payload['message']}")
            print(f"Intent: {data['intent']}")
            print(f"Bot: {data['reply']}")
            print("\n")
        except Exception as e:
            print(f"Error testing support: {e}")

if __name__ == "__main__":
    asyncio.run(test_bot())
