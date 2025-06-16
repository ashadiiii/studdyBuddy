
import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface Subject {
  name: string;
  progress: number;
}
interface FitnessTrackerRingsProps {
  subjects: Subject[];
  ringChartColors: string[];
}

const FitnessTrackerRings: React.FC<FitnessTrackerRingsProps> = ({ subjects, ringChartColors }) => {
  const progressRingData = subjects.map((s, i) => ({
    name: s.name,
    value: s.progress,
    fill: ringChartColors[i % ringChartColors.length],
  }));

  return (
    <div className="bg-white/60 rounded-3xl px-7 py-8 shadow-xl border border-white/50 backdrop-blur-xl flex flex-col items-center">
      <h2 className="font-bold text-2xl mb-2 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">track_changes</span>
        Fitness Progress
      </h2>
      <ResponsiveContainer width="100%" height={230} minWidth={220}>
        <PieChart>
          <Pie
            data={progressRingData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            dataKey="value"
            isAnimationActive
          >
            {progressRingData.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-4 justify-center mt-3">
        {subjects.map((s, i) => (
          <div key={s.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: ringChartColors[i % ringChartColors.length] }}
            />
            <span className="font-semibold text-xs">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitnessTrackerRings;
