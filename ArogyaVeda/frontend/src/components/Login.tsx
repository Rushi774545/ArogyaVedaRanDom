import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { LogIn, Lock, Hash, ArrowRight, Leaf, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../api-config';

const Login = () => {
  const [formData, setFormData] = useState({
    patient_id: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, formData);
      localStorage.setItem('patient_id', response.data.patient_id);
      localStorage.setItem('patient_name', response.data.name);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background Blooms */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary)]/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-secondary)]/5 rounded-full blur-[100px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="glass p-10 md:p-12 rounded-[3.5rem] shadow-2xl border-white/50 relative overflow-hidden mt-12">
          {/* Decorative Leaf */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center blur-xl" />
          
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
              <div className="w-12 h-12 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center text-white transition-transform group-hover:rotate-12">
                <Leaf size={28} />
              </div>
              <span className="text-3xl font-black tracking-tight text-[var(--color-primary)]">
                Arogya<span className="text-[var(--color-secondary)]">Veda</span>
              </span>
            </Link>
            <h1 className="text-3xl font-black mb-2">Welcome <span className="text-gradient">Back</span></h1>
            <p className="text-[var(--color-text-light)]">Continue your journey to enlightened health.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <Hash className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-light)] group-focus-within:text-[var(--color-primary)] transition-colors" />
              <input
                type="number"
                name="patient_id"
                placeholder="Patient ID"
                value={formData.patient_id}
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
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-16 pr-8 py-5 bg-white border-2 border-transparent rounded-2xl text-[var(--color-text)] font-bold placeholder-gray-300 focus:outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all shadow-sm"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm font-bold text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-5 rounded-2xl text-lg flex items-center justify-center gap-3 group disabled:opacity-70"
            >
              {loading ? 'Authenticating...' : 'Sign In to Veda'}
              {!loading && <LogIn size={22} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="mt-8 text-center text-[var(--color-text-light)] font-medium">
            New to ArogyaVeda?{' '}
            <Link to="/register" className="text-[var(--color-primary)] font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        {/* Floating Accent */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border-white/40 text-sm font-semibold text-[var(--color-primary)]">
            <Sparkles size={16} />
            <span>Wisdom meets Modern Science</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
