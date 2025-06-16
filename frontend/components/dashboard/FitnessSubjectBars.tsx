
import React from "react";

interface Subject {
  name: string;
  progress: number;
  due: string;
}
interface FitnessSubjectBarsProps {
  subjects: Subject[];
  ringChartColors: string[];
}

const FitnessSubjectBars: React.FC<FitnessSubjectBarsProps> = ({ subjects, ringChartColors }) => (
  <div className="mt-2 grid gap-4">
    {subjects.map((s, i) => (
      <div
        key={s.name}
        className="relative flex items-center animate-fade-in group cursor-pointer hover:scale-105 transition-transform"
      >
        <div
          className="w-1 h-7 mr-4 rounded-full"
          style={{ background: ringChartColors[i % ringChartColors.length] }}
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className="font-bold text-lg">{s.name}</div>
            <span className="text-xs text-muted-foreground">{s.progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-xl mt-1 overflow-hidden">
            <div
              className="h-2 rounded-xl transition-all duration-700"
              style={{ width: `${s.progress}%`, background: ringChartColors[i % ringChartColors.length] }}
            />
          </div>
        </div>
        <div className="ml-5 min-w-20 text-xs text-slate-400">{s.due}</div>
      </div>
    ))}
  </div>
);

export default FitnessSubjectBars;
