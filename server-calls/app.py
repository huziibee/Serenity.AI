from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from openai import AzureOpenAI
import os
from dotenv import dotenv_values
import pyodbc
from datetime import datetime

# Load environment variables from .env file
load_dotenv(override=True)

# Get configurations from environment variables
azure_openai_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
azure_openai_api_key = os.getenv("AZURE_OPENAI_API_KEY")
azure_openai_chat_completions_deployment_name = os.getenv("AZURE_OPENAI_CHAT_COMPLETIONS_DEPLOYMENT_NAME")

azure_openai_embedding_model = os.getenv("AZURE_OPENAI_EMBEDDING_MODEL")
embedding_vector_dimensions = os.getenv("EMBEDDING_VECTOR_DIMENSIONS")

azure_search_service_endpoint = os.getenv("AZURE_SEARCH_SERVICE_ENDPOINT")
azure_search_service_admin_key = os.getenv("AZURE_SEARCH_SERVICE_ADMIN_KEY")
search_index_name = os.getenv("SEARCH_INDEX_NAME")

# Database configuration
DB_CONNECTION_STRING = (
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=tcp:serenity-db.database.windows.net,1433;"
    "Database=serenitydb;"
    "UID=serenity-admin;"
    "PWD=moop1234!;"
    "Encrypt=yes;"
    "TrustServerCertificate=no;"
    "Connection Timeout=30;"
)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the OpenAI client
openai_client = AzureOpenAI(
    azure_endpoint=azure_openai_endpoint,
    api_key=azure_openai_api_key,
    api_version="2024-06-01"
)

def get_db_connection():
    """Create and return a database connection."""
    return pyodbc.connect(DB_CONNECTION_STRING)

@app.route('/affirm', methods=['GET'])
def get_affirmations():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            # Assuming the affirmations table has columns: id, text, category (or whatever columns you have)
            query = 'SELECT TOP 1 * FROM affirmations ORDER BY NEWID();'
            cursor.execute(query)
            
            # Fetch all rows and convert to list of dictionaries
            columns = [column[0] for column in cursor.description]
            affirmations = []
            for row in cursor.fetchall():
                affirmation = dict(zip(columns, row))
                affirmations.append(affirmation)

            return jsonify({'affirmations': affirmations})

    except Exception as e:
        print(f"Database error: {str(e)}")
        return jsonify({'error': f'Database error: {str(e)}'}), 500

@app.route('/chat', methods=['POST'])
def chat():
    try:
        # Get the chat message from the JSON body
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({'error': 'No message provided'}), 400
            
        chat_message = data.get('message')
        
        messages = [
            {
                "role": "system",
                "content": "You are a compassionate assistant providing guidance and support for someone struggling with feelings of worthlessness and mental health challenges."
            },
            {
                "role": "user",
                "content": chat_message
            }
        ]

        response = openai_client.chat.completions.create(
            model=azure_openai_chat_completions_deployment_name,
            messages=messages,
            extra_body={
                "data_sources": [
                    {
                        "type": "azure_search",
                        "parameters": {
                            "endpoint": azure_search_service_endpoint,
                            "index_name": search_index_name,
                            "authentication": {
                                "type": "api_key",
                                "key": azure_search_service_admin_key,
                            }
                        }
                    }
                ]
            }
        )
        
        print(response.choices[0])

        if hasattr(response, 'choices') and len(response.choices) > 0:
            response_message = response.choices[0].message.content
        else:
            response_message = "No response received."

        return jsonify({'response': response_message})
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Make the server accessible from other devices on the network
    app.run(debug=True, host='0.0.0.0', port=5000)