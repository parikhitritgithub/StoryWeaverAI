import os
from dotenv import load_dotenv

load_dotenv()
print(os.getenv("GEMINI_API_KEY"))  # Should print your API key
