import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  Activity, Heart, Droplets, Thermometer, AlertCircle, 
  CheckCircle2, TrendingUp, TrendingDown, Info, Shield, 
  Zap, Wind, Filter, Clock, RefreshCw, Eye
} from 'lucide-react';
import { API_ENDPOINTS } from '../api-config';

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const patientId = localStorage.getItem('patient_id') || '102';
  const patientName = localStorage.getItem('patient_name') || 'Vedic Soul';

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.DASHBOARD}?patient_id=${patientId}`);
      setData(response.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    } finally {
      if (loading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Real-time monitoring: Poll every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      <p className="text-indigo-600 font-bold animate-pulse uppercase tracking-widest text-xs">Synchronizing with cosmic health data...</p>
    </div>
  );

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#ef4444'];

  const lifestyleData = data?.lifestyle_data?.map((item: any) => ({
    name: item.name,
    value: typeof item.value === 'number' ? item.value * 10 : (item.value === 'Yes' || item.value === 'High' || item.value === 'Overweight' ? 80 : 40)
  })) || [];

  const symptomDistribution = data?.symptom_stats?.map((item: any) => ({
    subject: item.name,
    A: item.value ? 100 : 10, // Baseline for visibility
    fullMark: 100
  })) || [];

  return (
    <div className="space-y-8 pb-20 relative">
      {/* Real-time Status Bar */}
      <div className="flex items-center justify-between bg-white/40 glass px-8 py-3 rounded-full border-white/50 shadow-sm mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping absolute inset-0" />
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full relative" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Live Health Monitoring Active</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
            <Clock size={12} />
            Last Sync: {lastUpdated.toLocaleTimeString()}
          </div>
          <button 
            onClick={() => { setLoading(true); fetchDashboardData(); }}
            className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:scale-105 transition-transform"
          >
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} /> Force Refresh
          </button>
        </div>
      </div>

      {/* Header & Alerts */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-5xl font-black tracking-tight">Health <span className="text-gradient">Real-Time</span></h1>
          <p className="text-[var(--color-text-light)] font-bold mt-2 flex items-center gap-2">
            <Eye size={16} className="text-indigo-400" /> Continuous monitoring for {patientName}
          </p>
        </motion.div>
        
        <div className="flex flex-wrap gap-4">
          <AnimatePresence>
            {data?.insights?.map((insight: string, i: number) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key={i} 
                className={`flex items-center gap-3 px-6 py-4 rounded-[2rem] border shadow-lg backdrop-blur-md ${
                  insight.includes('increasing') || insight.includes('high') 
                  ? 'bg-red-50/80 border-red-100 text-red-600' 
                  : 'bg-amber-50/80 border-amber-100 text-amber-700'
                }`}
              >
                <AlertCircle size={20} />
                <span className="text-sm font-black tracking-tight leading-tight max-w-[200px]">{insight}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {(!data?.insights || data.insights.length === 0) && (
            <div className="flex items-center gap-3 px-8 py-4 rounded-[2rem] border bg-emerald-50/80 border-emerald-100 text-emerald-600 font-black shadow-lg">
              <CheckCircle2 size={20} />
              <span className="text-sm">Vital Harmony Maintained</span>
            </div>
          )}
        </div>
      </div>

      {/* Primary Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Vitals Trends - Expanded */}
        <div className="lg:col-span-3 space-y-8">
          <div className="glass p-10 rounded-[4rem] border-white/60 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors" />
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-indigo-50 text-indigo-600 rounded-3xl">
                  <TrendingUp size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight">Biological Trends</h2>
                  <p className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400 mt-1">Full Historical Trace</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50/50 p-2 rounded-2xl border border-gray-100">
                <button className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-200">Vitals</button>
                <button className="px-5 py-2 text-gray-400 hover:text-indigo-600 rounded-xl text-xs font-bold transition-colors">Lifestyle</button>
              </div>
            </div>
            
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.history}>
                  <defs>
                    <linearGradient id="colorSystolic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '2rem', 
                      border: 'none', 
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                      padding: '20px'
                    }}
                    itemStyle={{ fontWeight: '900', fontSize: '14px' }}
                  />
                  <Line type="monotone" dataKey="systolic" stroke="#6366f1" strokeWidth={6} dot={{ r: 6, fill: '#6366f1' }} activeDot={{ r: 10, strokeWidth: 4, stroke: '#fff' }} />
                  <Line type="monotone" dataKey="sugar" stroke="#10b981" strokeWidth={6} dot={{ r: 6, fill: '#10b981' }} activeDot={{ r: 10, strokeWidth: 4, stroke: '#fff' }} />
                  <Line type="monotone" dataKey="heart_rate" stroke="#f59e0b" strokeWidth={3} strokeDasharray="8 8" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Risk Potential Analysis */}
            <div className="glass p-10 rounded-[4rem] border-white/60 shadow-xl">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-black">Dynamic Risk Impact</h3>
              </div>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data?.risk_factors}>
                    <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'rgba(99, 102, 241, 0.05)'}} contentStyle={{ borderRadius: '1.5rem' }} />
                    <Bar dataKey="impact" radius={[12, 12, 12, 12]} barSize={24}>
                      {data?.risk_factors?.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.impact > 30 ? '#f43f5e' : '#6366f1'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Symptom Radar */}
            <div className="glass p-10 rounded-[4rem] border-white/60 shadow-xl">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <Activity size={24} />
                </div>
                <h3 className="text-xl font-black">Symptom Equilibrium</h3>
              </div>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={symptomDistribution}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" fontSize={10} fontWeight="bold" />
                    <Radar name="Symptoms" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Real-Time Scoring */}
        <div className="space-y-8 lg:sticky lg:top-32 h-fit">
          {/* Harmony Score - The Real-Time Star */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="glass p-10 rounded-[4rem] border-white/60 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -bottom-10 -left-10 opacity-10 rotate-12">
              <Heart size={200} fill="white" />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-black uppercase tracking-[0.2em] opacity-60 mb-10">Vital Harmony Index</h3>
              <div className="flex flex-col items-center justify-center py-6">
                <div className="relative flex items-center justify-center">
                   <svg className="w-48 h-48 transform -rotate-90">
                    <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/10" />
                    <motion.circle 
                      cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
                      strokeDasharray={2 * Math.PI * 88}
                      initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - (data?.harmony_score || 0) / 100) }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      strokeLinecap="round" className="text-white"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-6xl font-black tracking-tighter">{data?.harmony_score || 0}</span>
                    <span className="text-xs uppercase font-black tracking-widest opacity-60">Percent</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 flex items-center justify-between bg-white/10 p-6 rounded-3xl border border-white/10">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Improvement</p>
                  <div className="flex items-center gap-2">
                    {data?.improvement_index >= 0 ? <TrendingUp size={20} className="text-emerald-400" /> : <TrendingDown size={20} className="text-rose-400" />}
                    <span className={`text-2xl font-black ${data?.improvement_index >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {data?.improvement_index > 0 ? '+' : ''}{data?.improvement_index || 0}%
                    </span>
                  </div>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Status</p>
                  <p className="text-sm font-black whitespace-nowrap">
                    {data?.harmony_score > 80 ? 'EXCELLENT' : data?.harmony_score > 60 ? 'HARMONIOUS' : 'IMPROVING'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lifestyle Pie */}
          <div className="glass p-10 rounded-[3.5rem] border-white/60 shadow-xl bg-white/40">
            <h3 className="text-lg font-black mb-8 text-center uppercase tracking-widest">Lifestyle Aura</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={lifestyleData} innerRadius={60} outerRadius={85} paddingAngle={8} dataKey="value">
                    {lifestyleData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={10} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-8">
              {lifestyleData.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-white/30 rounded-xl border border-white/50">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="font-bold text-[9px] text-gray-600 truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Ticker / Log */}
      <div className="glass p-10 rounded-[4rem] border-white/60 shadow-2xl relative overflow-hidden bg-white/20">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Activity size={24} />
            </div>
            <h2 className="text-2xl font-black">Live Health Audit</h2>
          </div>
          <span className="px-6 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-100">
            {data?.total_predictions || 0} Total Synchronizations
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black/5">
                <th className="pb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] px-4">Timeline</th>
                <th className="pb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] px-4">Systolic Path</th>
                <th className="pb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] px-4">Glucose Trace</th>
                <th className="pb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] px-4">Stature Index (BMI)</th>
                <th className="pb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] px-4">Clinical Verdict</th>
                <th className="pb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] px-4 text-right">Momentum</th>
              </tr>
            </thead>
            <tbody>
              {data?.history?.slice().reverse().map((record: any, i: number) => {
                const prev = data.history[data.history.length - i - 2];
                const isWorsening = prev && record.sugar > prev.sugar;
                
                return (
                  <motion.tr 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={i} 
                    className="border-b border-black/5 last:border-0 hover:bg-white transition-all group cursor-default"
                  >
                    <td className="py-8 px-4 font-bold text-gray-400">{record.date}</td>
                    <td className="py-8 px-4 font-black text-2xl tracking-tighter text-indigo-950">{record.systolic}</td>
                    <td className="py-8 px-4 font-black text-2xl tracking-tighter text-emerald-600">{record.sugar}</td>
                    <td className="py-8 px-4">
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                         <span className="font-black text-xl tracking-tighter">{record.bmi}</span>
                      </div>
                    </td>
                    <td className="py-8 px-4">
                      <span className={`px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm ${
                        record.prediction === 'Healthy' 
                          ? 'bg-emerald-500 text-white shadow-emerald-200' 
                          : 'bg-rose-500 text-white shadow-rose-200'
                      }`}>
                        {record.prediction}
                      </span>
                    </td>
                    <td className="py-8 px-4 text-right">
                      {isWorsening ? (
                        <div className="inline-flex items-center gap-2 px-5 py-2 bg-rose-50 text-rose-500 rounded-xl font-black text-[10px] uppercase tracking-widest border border-rose-100">
                          <TrendingUp size={12} /> Divergent
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-50 text-emerald-500 rounded-xl font-black text-[10px] uppercase tracking-widest border border-emerald-100">
                          <CheckCircle2 size={12} /> Convergent
                        </div>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
