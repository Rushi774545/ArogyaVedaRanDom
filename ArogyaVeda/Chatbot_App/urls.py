from django.urls import path
from . import views

urlpatterns = [
    path('chat/', views.chat_with_vedic_ai, name='chat_with_vedic_ai'),
]
