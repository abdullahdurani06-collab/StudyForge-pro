import React, { useState } from 'react';
import { Plus, Trash2, Calculator, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Course {
  id: string;
  name: string;
  creditHours: number;
  marksObtained: number;
  totalMarks: number;
}

const getGradePoint = (obtained: number, total: number) => {
  if (total <= 0) return 0;
  const percentage = (obtained / total) * 100;
  if (percentage >= 80) return 4.0;
  if (percentage >= 70) return 3.0;
  if (percentage >= 60) return 2.0;
  if (percentage >= 50) return 1.0;
  return 0.0;
};

const getGradeLetter = (obtained: number, total: number) => {
  const gp = getGradePoint(obtained, total);
  if (gp === 4.0) return 'A';
  if (gp === 3.0) return 'B';
  if (gp === 2.0) return 'C';
  if (gp === 1.0) return 'D';
  return 'F';
};

export default function CGPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', creditHours: 3, marksObtained: 85, totalMarks: 100 }
  ]);

  const addCourse = () => {
    setCourses([...courses, { 
      id: Math.random().toString(36).substr(2, 9), 
      name: '', 
      creditHours: 3, 
      marksObtained: 0, 
      totalMarks: 100 
    }]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCourses(courses.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const calculateCGPA = () => {
    let totalWeightedPoints = 0;
    let totalCredits = 0;
    courses.forEach(course => {
      const gp = getGradePoint(course.marksObtained, course.totalMarks);
      totalWeightedPoints += gp * course.creditHours;
      totalCredits += course.creditHours;
    });
    return totalCredits === 0 ? "0.00" : (totalWeightedPoints / totalCredits).toFixed(2);
  };

  return (
    <div className="saas-card overflow-hidden flex flex-col min-h-[600px]">
      <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-slate-50/30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#0061FF] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Academic Tracker</h2>
            <p className="text-xs font-medium text-slate-400">Calculate GPA via Marks Distribution</p>
          </div>
        </div>
        <div className="flex items-center gap-4 px-8 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">GPA Achievement</span>
          <div className="w-px h-6 bg-slate-100" />
          <span className="text-3xl font-black text-[#0061FF] tabular-nums leading-none tracking-tighter">{calculateCGPA()}</span>
        </div>
      </div>

      <div className="p-8 flex-1">
        <div className="space-y-3 mb-8">
          <div className="grid grid-cols-12 gap-4 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            <div className="col-span-12 md:col-span-5">Catalog #: Course Title</div>
            <div className="col-span-4 md:col-span-2 text-center">Marks Obtained</div>
            <div className="col-span-4 md:col-span-2 text-center">Total Marks</div>
            <div className="col-span-2 md:col-span-1 text-center">Units</div>
            <div className="col-span-2 md:col-span-1 text-center">Grade</div>
            <div className="col-span-2 md:col-span-1"></div>
          </div>
          
          <AnimatePresence initial={false}>
            {courses.map((course, index) => (
              <motion.div 
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="grid grid-cols-12 gap-3 items-center group"
              >
                <div className="col-span-12 md:col-span-5">
                  <input
                    type="text"
                    placeholder={`e.g. MATH-302 Real Analysis`}
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, { name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium"
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <input
                    type="number"
                    value={course.marksObtained}
                    onChange={(e) => updateCourse(course.id, { marksObtained: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm text-center font-bold"
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <input
                    type="number"
                    value={course.totalMarks}
                    onChange={(e) => updateCourse(course.id, { totalMarks: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm text-center font-bold"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={course.creditHours}
                    onChange={(e) => updateCourse(course.id, { creditHours: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm text-center tabular-nums font-bold"
                  />
                </div>
                <div className="col-span-2 md:col-span-1 flex items-center justify-center">
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${
                    getGradeLetter(course.marksObtained, course.totalMarks) === 'F' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {getGradeLetter(course.marksObtained, course.totalMarks)}
                  </span>
                </div>
                <div className="col-span-12 md:col-span-1 flex justify-center">
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length === 1}
                    className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-20 transition-all active:scale-90"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <button
          onClick={addCourse}
          className="flex items-center gap-3 px-6 py-4 border-2 border-dashed border-slate-200 text-slate-400 rounded-2xl hover:border-[#0061FF] hover:text-[#0061FF] hover:bg-blue-50/50 transition-all w-full justify-center group font-bold tracking-tight text-[15px]"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Sync Additional Course Record
        </button>
      </div>

      <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-start gap-4">
        <div className="w-8 h-8 bg-white rounded-lg border border-slate-200 flex items-center justify-center shrink-0">
          <Info className="w-4 h-4 text-slate-400" />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Grading Scale</p>
          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl font-medium">
            80%+ = 4.0 | 70%-79% = 3.0 | 60%-69% = 2.0 | 50%-59% = 1.0 | Weighted by Credit Hours.
          </p>
        </div>
      </div>
    </div>
  );
}
