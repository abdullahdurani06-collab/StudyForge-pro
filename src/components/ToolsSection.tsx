import React from 'react';
import { Calculator, FileText, ListChecks, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export type ToolType = 'calculator' | 'notes' | 'mcq';

interface ToolsSectionProps {
  onSelectTool: (tool: ToolType) => void;
}

const tools = [
  {
    id: 'calculator' as ToolType,
    title: 'CGPA Calculator',
    description: 'Dynamic credit hour tracking and grade calculation for a semester or full degree.',
    icon: Calculator,
    gradient: 'from-blue-500 to-blue-600',
    iconColor: 'text-[#0061FF]',
    bgColor: 'bg-blue-50/50',
  },
  {
    id: 'notes' as ToolType,
    title: 'AI Note Generator',
    description: 'Paste your transcripts and get structured summaries with key insights instantly.',
    icon: FileText,
    gradient: 'from-purple-500 to-purple-600',
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-50/50',
  },
  {
    id: 'mcq' as ToolType,
    title: 'AI MCQ Generator',
    description: 'Automatically create multiple choice questions from any textbook excerpt or transcript.',
    icon: ListChecks,
    gradient: 'from-emerald-500 to-emerald-600',
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50/50',
  }
];

export default function ToolsSection({ onSelectTool }: ToolsSectionProps) {
  return (
    <section id="tools" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 tracking-tight">Powerful Tools for Students</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Everything you need to succeed academically, organized in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -12 }}
              onClick={() => onSelectTool(tool.id)}
              className="saas-card p-10 flex flex-col items-start cursor-pointer group"
            >
              <div className={`w-16 h-16 ${tool.bgColor} ${tool.iconColor} rounded-[20px] flex items-center justify-center mb-8 border border-white/50 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                <tool.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{tool.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-10 font-medium">
                {tool.description}
              </p>
              
              <div className="mt-auto flex items-center gap-2 text-[#0061FF] font-bold text-sm tracking-tight group-hover:gap-3 transition-all">
                Use this tool
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
