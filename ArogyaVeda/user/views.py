from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from .models import Patient
from .serializers import PatientSerializer

@api_view(['POST'])
def register_patient(request):
    if request.method == 'POST':
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            patient = serializer.save()
            return Response({
                "message": "Patient registered successfully!",
                "patient_id": patient.patient_id,
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_patient(request):
    patient_id = request.data.get('patient_id')
    password = request.data.get('password')
    
    if not patient_id or not password:
        return Response({"error": "Patient ID and password are required"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        patient = Patient.objects.get(patient_id=patient_id)
        if check_password(password, patient.password):
            return Response({
                "message": "Login successful!",
                "patient_id": patient.patient_id,
                "name": patient.name
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid password"}, status=status.HTTP_401_UNAUTHORIZED)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)


