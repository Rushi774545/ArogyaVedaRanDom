import pandas as pd
import numpy as np
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
import os

from pathlib import Path

# 1. Load Data - Dynamic path
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "large_health_dataset.csv"

if not DATA_PATH.exists():
    raise FileNotFoundError(f"Dataset not found at {DATA_PATH}")

df = pd.read_csv(str(DATA_PATH))

# EDA & Cleaning
df = df.dropna()

# 2. Feature Engineering
# Categorical Encoding
le_gender = LabelEncoder()
df['gender'] = le_gender.fit_transform(df['gender'])

le_activity = LabelEncoder()
df['physical_activity_level'] = le_activity.fit_transform(df['physical_activity_level'])

# Target encoding
le_disease = LabelEncoder()
df['disease_name'] = le_disease.fit_transform(df['disease_name'])

X = df.drop('disease_name', axis=1)
y = df['disease_name']

# 3. Scaling
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 4. No reshaping needed for Random Forest (it uses 2D samples, features)
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# 6. Build Random Forest Model
model = RandomForestClassifier(n_estimators=100, random_state=42)

# 7. Train
print("Starting training...")
model.fit(X_train, y_train)

# 8. Evaluate
accuracy = model.score(X_test, y_test)
print(f"Test Accuracy: {accuracy:.4f}")

# 9. Save Artifacts - Dynamic path
SAVE_DIR = BASE_DIR / "Prediction_App" / "ml_models"
if not SAVE_DIR.exists():
    SAVE_DIR.mkdir(parents=True, exist_ok=True)

with open(SAVE_DIR / 'health_model.pkl', 'wb') as f:
    pickle.dump(model, f)
with open(SAVE_DIR / 'scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)
with open(SAVE_DIR / 'le_gender.pkl', 'wb') as f:
    pickle.dump(le_gender, f)
with open(SAVE_DIR / 'le_activity.pkl', 'wb') as f:
    pickle.dump(le_activity, f)
with open(SAVE_DIR / 'le_disease.pkl', 'wb') as f:
    pickle.dump(le_disease, f)

print(f"Model and artifacts saved successfully to {SAVE_DIR}!")
