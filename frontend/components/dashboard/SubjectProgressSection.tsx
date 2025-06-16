
import React from "react";
import { Book } from "lucide-react";
import SubjectProgressCircle from "./SubjectProgressCircle";

type Subject = {
  name: string;
  progress: number;
  next: string;
  due: string;
};

const gradients = {
  Mathematics: { from: "#818CF8", to: "#7C3AED" }, // indigo to violet
  Chemistry: { from: "#3EE9A4", to: "#059669" },   // teal to emerald
  Physics:   { from: "#FDE68A", to: "#F59E42" },   // yellow to orange
  Biology:   { from: "#FCA5A5", to: "#EF4444" },   // pink to red
};

function SubjectProgressSection({ subjects }: { subjects: Subject[] }) {
  return (
    <div className="rounded-3xl bg-slate-50/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl px-8 py-7 w-full">
      <div className="flex items-center gap-2 mb-6">
        <span className="font-black text-lg md:text-xl text-slate-800 dark:text-slate-100">Subject Progress</span>
        <Book className="text-indigo-500 mb-1" size={21} strokeWidth={2.1} />
      </div>
      <div>
        {subjects.map((subject, idx) => (
          <SubjectProgressCircle
            key={subject.name}
            name={subject.name}
            progress={subject.progress}
            next={subject.next}
            gradientId={`subj-gradient-${subject.name}`}
            gradient={gradients[subject.name as keyof typeof gradients]}
          />
        ))}
      </div>
    </div>
  );
}

export default SubjectProgressSection;
