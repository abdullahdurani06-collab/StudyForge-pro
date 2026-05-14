import React from 'react';
import { BookOpen, Settings } from 'lucide-react';

interface HeaderProps {
  onStartUsingTools: () => void;
  onOpenSettings: () => void;
}

export default function Header({ onStartUsingTools, onOpenSettings }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-9 h-9 bg-gradient-to-tr from-[#0061FF] to-[#00A3FF] rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
            StudyForge
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-10">
          <a href="#tools" className="text-[15px] font-semibold text-slate-500 hover:text-[#0061FF] transition-colors">Tools</a>
          <a href="#product" className="text-[15px] font-semibold text-slate-500 hover:text-[#0061FF] transition-colors">Product</a>
          <a href="#blog" className="text-[15px] font-semibold text-slate-500 hover:text-[#0061FF] transition-colors">Blog</a>
        </nav>

        <div className="flex items-center gap-5">
          <button 
            onClick={onOpenSettings}
            className="p-2.5 text-slate-400 hover:text-[#0061FF] hover:bg-blue-50 rounded-xl transition-all"
            title="API Configuration"
          >
            <Settings className="w-[18px] h-[18px]" />
          </button>
          <button 
            onClick={onStartUsingTools}
            className="px-6 py-2.5 bg-[#0061FF] hover:bg-[#0052D9] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Using Tools
          </button>
        </div>
      </div>
    </header>
  );
}
