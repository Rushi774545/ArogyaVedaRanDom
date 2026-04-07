import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Calendar, CheckCircle, ArrowRight, Leaf, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../api-config';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    city: '',
    contact_number: '',
    password: ''
  });
  const [patientId, setPatientId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(API_ENDPOINTS.REGISTER, formData);
      setPatientId(response.data.patient_id);
    } catch (err: any) {
      setError('Registration failed. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (patientId) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-6 pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full text-center"
        >
          <div className="w-24 h-24 bg-[var(--color-primary-light)] rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <CheckCircle className="w-12 h-12 text-[var(--color-primary)]" />
          </div>
          <h2 className="text-4xl font-black text-[var(--color-text)] mb-4 tracking-tighter">Welcome to ArogyaVeda!</h2>
          <p className="text-[var(--color-text-light)] font-medium mb-10 leading-relaxed max-w-sm mx-auto">
            Your registration is complete. Your unique Patient ID is your gateway to personalized care.
          </p>
          
          <div className="glass rounded-[3rem] p-12 mb-10 shadow-2xl border-white/40">
            <p className="text-xs font-black text-[var(--color-text-light)] uppercase tracking-widest mb-4">Unique Patient ID</p>
            <p className="text-8xl font-black text-[var(--color-primary)] tracking-tighter">{patientId}</p>
          </div>

          <Link 
            to="/" 
            className="inline-flex items-center text-[var(--color-text)] font-black hover:text-[var(--color-primary)] transition-colors group"
          >
            Go to Home Page <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pt-40 pb-20 px-6 flex items-center overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--color-primary)]/5 rounded-full blur-[120px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-secondary)]/5 rounded-full blur-[100px] opacity-40 pointer-events-none" />

      <div className="max-w-xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass text-[var(--color-primary)] font-semibold text-sm">
            <Leaf size={16} />
            <span>Begin Your Wellness Path</span>
          </div>
          <h2 className="text-5xl font-black text-[var(--color-text)] mb-4 tracking-tighter">Join <span className="text-gradient">ArogyaVeda</span></h2>
          <p className="text-lg text-[var(--color-text-light)] font-medium">Experience the fusion of ancient wisdom and modern care.</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div className="space-y-6">
            <div className="relative group">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-light)] group-focus-within:text-[var(--color-primary)] transition-colors" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-16 pr-8 py-5 bg-white border-2 border-transparent rounded-2xl text-[var(--color-text)] font-bold placeholder-gray-300 focus:outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-light)] group-focus-within:text-[var(--color-primary)] transition-colors" />
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full pl-16 pr-8 py-5 bg-white border-2 border-transparent rounded-2xl text-[var(--color-text)] font-bold placeholder-gray-300 focus:outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all shadow-sm"
                />
              </div>
              <div className="relative group">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-light)] group-focus-within:text-[var(--color-primary)] transition-colors" />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full pl-16 pr-8 py-5 bg-white border-2 border-transparent rounded-2xl text-[var(--color-text)] font-bold placeholder-gray-300 focus:outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="relative group">
              <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-light)] group-focus-within:text-[var(--color-primary)] transition-colors" />
              <input
                type="tel"
                name="contact_number"
                placeholder="Contact Number"
                value={formData.contact_number}
                onChange={handleChange}
                required
                className="w-full pl-16 pr-8 py-5 bg-white border-2 border-transparent rounded-2xl text-[var(--color-text)] font-bold placeholder-gray-300 focus:outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all shadow-sm"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-light)] group-focus-within:text-[var(--color-primary)] transition-colors" />
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-16 pr-8 py-5 bg-white border-2 border-transparent rounded-2xl text-[var(--color-text)] font-bold placeholder-gray-300 focus:outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all shadow-sm"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-6 bg-[var(--color-primary)] hover:opacity-90 text-white font-black rounded-3xl text-xl transition-all duration-300 shadow-2xl shadow-[var(--color-primary)]/20 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Complete Registration'}
          </button>
        </motion.form>
        
        <p className="mt-12 text-center text-[var(--color-text-light)] font-bold">
          Already have an account? <Link to="/login" className="text-[var(--color-primary)] hover:underline transition-colors">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
