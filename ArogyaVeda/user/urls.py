from django.urls import path
from .views import register_patient, login_patient

urlpatterns = [
    path('register/', register_patient, name='register_patient'),
    path('login/', login_patient, name='login_patient'),
]

