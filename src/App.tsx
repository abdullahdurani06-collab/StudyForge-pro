import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ToolsSection, { ToolType } from './components/ToolsSection';
import CGPACalculator from './components/tools/CGPACalculator';
import NotesGenerator from './components/tools/NotesGenerator';
import MCQGenerator from './components/tools/MCQGenerator';
import ConfigModal from './components/ConfigModal';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, Wallet, Calendar, ArrowRight, Plus, Trash2, IndianRupee, BookOpen } from 'lucide-react';

interface BlogPost {
  title: string;
  desc: string;
  content: string;
  date: string;
  tag: string;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  { 
    title: "How to Master 4th Semester CS", 
    desc: "A deep dive into balancing Operating Systems and Database Management systems with practical project tips.", 
    content: "# How to Master 4th Semester CS\n\n4th semester is widely considered the pivot point of a Computer Science degree. This is where theory gets heavy and project workloads peak. You're moving from basic syntax to architectural thinking.\n\n## Solving the OS/DBMS Paradox\nStudents often struggle to find time for both **Operating Systems (OS)** and **Database Management Systems (DBMS)**. Experts suggest that rather than studying them as isolated silos, you should look for the engineering intersections.\n\n*   **For OS:** Focus on process scheduling, memory management, and file systems. Use visual simulators like CPU Scheduling visualizers to see the algorithms in action.\n*   **For DBMS:** Don't just learn SQL queries. Deep dive into the internal storage structures like B+ Trees, hashing, and the ACID properties that ensure transaction reliability.\n\n## The Project workload\nThe key to surviving the project load is early prototyping. Don't wait for your professor to give you the final spec. Start building modular components as soon as you learn a new concept.\n\n!!! PRO-TIP: Build a mini shell in C that interacts with a simple file-based database. This covers process management from OS and storage retrieval from DBMS in one project.",
    date: "May 13, 2026", 
    tag: "Strategy",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"
  },
  { 
    title: "3 AI Study Hacks for 2026", 
    desc: "How to use the StudyForge AI Notes Generator to condense 2-hour lectures into 5-minute study guides.", 
    content: "# 3 AI Study Hacks for 2026\n\nIn the era of information overload, efficiency is the new intelligence. Learning how to leverage Large Language Models (LLMs) like Gemini and GPT-4 for academic rigor is a superpower.\n\n## 1. The Transcription Bridge\nWatching a 2-hour lecture recording at 2x speed is still 1 hour of your life. Instead, upload your recorded lecture MP3 directly to StudyForge. Our AI doesn't just transcribe; it identifies key theorems, creates a structured summary, and even suggests potential exam questions based on the transcript.\n\n## 2. Recursive Flashcards\nDon't just read your notes. Use the AI to generate MCQs from your own summaries. If you can't answer the AI-generated questions, you don't know the material yet. This 'active recall' is scientifically proven to improve long-term retention.\n\n## 3. Contextual Querying\nAsk Gemini: 'Explain this 40-page research paper like I'm a sophomore, but keep the technical nuances about neural weights.' This allows you to scale your reading speed without losing the depth required for graduate-level discussion.\n\n!!! PRO-TIP: Always cross-reference AI summaries with your primary syllabus. Use AI to understand the 'what' and 'why', but trust your textbook for the 'how' during final revisions.",
    date: "May 12, 2026"  , 
    tag: "Tech",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  },
  { 
    title: "The Ultimate Guide to Student Budgeting", 
    desc: "Using the 50/30/20 rule to manage scholarships and food expenses.", 
    content: "# The Ultimate Guide to Student Budgeting\n\nFinancial stress is a silent killer of academic performance. When you're worried about next month's rent, your focus on data structure complexities vanishes. Here is how to build a bulletproof student budget.\n\n## The 50/30/20 Student Rule\n*   **50% - Essentials:** This covers the non-negotiables. Rent, utilities, internet, and basic groceries. If this exceeds 50%, look for student-shared housing or campus meal plans.\n*   **30% - Wants:** Being a student shouldn't be a prison sentence. Dedicate 30% to software subscriptions, coffee runs, and weekend outings. This prevents burnout.\n*   **20% - Future:** Even $10 a month adds up. Use this for debt repayment, emergency savings, or buying that high-spec laptop you need for your final year project.\n\n## Leverage Your Scholarship\nTreat scholarship disbursements as a paycheck. Don't spend it all in week one. Divide the total by the number of months in the semester and automate your monthly allowance using a tool like Budget Wallet.\n\n!!! PRO-TIP: Use your student ID for everything. From Spotify to AWS, student discounts can save you up to 80% on software tools, effectively boosting your 'Wants' category budget.",
    date: "May 11, 2026", 
    tag: "Finance",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800"
  },
  { 
    title: "Top 5 Programming Languages to Learn in 2026", 
    desc: "Why Python, Rust, and TypeScript remain essential for student portfolios.", 
    content: "# Top 5 Languages to Learn in 2026\n\nChoosing a programming language is like choosing a toolbelt. Some are broad and versatile, others are surgical and precise. Here is the stack for 2026.\n\n1.  **TypeScript:** Essentially mandatory for modern web development. It provides the type safety required for large-scale enterprise applications.\n2.  **Rust:** The performance king. With memory safety built into the compiler, Rust is replacing C++ for infrastructure, networking, and game engines.\n3.  **Python:** No longer just for scripts. Python's dominance in AI, Machine Learning, and Data Science makes it a non-negotiable skill for any CS student.\n4.  **Go (Golang):** Developed by Google, Go is the preferred language for cloud-native applications and microservices due to its incredible concurrency model.\n5.  **Kotlin/Swift:** Mobile development is shifting towards native-first again. Kotlin Multiplatform is bridging the gap for Android and iOS seamlessly.\n\n## Why Rust is Rising\nMemory safety without a garbage collector makes Rust the language of choice for 2026 infrastructure projects. Large tech firms are rewriting their core libraries in Rust to avoid CVE vulnerabilities.\n\n!!! PRO-TIP: Master one language deeply (like TypeScript) before dabbling in others. High-level architectural knowledge is transferable; syntax is easy to re-learn.",
    date: "May 10, 2026", 
    tag: "Tech",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800"
  },
  { 
    title: "Beating Procrastination in College", 
    desc: "Scientific methods like the Pomodoro technique to stay focused during long study sessions.", 
    content: "# Beating Procrastination in College\n\nProcrastination isn't a character flaw; it's an emotional regulation issue. We avoid tasks because they make us feel anxious or overwhelmed. Here is how to hack your psychology.\n\n## The Pomodoro Method 2.0\nThe traditional 25/5 split is often too short for deep coding sessions. Try the 50/10 split: 50 minutes of intense focus followed by 10 minutes of complete movement. No screens during the break—stretch, walk, or hydrate.\n\n## Eat the Frog\nIdentify the hardest, most daunting task of the day (the 'frog') and tackle it at 8:00 AM. Your willpower and dopamine levels are highest in the morning. Once the 'frog' is eaten, the rest of the day feels like a victory lap.\n\n## The 2-Minute Rule\nIf a task takes less than 2 minutes (like replying to a professor or citing a source), do it immediately. These small tasks accumulate and create 'mental friction' if left undone.\n\n!!! PRO-TIP: Use a distracted-blocking app during your deep work hours. 50 minutes of true focus is more productive than 5 hours of 'interrupted' studying.",
    date: "May 9, 2026", 
    tag: "Productivity",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800"
  },
  { 
    title: "How to Build a Developer Portfolio", 
    desc: "Transforming classroom projects like Budget Wallet into professional GitHub showcases.", 
    content: "# How to Build a Developer Portfolio\n\nEvery student has classroom assignments. Not every student has a portfolio. To stand out in the 2026 job market, you need to show, not just tell. Here is the blueprint.\n\n## From Script to System\nDon't just upload 'assignment1.py'. A recruiter won't run your local script. Transform it into a documented repository with a professional README that explains:\n1.  **Motivation:** Why did you build this?\n2.  **Tech Stack:** Which libraries did you use and why?\n3.  **Challenges Solved:** What was the hardest bug, and how did you squash it?\n\n## Visibility Matters\nDeployment is key. Use platforms like Vercel, Netlify, or Fly.io to provide a live URL. Seeing a project in action is 10x more impactful than a static code folder.\n\n## The 'Bento' Layout\nStructure your portfolio like a Bento box—small, concentrated highlights. Focus on 3 high-quality projects rather than 20 mediocre ones.\n\n!!! PRO-TIP: Add a 'Key Learnings' section to every repository. It shows you're a reflective engineer who grows from every project.",
    date: "May 8, 2026", 
    tag: "Career",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800"
  },
  { 
    title: "Mental Wellness for Students", 
    desc: "Managing exam stress and the importance of a healthy sleep cycle in a fast-paced CS degree.", 
    content: "# Mental Wellness for Students\n\nYour brain is your primary revenue-generating asset. Treating it like a disposable tool is the fastest way to career failure. Here is how to maintain your mental health during peak semesters.\n\n## The Sleep Cycle Myth\nShortchanging sleep for 'all-nighters' is a myth of productivity. Research shows that a brain with 4 hours of sleep performs similarly to one that is legally intoxicated. Aim for consistent 7-hour cycles to allow your 'Glymphatic system' to clear out toxins.\n\n## The 20-20-20 Rule for Coders\nEvery 20 minutes, look at something 20 feet away for 20 seconds. This reduces ocular strain and prevents the 'headache-induced burnout' common in long debugging sessions.\n\n## Social Accountability\nFind a study group that isn't just about work. Having people to vent to about a failing unit test or a complex theorem reduces the feeling of isolation that often leads to depression in remote-heavy degrees.\n\n!!! PRO-TIP: Exercise is a cognitive enhancer. A 20-minute jog can increase BDNF (Brain-Derived Neurotrophic Factor), which literally helps your brain grow new neurons.",
    date: "May 7, 2026", 
    tag: "Wellness",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800"
  },
  { 
    title: "Networking for CS Students", 
    desc: "How to find internships and build connections on LinkedIn and GitHub before graduation.", 
    content: "# Networking for CS Students\n\nThere's an old saying: 'Who you know gets you the interview; what you know gets you the job.' In 2026, networking is decentralized and collaborative.\n\n## GitHub as Your Resume\nContributing to Open Source is the ultimate networking hack. When you fix a bug in a popular library, you're not just coding—you're interacting with top-tier engineers at major companies. They see your work before they see your name.\n\n## Warm Outreaches\nDon't just spam 'Add Connection' on LinkedIn. Send a concise message referencing a specific talk, article, or project the recipient published. People love to talk about their work; ask them for context, not for a job.\n\n## Attend Virtual Hackathons\nHackathons are high-pressure networking environments. The bonds formed over a 48-hour build are stronger than a hundred coffee chats.\n\n!!! PRO-TIP: Build in public. Tweet or post your progress daily. It creates a trail of competence that recruiters will eventually stumble upon.",
    date: "May 6, 2026", 
    tag: "Career",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800"
  },
  { 
    title: "The Impact of 5G on Student Tech", 
    desc: "How faster connectivity is changing remote learning and collaborative coding in 2026.", 
    content: "# The Impact of 5G on Student Tech\n\n5G is no longer a future promise—it is the foundation of 2026 education. It’s not just about downloading movies faster; it’s about enabling high-fidelity, zero-latency interactions.\n\n## Collaborative Coding 2.0\nPair programming across continents is now as seamless as sitting in the same room. Cloud-based IDEs (like GitHub Codespaces) are becoming the default, allowing students with $300 Chromebooks to access the computing power of a $5000 workstation via the cloud.\n\n## Virtual Classrooms\nWe are seeing the rise of 3D, XR-based classrooms where you can visualize complex 4D data structures in real space. 5G provides the bandwidth necessary to render these environments locally without lag.\n\n## The Death of Local Storage\nWith gigabit speeds, the line between 'my hard drive' and 'the cloud' is vanishing. Students are moving towards a 'persistent desktop' model that follows them from laptop to phone to tablet.\n\n!!! PRO-TIP: Invest in a reliable data plan over high internal storage. Cloud-first workflows are more resilient to hardware failure during exam season.",
    date: "May 5, 2026", 
    tag: "Tech",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  },
  { 
    title: "Sustainable Fashion & Tech on a Budget", 
    desc: "Tips for students to find affordable, eco-friendly gadgets and gear.", 
    content: "# Sustainable Tech on a Budget\n\nAs technology students, we are the first generation to deal with the consequences of mass e-waste. Here is how to stay modern while staying sustainable.\n\n## The Refurbished Revolution\nA 2-year-old flagship laptop (like a Macbook M1/M2) is often more powerful for coding than a brand-new entry-level PC. Buying refurbished saves you 40% and keeps toxic materials out of landfills.\n\n## Software Sustainability\nBe mindful of your code's energy footprint. Efficient algorithms aren't just fast; they consume less server power. Writing 'Green Code' is becoming a valued niche in enterprise engineering.\n\n## Minimalism in Gear\nYou don't need a 3-monitor setup for a CS degree. A single high-quality IPS monitor and a mechanical keyboard that lasts 10 years are better investments than cheap peripherals that break every semester.\n\n!!! PRO-TIP: Join a tech recycling group on campus. You can often find high-quality monitors or components that corporate offices are phasing out for free.",
    date: "May 4, 2026", 
    tag: "Finance",
    image: "https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&q=80&w=800"
  }
];

const BlogImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [error, setError] = useState(false);
  return (
    <img 
      src={error ? 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800' : src} 
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      onError={() => setError(true)}
    />
  );
};

export default function App() {
  const [activeTool, setActiveTool] = useState<ToolType | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [footerModal, setFooterModal] = useState<'privacy' | 'terms' | 'contact' | null>(null);
  
  const ALL_TAGS = Array.from(new Set(BLOG_POSTS.map(post => post.tag)));
  const filteredPosts = selectedTag 
    ? BLOG_POSTS.filter(post => post.tag === selectedTag)
    : BLOG_POSTS;
  
  // Wallet State
  const [expenses, setExpenses] = useState<{ id: string; name: string; amount: number }[]>([
    { id: '1', name: 'Domain Name', amount: 800 },
    { id: '2', name: 'AWS Credits', amount: 1500 }
  ]);
  const [newExpName, setNewExpName] = useState('');
  const [newExpAmount, setNewExpAmount] = useState('');
  const [budgetLimit, setBudgetLimit] = useState(5000);
  const [isEditingLimit, setIsEditingLimit] = useState(false);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const closeTool = () => setActiveTool(null);

  const getToolTitle = () => {
    switch(activeTool) {
      case 'notes': return 'AI Notes Generator';
      case 'mcq': return 'AI MCQ Generator';
      case 'calculator': return 'Academic Tracker';
      default: return '';
    }
  };

  const handleStartUsingTools = () => {
    const section = document.getElementById('tools');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onStartUsingTools={handleStartUsingTools} 
        onOpenSettings={() => setIsConfigOpen(true)}
      />

      <main>
        <Hero onStartUsingTools={handleStartUsingTools} />
        
        <div id="tools">
          <ToolsSection onSelectTool={setActiveTool} />
        </div>

        {/* Product Section - Budget Wallet */}
        <section id="product" className="py-24 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-600 text-xs font-bold uppercase tracking-wider">
                  Featured Preview
                </div>
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                  Beyond the Classroom: <br />
                  <span className="text-[#0061FF]">Budget Wallet</span>
                </h2>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  Interactive preview of our personal finance app for students. Track scholarships, food budgets, and project expenses in real-time.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <button className="btn-primary">
                      Open Full App
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <div className="flex -space-x-3">
                      {[
                        { init: 'AK', color: 'bg-blue-100 text-blue-600 border-blue-50' },
                        { init: 'JD', color: 'bg-emerald-100 text-emerald-600 border-emerald-50' },
                        { init: 'SM', color: 'bg-indigo-100 text-indigo-600 border-indigo-50' },
                        { init: 'RV', color: 'bg-rose-100 text-rose-600 border-rose-50' }
                      ].map((u, i) => (
                        <div key={i} className={`w-10 h-10 rounded-full border-2 ${u.color} flex items-center justify-center text-[10px] font-black uppercase tracking-tighter shadow-sm`}>
                          {u.init}
                        </div>
                      ))}
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-[#0061FF] flex items-center justify-center text-[10px] font-bold text-white shadow-lg z-10">
                        +12k
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full max-w-lg">
                <div className="saas-card bg-slate-900 border-slate-800 p-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
                  
                  <div className="relative z-10 space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                          <Wallet className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold tracking-tight text-sm">Budget Wallet</h4>
                          <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest leading-none">v2.0 Active</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Monthly Limit</p>
                        {isEditingLimit ? (
                          <div className="flex items-center gap-1 justify-end">
                            <IndianRupee className="w-4 h-4 text-[#0061FF]" />
                            <input 
                              type="number"
                              className="w-20 bg-white/10 text-white text-xl font-black outline-none border-b border-[#0061FF] text-right"
                              value={budgetLimit}
                              autoFocus
                              onChange={(e) => setBudgetLimit(Number(e.target.value))}
                              onBlur={() => setIsEditingLimit(false)}
                              onKeyDown={(e) => e.key === 'Enter' && setIsEditingLimit(false)}
                            />
                          </div>
                        ) : (
                          <p 
                            className="text-xl font-black text-white flex items-center gap-1 cursor-pointer hover:text-blue-400 transition-colors"
                            onClick={() => setIsEditingLimit(true)}
                          >
                            <IndianRupee className="w-4 h-4" />
                            {budgetLimit.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-[-12px]">
                      <span className="text-[10px] font-bold uppercase text-slate-500">Current Balance</span>
                      <span className={`text-sm font-black ${budgetLimit - totalExpenses < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                        <IndianRupee className="w-3 h-3 inline mr-0.5" />
                        {(budgetLimit - totalExpenses).toLocaleString()}
                      </span>
                    </div>

                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Project expense..."
                          className="flex-1 bg-transparent border-b border-white/20 py-2 outline-none text-white text-sm placeholder:text-slate-600 focus:border-blue-500 transition-colors"
                          value={newExpName}
                          onChange={(e) => setNewExpName(e.target.value)}
                        />
                        <input 
                          type="number" 
                          placeholder="Amt"
                          className="w-20 bg-transparent border-b border-white/20 py-2 outline-none text-white text-sm text-center placeholder:text-slate-600 focus:border-blue-500 transition-colors"
                          value={newExpAmount}
                          onChange={(e) => setNewExpAmount(e.target.value)}
                        />
                        <button 
                          onClick={() => {
                            if (newExpName && newExpAmount) {
                              setExpenses([...expenses, { id: Date.now().toString(), name: newExpName, amount: Number(newExpAmount) }]);
                              setNewExpName('');
                              setNewExpAmount('');
                            }
                          }}
                          className="w-10 h-10 bg-[#0061FF] text-white rounded-xl flex items-center justify-center hover:bg-blue-400 transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar pr-1">
                        {expenses.map(exp => (
                          <div key={exp.id} className="flex justify-between items-center text-xs group">
                            <span className="text-slate-400 font-medium">{exp.name}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-white font-bold flex items-center">
                                <IndianRupee className="w-2.5 h-2.5 mr-0.5" />
                                {exp.amount}
                              </span>
                              <button 
                                onClick={() => setExpenses(expenses.filter(e => e.id !== exp.id))}
                                className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-white/10">
                        <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500 mb-2">
                          <span>Usage</span>
                          <span>{((totalExpenses / budgetLimit) * 100).toFixed(0)}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((totalExpenses / budgetLimit) * 100, 100)}%` }}
                            className={`h-full ${totalExpenses > budgetLimit ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-[#0061FF] shadow-[0_0_10px_rgba(0,97,255,0.5)]'}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
              <div>
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Study Insights</h2>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setSelectedTag(null)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                      !selectedTag 
                        ? 'bg-slate-900 text-white shadow-lg' 
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    All Posts
                  </button>
                  {ALL_TAGS.map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                        selectedTag === tag 
                          ? 'bg-[#0061FF] text-white shadow-lg' 
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <button className="text-[#0061FF] font-bold flex items-center gap-2 hover:gap-3 transition-all mb-2">
                View all articles
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post, i) => (
                  <motion.article 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={post.title} 
                    className="group cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="aspect-[16/10] bg-slate-100 rounded-3xl mb-6 overflow-hidden relative shadow-sm">
                      <BlogImage 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className={`absolute top-4 left-4 px-3 py-1 backdrop-blur rounded-full text-[10px] font-black uppercase tracking-wider transition-colors ${
                        selectedTag === post.tag ? 'bg-[#0061FF] text-white' : 'bg-white/90 text-slate-800'
                      }`}>
                        {post.tag}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#0061FF] transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2">
                      {post.desc}
                    </p>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-slate-100 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#0061FF] rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-[#0061FF] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Maximize2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tight">StudyForge</span>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                Empowering the next generation of academic excellence through AI-powered focus tools and professional financial tracking.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-white/50">Company</h4>
              <ul className="space-y-4">
                <li><button onClick={() => setFooterModal('privacy')} className="text-slate-400 hover:text-[#0061FF] font-bold transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => setFooterModal('terms')} className="text-slate-400 hover:text-[#0061FF] font-bold transition-colors">Terms of Service</button></li>
                <li><button onClick={() => setFooterModal('contact')} className="text-slate-400 hover:text-[#0061FF] font-bold transition-colors">Contact Support</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-white/50">Resources</h4>
              <ul className="space-y-4">
                <li><a href="#blog" className="text-slate-400 hover:text-[#0061FF] font-bold transition-colors">Study Insights</a></li>
                <li><a href="#tools" className="text-slate-400 hover:text-[#0061FF] font-bold transition-colors">Academic Tools</a></li>
                <li><a href="#product" className="text-slate-400 hover:text-[#0061FF] font-bold transition-colors">Budget Wallet</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm font-medium">
              © 2026 StudyForge Academic Tools. Built with passion for CS students.
            </p>
            <div className="flex items-center gap-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">System Status: All systems operational</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer Modals */}
      <AnimatePresence>
        {footerModal && (
          <motion.div 
            className="fixed inset-0 z-[300] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
              onClick={() => setFooterModal(null)}
            />
            <motion.div 
              className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                  {footerModal === 'privacy' && 'Privacy Policy'}
                  {footerModal === 'terms' && 'Terms of Service'}
                  {footerModal === 'contact' && 'Contact Support'}
                </h3>
                <button 
                  onClick={() => setFooterModal(null)}
                  className="p-2.5 bg-slate-100 text-slate-500 hover:bg-slate-200 rounded-2xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {footerModal === 'privacy' && (
                  <div className="space-y-6 text-slate-600 leading-relaxed">
                    <p className="font-bold text-slate-900">Your privacy is our priority at StudyForge.</p>
                    <section className="space-y-2">
                      <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">1. Data Encryption</h4>
                      <p>All academic notes and financial records are encrypted end-to-end. We do not store your raw file uploads after processing.</p>
                    </section>
                    <section className="space-y-2">
                      <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">2. AI Processing</h4>
                      <p>AI tools (Notes, MCQs) use anonymized tokens for processing. Your identifying information is never shared with third-party LLM providers.</p>
                    </section>
                    <section className="space-y-2">
                      <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">3. Local Storage</h4>
                      <p>Financial data in the Budget Wallet is stored locally on your device unless you explicitly opt-in to cloud sync.</p>
                    </section>
                  </div>
                )}
                {footerModal === 'terms' && (
                  <div className="space-y-6 text-slate-600 leading-relaxed">
                    <p className="font-bold text-slate-900">By using StudyForge, you agree to these ethical guidelines.</p>
                    <section className="space-y-2">
                      <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">1. Content Ownership</h4>
                      <p>You retain 100% ownership of the notes and study materials generated using our AI engine.</p>
                    </section>
                    <section className="space-y-2">
                      <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">2. Responsible AI Use</h4>
                      <p>StudyForge is a collaborative study tool. We discourage using generated content to bypass legitimate academic integrity standards.</p>
                    </section>
                    <section className="space-y-2">
                      <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">3. Subscription</h4>
                      <p>Access to Pro features is subject to the terms of your selected academic plan.</p>
                    </section>
                  </div>
                )}
                {footerModal === 'contact' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-6 bg-blue-50 rounded-3xl">
                        <h4 className="font-black text-blue-900 uppercase text-[10px] tracking-widest mb-2">Support Email</h4>
                        <p className="text-blue-700 font-bold">support@studyforge.ac</p>
                      </div>
                      <div className="p-6 bg-emerald-50 rounded-3xl">
                        <h4 className="font-black text-emerald-900 uppercase text-[10px] tracking-widest mb-2">Discord Community</h4>
                        <p className="text-emerald-700 font-bold">join.studyforge.com</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Send a Message</h4>
                      <input type="text" placeholder="Your Name" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#0061FF] transition-colors" />
                      <textarea placeholder="How can we help?" rows={4} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#0061FF] transition-colors resize-none"></textarea>
                      <button className="w-full btn-primary py-4">Send Message</button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tool Focus Overlay */}
      <AnimatePresence>
        {activeTool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white overflow-y-auto pt-24 pb-20 custom-scrollbar"
          >
            {/* Focus Navbar */}
            <div className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center px-8 justify-between z-[110]">
              <div className="flex items-center gap-4">
                <button 
                  onClick={closeTool}
                  className="p-2.5 bg-slate-100 text-slate-500 hover:bg-slate-200 rounded-xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="h-6 w-px bg-slate-200 mx-2" />
                <h2 className="text-xl font-bold tracking-tight text-slate-900">{getToolTitle()}</h2>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-1.5 bg-slate-100 rounded-full">
                  Focus Mode
                </span>
              </div>
            </div>

            {/* Tool Content Container */}
            <div className="max-w-7xl mx-auto px-6 py-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="min-h-[70vh] bg-white rounded-3xl"
              >
                {activeTool === 'calculator' && <CGPACalculator />}
                {activeTool === 'notes' && <NotesGenerator />}
                {activeTool === 'mcq' && <MCQGenerator />}
              </motion.div>
            </div>

            {/* Micro Status Bar for Focus Mode */}
            <div className="fixed bottom-0 left-0 right-0 h-10 bg-slate-900 text-slate-400 text-[10px] uppercase tracking-widest font-bold flex items-center px-8 shrink-0 justify-between select-none border-t border-white/5">
               <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span>AI Engine: Online</span>
              </div>
              <span>End-to-End Encrypted Session</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog Article Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setSelectedPost(null)}
            />
            <motion.div 
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-start bg-white">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#0061FF] mb-2">{selectedPost.tag}</div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">{selectedPost.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="p-2 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors shrink-0"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="p-8 overflow-y-auto flex-1 custom-scrollbar bg-white">
                <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-black prose-p:text-slate-600 prose-strong:text-slate-900 prose-img:rounded-3xl">
                  <div className="whitespace-pre-wrap leading-relaxed space-y-6">
                    <BlogImage 
                      src={selectedPost.image} 
                      alt={selectedPost.title} 
                      className="w-full aspect-video object-cover rounded-3xl mb-8 shadow-sm"
                    />
                    {selectedPost.content.split('\n\n').map((para, i) => {
                      if (para.startsWith('# ')) return <h1 key={i} className="text-4xl font-black text-slate-900 border-b pb-4 mb-4">{para.replace('# ', '')}</h1>;
                      if (para.startsWith('## ')) return <h2 key={i} className="text-2xl font-black text-slate-900 mt-8 mb-4">{para.replace('## ', '')}</h2>;
                      if (para.startsWith('* ')) {
                        return (
                          <ul key={i} className="list-disc pl-6 space-y-2 my-4">
                            {para.split('\n').map((item, idx) => (
                              <li key={idx} className="text-slate-600 text-lg leading-relaxed">
                                {item.replace('* ', '')}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      if (para.startsWith('1. ')) {
                        return (
                          <ol key={i} className="list-decimal pl-6 space-y-2 my-4">
                            {para.split('\n').map((item, idx) => (
                              <li key={idx} className="text-slate-600 text-lg leading-relaxed">
                                {item.replace(/^\d+\.\s+/, '')}
                              </li>
                            ))}
                          </ol>
                        );
                      }
                      if (para.startsWith('!!! PRO-TIP:')) {
                        return (
                          <div key={i} className="bg-blue-50 border-l-4 border-[#0061FF] p-6 rounded-r-3xl my-8">
                            <div className="flex items-center gap-3 mb-2 text-[#0061FF] font-black uppercase text-xs tracking-widest">
                              <BookOpen className="w-4 h-4" />
                              <span>Pro-Tip</span>
                            </div>
                            <p className="text-blue-900 font-medium leading-relaxed italic">
                              {para.replace('!!! PRO-TIP: ', '')}
                            </p>
                          </div>
                        );
                      }
                      return <p key={i} className="text-slate-600 text-lg leading-relaxed">{para}</p>;
                    })}
                  </div>
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedPost.date}</span>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="btn-primary"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfigModal 
        isOpen={isConfigOpen} 
        onClose={() => setIsConfigOpen(false)} 
      />
    </div>
  );
}
