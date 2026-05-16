import React, { useState, useEffect } from 'react';
import { Terminal, Sparkles, Loader2, Play, Code2, AlertCircle, Copy, Check, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-tomorrow.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { explainCode } from '../../services/geminiService';
import { getFriendlyErrorMessage } from '../../lib/errorUtils';
import { detectLanguage } from '../../lib/languageUtils';

export default function CodeExplainer() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [isLanguageManual, setIsLanguageManual] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Auto-detect language
  useEffect(() => {
    if (!isLanguageManual && code.length > 20) {
      const detected = detectLanguage(code);
      if (detected) {
        setLanguage(detected);
      }
    }
  }, [code, isLanguageManual]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (!newCode.trim()) {
      setIsLanguageManual(false);
      setLanguage('');
    }
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setIsLanguageManual(true);
  };

  const handleExplain = async () => {
    if (!code.trim() || code.length < 10) {
      setError("Please provide a representative code snippet (at least 10 characters).");
      return;
    }

    setIsExplaining(true);
    setError(null);
    setExplanation(null);
    try {
      const result = await explainCode(code, language);
      setExplanation(result);
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err));
    } finally {
      setIsExplaining(false);
    }
  };

  const copyToClipboard = () => {
    if (explanation) {
      navigator.clipboard.writeText(explanation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clearAll = () => {
    setCode('');
    setExplanation(null);
    setError(null);
    setLanguage('');
    setIsLanguageManual(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-8 h-full items-stretch">
      {/* INPUT SECTION */}
      <section className="saas-card p-8 space-y-6 flex flex-col h-full border-slate-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
              <Code2 className="w-4 h-4 text-amber-600" />
            </div>
            <label className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none">Code Snippet</label>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="text"
              placeholder="Language (Optional)"
              className="text-[10px] font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full uppercase outline-none border border-amber-100/50 focus:border-amber-200"
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
            />
            {code.length > 0 && (
              <button onClick={clearAll} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="flex-1 relative group overflow-hidden rounded-2xl border border-slate-100 bg-slate-900 custom-scrollbar overflow-y-auto">
          <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 rounded-lg backdrop-blur-sm">
              <Terminal className="w-3 h-3 text-slate-400" />
              <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">Editor</span>
            </div>
          </div>
          <Editor
            value={code}
            onValueChange={code => handleCodeChange(code)}
            highlight={code => {
              const lang = languages[language.toLowerCase()] || languages.javascript;
              return highlight(code, lang, language.toLowerCase() || 'javascript');
            }}
            padding={32}
            className="w-full min-h-full font-mono text-[14px] leading-relaxed text-slate-100 focus:outline-none"
            textareaClassName="focus:outline-none"
            placeholder="// Paste your code here...
function example() {
  console.log('Explain this snippet');
}"
          />
        </div>
        
        <button
          onClick={handleExplain}
          disabled={isExplaining || !code.trim()}
          className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold py-4.5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-amber-500/20"
        >
          {isExplaining ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Decoding Logic...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Explain Code
            </>
          )}
        </button>
      </section>

      {/* EXPLANATION SECTION */}
      <section className="saas-card p-8 flex flex-col h-full bg-slate-50/30 border-slate-100 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-black text-slate-900 flex items-center gap-2 uppercase tracking-widest text-xs">
            <Play className="w-3 h-3 text-amber-600 fill-amber-600" />
            AI Breakdown
          </h3>
          {explanation && (
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-lg text-[10px] font-bold text-slate-500 hover:text-amber-600 hover:border-amber-100 transition-all"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'COPIED' : 'COPY ALL'}
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence mode="wait">
            {!explanation && !isExplaining ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-16 h-16 bg-amber-50 text-amber-400 rounded-2xl flex items-center justify-center mx-auto">
                  <Terminal className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-slate-900 font-black text-sm uppercase tracking-widest">Ready to Decode</p>
                  <p className="text-slate-400 text-xs mt-1 max-w-[200px] mx-auto">
                    Paste your code snippet on the left to get a detailed AI explanation.
                  </p>
                </div>
              </motion.div>
            ) : isExplaining ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center space-y-6"
              >
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-amber-100 border-t-amber-500 rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-slate-900 font-bold text-sm tracking-tight">Analyzing Syntax...</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 animate-pulse">Mastering the Logic</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="markdown-body"
              >
                <div className="prose prose-slate prose-sm max-w-none">
                  <Markdown
                    components={{
                      code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            className="rounded-xl border border-slate-800 my-4"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {explanation}
                  </Markdown>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
