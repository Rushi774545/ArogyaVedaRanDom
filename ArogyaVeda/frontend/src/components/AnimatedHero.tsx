import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Sparkles, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnimatedHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="relative min-h-screen pt-32 overflow-hidden bg-[var(--color-bg)]">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-[var(--color-primary)]/10 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[var(--color-secondary)]/10 rounded-full blur-[80px] -z-10" />

      <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center gap-16">
        {/* Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 text-center lg:text-left z-10"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold text-sm mb-6 border border-[var(--color-primary)]/10"
          >
            <Sparkles size={16} />
            <span>Discover the True Wisdom of Wellbeing</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            Revitalize Your Health with <span className="text-gradient">Ancient Secrets</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-[var(--color-text-light)] mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
          >
            ArogyaVeda blends timeless Ayurvedic wisdom with modern science to help you achieve holistic health, mental clarity, and lasting vitality.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Link to="/register" className="btn-primary group flex items-center gap-2 text-lg px-8">
              Start Your Journey
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="#about" className="btn-secondary text-lg px-8">
              Learn More
            </a>
          </motion.div>

          {/* Stats/Badges */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 border-t border-[var(--color-primary)]/10 pt-12"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm border border-[var(--color-primary)]/10">
                <ShieldCheck className="text-[var(--color-primary)]" size={24} />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg">100% Organic</div>
                <div className="text-sm text-[var(--color-text-light)]">Pure Himalayan Extracts</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm border border-[var(--color-primary)]/10">
                <Zap className="text-[var(--color-secondary)]" size={24} />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg">Instant Vitality</div>
                <div className="text-sm text-[var(--color-text-light)]">Natural Energy Boost</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Visual Content - Floating Image/Object container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex-1 relative w-full max-w-[600px]"
        >
          <div className="relative w-full aspect-square rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/50 bg-gradient-to-br from-[var(--color-primary-light)] to-white">
            {/* Placeholder for Hero Image - will be a stylized composition */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6, 
                  ease: "easeInOut" 
                }}
                className="w-4/5 h-4/5 bg-[var(--color-primary)]/20 rounded-full blur-3xl"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Leaf size={200} className="text-[var(--color-primary)] opacity-20" />
              </div>
              <div className="z-10 text-center p-8">
                <div className="glass p-6 rounded-3xl shadow-xl border border-white/40">
                  <h3 className="text-2xl font-bold mb-2 text-[var(--color-primary)]">Personalized Wellness</h3>
                  <p className="text-[var(--color-text-light)]">Your DNA-based Ayurvedic Plan</p>
                </div>
              </div>
            </div>
            
            {/* Floating Vedic Card 1 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute top-10 -left-10 glass p-5 rounded-2xl shadow-xl flex items-center gap-4 z-20"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <Compass size={24} />
              </div>
              <div>
                <div className="font-bold text-sm">Prakriti</div>
                <div className="text-xs text-gray-500">Dosha Analysis</div>
              </div>
            </motion.div>

            {/* Floating Vedic Card 2 */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, delay: 1 }}
              className="absolute bottom-10 -right-10 glass p-5 rounded-2xl shadow-xl border-white/50 z-20"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-xs font-semibold">Wisdom Path</span>
              </div>
              <div className="text-2xl font-bold text-[var(--color-primary)]">Sattva</div>
              <div className="text-[10px] text-gray-500">Optimal Equilibrium</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Internal component for the leaf logo if not exported
const Leaf = ({ size, className }: { size: number; className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a7 7 0 0 1-10 10Z" />
    <path d="M11 20V11" />
    <path d="M19 12c-1.5 1-3.5 1-3.5 1" />
  </svg>
);

export default AnimatedHero;
