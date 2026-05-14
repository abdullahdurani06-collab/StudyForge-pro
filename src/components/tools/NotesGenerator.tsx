import React, { useState, useRef } from 'react';
import { FileText, Sparkles, Loader2, Copy, Check, Box, Upload, AlertCircle, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { extractTextFromFile } from '../../services/fileParser';
import { generateNotes } from '../../services/geminiService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import ReactMarkdown from 'react-markdown';

export default function NotesGenerator() {
  const [transcript, setTranscript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [notes, setNotes] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    setError(null);
    try {
      const text = await extractTextFromFile(file);
      setTranscript(text);
    } catch (err: any) {
      setError(err.message || "Failed to parse file.");
    } finally {
      setIsParsing(false);
    }
  };

  const handleGenerate = async () => {
    if (!transcript.trim()) return;

    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateNotes(transcript);
      setNotes(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (notes) {
      navigator.clipboard.writeText(notes);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const exportPDF = async () => {
    if (!notesRef.current || !notes) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(notesRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`StudyForge-Notes-${new Date().getTime()}.pdf`);
    } catch (err) {
      console.error('PDF Export Failed:', err);
      setError('Failed to export PDF. Please try copying the text instead.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-stretch">
      {/* INPUT SECTION */}
      <section className="saas-card p-8 space-y-6 flex flex-col h-full border-slate-100">
        <div className="flex justify-between items-center">
          <label className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Lecture Context</label>
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
            <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full uppercase">
              {transcript.length > 0 ? `${transcript.split(/\s+/).length} words` : '0 words'}
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
          className="flex-1 w-full p-6 border border-slate-100 rounded-2xl bg-slate-50/50 text-[15px] resize-none focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-200 transition-all font-sans leading-relaxed text-slate-700 placeholder:text-slate-300"
          placeholder="Paste lecture transcript or upload a file (PDF, DOCX, PPTX)..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          disabled={isGenerating || isParsing || !transcript.trim()}
          className="w-full bg-[#0061FF] hover:bg-[#0052D9] disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold py-4.5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-blue-500/20"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              AI Analyzing Document...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Structured Notes
            </>
          )}
        </button>
      </section>

      {/* OUTPUT SECTION */}
      <section className="saas-card p-8 flex flex-col h-full min-h-[500px] border-slate-100">
        <div className="mb-6 pb-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 flex items-center gap-3 text-lg tracking-tight">
            <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            Generated Summary
          </h3>
          {notes && (
            <div className="flex gap-4">
              <button
                onClick={copyToClipboard}
                className="text-[#0061FF] text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <div className="w-px h-4 bg-slate-100" />
              <button 
                onClick={exportPDF}
                disabled={isExporting}
                className="text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-slate-600 transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {isExporting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />}
                {isExporting ? 'Generating PDF...' : 'Export PDF'}
              </button>
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence mode="wait">
            {!notes && !isGenerating ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-slate-300 py-12"
              >
                <Box className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-sm font-medium">Waiting for input to generate summary...</p>
              </motion.div>
            ) : isGenerating ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center space-y-4 py-12"
              >
                <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
                <p className="text-sm font-bold text-blue-600 animate-pulse uppercase tracking-widest">AI Synthesis Engine Active</p>
              </motion.div>
            ) : (
              <motion.div 
                ref={notesRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="markdown-body prose prose-slate prose-sm max-w-none text-slate-700 leading-relaxed p-4 bg-white"
              >
                <ReactMarkdown
                  components={{
                    p: ({children}) => {
                      if (typeof children === 'string' && children.startsWith('!!! PRO-TIP')) {
                        return (
                          <div className="my-6 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl shadow-sm italic text-blue-900 font-medium">
                            {children}
                          </div>
                        );
                      }
                      return <p className="mb-4">{children}</p>;
                    },
                    h1: ({children}) => <h1 className="text-2xl font-black text-slate-900 mb-6 tracking-tight border-b border-slate-100 pb-2">{children}</h1>,
                    h2: ({children}) => <h2 className="text-lg font-bold text-slate-800 mt-8 mb-4 tracking-tight">{children}</h2>,
                    ul: ({children}) => <ul className="list-disc pl-5 mb-6 space-y-2">{children}</ul>,
                    strong: ({children}) => <strong className="font-bold text-slate-900">{children}</strong>
                  }}
                >
                  {notes || ''}
                </ReactMarkdown>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
