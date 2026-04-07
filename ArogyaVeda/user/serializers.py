from rest_framework import serializers
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'name', 'age', 'city', 'contact_number', 'patient_id', 'password']
        read_only_fields = ['patient_id']
        extra_kwargs = {'password': {'write_only': True}}

