import React from 'react';
import { motion } from 'framer-motion';
import { Compass, BookOpen, UserCheck, Sparkles } from 'lucide-react';

const VedicJourney = () => {
  const steps = [
    {
      title: "Self Discovery",
      description: "Begin with a deep analysis of your Prakriti (inner nature) and Dosha balance.",
      icon: Compass,
      color: "bg-amber-100 text-amber-700"
    },
    {
      title: "Wisdom Alignment",
      description: "Receive personalized rituals and nutrition plans sourced from ancient Vedic texts.",
      icon: BookOpen,
      color: "bg-emerald-100 text-emerald-700"
    },
    {
      title: "Holistic Transformation",
      description: "Implement daily changes in your lifestyle, breath, and diet for lasting vitality.",
      icon: UserCheck,
      color: "bg-teal-100 text-teal-700"
    },
    {
      title: "Enlightened Wellbeing",
      description: "Achieve a state of equilibrium between mind, body, and consciousness.",
      icon: Sparkles,
      color: "bg-gold-100 text-gold-700"
    }
  ];

  return (
    <section id="journey" className="py-24 bg-[var(--color-bg)] overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-[var(--color-primary)] font-bold tracking-widest uppercase text-sm mb-4 block">The Path to Harmony</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6">Your <span className="text-gradient">Vedic Journey</span></h2>
          <p className="text-[var(--color-text-light)] max-w-2xl mx-auto text-lg leading-relaxed">
            Follow the four pillars of Ayurvedic transformation to unlock your true potential and achieve health that lasts a lifetime.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--color-primary)]/20 to-transparent -translate-y-1/2 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group p-8 glass rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-white/50"
              >
                <div className={`w-20 h-20 mx-auto rounded-3xl ${step.color} flex items-center justify-center mb-8 shadow-inner transform transition-transform group-hover:rotate-6 group-hover:scale-110`}>
                  <step.icon size={36} />
                </div>
                <div className="text-gray-300 font-bold mb-2 text-sm">Step 0{index + 1}</div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-[var(--color-text-light)] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VedicJourney;
