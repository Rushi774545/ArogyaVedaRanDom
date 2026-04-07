import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader, CSVLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate

from pathlib import Path

load_dotenv()

# Configuration - Dynamic paths relative to project root
# Using pathlib for OS-agnostic path handling
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR
CHROMA_PATH = BASE_DIR / "chroma_db"

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

# Singleton-like initialization
_vectorstore = None

def get_embeddings():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return None
    return OpenAIEmbeddings(model="text-embedding-3-large")

def get_vectorstore():
    global _vectorstore
    
    if _vectorstore is not None:
        return _vectorstore
    
    embeddings = get_embeddings()
    if not embeddings:
        print("DEBUG: OpenAI API key missing. Vector store cannot be initialized.")
        return None
    
    # Check if persistent store exists
    if os.path.exists(str(CHROMA_PATH)) and os.listdir(str(CHROMA_PATH)):
        print("DEBUG: Loading existing Chroma vector store...")
        _vectorstore = Chroma(
            persist_directory=str(CHROMA_PATH),
            embedding_function=embeddings
        )
    else:
        print("DEBUG: Creating new Chroma vector store from documents...")
        # 1. Load data
        loaders = [
            PyPDFLoader(str(DATA_DIR / "DataForChat.pdf")),
            CSVLoader(str(DATA_DIR / "medicine_table.csv")),
            CSVLoader(str(DATA_DIR / "large_health_dataset.csv")),
        ]
        
        docs = []
        for loader in loaders:
            try:
                docs.extend(loader.load())
            except Exception as e:
                print(f"Error loading {loader}: {e}")
        
        if not docs:
            raise ValueError("No documents found to index.")
            
        # 2. Split text
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        splits = text_splitter.split_documents(docs)
        
        # 3. Create persistent store
        _vectorstore = Chroma.from_documents(
            documents=splits, 
            embedding=embeddings,
            persist_directory=str(CHROMA_PATH)
        )
        
    return _vectorstore

def chat_with_rag(user_query, context_info=""):
    try:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            return "I apologize, but my AI wisdom base requires an API key to function. Please configure the environment variable."

        vectorstore = get_vectorstore()
        if not vectorstore:
            return "I apologize, but I am having trouble initializing my knowledge base."
            
        retriever = vectorstore.as_retriever(search_kwargs={"k": 5})
        
        llm = ChatOpenAI(model="gpt-4o", temperature=0.7)
        template = """You are 'ArogyaVeda AI', a highly advanced Vedic Health Consultant.
Use the following pieces of retrieved context to answer the user's question.
If you don't know the answer, just say that you don't know.
Answer with a blend of Vedic wisdom and clinical common sense.
Mention specific Ayurvedic herbs, routines (Dinacharya), or dietary shifts if relevant.
Use a professional, compassionate, and empowering tone.
Always include a small Vedic tip at the end.

Context: {context}
User Context: {user_context}
User Question: {question}
Answer:"""

        prompt = ChatPromptTemplate.from_template(template)
        
        # Execute chain
        retrieved_docs = retriever.invoke(user_query)
        context = format_docs(retrieved_docs)
        
        final_prompt = prompt.format(context=context, user_context=context_info, question=user_query)
        response = llm.invoke(final_prompt)
        
        return response.content

    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"RAG Error: {e}")
        return "I apologize, but I am having trouble accessing my wisdom base right now. Please try again in a moment."
