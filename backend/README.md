# Chatbot Flask Backend

Simple Flask API for the chatbot widget.

## Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

## Endpoints

### POST /chat
Send a message and get a bot response.

**Request:**
```json
{
  "message": "What are your features?",
  "context": {
    "step": "faq_mode",
    "userInfo": {}
  }
}
```

**Response:**
```json
{
  "response": "Here are our key features...",
  "quickReplies": [...],
  "nextStep": "faq_mode"
}
```

### GET /health
Health check endpoint.

## Integration

To connect the React frontend to this backend, update the `useChatbot.ts` hook to fetch from `http://localhost:5000/chat` instead of using static responses.
