from django.db import models

class PredictionHistory(models.Model):
    patient_id = models.IntegerField()
    # Features from CSV (Actual Schema)
    age = models.IntegerField()
    gender = models.CharField(max_length=20)
    systolic_bp = models.IntegerField()
    diastolic_bp = models.IntegerField()
    heart_rate = models.IntegerField()
    bmi = models.FloatField()
    fasting_blood_sugar = models.IntegerField()
    hba1c = models.FloatField()
    creatinine = models.FloatField()
    alt_sgpt = models.IntegerField()
    total_cholesterol = models.IntegerField()
    ldl = models.IntegerField()
    hdl = models.IntegerField()
    smoking = models.IntegerField() # 0 or 1
    physical_activity_level = models.CharField(max_length=20) # Low, Moderate, High
    stress_level = models.IntegerField()
    chest_pain = models.IntegerField() # 0 or 1
    shortness_of_breath = models.IntegerField() # 0 or 1
    frequent_urination = models.IntegerField() # 0 or 1
    abdominal_pain = models.IntegerField() # 0 or 1
    fatigue = models.IntegerField() # 0 or 1
    diarrhea_symptom = models.IntegerField() # 0 or 1
    fever = models.IntegerField() # 0 or 1
    
    prediction = models.CharField(max_length=255)
    probabilities_json = models.TextField(null=True, blank=True) # Stores JSON of all disease probabilities
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Prediction for {self.patient_id} - {self.prediction}"

class Medicine(models.Model):
    medicine_name = models.CharField(max_length=255)
    disease_name = models.CharField(max_length=255)
    dosage = models.CharField(max_length=100)
    duration_days = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return f"{self.medicine_name} for {self.disease_name}"

class PredictionResult(models.Model):
    patient_id = models.IntegerField()
    predicted_disease = models.CharField(max_length=255)
    medicine = models.TextField(null=True, blank=True) # Stores medicine names/wellness tips
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Result for {self.patient_id} - {self.predicted_disease} at {self.timestamp}"
