import os
import sys
from dotenv import load_dotenv

# Add project root to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from Chatbot_App.rag_utils import chat_with_rag

def test_chat():
    print("--- Starting RAG Diagnostic Test ---")
    try:
        # Test with a simple query
        user_query = "What is ArogyaVeda?"
        context_info = "Test Context"
        
        print(f"Query: {user_query}")
        print("Invoking chat_with_rag...")
        
        response = chat_with_rag(user_query, context_info)
        
        print("\n--- Response ---")
        print(response)
        print("----------------")
        
    except Exception as e:
        print("\n--- ERROR CAUGHT IN TEST SCRIPT ---")
        import traceback
        traceback.print_exc()
        print(f"Exception: {e}")

if __name__ == "__main__":
    test_chat()
