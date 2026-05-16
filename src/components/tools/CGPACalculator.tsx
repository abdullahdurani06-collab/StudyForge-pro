import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Calculator, Info, RotateCcw, Zap, CheckCircle2, AlertCircle, Percent, GraduationCap, ChevronRight, LayoutGrid, FileText, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Course {
  id: string;
  name: string;
  creditHours: number;
  marksObtained: number;
  totalMarks: number;
}

interface Semester {
  id: string;
  name: string;
  courses: Course[];
}

const getGradeInfo = (percentage: number) => {
  if (percentage >= 85) return { gp: 4.00, letter: 'A', status: 'Excellent' };
  if (percentage >= 80) return { gp: 3.66, letter: 'A-', status: 'Excellent' };
  if (percentage >= 75) return { gp: 3.33, letter: 'B+', status: 'Very Good' };
  if (percentage >= 71) return { gp: 3.00, letter: 'B', status: 'Very Good' };
  if (percentage >= 68) return { gp: 2.66, letter: 'B-', status: 'Good' };
  if (percentage >= 64) return { gp: 2.33, letter: 'C+', status: 'Good' };
  if (percentage >= 61) return { gp: 2.00, letter: 'C', status: 'Satisfactory' };
  if (percentage >= 58) return { gp: 1.66, letter: 'C-', status: 'Satisfactory' };
  if (percentage >= 54) return { gp: 1.30, letter: 'D+', status: 'Pass' };
  if (percentage >= 50) return { gp: 1.00, letter: 'D', status: 'Pass' };
  return { gp: 0.00, letter: 'F', status: 'Fail' };
};

