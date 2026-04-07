import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Coffee, Moon, Sun, Heart, Brain } from 'lucide-react';

const WellnessFeatures = () => {
  const features = [
    {
      title: "Prana Management",
      description: "Master your life force through guided breathing and energy alignment techniques.",
      icon: Wind,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Ayurvedic Diet",
      description: "Personalized nutrition plans based on your Dosha for optimal digestion and health.",
      icon: Coffee,
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "Sleep Optimization",
      description: "Align your circadian rhythm with ancient rituals for deep, restorative rest.",
      icon: Moon,
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      title: "Vitality Boost",
      description: "Natural herbs and supplements to enhance your physical and mental vigor.",
      icon: Sun,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Heart Health",
      description: "Holistic cardiovascular support through yoga, meditation, and pure extracts.",
      icon: Heart,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Mental Clarity",
      description: "Sharpen your focus and reduce stress with ancient cognitive enhancements.",
      icon: Brain,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="solutions" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Nurture Your <span className="text-[var(--color-primary)]">Body & Soul</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[var(--color-text-light)] max-w-2xl mx-auto text-lg"
          >
            We offer a comprehensive suite of Ayurvedic solutions tailored to your unique biological blueprint.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-8 rounded-3xl bg-[var(--color-bg)] border border-[var(--color-primary)]/5 transition-all hover:shadow-xl hover:bg-white"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-[var(--color-text-light)] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WellnessFeatures;
