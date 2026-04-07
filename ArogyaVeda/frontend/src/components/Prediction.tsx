import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  Brain, Sparkles, Activity, ArrowRight, ArrowLeft, 
  CheckCircle2, AlertCircle, Heart, Thermometer, User, 
  Stethoscope, Droplets, Wind, Zap
} from 'lucide-react';
import { API_ENDPOINTS } from '../api-config';

const Prediction = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    patient_id: localStorage.getItem('patient_id') || '',
    age: '',
    gender: 'Male',
    systolic_bp: '',
    diastolic_bp: '',
    heart_rate: '',
    bmi: '',
    fasting_blood_sugar: '',
    hba1c: '',
    creatinine: '',
    alt_sgpt: '',
    total_cholesterol: '',
    ldl: '',
    hdl: '',
    smoking: 0,
    physical_activity_level: 'Moderate',
    stress_level: 5,
    chest_pain: 0,
    shortness_of_breath: 0,
    frequent_urination: 0,
    abdominal_pain: 0,
    fatigue: 0,
    diarrhea_symptom: 0,
    fever: 0
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    });
  };

  const [showDetails, setShowDetails] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    setShowDetails(false);
    try {
      const response = await axios.post(API_ENDPOINTS.PREDICT, formData);
      setResult(response.data);
      setStep(4);
    } catch (err) {
      console.error(err);
      alert('Prediction failed. Please ensure all values are correct.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-6 mb-12">
        <div className="w-16 h-16 bg-[var(--color-primary)] rounded-[2rem] flex items-center justify-center text-white shadow-lg shadow-[var(--color-primary)]/20">
          <Brain size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight">Veda <span className="text-gradient">Health Oracle</span></h1>
          <p className="text-[var(--color-text-light)] font-medium">Input your vitals for an AI-powered Ayurvedic assessment.</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass p-12 rounded-[3.5rem] border-white/50"
          >
            <div className="flex items-center gap-3 mb-8 text-[var(--color-primary)]">
              <User size={24} />
              <h2 className="text-2xl font-black">Basic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--color-text-light)] px-2">Age</label>
                <input 
                  type="number" name="age" value={formData.age} onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/50 border-2 border-transparent rounded-2xl focus:border-[var(--color-primary)] outline-none transition-all font-bold"
                  placeholder="e.g. 25"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--color-text-light)] px-2">Gender</label>
                <select 
                  name="gender" value={formData.gender} onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/50 border-2 border-transparent rounded-2xl focus:border-[var(--color-primary)] outline-none transition-all font-bold"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--color-text-light)] px-2">BMI</label>
                <input 
                  type="number" step="0.1" name="bmi" value={formData.bmi} onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/50 border-2 border-transparent rounded-2xl focus:border-[var(--color-primary)] outline-none transition-all font-bold"
                  placeholder="e.g. 22.5"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--color-text-light)] px-2">Activity Level</label>
                <select 
                  name="physical_activity_level" value={formData.physical_activity_level} onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/50 border-2 border-transparent rounded-2xl focus:border-[var(--color-primary)] outline-none transition-all font-bold"
                >
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <button onClick={nextStep} className="mt-12 btn-primary w-full py-5 rounded-2xl text-lg flex items-center justify-center gap-3">
              Next: Vital Signs <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass p-12 rounded-[3.5rem] border-white/50"
          >
            <div className="flex items-center gap-3 mb-8 text-[var(--color-secondary)]">
              <Activity size={24} />
              <h2 className="text-2xl font-black">Vital Signs & Lab Results</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'systolic_bp', label: 'Systolic BP', icon: Heart },
                { name: 'diastolic_bp', label: 'Diastolic BP', icon: Heart },
                { name: 'heart_rate', label: 'Heart Rate', icon: Activity },
                { name: 'fasting_blood_sugar', label: 'Blood Sugar', icon: Droplets },
                { name: 'hba1c', label: 'HbA1c %', icon: Thermometer },
                { name: 'creatinine', label: 'Creatinine', icon: Stethoscope },
                { name: 'alt_sgpt', label: 'ALT SGPT', icon: Stethoscope },
                { name: 'total_cholesterol', label: 'Total Chol.', icon: Droplets },
                { name: 'ldl', label: 'LDL', icon: Droplets },
                { name: 'hdl', label: 'HDL', icon: Droplets },
                { name: 'stress_level', label: 'Stress (1-10)', icon: Zap },
              ].map((item) => (
                <div key={item.name} className="space-y-2">
                  <label className="text-xs font-bold text-[var(--color-text-light)] px-2">{item.label}</label>
                  <input 
                    type="number" step="0.01" name={item.name} value={(formData as any)[item.name]} onChange={handleChange}
                    className="w-full px-5 py-4 bg-white/50 border-2 border-transparent rounded-2xl focus:border-[var(--color-secondary)] outline-none transition-all font-bold"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-12">
              <button onClick={prevStep} className="flex-1 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black/5 transition-all">
                <ArrowLeft size={20} /> Back
              </button>
              <button onClick={nextStep} className="flex-[2] btn-primary w-full py-5 rounded-2xl text-lg flex items-center justify-center gap-3">
                Next: Symptoms <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass p-12 rounded-[3.5rem] border-white/50"
          >
            <div className="flex items-center gap-3 mb-8 text-emerald-600">
              <Stethoscope size={24} />
              <h2 className="text-2xl font-black">Current Symptoms</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { name: 'chest_pain', label: 'Chest Pain' },
                { name: 'shortness_of_breath', label: 'Shortness of Breath' },
                { name: 'frequent_urination', label: 'Frequent Urination' },
                { name: 'abdominal_pain', label: 'Abdominal Pain' },
                { name: 'fatigue', label: 'Fatigue' },
                { name: 'diarrhea_symptom', label: 'Diarrhea' },
                { name: 'fever', label: 'Fever' },
                { name: 'smoking', label: 'Current Smoker' },
              ].map((item) => (
                <label key={item.name} className="flex items-center gap-4 p-4 rounded-2xl bg-white/40 cursor-pointer hover:bg-white/60 transition-all border-2 border-transparent has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50/50">
                  <input 
                    type="checkbox" name={item.name} checked={(formData as any)[item.name] === 1} onChange={handleChange}
                    className="w-6 h-6 rounded-lg accent-emerald-600"
                  />
                  <span className="font-bold text-[var(--color-text)]">{item.label}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-4 mt-12">
              <button onClick={prevStep} className="flex-1 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black/5 transition-all">
                <ArrowLeft size={20} /> Back
              </button>
              <button 
                onClick={handlePredict} 
                disabled={loading}
                className="flex-[2] btn-primary w-full py-5 rounded-2xl text-lg flex items-center justify-center gap-3 shadow-xl shadow-[var(--color-primary)]/30 disabled:opacity-70"
              >
                {loading ? 'Consulting Oracle...' : 'Generate Vedic Prediction'}
                {!loading && <Sparkles size={20} />}
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-12 rounded-[4rem] border-white/50 text-center relative overflow-hidden"
          >
            {/* Visual Accents */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[var(--color-primary)]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[var(--color-secondary)]/10 rounded-full blur-3xl" />

            <div className={`w-24 h-24 ${result.prediction.toLowerCase() === 'healthy' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'} rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner`}>
              {result.prediction.toLowerCase() === 'healthy' ? <Heart size={48} /> : <CheckCircle2 size={48} />}
            </div>
            
            <h2 className="text-2xl font-bold text-[var(--color-text-light)] mb-2 uppercase tracking-[0.2em]">
              {result.prediction.toLowerCase() === 'healthy' ? 'Current Health Status' : 'Prediction Result'}
            </h2>
            <h1 className={`text-6xl font-black mb-6 ${result.prediction.toLowerCase() === 'healthy' ? 'text-amber-600' : 'text-gradient'}`}>
              {result.prediction}
            </h1>
            
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/50 rounded-full border border-white/80 shadow-sm mb-12">
              <div className="text-sm font-bold text-[var(--color-text-light)]">Confidence Score:</div>
              <div className="text-xl font-black text-[var(--color-primary)]">{(result.confidence * 100).toFixed(1)}%</div>
            </div>

            {!showDetails && (
              <div className="mb-12">
                <button 
                  onClick={() => setShowDetails(true)}
                  className="px-12 py-6 rounded-3xl bg-emerald-600 text-white font-black text-xl shadow-2xl shadow-emerald-200 hover:scale-105 transition-all flex items-center gap-3 mx-auto"
                >
                  <Sparkles size={24} />
                  Reveal Divine Insights & Remedies
                </button>
              </div>
            )}

            {showDetails && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12"
              >
                {/* AI Report */}
                <div className="space-y-6">
                  <div className="glass p-8 rounded-[2.5rem] border-emerald-100 bg-emerald-50/30">
                    <div className="flex items-center gap-3 mb-4 text-emerald-700">
                      <Sparkles size={24} />
                      <h3 className="text-xl font-black">Divine Assessment</h3>
                    </div>
                    <div className="prose prose-sm max-w-none text-[var(--color-text-light)] font-medium leading-relaxed">
                      {result.ai_report ? result.ai_report.split('\n').map((line: string, i: number) => (
                        <p key={i} className="mb-2">{line}</p>
                      )) : (
                        <p className="italic text-[var(--color-text-light)]">No assessment available.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Medicines Table */}
                <div className="space-y-6">
                  <div className="glass p-8 rounded-[2.5rem] border-amber-100 bg-amber-50/30">
                    <div className="flex items-center gap-3 mb-6 text-amber-700">
                      {result.prediction.toLowerCase() === 'healthy' ? <Sparkles size={24} /> : <Droplets size={24} />}
                      <h3 className="text-xl font-black">
                        {result.prediction.toLowerCase() === 'healthy' ? 'Wellness Recommendations' : 'Recommended Medicines'}
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {result.medicines && result.medicines.length > 0 ? result.medicines.map((med: any, i: number) => (
                        <div key={i} className="p-4 bg-white/60 rounded-2xl border border-amber-100 shadow-sm">
                          <div className="flex justify-between items-start mb-1">
                            <div className="font-bold text-amber-900">{med.name}</div>
                            <div className="text-xs font-black px-3 py-1 bg-amber-100 text-amber-700 rounded-full">{med.dosage}</div>
                          </div>
                          <div className="text-xs font-bold text-amber-600 mb-2">{med.duration} Days</div>
                          <div className="text-sm text-amber-800 line-clamp-2">{med.description}</div>
                        </div>
                      )) : (
                        <p className="text-[var(--color-text-light)] font-medium italic">Consult a practitioner for specific formulations.</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex flex-col md:flex-row gap-6 justify-center">
...
              <button onClick={() => setStep(1)} className="px-10 py-5 rounded-2xl font-bold border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-all">
                New Assessment
              </button>
              <button className="btn-primary px-10 py-5 rounded-2xl text-lg flex items-center justify-center gap-3">
                Talk to Veda AI <Wind size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Prediction;
