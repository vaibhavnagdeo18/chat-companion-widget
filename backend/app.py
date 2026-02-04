"""
Flask Backend for Chatbot Widget
Simple API endpoint for bot responses

To run:
  pip install flask flask-cors
  python backend/app.py

The server runs on http://localhost:5000
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from responses import get_bot_response

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication


@app.route('/chat', methods=['POST'])
def chat():
    """
    Chat endpoint - receives user message, returns bot response
    
    Request body:
      { "message": "user message here", "context": { ... } }
    
    Response:
      { "response": "bot reply", "quickReplies": [...] }
    """
    data = request.get_json()
    
    if not data or 'message' not in data:
        return jsonify({'error': 'Message is required'}), 400
    
    user_message = data.get('message', '').strip()
    context = data.get('context', {})
    
    # Get bot response
    result = get_bot_response(user_message, context)
    
    return jsonify(result)


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'service': 'chatbot-api'})


if __name__ == '__main__':
    print("🚀 Chatbot API running on http://localhost:5000")
    app.run(debug=True, port=5000)
