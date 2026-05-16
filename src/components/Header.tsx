import React, { useState, useEffect } from 'react';
import { BookOpen, Settings, Menu, X, LogIn, LogOut, User as UserIcon, ChevronDown, Terminal, GraduationCap, Sparkles, LayoutGrid, Sun, Moon, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';

interface HeaderProps {
  onStartUsingTools: () => void;
  onOpenSettings: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isFocusModeActive: boolean;
  onToggleFocusMode: () => void;
}

export default function Header({ 
  onStartUsingTools, 
  onOpenSettings, 
  isDarkMode, 
  onToggleDarkMode,
  isFocusModeActive,
  onToggleFocusMode
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const tools = [
    { name: 'CGPA Calculator', href: '/gpa-calculator', icon: <GraduationCap className="w-4 h-4" />, desc: 'Track academic progress' },
    { name: 'AI Flashcards', href: '/flashcards', icon: <Sparkles className="w-4 h-4" />, desc: 'Smart memory recall' },
    { name: 'Code Explainer', href: '/code-explainer', icon: <Terminal className="w-4 h-4" />, desc: 'Understand complex code' },
  ];

  const mainLinks = [
    { name: 'Features', href: '#product' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Blog', href: '#blog' },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsMobileToolsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-9 h-9 bg-[#0061FF] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            StudyForge
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {/* Tools Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsToolsDropdownOpen(true)}
            onMouseLeave={() => setIsToolsDropdownOpen(false)}
          >
            <button 
              className={`flex items-center gap-1.5 text-[15px] font-semibold transition-colors py-2 ${isToolsDropdownOpen ? 'text-[#0061FF]' : 'text-slate-500 dark:text-slate-400 hover:text-[#0061FF]'}`}
            >
              Tools
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isToolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isToolsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 w-72 mt-1 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
                >
                  <div className="p-3 grid gap-1">
                    <div className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Platform Applications
                    </div>
                    {tools.map((tool) => (
                      <a
                        key={tool.name}
                        href={tool.href}
                        className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-600 dark:group-hover:bg-blue-600 group-hover:text-white transition-all">
                          {tool.icon}
                        </div>
                        <div className="space-y-0.5">
                          <div className="text-sm font-bold text-slate-900 dark:text-white">{tool.name}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{tool.desc}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
                    <a 
                      href="#tools" 
                      className="flex items-center justify-center gap-2 py-2 text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:text-blue-700 transition-colors"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      View All Tools
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {mainLinks.map(link => (
            <a 
              key={link.name}
              href={link.href} 
              className="text-[15px] font-semibold text-slate-500 dark:text-slate-400 hover:text-[#0061FF] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end mr-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{user.displayName}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#0061FF]">Pro User</span>
              </div>
              <div className="relative group">
                <img 
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                  alt="Avatar" 
                  className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer group-hover:border-[#0061FF] transition-all"
                />
                <button 
                  onClick={handleLogout}
                  className="absolute top-11 right-0 w-max px-4 py-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex items-center gap-2"
                >
                  <LogOut className="w-3 h-3" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="flex items-center gap-2 px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:text-[#0061FF] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all text-sm font-bold"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden xs:inline">Sign In</span>
            </button>
          )}

          <div className="h-6 w-px bg-slate-100 dark:bg-slate-800 mx-1 hidden sm:block" />

          {/* Theme Toggle */}
          <button 
            onClick={onToggleDarkMode}
            className="p-2.5 text-slate-400 dark:text-slate-500 hover:text-[#0061FF] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all relative overflow-hidden group"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <AnimatePresence mode="wait">
              {isDarkMode ? (
                <motion.div
                  key="moon"
                  initial={{ y: 20, opacity: 0, rotate: 90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -20, opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.3, ease: "backOut" }}
                  className="group-hover:rotate-12 transition-transform duration-300"
                >
                  <Moon className="w-[18px] h-[18px] text-blue-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ y: 20, opacity: 0, rotate: 90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -20, opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.3, ease: "backOut" }}
                  className="group-hover:rotate-12 transition-transform duration-300"
                >
                  <Sun className="w-[18px] h-[18px] text-amber-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Focus Mode Toggle */}
          <button 
            onClick={onToggleFocusMode}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              isFocusModeActive 
                ? 'bg-[#0061FF] text-white shadow-lg shadow-blue-500/20' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Maximize2 className={`w-4 h-4 ${isFocusModeActive ? 'animate-pulse' : ''}`} />
            <span className="hidden lg:inline">{isFocusModeActive ? 'Active' : 'Focus Mode'}</span>
          </button>

          <button 
            onClick={onOpenSettings}
            className="p-2.5 text-slate-400 dark:text-slate-500 hover:text-[#0061FF] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all"
            title="API Configuration"
          >
            <Settings className="w-[18px] h-[18px]" />
          </button>

          <button 
            className="md:hidden p-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {/* Mobile Actions (Theme & Focus) */}
              <div className="grid grid-cols-2 gap-3 pb-2">
                <button 
                  onClick={onToggleDarkMode}
                  className="flex items-center justify-center gap-2 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button 
                  onClick={onToggleFocusMode}
                  className={`flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold ${
                    isFocusModeActive 
                      ? 'bg-[#0061FF] text-white' 
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Maximize2 className="w-4 h-4" />
                  Focus
                </button>
              </div>

              {/* Mobile Tools Section */}
              <div className="space-y-4">
                <button 
                  onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
                  className="w-full flex items-center justify-between text-lg font-bold text-slate-900 dark:text-white group"
                >
                  <span className="group-hover:text-[#0061FF]">Tools</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isMobileToolsOpen ? 'rotate-180 text-[#0061FF]' : 'text-slate-400'}`} />
                </button>
                
                <AnimatePresence>
                  {isMobileToolsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3 pl-4 overflow-hidden"
                    >
                      {tools.map((tool) => (
                        <a
                          key={tool.name}
                          href={tool.href}
                          onClick={handleLinkClick}
                          className="flex items-center gap-3 py-2 text-slate-600 dark:text-slate-400 hover:text-[#0061FF] transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                            {tool.icon}
                          </div>
                          <span className="text-sm font-bold">{tool.name}</span>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="h-px bg-slate-50 dark:bg-slate-800 w-full" />

              {mainLinks.map(link => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block text-lg font-bold text-slate-900 dark:text-white hover:text-[#0061FF]"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                {user ? (
                  <button 
                    onClick={() => {
                      handleLogout();
                      handleLinkClick();
                    }}
                    className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-bold flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      handleLogin();
                      handleLinkClick();
                    }}
                    className="w-full py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl font-bold flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-5 h-5" />
                    Sign In with Google
                  </button>
                )}
                <button 
                  onClick={() => {
                    handleLinkClick();
                    onStartUsingTools();
                  }}
                  className="w-full py-4 bg-[#0061FF] text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
