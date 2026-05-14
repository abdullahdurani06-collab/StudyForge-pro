import React, { useState, useRef } from 'react';
import { ListChecks, Sparkles, Loader2, Check, Box, Upload, AlertCircle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { extractTextFromFile } from '../../services/fileParser';
import { generateMCQs } from '../../services/geminiService';

export default function MCQGenerator() {
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionCount, setQuestionCount] = useState(3);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    setError(null);
    try {
      const text = await extractTextFromFile(file);
      setInputText(text);
    } catch (err: any) {
      setError(err.message || "Failed to parse file.");
    } finally {
      setIsParsing(false);
    }
  };

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateMCQs(inputText, questionCount);
      setQuestions(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    const text = questions.map((q, i) => 
      `${i+1}. ${q.question}\nOptions: ${q.options.join(', ')}\nCorrect Answer: ${q.correctAnswer}`
    ).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-stretch">
      {/* INPUT SECTION */}
      <section className="saas-card p-8 space-y-6 flex flex-col h-full border-slate-100">
        <div className="flex justify-between items-center">
          <label className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Study Context</label>
          <div className="flex items-center gap-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
              accept=".pdf,.docx,.pptx,.txt"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isParsing || isGenerating}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-lg text-xs font-bold text-slate-600 transition-all disabled:opacity-50"
            >
              {isParsing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
              Upload Material
            </button>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase">
              {inputText.length > 0 ? `${inputText.split(/\s+/).length} words` : '0 words'}
            </span>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <textarea
          className="flex-1 w-full p-6 border border-slate-100 rounded-2xl bg-slate-50/50 text-[15px] resize-none focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-sans leading-relaxed text-slate-700 placeholder:text-slate-300"
          placeholder="Paste textbook excerpts or upload a file..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block ml-1">Number of Questions (1-20)</label>
            <input 
              type="number"
              min="1"
              max="20"
              value={questionCount}
              onChange={(e) => setQuestionCount(Math.min(20, Math.max(1, Number(e.target.value))))}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500/10 outline-none text-sm font-bold"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || isParsing || !inputText.trim()}
            className="flex-[2] bg-[#0061FF] hover:bg-[#0052D9] disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-blue-500/20"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate MCQs
              </>
            )}
          </button>
        </div>
      </section>

      {/* OUTPUT SECTION */}
      <section className="saas-card p-8 flex flex-col h-full min-h-[500px] border-slate-100">
        <div className="mb-6 pb-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 flex items-center gap-3 text-lg tracking-tight">
            <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <ListChecks className="w-4 h-4" />
            </div>
            Review Questions
          </h3>
          {questions.length > 0 && (
            <div className="flex gap-4">
              <button
                onClick={copyToClipboard}
                className="text-[#0061FF] text-xs font-bold uppercase tracking-widest hover:underline"
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence mode="wait">
            {questions.length === 0 && !isGenerating ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-slate-300 py-12"
              >
                <Box className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-sm font-medium">Waiting for input to generate questions...</p>
              </motion.div>
            ) : isGenerating ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center space-y-4 py-12"
              >
                <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
                <p className="text-sm font-bold text-emerald-600 animate-pulse uppercase tracking-widest">Generating Content...</p>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {questions.map((q, qIndex) => (
                  <div key={qIndex} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-black shrink-0">
                        {qIndex + 1}
                      </div>
                      <p className="text-sm font-bold text-slate-800 leading-relaxed">{q.question}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-2 ml-10">
                      {q.options.map((option: string, oIndex: number) => (
                        <div 
                          key={oIndex}
                          className={`p-3 rounded-xl border text-xs font-medium transition-all ${
                            option === q.correctAnswer 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                            : 'bg-white border-slate-100 text-slate-500'
                          }`}
                        >
                          {String.fromCharCode(65 + oIndex)}. {option}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
