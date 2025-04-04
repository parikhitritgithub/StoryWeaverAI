from flask import Flask, request, jsonify
import os
import json
from dotenv import load_dotenv
from flask_cors import CORS
import requests

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Function to generate story using Gemini AI
def generate_story_gemini(prompt):
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    if not GEMINI_API_KEY:
        return {'error': 'Missing GEMINI_API_KEY'}

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [{
            "parts": [{"text": f"Write a short story for kids with this setup: {prompt}"}]
        }]
    }

    try:
        response = requests.post(url, json=data, headers=headers)
        response_json = response.json()
        
        if "candidates" in response_json:
            story_text = response_json["candidates"][0]["content"]["parts"][0]["text"]
            return {"title": "Generated Story", "story": story_text}
        else:
            return {"error": "Failed to get a valid response from Gemini"}
    
    except Exception as e:
        return {"error": str(e)}

# API endpoint for Gemini AI
@app.route('/api/generate/gemini', methods=['POST'])
def generate_gemini():
    prompt = request.json.get('prompt', '')
    story = generate_story_gemini(prompt)
    return jsonify(story)

# Basic index route
@app.route('/', methods=['GET'])
def index():
    return "Hello, this is the AI Story Generator!"

if __name__ == '__main__':
    app.run(debug=True)
