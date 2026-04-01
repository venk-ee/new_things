# FashionBot: Your AI Style Companion

FashionBot is a smart, AI-driven style assistant built with **FastAPI** and **OpenRouter**. It provides personalized fashion recommendations, answers customer support questions, and engages in friendly chat, all while maintaining conversational context.

## Features

- **Intelligent Intent Recognition**: Automatically classifies user queries into *Recommendation*, *Support*, or *General Chat* to provide the most relevant response.
- **Catalog-Aware Recommendations**: Uses a local `catalog.json` to suggest specific items (like sarees, blouses, etc.) and matching ideas.
- **Automated Customer Support**: Handles common queries about shipping times, return policies, and order tracking.
- **Contextual Memory**: Keeps track of recent chat history within a session for natural, follow-up conversations.
- **Modern Web Interface**: Includes a clean, responsive front-end for immediate interaction.

## Tech Stack

- **Backend**: [FastAPI](https://fastapi.tiangolo.com/)
- **LLM Provider**: [OpenRouter](https://openrouter.ai/) (Gemini Flash by default)
- **Asynchronous HTTP**: [httpx](https://www.python-httpx.org/)
- **Configuration**: [python-dotenv](https://github.com/theskumar/python-dotenv)
- **Frontend**: Vanilla HTML/CSS/JS  (copilot)

## Getting Started

### Prerequisites

- Python 3.8+
- An OpenRouter API Key (Get one at [openrouter.ai](https://openrouter.ai/))

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd chatttt
   ```

2. **Install dependencies**:
   ```bash
   pip install fastapi uvicorn httpx python-dotenv pydantic
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your API key:
   ```env
   OPENROUTER_API_KEY=your_api_key_here
   DEFAULT_MODEL=google/gemini-2.0-flash-lite-preview-02-05:free
   OPENROUTER_API_URL=https://openrouter.ai/api/v1/chat/completions
   ```

### Running the Application

Start the server using Python:

```bash
python app.py
```

The application will be available at **`http://localhost:9000`**.

## Testing

You can run the automated test script to verify the bot's logic and connectivity:

```bash
python test_bot.py
```

## Project Structure

- `app.py`: Main FastAPI application logic and API endpoints.
- `catalog.json`: Data source for fashion items and style tips.
- `static/`: Contains the frontend assets (`index.html`).
- `test_bot.py`: Script for testing backend intents and responses.
- `.env`: (Not committed) Stores sensitive configuration and API keys.

## API Endpoints

- `GET /`: Serves the web-based chat interface.
- `POST /chat`: Main chat endpoint (Requires `session_id` and `message`) to track users.
- `GET /health`: Simple health check for the server.

---
*Built with love for fashion lovers.*
