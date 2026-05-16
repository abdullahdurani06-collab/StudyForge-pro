import React, { useState, useEffect, useLayoutEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ToolsSection, { ToolType } from './components/ToolsSection';
import CGPACalculator from './components/tools/CGPACalculator';
import NotesGenerator from './components/tools/NotesGenerator';
import MCQGenerator from './components/tools/MCQGenerator';
import FlashcardGenerator from './components/tools/FlashcardGenerator';
import CodeExplainer from './components/tools/CodeExplainer';
import ConfigModal from './components/ConfigModal';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, Wallet, Calendar, ArrowRight, Plus, Trash2, BookOpen, Share2, Link, Search, Send, ChevronDown, Star, CheckCircle2, Quote, ArrowUp, Sparkles, Zap, ShieldCheck } from 'lucide-react';

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
    title: "How to Calculate Your University Admission Aggregate: UOP & Regional Guide",
    desc: "A comprehensive guide on calculating admission aggregates for the University of Peshawar (UOP) and other KP universities using the latest 2026 merit formulas.",
    content: "# How to Calculate Your University Admission Aggregate: UOP & Regional Guide\n\nAdmissions season in Pakistan is a high-stakes environment where a single decimal point in your aggregate can determine your future. If you are aiming for the **University of Peshawar (UOP)** or other regional institutions in Khyber Pakhtunkhwa, understanding the merit formula is crucial.\n\n## The UOP Merit Formula 2026\nUniversity of Peshawar generally follows a weightage system that balances your Matric, FSc, and Entry Test (usually ETEA) scores.\n\n### Standard Calculation Formula:\n```text\nAggregate = (Matric % × 0.10) + (FSc % × 0.40) + (Entry Test % × 0.50)\n```\n\n### Real-Life Example:\nImagine a student with the following scores:\n*   Matric: 900/1100 (81.81%)\n*   FSc: 950/1100 (86.36%)\n*   Entry Test: 140/200 (70.00%)\n\n**Step 1: Calculate Matric Weightage**\n`81.81 × 0.10 = 8.181`\n\n**Step 2: Calculate FSc Weightage**\n`86.36 × 0.40 = 34.544`\n\n**Step 3: Calculate Entry Test Weightage**\n`70.00 × 0.50 = 35.000`\n\n**Total Aggregate:**\n`8.181 + 34.544 + 35.000 = 77.725%`\n\n!!! PRO-TIP: Use the **StudyForge Aggregate Calculator** to get instant results without manual errors. It’s optimized for UOP and other KP universities!\n\n## Common Mistakes Students Make\n1.  **Ignoring Percentage Conversion:** Always convert your marks to percentages before multiplying by the weightage factor.\n2.  **Using Old Formulas:** Some departments change weightage (e.g., Law or Medical). Always check the latest UOP prospectus.\n3.  **Round-off Errors:** In competitive merit lists, carry your calculations to at least three decimal places.\n\n## Frequently Asked Questions (FAQs)\n**Q: Does UOP accept NTS for all departments?**\nA: No, most undergraduate programs require ETEA, while some graduate programs may accept NTS or GAT.\n\n**Q: Is there negative marking in the Entry Test?**\nA: This depends on the specific year's policy. Always read the instructions on your test paper carefully.\n\n---\n**CTA:** Ready to see where you stand? [Calculate your aggregate online](/) with StudyForge and predict your chances of admission!",
    date: "May 16, 2026",
    tag: "Admissions",
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "HEC Guidelines: The Ultimate Student Guide to GPA and CGPA Calculation",
    desc: "Master the art of calculating your GPA and CGPA under the official HEC Pakistan guidelines. Includes quality point tables and semester examples.",
    content: "# The Ultimate Student Guide to GPA and CGPA Calculation under HEC Guidelines\n\nIn Pakistan’s higher education system, the **GPA (Grade Point Average)** and **CGPA (Cumulative Grade Point Average)** are the primary measures of academic success. While they seem complex, they are governed by straightforward **HEC (Higher Education Commission)** guidelines.\n\n## Understanding Quality Points\nYour GPA is calculated by dividing your total Quality Points by total Credit Hours.\n**Quality Point = Grade Value × Credit Hours**\n\n### HEC Standard Grading Scale (Example):\n| Grade | Percentage | Grade Point |\n| :--- | :--- | :--- |\n| A | 80 - 100 | 4.0 |\n| B | 70 - 79 | 3.0 |\n| C | 60 - 69 | 2.0 |\n| D | 50 - 59 | 1.0 |\n| F | Below 50 | 0.0 |\n\n## Step-by-Step GPA Calculation\n```text\nGPA = Σ(Grade Points × Credit Hours) / Σ(Total Credit Hours)\n```\n\n**Example Semester:**\n1. Programming (3 Cr Hrs): Grade A (4.0) -> Quality Points = 12\n2. Calculus (3 Cr Hrs): Grade B (3.0) -> Quality Points = 9\n3. English (2 Cr Hrs): Grade A (4.0) -> Quality Points = 8\n\n**Calculation:**\n`Total QPs = 12 + 9 + 8 = 29`\n`Total Cr Hrs = 3 + 3 + 2 = 8`\n`GPA = 29 / 8 = 3.625`\n\n## Difference Between GPA and CGPA\n*   **GPA:** Your average for a *single* semester.\n*   **CGPA:** Your average for *all* semesters combined.\n\n!!! PRO-TIP: Tracking your GPA manually is tedious. Use the **StudyForge GPA Tracker** to manage your academic goals across semesters effortlessly.\n\n## FAQs\n**Q: How do I improve my CGPA?**\nA: Focus on high credit-hour subjects and retake courses where you scored lower than a 'C' if your university policy allows.\n\n**Q: Does 'F' count towards CGPA?**\nA: Yes, 'F' grades are included in the credit hour sum, which can significantly pull down your average.\n\n---\n**CTA:** Stop guessing and start tracking! [Use StudyForge’s HEC-compliant GPA Calculator](/) specifically designed for Pakistani university students.",
    date: "May 15, 2026",
    tag: "Strategy",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Scholarship Retention: How to Maintain Financial Aid in Pakistan",
    desc: "Practical strategies for university students to maintain their CGPA and follow credit hour rules to protect their scholarships.",
    content: "# Academic Retention: How to Protect and Maintain Your University Scholarship\n\nWinning a scholarship in Pakistan—whether it’s HEC Need-Based, PEEF, or a university merit grant—is a major achievement. However, the real challenge is **academic retention**: keeping that scholarship until graduation.\n\n## Critical Maintenance Requirements\nMost scholarships come with strict \"Maintain\" criteria. Failing to meet these often results in the immediate cancellation of financial aid.\n\n1.  **Minimum CGPA Threshold:** Most grants require you to maintain a CGPA of **3.0 or higher**. Some merit-based ones might even demand a 3.5.\n2.  **Credit Hour Enrollment:** You must be enrolled in a full-time workload (typically 15-18 credit hours per semester).\n3.  **Clean Conduct Record:** Any disciplinary action can be grounds for termination.\n\n## Strategy for Scholarship Safety\n*   **Monitor Your GPA Weekly:** Don't wait for your result card. Track your continuous assessment marks (quizzes, assignments) to see where you stand.\n*   **Prioritize Hard Subjects:** If you have a difficult course, dedicate extra time early in the semester to ensure it doesn't drag down your CGPA.\n*   **Avoid Selective Study:** Every mark counts when you are on scholarship. Ensure you participate in class to secure internal marks.\n\n```text\nSafety Margin = Current CGPA - Required Scholarship CGPA\n```\nMaintain a safety margin of at least **0.2** to account for any unexpected \"hard\" semesters.\n\n!!! PRO-TIP: Use the **StudyForge Academic Tracker** to set a \"Scholarship Target\" and see exactly what grades you need in your upcoming exams to keep your funding.\n\n## FAQs\n**Q: Can I keep my scholarship if I fail a course?**\nA: Usually, failing a course (an 'F' grade) results in the loss of scholarship. Check your specific award letter.\n\n**Q: What if I have a medical emergency?**\nA: Most universities allow you to \"freeze\" a semester for medical reasons without losing your scholarship, but prior approval is mandatory.\n\n---\n**CTA:** Secure your academic future today! [Monitor your scholarship eligibility](/) with the StudyForge student portal.",
    date: "May 14, 2026",
    tag: "Scholarships",
    image: "https://images.unsplash.com/photo-1523240715639-93f8bb0a9ce0?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Math Guide: Calculate Subject, Paper, and Board Marks Percentages",
    desc: "A simple step-by-step mathematical guide for Matric and FSc students to calculate their board percentages and single subject marks accurately.",
    content: "# How to Calculate Single Subject, Paper, and Board Marks Percentages\n\nWhether you are in **Matric (9th/10th)** or **Intermediate (FSc/ICS/FA)**, knowing how to calculate your percentages accurately is the first step toward university planning.\n\n## Basic Percentage Formula\nThe foundation of all academic utility calculations is the basic percentage formula:\n```text\nPercentage (%) = (Obtained Marks / Total Marks) × 100\n```\n\n## 1. Single Subject Percentage\nIf you scored 65 out of 75 in Physics:\n`(65 / 75) × 100 = 86.67%`\n\n## 2. Board Result Calculation (Matric/FSc)\nIf your total FSc marks are 980 out of 1100:\n`(980 / 1100) × 100 = 89.09%`\n\n## Why Accurate Calculation Matters\nMany universities use \"Aggregate\" systems where board marks are worth 40% to 50% of your total merit. Even a 1% error in your calculation can give you a false sense of security.\n\n### Converting Grades to Percentages\nIf your board result only shows grades, you can generally use the middle of the mark range for estimation, but always try to find your actual marks from the DMC (Detailed Marks Certificate).\n\n!!! PRO-TIP: Planning for university? Use the **StudyForge Board Marks Tracker** to see how your FSc result will impact your future aggregate for UOP, NUST, or FAST.\n\n## FAQs\n**Q: How do board marks affect university aggregate?**\nA: Most Pakistani universities (like UOP) give 40% weightage to your FSc marks.\n\n**Q: Should I include practical marks?**\nA: Yes, board percentages are always calculated on the *total* marks which include theory and practicals combined.\n\n---\n**CTA:** Stop using manual calculators! [Try the StudyForge Academic Utility Tool](/) for perfect, instantly accurate board mark percentages.",
    date: "May 13, 2026",
    tag: "Utility",
    image: "https://images.unsplash.com/photo-1518131394553-83eb42323edb?auto=format&fit=crop&q=80&w=800"
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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('studyforge-theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [isFocusModeActive, setIsFocusModeActive] = useState(false);
  const [isPremiumUser] = useState(false); // Mock premium state
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Apply dark mode class synchronously before paint
  useLayoutEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('studyforge-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('studyforge-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleFocusMode = () => {
    if (isFocusModeActive) {
      setIsFocusModeActive(false);
    } else {
      if (isPremiumUser) {
        setIsFocusModeActive(true);
      } else {
        setShowPremiumModal(true);
      }
    }
  };

  const handleUnlockFree = () => {
    // Simulate ad watch
    setShowPremiumModal(false);
    // Add a slight delay to "simulate" the ad process if needed, or just unlock instantly
    setIsFocusModeActive(true);
  };

  // Handle pseudo-routing
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path === '/flashcards') {
        setActiveTool('flashcards');
      } else if (path === '/code-explainer') {
        setActiveTool('explainer');
      } else if (path === '/gpa-calculator') {
        setActiveTool('calculator');
      }
    };
    
    // Initial check
    handleLocationChange();
    
    // Listen for popstate (back/forward button)
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Update URL manually when tool changes (pseudo-routing)
  useEffect(() => {
    if (activeTool === 'flashcards') {
      window.history.pushState({}, '', '/flashcards');
    } else if (activeTool === 'explainer') {
      window.history.pushState({}, '', '/code-explainer');
    } else if (activeTool === 'calculator') {
      window.history.pushState({}, '', '/gpa-calculator');
    } else if (activeTool === null && (window.location.pathname === '/flashcards' || window.location.pathname === '/code-explainer' || window.location.pathname === '/gpa-calculator')) {
      window.history.pushState({}, '', '/');
    }
  }, [activeTool]);

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [blogSearch, setBlogSearch] = useState('');
  const [footerModal, setFooterModal] = useState<'privacy' | 'terms' | 'contact' | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SEO & Meta logic
  useEffect(() => {
    if (selectedPost) {
      document.title = `${selectedPost.title} | StudyForge Insights`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', selectedPost.desc);
    } else {
      document.title = "StudyForge | AI-Powered Academic Tools for CS Students";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', "Empowering the next generation of academic excellence through AI-powered focus tools and professional financial tracking.");
    }
  }, [selectedPost]);
  
  const ALL_TAGS = Array.from(new Set(BLOG_POSTS.map(post => post.tag)));
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesTag = !selectedTag || post.tag === selectedTag;
    const matchesSearch = post.title.toLowerCase().includes(blogSearch.toLowerCase()) || 
                         post.desc.toLowerCase().includes(blogSearch.toLowerCase());
    return matchesTag && matchesSearch;
  });
  
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
      case 'flashcards': return 'AI Flashcard Generator';
      case 'explainer': return 'AI Code Explainer';
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
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <AnimatePresence>
        {!isFocusModeActive && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Header 
              onStartUsingTools={handleStartUsingTools} 
              onOpenSettings={() => setIsConfigOpen(true)}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
              isFocusModeActive={isFocusModeActive}
              onToggleFocusMode={toggleFocusMode}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {!isFocusModeActive && <Hero onStartUsingTools={handleStartUsingTools} />}

        {/* Trust Section - University Logos */}
        {!isFocusModeActive && (
          <section className="py-12 border-y border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
              <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">
                Trusted by students from top institutions
              </p>
              <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 dark:opacity-20 grayscale group hover:opacity-100 dark:hover:opacity-60 transition-opacity">
                {['Stanford', 'MIT', 'IIT Delhi', 'Berkeley', 'Oxford', 'NUS'].map((uni) => (
                  <div key={uni} className="text-xl font-black text-slate-900 dark:text-white tracking-tighter transition-all hover:scale-110 hover:text-[#0061FF] cursor-default whitespace-nowrap">
                    {uni}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        <section id="tools">
          {!isFocusModeActive && (
            <div className="max-w-7xl mx-auto px-6 pt-12">
              {/* Ad Placeholder 1 */}
              <div className="w-full h-32 bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex items-center justify-center text-[10px] font-bold text-slate-300 dark:text-slate-700 uppercase tracking-widest mb-12">
                {/* <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXX" data-ad-slot="XXXX" data-ad-format="auto" data-full-width-responsive="true"></ins> */}
                Advertisement Placeholder
              </div>
            </div>
          )}
          <ToolsSection onSelectTool={setActiveTool} />
        </section>

        {/* Features Grid - Quick Highlights */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Privacy First", desc: "Your data stays on your device. We don't sell your study patterns.", icon: <CheckCircle2 className="w-5 h-5" /> },
                { title: "Zero Latency AI", desc: "Powered by Gemini 1.5 Flash for near-instant responses.", icon: <CheckCircle2 className="w-5 h-5" /> },
                { title: "Open Source Heart", desc: "Built by students, for students. Completely free core tools.", icon: <CheckCircle2 className="w-5 h-5" /> }
              ].map((feat, i) => (
                <div key={i} className="p-8 saas-card group hover:bg-slate-50 border-none shadow-none">
                  <div className="w-12 h-12 bg-blue-50 text-[#0061FF] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0061FF] group-hover:text-white transition-all">
                    {feat.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feat.title}</h3>
                  <p className="text-slate-500 text-sm font-medium">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Section - Budget Wallet */}
        <section id="product" className="py-24 bg-slate-50 dark:bg-[#030712] transition-all duration-300 ease-in-out">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-full text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider transition-colors">
                  Featured Preview
                </div>
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-tight transition-colors duration-300">
                  Beyond the Classroom: <br />
                  <span className="text-[#0061FF]">Budget Wallet</span>
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed transition-colors duration-300">
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
                        { init: 'AK', color: 'bg-blue-600 dark:bg-blue-400 text-white dark:text-white border-white dark:border-slate-900' },
                        { init: 'JD', color: 'bg-emerald-600 dark:bg-emerald-400 text-white dark:text-white border-white dark:border-slate-900' },
                        { init: 'SM', color: 'bg-indigo-600 dark:bg-indigo-400 text-white dark:text-white border-white dark:border-slate-900' },
                        { init: 'RV', color: 'bg-rose-600 dark:bg-rose-400 text-white dark:text-white border-white dark:border-slate-900' }
                      ].map((u, i) => (
                        <div key={i} className={`w-10 h-10 rounded-full border-2 ${u.color} flex items-center justify-center text-[10px] font-medium uppercase tracking-tighter shadow-sm transition-all duration-300`}>
                          {u.init}
                        </div>
                      ))}
                      <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-[#0061FF] dark:bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg z-10 transition-all duration-300">
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
                            <span className="text-sm font-black text-[#0061FF]">Rs.</span>
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
                            <span className="text-sm">Rs.</span>
                            {budgetLimit.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-[-12px]">
                      <span className="text-[10px] font-bold uppercase text-slate-500">Current Balance</span>
                      <span className={`text-sm font-black ${budgetLimit - totalExpenses < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                        <span className="text-[10px] mr-1">Rs.</span>
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
                                <span className="text-[10px] text-slate-500 mr-1">Rs.</span>
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

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-4">Common Questions</h2>
              <p className="text-slate-500 font-medium">Everything you need to know about StudyForge.</p>
            </div>
            
            <div className="space-y-4">
              {[
                { q: "Is StudyForge really free?", a: "Yes, all core tools like the CGPA calculator, Notes Generator, and MCQ Creator are completely free for students. We believe education tools should be accessible to everyone, regardless of their budget." },
                { q: "How secure is my data?", a: "Extremely. Your notes and financial records are stored locally in your browser's indexedDB using encrypted local persistence. We only send text to AI models for processing, and we explicitly request that our LLM providers do not train on your data." },
                { q: "Can I use it offline?", a: "The CGPA Tracker and Budget Wallet work perfectly offline using PWA technologies. AI-powered features (Notes/MCQs) require a stable internet connection to reach our Gemini-powered processing cluster." },
                { q: "Which file formats are supported?", a: "We support PDF, DOCX, and TXT files for note generation. You can also paste raw text or even provide a YouTube link (beta) to generate summaries of educational lectures." },
                { q: "Can I export my study materials?", a: "Absolutely. You can export your generated notes and MCQs as PDF, Markdown, or directly to your Google Drive to keep your study vault organized." }
              ].map((item, i) => (
                <details key={i} className="border border-slate-100 rounded-[20px] overflow-hidden group">
                  <summary className="w-full flex justify-between items-center p-6 text-left hover:bg-slate-50 transition-colors list-none cursor-pointer outline-none">
                    <span className="font-bold text-slate-900">{item.q}</span>
                    <ChevronDown className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180 group-open:text-[#0061FF]" />
                  </summary>
                  <div className="p-6 pt-0 text-slate-500 text-sm leading-relaxed bg-slate-50/50">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
              <div className="flex-1">
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Study Insights</h2>
                <div className="flex flex-wrap gap-2 mb-6">
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
                
                {/* Blog Search */}
                <div className="relative max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search articles..."
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-[#0061FF]/10 focus:border-[#0061FF] outline-none transition-all"
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                  />
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

        {/* Testimonials Section */}
        <section className="py-24 bg-slate-50/50 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black tracking-tight text-slate-900">Loved by students</h2>
              <p className="text-slate-500 font-medium mt-4">Join 20,000+ students building better academic futures.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Sarah J.", uni: "MIT '27", text: "The Notes Generator literally saved my Database systems course. Condensed 50 pages into 5 and I still topped the exam.", avatar: "SJ" },
                { name: "Rohan M.", uni: "IIT Bombay", text: "Budget Wallet is a hidden gem. It's the first time I've actually stuck to a budget for my final year project expenses.", avatar: "RM" },
                { name: "Elena K.", uni: "Oxford", text: "Interactive MCQs are the ultimate study hack. Active recall used to be a chore, now it feels like a game.", avatar: "EK" }
              ].map((t, i) => (
                <div key={i} className="p-8 saas-card bg-white relative">
                  <Quote className="absolute top-6 right-8 w-8 h-8 text-slate-50 opacity-10" />
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed mb-8 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0061FF]/10 text-[#0061FF] flex items-center justify-center font-black text-xs">
                      {t.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                      <p className="text-[10px] uppercase font-black tracking-widest text-[#0061FF]">{t.uni}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-slate-900 rounded-[48px] p-8 md:p-16 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#0061FF]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
               
               <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
                  <div className="inline-flex p-3 bg-white/10 rounded-2xl">
                    <Send className="w-6 h-6 text-[#0061FF]" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Stay Sharp. <br /><span className="text-[#0061FF]">Get Study Forge Weekly.</span></h2>
                  <p className="text-slate-400 text-lg font-medium">Weekly AI prompts, productivity hacks, and CS strategy directly to your inbox.</p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="email" 
                      placeholder="Enter your student email..."
                      className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none text-white focus:border-[#0061FF] transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button 
                      onClick={() => {
                        if (email) setIsSubscribed(true);
                      }}
                      className="btn-primary px-8"
                    >
                      {isSubscribed ? 'Subscribed!' : 'Join the Forge'}
                    </button>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">No spam. Only high-quality academic content.</p>
               </div>
            </div>
          </div>
        </section>
         {!isFocusModeActive && (
        <footer className="py-20 border-t border-slate-100 dark:border-slate-800 bg-slate-900 text-white relative overflow-hidden">
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
                <div className="flex items-center gap-4 pt-4">
                  {[
                    { icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>, href: "#" },
                    { icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>, href: "#" },
                    { icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, href: "#" },
                    { icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.066 2.1.281 2.593.472.653.254 1.12.556 1.606 1.042.486.486.788.953 1.042 1.606.191.493.406 1.227.472 2.593.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.066 1.366-.281 2.1-.472 2.593-.254.653-.556 1.12-1.042 1.606-.486.486-.953.788-1.606 1.042-.493.191-1.227.406-2.593.472-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.066-2.1-.281-2.593-.472-.653-.254-1.12-.556-1.606-1.042-.486-.486-.788-.953-1.042-1.606-.191-.493-.406-1.227-.472-2.593C2.175 15.637 2.163 15.257 2.163 12s.012-3.584.07-4.85c.066-1.366.281-2.1.472-2.593.254-.653.556-1.12 1.042-1.606.486-.486.953-.788 1.606-1.042.493-.191 1.227-.406 2.593-.472 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.741 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.741 24 12 24s3.667-.012 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384s1.079-1.338 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.012-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126s-1.337-1.079-2.126-1.384c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>, href: "#" }
                  ].map((social, i) => (
                    <a key={i} href={social.href} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0061FF] hover:border-[#0061FF] transition-all">
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-white/50">Company</h4>
                <ul className="space-y-4">
                  <li><button onClick={() => setFooterModal('privacy')} className="text-slate-400 hover:text-[#0061FF] font-bold transition-colors">Privacy Policy</button></li>
                  <li><button onClick={() => setFooterModal('terms')} className="text-slate-400 hover:text-[#0061FF] font-bold transition-colors">Terms of Service</button></li>
                  <li><button onClick={() => setFooterModal('contact')} className="text-slate-400 hover:text-[#0061FF] font-bold transition-colors">Contact Support</button></li>
                  <li>
                    <a 
                      href="https://buymeacoffee.com/studyforge" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                    >
                      Support StudyForge
                    </a>
                  </li>
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
      )}
    </main>

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
                {activeTool === 'flashcards' && <FlashcardGenerator />}
                {activeTool === 'explainer' && <CodeExplainer />}
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
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Published on</span>
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">{selectedPost.date}</span>
                </div>

                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-2 px-3 border-r border-slate-100">
                    <Share2 className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Share</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => {
                        const url = window.location.href;
                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedPost.title)}&url=${encodeURIComponent(url)}`, '_blank');
                      }}
                      className="p-2 hover:bg-sky-50 text-sky-500 rounded-xl transition-all hover:scale-110"
                      title="Share on Twitter"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => {
                        const url = window.location.href;
                        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                      }}
                      className="p-2 hover:bg-blue-50 text-blue-600 rounded-xl transition-all hover:scale-110"
                      title="Share on LinkedIn"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => {
                        const url = window.location.href;
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                      }}
                      className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-xl transition-all hover:scale-110"
                      title="Share on Facebook"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => {
                        const url = window.location.href;
                        navigator.clipboard.writeText(url).then(() => {
                           alert("Link copied to clipboard!");
                        });
                      }}
                      className="p-2 hover:bg-slate-100 text-slate-500 rounded-xl transition-all hover:scale-110"
                      title="Copy Link"
                    >
                      <Link className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedPost(null)}
                  className="btn-primary w-full sm:w-auto"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Focus Modal */}
      <AnimatePresence>
        {showPremiumModal && (
          <motion.div 
            className="fixed inset-0 z-[500] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowPremiumModal(false)}
            />
            <motion.div 
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <button 
                onClick={() => setShowPremiumModal(false)}
                className="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-10 text-center space-y-6">
                <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-3xl flex items-center justify-center mx-auto text-[#0061FF]">
                  <Sparkles className="w-10 h-10" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight text-center">
                    ✨ Unlock Distraction-Free Study
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                    Focus Mode hides all advertisements, sidebars, and navigation headers to give you a massive, clean workspace for deep concentration.
                  </p>
                </div>

                <div className="grid gap-3 pt-4">
                  <button className="w-full py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98]">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    Upgrade to Premium (Rs. 150/mo)
                  </button>
                  <button 
                    onClick={handleUnlockFree}
                    className="w-full py-4 bg-blue-50 dark:bg-blue-900/20 text-[#0061FF] rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all active:scale-[0.98]"
                  >
                    <Zap className="w-5 h-5" />
                    Unlock Free for 1 Hour (Watch a Short Ad)
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfigModal 
        isOpen={isConfigOpen} 
        onClose={() => setIsConfigOpen(false)} 
      />

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-12 right-6 z-[90] w-12 h-12 bg-white text-slate-900 border border-slate-100 rounded-2xl shadow-2xl flex items-center justify-center group hover:bg-[#0061FF] hover:text-white transition-all"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
