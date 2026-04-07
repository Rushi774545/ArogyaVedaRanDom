import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '../api-config';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Namaste! I am ArogyaVeda AI, your holistic health guide. Based on your recent health trends and Vedic wisdom, how can I assist your wellbeing journey today?", 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const patientId = localStorage.getItem('patient_id') || '102';
      const response = await axios.post(API_ENDPOINTS.CHAT, {
        message: input,
        patient_id: patientId
      });

      const botMessage = { 
        id: Date.now() + 1, 
        text: response.data.reply, 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage = { 
        id: Date.now() + 1, 
        text: "I apologize, but I am momentarily disconnected from the cosmic flow (Server Error). Please try again in a moment.", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[calc(100vh-14rem)] flex flex-col glass rounded-[4rem] border-white/50 overflow-hidden shadow-2xl relative"
    >
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/10 blur-[100px] pointer-events-none" />

      {/* Chat Header */}
      <div className="p-8 bg-white/60 border-b border-indigo-100/50 flex items-center justify-between backdrop-blur-xl relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <Sparkles size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">ArogyaVeda <span className="text-gradient">AI</span></h2>
            <div className="flex items-center gap-2 text-sm text-emerald-600 font-bold uppercase tracking-widest">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
              Synchronized & Wise
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col items-end">
          <span className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-1">Vedic Intelligence</span>
          <div className="px-5 py-2 bg-indigo-50 text-indigo-700 rounded-2xl text-[10px] font-black border border-indigo-100 shadow-sm uppercase tracking-widest">
            Context-Aware Analytics
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow p-10 overflow-y-auto space-y-8 custom-scrollbar bg-white/10 relative z-10">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex gap-5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg transition-transform hover:scale-110 duration-300 ${
                msg.sender === 'bot' 
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-indigo-200' 
                  : 'bg-white text-gray-400 border border-gray-100 shadow-gray-100'
              }`}>
                {msg.sender === 'bot' ? <Bot size={24} /> : <User size={24} />}
              </div>
              <div className={`max-w-[75%] p-7 rounded-[2.5rem] shadow-sm relative group transition-all duration-300 ${
                msg.sender === 'bot' 
                  ? 'bg-white rounded-tl-none border border-indigo-50 text-indigo-950 font-medium' 
                  : 'bg-indigo-600 rounded-tr-none text-white font-bold'
              }`}>
                <p className="text-lg leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </p>
                {msg.sender === 'bot' && (
                  <div className="absolute -bottom-6 left-2 text-[10px] font-black text-indigo-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Deeply Derived Response
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-5"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-indigo-200">
                <Bot size={24} />
              </div>
              <div className="bg-white/60 p-6 rounded-[2.5rem] rounded-tl-none shadow-sm flex items-center gap-3">
                <Loader2 className="animate-spin text-indigo-600" size={20} />
                <span className="text-indigo-400 font-bold text-sm uppercase tracking-widest">ArogyaVeda is contemplating...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-10 bg-white/60 border-t border-indigo-100/50 backdrop-blur-xl relative z-10">
        <div className="relative group max-w-5xl mx-auto">
          <input 
            type="text" 
            placeholder="Seek guidance for your wellness..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
            className="w-full pl-10 pr-24 py-8 bg-white/80 border-2 border-transparent rounded-[3rem] text-xl font-bold focus:outline-none focus:border-indigo-500/50 transition-all shadow-xl shadow-indigo-900/5 disabled:opacity-50"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-200 disabled:opacity-50 group-hover:bg-indigo-700"
          >
            <Send size={24} />
          </button>
        </div>
        <p className="text-center mt-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          The AI provides analysis based on your unique health data and ancient principles.
        </p>
      </div>
    </motion.div>
  );
};

export default Chatbot;
