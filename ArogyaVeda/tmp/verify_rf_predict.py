import requests
import json

url = "http://127.0.0.1:8000/api/prediction/predict/"
payload = {
    "patient_id": 1,
    "age": 45,
    "gender": "Male",
    "systolic_bp": 120,
    "diastolic_bp": 80,
    "heart_rate": 72,
    "bmi": 24.5,
    "fasting_blood_sugar": 90,
    "hba1c": 5.4,
    "creatinine": 0.9,
    "alt_sgpt": 25,
    "total_cholesterol": 180,
    "ldl": 110,
    "hdl": 50,
    "smoking": 0,
    "physical_activity_level": "Moderate",
    "stress_level": 3,
    "chest_pain": 0,
    "shortness_of_breath": 0,
    "frequent_urination": 0,
    "abdominal_pain": 0,
    "fatigue": 0,
    "diarrhea_symptom": 0,
    "fever": 0
}

try:
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")
