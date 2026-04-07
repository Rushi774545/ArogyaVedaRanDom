from django.contrib import admin
from .models import Medicine, PredictionHistory, PredictionResult

@admin.register(Medicine)
class MedicineAdmin(admin.ModelAdmin):
    list_display = ('medicine_name', 'disease_name', 'dosage', 'duration_days')
    search_fields = ('medicine_name', 'disease_name')

@admin.register(PredictionHistory)
class PredictionHistoryAdmin(admin.ModelAdmin):
    # This table stores all features as requested
    list_display = (
        'patient_id', 'prediction', 'age', 'gender', 'systolic_bp', 'diastolic_bp', 
        'heart_rate', 'bmi', 'fasting_blood_sugar', 'hba1c', 'creatinine', 
        'alt_sgpt', 'total_cholesterol', 'ldl', 'hdl', 'smoking', 'physical_activity_level', 
        'stress_level', 'chest_pain', 'shortness_of_breath', 'frequent_urination', 
        'abdominal_pain', 'fatigue', 'diarrhea_symptom', 'fever', 'created_at'
    )
    list_filter = ('prediction', 'created_at', 'gender')
    search_fields = ('patient_id', 'prediction')

@admin.register(PredictionResult)
class PredictionResultAdmin(admin.ModelAdmin):
    # This table stores only summary result
    list_display = ('patient_id', 'predicted_disease', 'medicine', 'timestamp')
    list_filter = ('predicted_disease', 'timestamp')
    search_fields = ('patient_id', 'predicted_disease', 'medicine')
