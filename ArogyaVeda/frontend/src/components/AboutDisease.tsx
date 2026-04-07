import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Search, Info, X, Shield, 
  Leaf, Thermometer, Activity, Droplets, 
  AlertCircle, ChevronRight, Wind, Heart,
  Zap, Compass
} from 'lucide-react';

// Import Assets
import liverImg from '../assets/diseases/liver.png';
import heartImg from '../assets/diseases/heart.png';
import kidneyImg from '../assets/diseases/kidney.png';
import diabetesImg from '../assets/diseases/diabetes.png';
import diarrheaImg from '../assets/diseases/diarrhea.png';

const diseases = [
  {
    id: 'liver',
    name: 'Liver Disease',
    image: liverImg,
    icon: <Droplets className="text-blue-500" />,
    color: 'from-blue-500 to-indigo-600',
    cause: "Common causes include excessive alcohol consumption, viral hepatitis (A, B, C), obesity-related fatty liver, and exposure to environmental toxins.",
    ayurvedicInsight: "In Ayurveda, liver disorders are often seen as an imbalance of 'Pitta' (fire element). Excess heat in the blood (Rakta) leads to inflammation and reduced 'Agni' (digestive fire).",
    medication: "Modern treatments include antivirals or corticosteroids. Vedic support includes herbs like Katuki, Bhumyamalaki, and Kalmegh for natural detoxification.",
    precaution: "Avoid alcohol and fried foods. Practice 'Panchakarma' for detoxification. Limit chemical exposure and manage anger (a Pitta-aggravating emotion).",
    vedicDiet: "Include cooling foods: Pomegranate, coconut water, bitter greens (Kale, Spinach), and Clarified Butter (Ghee) in moderation. Avoid spicy, salty, and sour foods.",
    additionalInfo: "The liver is responsible for over 500 vital functions. In Ayurveda, it is the seat of 'Brajaka Pitta', governing color and metabolic brilliance."
  },
  {
    id: 'heart',
    name: 'Heart Disease',
    image: heartImg,
    icon: <Heart className="text-red-500" />,
    color: 'from-red-500 to-rose-600',
    cause: "Principally caused by high blood pressure, elevated LDL cholesterol, smoking, sedentary lifestyle, and high-stress levels leading to arterial blockage.",
    ayurvedicInsight: "Known as 'Hridaya Roga'. It is often a result of 'Kapha' accumulation blocking 'Prana' flow. Emotional stress ('Mano-vaha Srotas' disturbance) also plays a critical role.",
    medication: "Statins or beta-blockers are common clinical choices. Vedic remedies emphasize 'Arjuna' bark, 'Ashwagandha', and 'Guggulu' for cardiac strength and lipid balance.",
    precaution: "Engage in moderate daily exercise. Practice 'Pranayama' (deep breathing) to reduce stress. Ensure adequate sleep and maintain a positive emotional state.",
    vedicDiet: "Heart-healthy diet includes Garlic, Ginger, Flaxseeds, Walnuts, and Barley. Favor 'Sattvic' foods—fresh, light, and naturally sweet fruits like Amla.",
    additionalInfo: "The heart is considered the seat of 'Ojas' (vital energy) in Ayurveda. Protection of the heart is seen as the primary key to longevity."
  },
  {
    id: 'kidney',
    name: 'Kidney Disease',
    image: kidneyImg,
    icon: <Zap className="text-amber-500" />,
    color: 'from-amber-500 to-yellow-600',
    cause: "Chronic conditions like Diabetes and Hypertension are the leading causes. Infections and prolonged use of certain medications can also damage renal filters.",
    ayurvedicInsight: "Seen as an obstruction in the 'Mutravaha Srotas' (urinary channels). It involves the imbalance of 'Vata' leading to tissue depletion or 'Kapha' causing blockage.",
    medication: "Management focusing on blood pressure control and dialysis in advanced stages. Vedic support includes 'Punarnava', 'Varuna', and 'Gokhru' for safe fluid management.",
    precaution: "Stay adequately hydrated but avoid excess water intake late at night. Never suppress natural urges. Avoid high-protein diets and excessive salt.",
    vedicDiet: "Favor Moong Dal, Steamed Rice, Coriander, and Radish. Herbal teas with Fennel or Vetiver are beneficial for cooling the urinary tract.",
    additionalInfo: "Kidneys regulate the 'Apo' (water) element in the body. Maintaining their health ensures the purity of the body's internal 'ocean'."
  },
  {
    id: 'diabetes',
    name: 'Diabetes',
    image: diabetesImg,
    icon: <Activity className="text-emerald-500" />,
    color: 'from-emerald-500 to-teal-600',
    cause: "Primarily insulin resistance or lack of insulin production due to lifestyle factors, high-sugar diets, and genetic predisposition.",
    ayurvedicInsight: "Classified as 'Prameha', specifically 'Madhumeha'. It is a 'Kapha-dominant' disorder where the body's sweetness increases, leading to depletion of vital tissues.",
    medication: "Insulin or oral hypoglycemic agents. Vedic herbs like 'Vijaysar', 'Jamun seed powder', and 'Nisha-Amalaki' (Turmeric & Amla) help manage insulin sensitivity.",
    precaution: "Avoid daytime sleeping. Ensure regular physical activity (Vyayama). Practice sunbathing to boost metabolism and avoid processed sugars.",
    vedicDiet: "Focus on 'Tikta' (bitter) and 'Kashaya' (astringent) tastes: Bitter Gourd (Karela), Fenugreek (Methi), Turmeric, and whole grains like Millet and Barley.",
    additionalInfo: "Ayurveda describes 20 types of 'Prameha'. Managing it early through 'Ahar' (diet) and 'Vihar' (lifestyle) can prevent chronic complications."
  },
  {
    id: 'diarrhea',
    name: 'Diarrhea',
    image: diarrheaImg,
    icon: <Wind className="text-sky-500" />,
    color: 'from-sky-500 to-blue-600',
    cause: "Infections (bacterial, viral, parasitic), food intolerances, emotional stress, or sudden changes in diet affecting the gut microbiome.",
    ayurvedicInsight: "Referred to as 'Atisara'. It occurs when 'Agni' (digestive fire) is weakened, and 'Vata' push excess fluids into the colon, disrupting natural absorption.",
    medication: "Rehydration therapy (ORS) and probiotics. Vedic remedies include Roasted Cumin powder, Pomegranate peel, and 'Bilva' (Bael fruit) for gut stability.",
    precaution: "Boil water before drinking. Maintain hand hygiene. Avoid heavy, oily, or raw foods during the episode. Take ginger tea to rekindle the 'Agni'.",
    vedicDiet: "The golden remedy is 'Takra' (Buttermilk) with Cumin and Ginger. Boiled red rice, Moong dal soup, and Steamed Apple are highly recommended.",
    additionalInfo: "In Ayurveda, the gut is the 'Moola' (root) of health. A strong digestive fire prevents 'Ama' (toxins) from causing systemic illness."
  }
];