export default function CGPACalculator() {
  const [activeMode, setActiveMode] = useState<'calculator' | 'converter'>('calculator');
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: 'sem-1',
      name: 'Semester 1',
      courses: [
        { id: 'c-1', name: '', creditHours: 3, marksObtained: 0, totalMarks: 100 }
      ]
    }
  ]);

  // Converter State
  const [convObtained, setConvObtained] = useState<string>('');
  const [convTotal, setConvTotal] = useState<string>('');
  const [convPercentage, setConvPercentage] = useState<string>('');

  const addSemester = () => {
    const newSem: Semester = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Semester ${semesters.length + 1}`,
      courses: [
        { id: Math.random().toString(36).substr(2, 9), name: '', creditHours: 3, marksObtained: 0, totalMarks: 100 }
      ]
    };
    setSemesters([...semesters, newSem]);
  };

  const addDefaultSemester = () => {
    const newSem: Semester = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Semester ${semesters.length + 1}`,
      courses: Array.from({ length: 5 }).map((_, i) => ({
        id: Math.random().toString(36).substr(2, 9) + i,
        name: `Course ${i + 1}`,
        creditHours: 3,
        marksObtained: 0,
        totalMarks: 100
      }))
    };
    setSemesters([...semesters, newSem]);
  };

  const removeSemester = (semId: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(s => s.id !== semId));
    }
  };

  const addCourse = (semId: string) => {
    setSemesters(semesters.map(s => {
      if (s.id === semId) {
        return {
          ...s,
          courses: [...s.courses, { id: Math.random().toString(36).substr(2, 9), name: '', creditHours: 3, marksObtained: 0, totalMarks: 100 }]
        };
      }
      return s;
    }));
  };

  const removeCourse = (semId: string, courseId: string) => {
    setSemesters(semesters.map(s => {
      if (s.id === semId && s.courses.length > 1) {
        return {
          ...s,
          courses: s.courses.filter(c => c.id !== courseId)
        };
      }
      return s;
    }));
  };

  const updateCourse = (semId: string, courseId: string, updates: Partial<Course>) => {
    setSemesters(semesters.map(s => {
      if (s.id === semId) {
        return {
          ...s,
          courses: s.courses.map(c => c.id === courseId ? { ...c, ...updates } : c)
        };
      }
      return s;
    }));
  };

  const clearAll = () => {
    if (confirm("Are you sure you want to reset all fields?")) {
      setSemesters([{
        id: 'sem-1',
        name: 'Semester 1',
        courses: [{ id: 'c-1', name: '', creditHours: 3, marksObtained: 0, totalMarks: 100 }]
      }]);
      setConvObtained('');
      setConvTotal('');
      setConvPercentage('');
    }
  };

  const stats = useMemo(() => {
    let totalWeightedPoints = 0;
    let totalCredits = 0;
    let totalObtainedMarks = 0;
    let totalPossibleMarks = 0;

    semesters.forEach(sem => {
      sem.courses.forEach(c => {
        const percentage = (c.marksObtained / (c.totalMarks || 1)) * 100;
        const info = getGradeInfo(percentage);
        totalWeightedPoints += info.gp * c.creditHours;
        totalCredits += c.creditHours;
        totalObtainedMarks += c.marksObtained;
        totalPossibleMarks += c.totalMarks;
      });
    });

    const cgpa = totalCredits === 0 ? 0 : totalWeightedPoints / totalCredits;
    const overallPercentage = totalPossibleMarks === 0 ? 0 : (totalObtainedMarks / totalPossibleMarks) * 100;

    return {
      cgpa: cgpa.toFixed(2),
      credits: totalCredits,
      percentage: overallPercentage.toFixed(1),
      grade: getGradeInfo(overallPercentage).letter
    };
  }, [semesters]);

  const converterResult = useMemo(() => {
    let percentage = 0;
    if (convPercentage) {
      percentage = parseFloat(convPercentage);
    } else if (convObtained && convTotal) {
      percentage = (parseFloat(convObtained) / parseFloat(convTotal)) * 100;
    }

    if (isNaN(percentage)) return null;

    return getGradeInfo(percentage);
  }, [convObtained, convTotal, convPercentage]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* MODE TOGGLE */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit mx-auto shadow-inner border border-slate-200">
        <button
          onClick={() => setActiveMode('calculator')}
          className={`px-8 py-3 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${activeMode === 'calculator' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
        >
          <Calculator className="w-4 h-4" />
          CGPA CALCULATOR
        </button>
        <button
          onClick={() => setActiveMode('converter')}
          className={`px-8 py-3 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${activeMode === 'converter' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
        >
          <Percent className="w-4 h-4" />
          MARKS TO GPA
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
        {/* LEFT SECTION: INPUTS */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {activeMode === 'calculator' ? (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <GraduationCap className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 uppercase tracking-widest text-lg">Detailed Tracker</h3>
                      <p className="text-slate-400 text-xs font-bold leading-none">Sync academic progress across semesters</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={clearAll}
                      className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Clear All"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={addDefaultSemester}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      Add Quick Sem
                    </button>
                  </div>
                </div>

                <div className="space-y-8">
                  {semesters.map((sem, sIndex) => (
                    <motion.div 
                      key={sem.id}
                      layout
                      className="saas-card overflow-hidden bg-white border border-slate-100"
                    >
                      <div className="px-8 py-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                        <input 
                          value={sem.name}
                          onChange={(e) => setSemesters(semesters.map(s => s.id === sem.id ? { ...s, name: (e.target as HTMLInputElement).value } : s))}
                          className="font-black text-slate-900 uppercase tracking-[0.2em] bg-transparent border-none outline-none focus:text-blue-600 transition-colors w-1/2"
                        />
                        <button
                          onClick={() => removeSemester(sem.id)}
                          disabled={semesters.length === 1}
                          className="p-2 text-slate-300 hover:text-red-500 disabled:opacity-0 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-8 space-y-4">
                        <div className="grid grid-cols-[1fr_80px_80px_60px_60px_60px_40px] gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">
                          <div>Course Title</div>
                          <div className="text-center">Obtained</div>
                          <div className="text-center">Total</div>
                          <div className="text-center">Credits</div>
                          <div className="text-center">Grade</div>
                          <div className="text-center">Points</div>
                          <div></div>
                        </div>

                        <div className="space-y-3">
                          {sem.courses.map((course) => {
                            const percentage = (course.marksObtained / (course.totalMarks || 1)) * 100;
                            const info = getGradeInfo(percentage);
                            const qp = (info.gp * course.creditHours).toFixed(2);

                            return (
                              <div key={course.id} className="grid grid-cols-[1fr_80px_80px_60px_60px_60px_40px] gap-4 items-center group">
                                <input
                                  placeholder="e.g. CS-101"
                                  value={course.name}
                                  onChange={(e) => updateCourse(sem.id, course.id, { name: (e.target as HTMLInputElement).value })}
                                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-sm font-bold placeholder:text-slate-300 placeholder:font-normal"
                                />
                                <input
                                  type="number"
                                  value={course.marksObtained}
                                  onChange={(e) => updateCourse(sem.id, course.id, { marksObtained: parseFloat((e.target as HTMLInputElement).value) || 0 })}
                                  className="w-full px-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-sm font-black text-center tabular-nums"
                                />
                                <input
                                  type="number"
                                  value={course.totalMarks}
                                  onChange={(e) => updateCourse(sem.id, course.id, { totalMarks: parseFloat((e.target as HTMLInputElement).value) || 0 })}
                                  className="w-full px-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-sm font-black text-center tabular-nums text-slate-400"
                                />
                                <input
                                  type="number"
                                  value={course.creditHours}
                                  onChange={(e) => updateCourse(sem.id, course.id, { creditHours: parseFloat((e.target as HTMLInputElement).value) || 0 })}
                                  className="w-full px-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-sm font-black text-center tabular-nums text-blue-600"
                                />
                                <div className="flex items-center justify-center">
                                  <span className="w-9 h-9 bg-slate-900 text-white rounded-lg flex items-center justify-center text-[10px] font-black">
                                    {info.letter}
                                  </span>
                                </div>
                                <div className="flex items-center justify-center">
                                  <span className="text-[10px] font-black text-blue-600 tabular-nums">
                                    {qp}
                                  </span>
                                </div>
                                <button 
                                  onClick={() => removeCourse(sem.id, course.id)}
                                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        <button
                          onClick={() => addCourse(sem.id)}
                          className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors pt-2 pl-4"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Course Row
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={addSemester}
                  className="w-full py-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 group hover:border-blue-400 hover:bg-blue-50/10 transition-all"
                >
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-600">New Academic Semester</span>
                </button>

                {/* QUICK MARKS CALCULATOR */}
                <QuickMarksCalculator />
              </motion.div>
            ) : (
              <motion.div
                key="converter"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-50 rounded-xl">
                    <Percent className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 uppercase tracking-widest text-lg">Aggregate Converter</h3>
                    <p className="text-slate-400 text-xs font-bold leading-none">Instant GPA mapping based on HEC standards</p>
                  </div>
                </div>

                <div className="saas-card p-10 space-y-8 bg-white border border-slate-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                        By Percentage
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="85.5"
                          value={convPercentage}
                          onChange={(e) => {
                            setConvPercentage(e.target.value);
                            setConvObtained('');
                            setConvTotal('');
                          }}
                          className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-amber-400 outline-none text-2xl font-black tabular-nums transition-all"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 font-black text-2xl">%</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Calculator className="w-3 h-3 text-blue-500 fill-blue-500" />
                        By Total Marks
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <input
                            type="number"
                            placeholder="Obtained"
                            value={convObtained}
                            onChange={(e) => {
                              setConvObtained(e.target.value);
                              setConvPercentage('');
                            }}
                            className="w-full px-4 py-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-400 outline-none text-xl font-black text-center transition-all"
                          />
                          <p className="text-[8px] font-black text-slate-400 text-center uppercase tracking-widest leading-none">Yield</p>
                        </div>
                        <div className="space-y-2">
                          <input
                            type="number"
                            placeholder="Total"
                            value={convTotal}
                            onChange={(e) => {
                              setConvTotal(e.target.value);
                              setConvPercentage('');
                            }}
                            className="w-full px-4 py-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-400 outline-none text-xl font-black text-center transition-all"
                          />
                          <p className="text-[8px] font-black text-slate-400 text-center uppercase tracking-widest leading-none">Capacity</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {converterResult && (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-8 bg-slate-900 rounded-3xl relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-8 opacity-10">
                        <GraduationCap className="w-32 h-32 text-white" />
                      </div>
                      <div className="relative z-10 grid grid-cols-3 gap-6 items-center">
                        <div className="text-center">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">GPA Value</p>
                          <p className="text-4xl font-black text-white tracking-tighter tabular-nums leading-none">
                            {converterResult.gp.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-center border-x border-slate-800">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Letter Grade</p>
                          <p className="text-4xl font-black text-amber-500 tabular-nums leading-none">
                            {converterResult.letter}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Performance</p>
                          <p className="text-sm font-black text-emerald-400 uppercase tracking-widest leading-none">
                            {converterResult.status}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT SECTION: STICKY RESULTS CARD */}
        <aside className="lg:sticky lg:top-24 space-y-6">
          <div className="saas-card bg-slate-900 border-none shadow-2xl overflow-hidden p-8 flex flex-col items-center text-center relative group">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-600/10 blur-[60px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 w-full">
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Institutional Merit</span>
                <div className="flex gap-1">
                  {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />)}
                </div>
              </div>

              {/* Progress Ring / Bar */}
              <div className="relative w-40 h-40 mx-auto mb-8">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="74"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="12"
                  />
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="74"
                    fill="none"
                    stroke="#0061FF"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={465}
                    initial={{ strokeDashoffset: 465 }}
                    animate={{ strokeDashoffset: 465 - (465 * (parseFloat(stats.cgpa) / 4.0)) }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-white tracking-tighter tabular-nums leading-none">
                    {stats.cgpa}
                  </span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">GPA Scale</span>
                </div>
              </div>

              <div className="space-y-4 bg-slate-800/40 rounded-2xl p-6 border border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-400">Total Credit Units</span>
                  <span className="font-black text-white tabular-nums">{stats.credits}</span>
                </div>
                <div className="h-px bg-slate-800 w-full" />
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-400">Yield Percentage</span>
                  <span className="font-black text-blue-400 tabular-nums">{stats.percentage}%</span>
                </div>
                <div className="h-px bg-slate-800 w-full" />
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-400">Academic Standing</span>
                  <span className="px-2 py-1 bg-blue-500 text-white rounded-md font-black text-[10px] uppercase tracking-widest">
                    Grade {stats.grade}
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-800 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 italic leading-none transition-all hover:text-slate-300">
                <span>Real-time Sync Active</span>
                <Zap className="w-3 h-3 text-amber-500" />
              </div>
            </div>
          </div>

          <div className="saas-card p-6 flex items-start gap-4 bg-slate-50 border-slate-200">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 border border-slate-100 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1">Scale: HEC Standard</h4>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Aggregated based on weighted credit hours and strict percentage mapping (85+ = A | 4.00).
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function QuickMarksCalculator() {
  const [mode, setMode] = useState<'single' | 'board'>('single');
  const [obtained, setObtained] = useState<string>('');
  const [total, setTotal] = useState<string>('');

  const result = useMemo(() => {
    const ob = parseFloat(obtained);
    const to = parseFloat(total);

    if (isNaN(ob) || isNaN(to) || to === 0) return null;

    const percentage = (ob / to) * 100;
    
    let standing = '';
    if (percentage >= 80) standing = 'Distinction / First Division';
    else if (percentage >= 60) standing = 'First Division';
    else if (percentage >= 45) standing = 'Second Division';
    else if (percentage >= 33) standing = 'Third Division';
    else standing = 'Fail / Below Standard';

    return {
      percentage: percentage.toFixed(1),
      standing,
      hec: getGradeInfo(percentage)
    };
  }, [obtained, total]);

  const clear = () => {
    setObtained('');
    setTotal('');
  };

  return (
    <div className="saas-card p-8 bg-white border border-slate-100 mt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 rounded-xl">
            <Award className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h4 className="font-black text-slate-900 uppercase tracking-widest text-sm">Quick Marks Calculator</h4>
            <p className="text-[10px] font-bold text-slate-400 leading-none">Instant percentile & grade mapping</p>
          </div>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setMode('single')}
            className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${mode === 'single' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
          >
            SINGLE PAPER
          </button>
          <button
            onClick={() => setMode('board')}
            className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${mode === 'board' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
          >
            BOARD MATRIX
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Obtained</label>
              <input
                type="number"
                placeholder="0"
                value={obtained}
                onChange={(e) => setObtained(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none text-lg font-black transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Total</label>
              <input
                type="number"
                placeholder={mode === 'board' ? '1100' : '100'}
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none text-lg font-black transition-all"
              />
            </div>
          </div>
          <button
            onClick={clear}
            className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors flex items-center gap-1.5 ml-1"
          >
            <RotateCcw className="w-3 h-3" />
            Clear Reset
          </button>
        </div>

        <div>
          {result ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <FileText className="w-16 h-16" />
              </div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Total Percentage</p>
                  <p className="text-3xl font-black tabular-nums">{result.percentage}%</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">
                    {mode === 'single' ? 'HEC GPA' : 'Standing'}
                  </p>
                  <p className="text-xl font-black">
                    {mode === 'single' ? result.hec.gp.toFixed(2) : result.hec.letter}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-0.5">Academic Status</p>
                <p className="text-xs font-bold">{result.standing}</p>
              </div>
            </motion.div>
          ) : (
            <div className="h-[120px] rounded-2xl border-2 border-dashed border-slate-100 flex items-center justify-center text-center p-6">
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-relaxed">
                Enter marks to view <br /> instant math breakdown
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
