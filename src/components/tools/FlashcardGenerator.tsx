import React, { useState } from 'react';
import { Sparkles, Loader2, ChevronLeft, ChevronRight, RotateCw, AlertCircle, Trash2, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateFlashcards } from '../../services/geminiService';
import { getFriendlyErrorMessage } from '../../lib/errorUtils';

interface Flashcard {
  front: string;
  back: string;
}

export default function FlashcardGenerator() {
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!inputText.trim() || inputText.length < 20) {
      setError("Please provide a bit more context (at least 20 characters) for better flashcards.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateFlashcards(inputText);
      if (result.length > 0) {
        setFlashcards(result);
        setCurrentIndex(0);
        setIsFlipped(false);
      } else {
        setError("AI couldn't generate flashcards. Try different text.");
      }
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const clearAll = () => {
    setFlashcards([]);
    setInputText('');
    setError(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-8 h-full items-stretch">
      {/* INPUT SECTION */}
      <section className="saas-card p-8 space-y-6 flex flex-col h-full border-slate-100">
        <div className="flex justify-between items-center">
          <label className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Study Material</label>
          <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-full uppercase">
            {inputText.length} chars
          </span>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <textarea
          className="flex-1 w-full p-6 border border-slate-100 rounded-2xl bg-slate-50/50 text-[15px] resize-none focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all font-sans leading-relaxed text-slate-700 placeholder:text-slate-300"
          placeholder="Paste your notes, a textbook paragraph, or list of terms you want to study..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !inputText.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold py-4.5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-indigo-500/20"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Flashcards...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Flashcards
            </>
          )}
        </button>
      </section>

      {/* FLASHCARD SECTION */}
      <section className="saas-card p-8 flex flex-col h-full items-center justify-center border-slate-100 bg-slate-50/30">
        <div className="w-full mb-6 flex justify-between items-center">
          <h3 className="font-black text-slate-900 flex items-center gap-2 uppercase tracking-widest text-xs">
            <RotateCw className="w-3 h-3 text-indigo-600" />
            Study Mode
          </h3>
          {flashcards.length > 0 && (
            <button
              onClick={clearAll}
              className="text-slate-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex-1 w-full flex flex-col items-center justify-center gap-8">
          <AnimatePresence mode="wait">
            {flashcards.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center space-y-4"
              >
                <div className="w-20 h-20 bg-indigo-50 text-indigo-400 rounded-3xl flex items-center justify-center mx-auto">
                  <BookOpen className="w-10 h-10" />
                </div>
                <p className="text-slate-400 font-bold text-sm max-w-[200px] mx-auto">
                  Generate flashcards to start your study session.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="active"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full flex flex-col items-center gap-8"
              >
                {/* 3D FLASHCARD */}
                <div 
                  className="relative w-full h-[300px] perspective-1000 cursor-pointer group"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-full h-full relative preserve-3d"
                  >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-white border-2 border-slate-100 rounded-3xl shadow-xl p-8 flex items-center justify-center text-center overflow-hidden">
                      <motion.div 
                        initial={{ opacity: 0.3 }}
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05)_0%,transparent_50%)]"
                      />
                      <div className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest text-slate-300 z-10">Front</div>
                      <h4 className="text-2xl font-black text-slate-900 leading-tight z-10">
                        {flashcards[currentIndex].front}
                      </h4>
                    </div>
                    {/* Back */}
                    <div 
                      className="absolute inset-0 backface-hidden bg-indigo-600 border-2 border-indigo-500 rounded-3xl shadow-xl p-8 flex items-center justify-center text-center rotate-y-180 overflow-hidden"
                    >
                      <motion.div 
                        initial={{ opacity: 0.5 }}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          x: [0, 10, 0],
                          y: [0, -10, 0],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_0%,transparent_60%)]"
                      />
                      <div className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest text-indigo-300 z-10">Back</div>
                      <p className="text-xl font-bold text-white leading-relaxed z-10">
                        {flashcards[currentIndex].back}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* NAVIGATION */}
                <div className="w-full flex items-center justify-between">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <div className="px-4 py-2 bg-indigo-50 rounded-xl text-indigo-600 font-black text-xs uppercase tracking-widest">
                    {currentIndex + 1} / {flashcards.length}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={currentIndex === flashcards.length - 1}
                    className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
                
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <RotateCw className="w-3 h-3" />
                  Click card to flip
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
