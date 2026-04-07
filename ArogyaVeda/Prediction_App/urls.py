from django.urls import path
from . import views
from Chatbot_App.views import chat_with_vedic_ai as chatbot_view

urlpatterns = [
    path('predict/', views.predict_disease, name='predict_disease'),
    path('dashboard-data/', views.get_dashboard_data, name='get_dashboard_data'),
    path('chat/', chatbot_view, name='chat_with_vedic_ai'),
]
