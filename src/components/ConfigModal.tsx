import React from 'react';
import { X, Shield, Cpu, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfigModal({ isOpen, onClose }: ConfigModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#0061FF]" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">API Configuration</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-start gap-4">
                <Cpu className="w-5 h-5 text-[#0061FF] mt-0.5 shrink-0" />
                <p className="text-sm text-blue-900 leading-relaxed font-medium">
                  Connect your preferred AI model to automate student tools. Currently using local simulation mode for demonstration.
                </p>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                    <Key className="w-3.5 h-3.5" />
                    Gemini API Key
                  </label>
                  <input 
                    type="password"
                    placeholder="Enter your API key..."
                    readOnly
                    value="************************"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none text-slate-400 font-mono text-sm"
                  />
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter px-1">Environment key detected via Secrets panel.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Local Endpoint (Optional)</label>
                  <input 
                    type="text"
                    placeholder="http://localhost:11434"
                    disabled
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl disabled:opacity-50 text-sm"
                  />
                  <p className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter px-1">Ollama support coming in next release.</p>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  onClick={onClose}
                  className="flex-1 py-4 bg-[#0061FF] text-white rounded-2xl font-bold hover:bg-[#0052D9] transition-all shadow-xl shadow-blue-500/10 active:scale-95"
                >
                  Save Configuration
                </button>
                <button 
                  onClick={onClose}
                  className="px-8 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
