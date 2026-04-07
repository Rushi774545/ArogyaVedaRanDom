import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const AncientWisdom = () => {
  const quotes = [
    {
      text: "When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need.",
      source: "Ancient Ayurvedic Proverb",
      author: "Vedic Wisdom"
    },
    {
      text: "Healing is a matter of time, but it is also a matter of opportunity and the right alignment.",
      source: "Charaka Samhita",
      author: "Wisdom of the Ages"
    },
    {
      text: "ArogyaVeda helped me find my Dosha balance. My energy levels have never been higher.",
      source: "Satisfied Soul",
      author: "Arjun Sharma"
    }
  ];

  return (
    <section id="wellness" className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-16"
        >
          <Quote size={48} className="mx-auto text-[var(--color-primary)] opacity-20 mb-6" />
          <h2 className="text-4xl font-black mb-4">Ancient <span className="text-gradient">Wisdom</span>, Modern Results</h2>
          <p className="text-[var(--color-text-light)] max-w-2xl mx-auto text-lg leading-relaxed">
            Discover the profound insights that have guided humanity towards health and harmony for millennia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-10 glass rounded-[2.5rem] relative overflow-hidden shadow-2xl border-white/40"
            >
              <div className="flex justify-center gap-1 mb-6 text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-xl italic font-medium leading-relaxed mb-8 text-[var(--color-text)]">
                "{quote.text}"
              </p>
              <div className="mt-auto">
                <div className="font-bold text-[var(--color-primary)] text-lg">{quote.author}</div>
                <div className="text-sm text-[var(--color-secondary)] font-semibold uppercase tracking-wider">{quote.source}</div>
              </div>
              
              {/* Decorative Glow */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--color-primary)]/5 rounded-full blur-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AncientWisdom;