const AboutDisease = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDisease, setSelectedDisease] = useState<any>(null);

  const filteredDiseases = diseases.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-12 rounded-[3.5rem] border-white/50 relative overflow-hidden bg-gradient-to-br from-white/40 to-white/10"
      >
        <div className="max-w-3xl relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Compass size={32} />
            </div>
            <h1 className="text-5xl font-black tracking-tight">Vedic <span className="text-gradient">Wisdom Hub</span></h1>
          </div>
          <p className="text-2xl text-[var(--color-text-light)] leading-relaxed font-medium">
            Explore the deep connection between modern medicine and ancient Vedic perspectives to achieve holistic vitality.
          </p>
        </div>

        <div className="mt-12 relative max-w-2xl">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" size={28} />
          <input 
            type="text" 
            placeholder="Search our knowledge base..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-8 py-7 bg-white/70 border-2 border-transparent rounded-[2.5rem] text-xl font-bold focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary-light)] transition-all shadow-xl shadow-black/5"
          />
        </div>
      </motion.div>

      {/* Disease Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence>
          {filteredDiseases.map((disease, index) => (
            <motion.div
              layoutId={disease.id}
              key={disease.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedDisease(disease)}
              className="group cursor-pointer"
            >
              <div className="glass p-8 rounded-[3rem] border-white/50 bg-white/40 hover:bg-white/60 transition-all duration-500 shadow-xl hover:shadow-2xl overflow-hidden relative">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${disease.color} opacity-5 rounded-bl-full transition-transform group-hover:scale-150 duration-700`} />
                
                <div className="flex items-center justify-between mb-8">
                  <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                    {disease.icon}
                  </div>
                  <ChevronRight size={24} className="text-gray-300 group-hover:text-[var(--color-primary)] transition-colors" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-black group-hover:text-gradient transition-all">{disease.name}</h3>
                  <p className="text-[var(--color-text-light)] line-clamp-3 font-medium leading-relaxed">
                    {disease.ayurvedicInsight}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-[var(--color-primary)] font-black text-sm uppercase tracking-widest">
                  Explore Wisdom <Zap size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedDisease && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-xl bg-black/40">
            <motion.div
              layoutId={selectedDisease.id}
              className="bg-white w-full max-w-6xl max-h-[90vh] rounded-[4rem] shadow-2xl overflow-hidden relative flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedDisease(null)}
                className="absolute top-8 right-8 z-20 p-4 bg-black/10 hover:bg-black/20 rounded-full transition-colors backdrop-blur-md"
              >
                <X size={24} />
              </button>

              {/* Left Side: Image & Header */}
              <div className="w-full md:w-1/2 relative bg-gray-50 h-64 md:h-auto">
                <img 
                  src={selectedDisease.image} 
                  alt={selectedDisease.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12 text-white">
                  <h2 className="text-5xl font-black mb-4">{selectedDisease.name}</h2>
                  <div className="flex gap-4">
                    <span className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-sm font-bold border border-white/20 uppercase tracking-widest">Modern Clinical</span>
                    <span className="px-5 py-2 rounded-full bg-[var(--color-primary)] text-sm font-bold uppercase tracking-widest">Ancient Vedic</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="w-full md:w-1/2 p-12 md:p-16 overflow-y-auto space-y-10 custom-scrollbar">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-red-500 font-black uppercase tracking-widest text-sm">
                    <AlertCircle size={18} /> Root Causes
                  </div>
                  <p className="text-lg text-[var(--color-text-light)] leading-relaxed font-medium">{selectedDisease.cause}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 rounded-[2.5rem] bg-indigo-50 border border-indigo-100">
                    <div className="flex items-center gap-3 mb-4 text-indigo-600 font-bold uppercase tracking-wider text-xs">
                      <Shield size={16} /> Medication
                    </div>
                    <p className="text-sm font-medium leading-relaxed">{selectedDisease.medication}</p>
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-emerald-50 border border-emerald-100">
                    <div className="flex items-center gap-3 mb-4 text-emerald-600 font-bold uppercase tracking-wider text-xs">
                      <Leaf size={16} /> Vedic Diet
                    </div>
                    <p className="text-sm font-medium leading-relaxed">{selectedDisease.vedicDiet}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[var(--color-primary)] font-black uppercase tracking-widest text-sm">
                    <Info size={18} /> Preventive Measures
                  </div>
                  <p className="text-lg text-[var(--color-text-light)] leading-relaxed font-medium">{selectedDisease.precaution}</p>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-amber-50 border border-amber-100 italic font-medium text-amber-900 border-l-8 border-l-amber-400">
                  " {selectedDisease.additionalInfo} "
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutDisease;
