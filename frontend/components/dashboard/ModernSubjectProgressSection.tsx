
import React from "react";
import { Book } from "lucide-react";
import ModernSubjectProgressCircle from "./ModernSubjectProgressCircle";

type Subject = {
  name: string;
  progress: number;
  next: string;
  due: string;
  color?: string;
};

const gradients = {
  Mathematics: { from: "#818CF8", to: "#7C3AED" },
  Chemistry: { from: "#3EE9A4", to: "#059669" },
  Physics: { from: "#FDE68A", to: "#F59E42" },
  Biology: { from: "#FCA5A5", to: "#EF4444" },
};

function ModernSubjectProgressSection({ subjects }: { subjects: Subject[] }) {
  return (
    <div className="relative bg-white/60 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl group hover:bg-white/70 transition-all duration-500">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl">
            <Book className="text-white" size={20} strokeWidth={2.5} />
          </div>
          <span className="font-black text-xl text-gray-800">Subject Progress</span>
        </div>
        
        <div className="space-y-6">
          {subjects.map((subject, idx) => (
            <ModernSubjectProgressCircle
              key={subject.name}
              name={subject.name}
              progress={subject.progress}
              next={subject.next}
              gradientId={`modern-subj-gradient-${subject.name}`}
              gradient={gradients[subject.name as keyof typeof gradients]}
              delay={idx * 150}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModernSubjectProgressSection;
