import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  onStartUsingTools: () => void;
}

export default function Hero({ onStartUsingTools }: HeroProps) {
  return (
    <section className="relative pt-44 pb-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-100/20 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-[#0061FF] text-sm font-bold tracking-tight mb-8"
        >
          <Sparkles className="w-4 h-4" />
          The New Standard for Academic Tooling
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-8 tracking-[-0.03em]"
        >
          Save Time and Study <br /> Smarter with Free Student Tools
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
        >
          Instant calculators, note generators, and study tools designed specifically for students.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <button 
            onClick={onStartUsingTools}
            className="w-full sm:w-auto px-10 py-4.5 bg-[#0061FF] text-white rounded-2xl text-lg font-bold hover:bg-[#0052D9] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-blue-500/20"
          >
            Start Using Tools
          </button>
          <button 
            onClick={() => {
              document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="w-full sm:w-auto px-10 py-4.5 bg-white text-slate-600 border border-slate-200 rounded-2xl text-lg font-bold hover:bg-slate-50 transition-all shadow-sm"
          >
            View Tools
          </button>
        </motion.div>
      </div>
    </section>
  );
}
