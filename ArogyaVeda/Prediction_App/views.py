from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import PredictionHistory, Medicine, PredictionResult
import pandas as pd
import numpy as np
import pickle
# import tensorflow as tf
import os
import json
from openai import OpenAI
from dotenv import load_dotenv

from pathlib import Path
load_dotenv()

# Build paths inside the project
# MODEL_DIR relative to this file
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "Prediction_App" / "ml_models"

# Lazy initialization of OpenAI client to avoid errors if API key is missing during startup/migrations
_client = None

def get_openai_client():
    global _client
    if _client is None:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            # Return None or a mock client if preferred, but here we handle it in the view
            return None
        _client = OpenAI(api_key=api_key)
    return _client

# ML assets
model = None
scaler = None
le_gender = None
le_activity = None
le_disease = None

def load_ml_assets():
    global model, scaler, le_gender, le_activity, le_disease
    if model is None:
        with open(MODEL_DIR / 'health_model.pkl', 'rb') as f:
            model = pickle.load(f)
        with open(MODEL_DIR / 'scaler.pkl', 'rb') as f:
            scaler = pickle.load(f)
        with open(MODEL_DIR / 'le_gender.pkl', 'rb') as f:
            le_gender = pickle.load(f)
        with open(MODEL_DIR / 'le_activity.pkl', 'rb') as f:
            le_activity = pickle.load(f)
        with open(MODEL_DIR / 'le_disease.pkl', 'rb') as f:
            le_disease = pickle.load(f)

