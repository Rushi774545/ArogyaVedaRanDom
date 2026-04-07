# ArogyaVeda

ArogyaVeda is a comprehensive health management system that combines modern medical knowledge with ancient Vedic (Ayurvedic) wisdom. It features a Django backend and a React frontend, integrating machine learning for disease prediction and AI for personalized health reports.

## Project Structure

- `ArogyaVeda/`: Django project settings and configuration.
- `Chatbot_App/`: AI-powered Chatbot functionality.
- `Prediction_App/`: Machine learning models and health prediction logic.
- `user/`: User authentication and profile management.
- `frontend/`: React frontend application.

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher (npm or yarn)

---

## Backend Setup (Django)

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ArogyaVeda
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Configure environment variables:**
   Create a `.env` file in the root directory with the following keys:
   ```env
   OPENAI_API_KEY=your_openai_key
   LANGCHAIN_API_KEY=your_langchain_key
   LANGCHAIN_TRACING_V2=true
   ```

6. **Start the development server:**
   ```bash
   python manage.py runserver
   ```
   The backend will be available at `http://127.0.0.1:8000/`.

---

## Frontend Setup (React + Vite)

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173/`.

---

## Features

- **Disease Prediction:** Uses an LSTM model to predict potential health conditions based on vitals and symptoms.
- **AI Health Reports:** Generates personalized reports using OpenAI GPT-4o API.
- **Vedic AI Chatbot (RAG):** Consult ancient wisdom through an interactive AI chatbot powered by LangChain and RAG (Retrieval-Augmented Generation) using provided PDF/CSV data.
- **Health Dashboard:** Visualizes health trends and vitals over time.
