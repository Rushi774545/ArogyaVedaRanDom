from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import os
from Prediction_App.models import PredictionHistory, PredictionResult
from .rag_utils import chat_with_rag

@api_view(['POST'])
def chat_with_vedic_ai(request):
    print("DEBUG: Chatbot View Called (OpenAI/LangChain RAG)")
    try:
        user_message = request.data.get('message')
        patient_id = request.data.get('patient_id')
        
        if not user_message:
            return Response({'error': 'Message is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Build context from prediction history if available
        context_str = ""
        if patient_id:
            history = PredictionHistory.objects.filter(patient_id=patient_id).order_by('-created_at')[:3]
            if history.exists():
                context_str = "User Health Context:\n"
                for h in history:
                    context_str += f"- Date: {h.created_at.strftime('%Y-%m-%d')}, Prediction: {h.prediction}, Vitals: Sugar={h.fasting_blood_sugar}, BP={h.systolic_bp}/{h.diastolic_bp}, BMI={h.bmi}\n"
        
        # Use the LangChain RAG chain
        bot_response = chat_with_rag(user_message, context_info=context_str)
        
        return Response({'reply': bot_response}, status=status.HTTP_200_OK)
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