@api_view(['POST'])
def predict_disease(request):
    ai_report = ""
    try:
        load_ml_assets()
        data = request.data
        print(f"DEBUG RECV: {data}")
        
        patient_id_raw = data.get('patient_id')
        if not patient_id_raw:
            return Response({'error': 'Patient ID is required (Please login)'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            patient_id = int(patient_id_raw)
        except ValueError:
            return Response({'error': 'Invalid Patient ID format'}, status=status.HTTP_400_BAD_REQUEST)

        # List of required features for the model
        required_features = [
            'age', 'gender', 'systolic_bp', 'diastolic_bp', 'heart_rate', 'bmi', 
            'fasting_blood_sugar', 'hba1c', 'creatinine', 'alt_sgpt', 
            'total_cholesterol', 'ldl', 'hdl', 'smoking', 'physical_activity_level', 
            'stress_level', 'chest_pain', 'shortness_of_breath', 'frequent_urination', 
            'abdominal_pain', 'fatigue', 'diarrhea_symptom', 'fever'
        ]
        
        missing = [f for f in required_features if f not in data]
        if missing:
            print(f"DEBUG MISSING: {missing}")
            return Response({'error': f'Missing fields: {", ".join(missing)}', 'debug_missing': missing}, status=status.HTTP_400_BAD_REQUEST)

        # Check for empty strings in numeric/categorical fields
        empty_fields = [f for f in required_features if str(data[f]).strip() == '']
        if empty_fields:
            print(f"DEBUG EMPTY: {empty_fields}")
            return Response({'error': f'Please fill all fields: {", ".join(empty_fields)}', 'debug_empty': empty_fields}, status=status.HTTP_400_BAD_REQUEST)

        # Convert and prepare input for scaling
        try:
            # Map gender labels (F/M used in CSV)
            gender_map = {'Male': 'M', 'Female': 'F', 'Other': 'M'}
            gender_val = gender_map.get(data['gender'], 'M')
            
            input_data = {
                'age': int(data['age']),
                'gender': le_gender.transform([gender_val])[0],
                'systolic_bp': int(data['systolic_bp']),
                'diastolic_bp': int(data['diastolic_bp']),
                'heart_rate': int(data['heart_rate']),
                'bmi': float(data['bmi']),
                'fasting_blood_sugar': int(data['fasting_blood_sugar']),
                'hba1c': float(data['hba1c']),
                'creatinine': float(data['creatinine']),
                'alt_sgpt': int(data['alt_sgpt']),
                'total_cholesterol': int(data['total_cholesterol']),
                'ldl': int(data['ldl']),
                'hdl': int(data['hdl']),
                'smoking': int(data['smoking']),
                'physical_activity_level': le_activity.transform([data['physical_activity_level']])[0],
                'stress_level': int(data['stress_level']),
                'chest_pain': int(data['chest_pain']),
                'shortness_of_breath': int(data['shortness_of_breath']),
                'frequent_urination': int(data['frequent_urination']),
                'abdominal_pain': int(data['abdominal_pain']),
                'fatigue': int(data['fatigue']),
                'diarrhea_symptom': int(data['diarrhea_symptom']),
                'fever': int(data['fever'])
            }
        except ValueError as ve:
            print(f"DEBUG VALUE_ERROR: {ve}")
            return Response({'error': f'Invalid numeric format: {str(ve)}'}, status=status.HTTP_400_BAD_REQUEST)

        print(f"DEBUG PROC: {input_data}")
        # Convert to DF to ensure column order
        input_df = pd.DataFrame([input_data])
        
        # Scale
        input_scaled = scaler.transform(input_df)
        
        # Predict
        prediction_prob = model.predict_proba(input_scaled)
        prediction_idx = np.argmax(prediction_prob)
        prediction_label = str(le_disease.inverse_transform([prediction_idx])[0])
        print(f"DEBUG PRED: {prediction_label}")

        # Rule-based "Healthy" Override
        # If no symptoms are present and key vitals are in normal ranges, force "Healthy"
        symptoms = [
            'chest_pain', 'shortness_of_breath', 'frequent_urination', 
            'abdominal_pain', 'fatigue', 'diarrhea_symptom', 'fever'
        ]
        has_symptoms = any(int(data.get(s, 0)) == 1 for s in symptoms)
        
        # Vital checks (Conservative healthy ranges)
        is_bp_normal = 90 <= int(data['systolic_bp']) <= 130 and 60 <= int(data['diastolic_bp']) <= 85
        is_sugar_normal = int(data['fasting_blood_sugar']) < 110
        is_bmi_normal = 17 <= float(data['bmi']) <= 26
        
        if not has_symptoms and is_bp_normal and is_sugar_normal and is_bmi_normal:
            prediction_label = "Healthy"
            prediction_prob = np.array([[0.95]]) # High confidence for rule-based match
            print("INFO: Rule-based override applied: Healthy")

        # Fetch Medicines or Wellness Tips from DB
        medicine_list = []
        if prediction_label.lower() == 'healthy':
            medicine_list = [
                {
                    'name': 'Triphala Churna',
                    'dosage': '1 teaspoon with warm water',
                    'duration': 'Daily (Before Bed)',
                    'description': 'A classic Ayurvedic formula for general detoxification and digestive health.'
                },
                {
                    'name': 'Ashwagandha',
                    'dosage': '1 tablet/capsule',
                    'duration': 'Daily (Morning)',
                    'description': 'Helps in maintaining energy levels and reducing daily stress.'
                },
                {
                    'name': 'Pranayama & Yoga',
                    'dosage': '20-30 minutes',
                    'duration': 'Daily',
                    'description': 'Essential for maintaining respiratory and mental well-being.'
                }
            ]
        else:
            medicines = Medicine.objects.filter(disease_name__icontains=prediction_label)
            medicine_list = [
                {
                    'name': m.medicine_name,
                    'dosage': m.dosage,
                    'duration': m.duration_days,
                    'description': m.description
                } for m in medicines
            ]

        # Generate AI Report with OpenAI
        is_healthy = prediction_label.lower() == 'healthy'
        status_text = "excellent health (Healthy)" if is_healthy else f"predicted condition: {prediction_label}"
        
        prompt = f"""
        Act as a professional Ayurvedic & Medical Consultant. 
        A patient has been assessed and is in {status_text}.
        Patient Profile: Age {data['age']}, Gender {data['gender']}, BMI {data['bmi']}.
        Current Vitals: BP {data['systolic_bp']}/{data['diastolic_bp']}, Heart Rate {data['heart_rate']}, Blood Sugar {data['fasting_blood_sugar']}.
        
        Provide a comprehensive health report in the following JSON format:
        1. Summary: A brief, professional explanation (3-4 sentences). {'Focus on praising their healthy lifestyle and maintenance.' if is_healthy else 'Explain the condition clearly.'}
        2. Precautions: A list of 5 key {'wellness habits to maintain health' if is_healthy else 'precautions to take for the condition'}.
        3. VedicDiet: 4-5 Ayurvedic diet recommendations (Sattvic foods) for {'continuing vitality' if is_healthy else 'recovery and management'}.
        
        Keep the tone {'celebratory, wise, and encouraging' if is_healthy else 'premium, wise, and encouraging'}.
        """
        
        ai_report = ""
        client = get_openai_client()
        if client:
            try:
                response = client.chat.completions.create(
                    model="gpt-4o",
                    messages=[
                        {"role": "system", "content": "You are a professional Ayurvedic & Medical Consultant. Always respond in JSON format."},
                        {"role": "user", "content": prompt}
                    ],
                    response_format={ "type": "json_object" }
                )
                ai_report = response.choices[0].message.content
            except Exception as ai_e:
                print(f"AI Generation Error (OpenAI): {ai_e}")
        
        if not ai_report:
            ai_report = f"""
            {{
                "Summary": "Namaste! Your health profile shows a state of {status_text}. In our Ayurvedic tradition, this phase is an opportunity to cultivate Ojas (vitality) through careful observation of Dinacharya (daily routine).",
                "Precautions": [
                    "Maintain consistent sleep cycles (early to bed, early to rise)",
                    "Practice deep Pranayama for 15 minutes daily",
                    "Avoid processed and excessively dry (Ruksha) foods",
                    "Ensure adequate hydration with warm, spiced water",
                    "Use mindful meditation to manage stress levels"
                ],
                "VedicDiet": [
                    "Fresh seasonal fruits (sweet and ripe)",
                    "Steamed leafy greens with Ghee",
                    "Whole grains like Mung Dal and Basmati rice",
                    "Herbal teas with Ginger and Tulsi",
                    "Soaked almonds and walnuts for mental clarity"
                ]
            }}
            """

        # Map all probabilities to disease labels
        all_probabilities = {
            str(le_disease.inverse_transform([i])[0]): float(prob)
            for i, prob in enumerate(prediction_prob[0])
        }
        # If rule-based Healthy override, adjust all_probabilities
        if prediction_label == "Healthy":
            all_probabilities = {label: 0.05 for label in le_disease.classes_}
            all_probabilities["Healthy"] = 0.95

        # Final record creation (Excluding non-model fields)
        record_keys = required_features
        record_data = {}
        for k in record_keys:
            if k in ['age', 'systolic_bp', 'diastolic_bp', 'heart_rate', 'fasting_blood_sugar', 'alt_sgpt', 'total_cholesterol', 'ldl', 'hdl', 'smoking', 'stress_level', 'chest_pain', 'shortness_of_breath', 'frequent_urination', 'abdominal_pain', 'fatigue', 'diarrhea_symptom', 'fever']:
                record_data[k] = int(data[k])
            elif k in ['bmi', 'hba1c', 'creatinine']:
                record_data[k] = float(data[k])
            else:
                record_data[k] = data[k] # gender, activity

        record = PredictionHistory.objects.create(
            patient_id=patient_id,
            prediction=prediction_label,
            probabilities_json=json.dumps(all_probabilities),
            **record_data
        )
        print(f"DEBUG SAVED: {record.id}")

        # Save to PredictionHistory (New Table)
        # Prepare medicine names string for storage
        med_names = ", ".join([m['name'] for m in medicine_list])
        print(f"DEBUG MEDS: {med_names}")
        PredictionResult.objects.create(
            patient_id=patient_id,
            predicted_disease=prediction_label,
            medicine=med_names
        )
        print(f"DEBUG HISTORY SAVED for patient {patient_id}")

        return Response({
            'prediction': prediction_label,
            'confidence': float(np.max(prediction_prob)) if prediction_label != "Healthy" else 0.95,
            'all_probabilities': all_probabilities,
            'record_id': record.id,
            'medicines': medicine_list,
            'ai_report': ai_report # We'll parse this or show as text
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_dashboard_data(request):
    try:
        patient_id = request.query_params.get('patient_id')
        if not patient_id:
            return Response({'error': 'Patient ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get last 20 records for trends (Most recent first, then reverse for chronological order)
        base_records = PredictionHistory.objects.filter(patient_id=patient_id)
        records = base_records.order_by('-created_at')[:20]

        
        history_data = []
        # Reverse to get chronological order for charts
        for r in reversed(records):

            history_data.append({
                'date': r.created_at.strftime('%Y-%m-%d %H:%M'),
                'systolic': r.systolic_bp,
                'diastolic': r.diastolic_bp,
                'sugar': r.fasting_blood_sugar,
                'heart_rate': r.heart_rate,
                'bmi': r.bmi,
                'prediction': r.prediction
            })
            
        # Insights calculation
        insights = []
        if len(history_data) >= 2:
            last = history_data[-1]
            prev = history_data[-2]
            
            if last['sugar'] > prev['sugar']:
                insights.append("Your sugar level is showing an increasing trend.")
            elif last['sugar'] < prev['sugar']:
                insights.append("Good! Your sugar level is decreasing.")
                
            if last['systolic'] > 140 or last['diastolic'] > 90:
                insights.append("Your BP is consistently high. Please consult a doctor.")
            
        # Normal range checks
        latest = history_data[-1] if history_data else None
        latest_probabilities = {}
        if base_records.exists():
            # Use base_records for metadata
            try:
                last_record = base_records.latest('created_at')
                if last_record.probabilities_json:
                    latest_probabilities = json.loads(last_record.probabilities_json)
            except PredictionHistory.DoesNotExist:
                pass
        
        # Format probabilities for recharts
        prob_chart_data = [{'name': k, 'value': round(v * 100, 1)} for k, v in latest_probabilities.items()]

        risk_factors = []
        if latest:
            # Calculate raw impact relative to normal baseline
            risk_factors = [
                {'name': 'Sugar', 'impact': abs(latest['sugar'] - 85)},
                {'name': 'Systolic', 'impact': abs(latest['systolic'] - 110)},
                {'name': 'BMI', 'impact': abs(latest['bmi'] - 22)},
                {'name': 'Heart Rate', 'impact': abs(latest['heart_rate'] - 75)}
            ]
            
            # If total impact is 0 (unlikely with abs), set a baseline
            total_impact = sum(item['impact'] for item in risk_factors)
            if total_impact == 0:
                for item in risk_factors: item['impact'] = 5
            
            # Normalize to 100% for the radial/bar feeling
            new_total = sum(item['impact'] for item in risk_factors)
            for item in risk_factors:
                item['impact'] = round((item['impact'] / new_total) * 100, 1)

        # Symptom stats (Latest)
        symptom_list = [
            'chest_pain', 'shortness_of_breath', 'frequent_urination', 
            'abdominal_pain', 'fatigue', 'diarrhea_symptom', 'fever'
        ]
        symptom_stats = []
        if history_data and base_records.exists():
            try:
                last_r = base_records.latest('created_at')
                for s in symptom_list:
                    val = getattr(last_r, s, 0)
                    symptom_stats.append({'name': s.replace('_', ' ').title(), 'value': int(val)})
            except PredictionHistory.DoesNotExist:
                pass

        # Lifestyle data (Latest)
        lifestyle_data = []
        if latest and base_records.exists():
            try:
                last_r = base_records.latest('created_at')
                lifestyle_data = [
                    {'name': 'Stress Level', 'value': last_r.stress_level},
                    {'name': 'Activity', 'value': last_r.physical_activity_level},
                    {'name': 'Smoking', 'value': 'Yes' if last_r.smoking else 'No'},
                    {'name': 'BMI Status', 'value': 'Overweight' if last_r.bmi > 25 else 'Normal' if last_r.bmi > 18.5 else 'Underweight'}
                ]
            except PredictionHistory.DoesNotExist:
                pass


        # Harmony Score Calculation (0-100)
        harmony_score = 100
        if latest:
            # Deduct points for out-of-range vitals
            if not (90 <= latest['systolic'] <= 120): harmony_score -= 15
            if not (60 <= latest['diastolic'] <= 80): harmony_score -= 10
            if not (70 <= latest['sugar'] <= 100): harmony_score -= 25
            if not (18.5 <= latest['bmi'] <= 24.9): harmony_score -= 20
            if not (60 <= latest['heart_rate'] <= 100): harmony_score -= 10
            # Ensure score doesn't go below 10
            harmony_score = max(10, harmony_score)

        # Improvement Index (Change in harmony score compared to average of past records)
        improvement_index = 0
        if len(history_data) > 1:
            prev_scores = []
            for r in history_data[:-1]:
                s = 100
                if not (90 <= r['systolic'] <= 120): s -= 15
                if not (60 <= r['diastolic'] <= 80): s -= 10
                if not (70 <= r['sugar'] <= 100): s -= 25
                if not (18.5 <= r['bmi'] <= 24.9): s -= 20
                if not (60 <= r['heart_rate'] <= 100): s -= 10
                prev_scores.append(max(10, s))
            
            avg_prev = sum(prev_scores) / len(prev_scores)
            improvement_index = round(harmony_score - avg_prev, 1)

        return Response({
            'history': history_data,
            'insights': insights,
            'risk_factors': risk_factors,
            'probabilities': prob_chart_data,
            'symptom_stats': symptom_stats,
            'lifestyle_data': lifestyle_data,
            'latest_vitals': latest,
            'harmony_score': harmony_score,
            'improvement_index': improvement_index,
            'total_predictions': base_records.count()
        }, status=status.HTTP_200_OK)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

