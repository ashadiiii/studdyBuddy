
import React from "react";

type Gradient = {
  from: string;
  to: string;
};
const gradients = {
  Mathematics: { from: "#818CF8", to: "#7C3AED" }, // indigo to violet
  Chemistry: { from: "#3EE9A4", to: "#059669" },   // teal to emerald
  Physics:   { from: "#FDE68A", to: "#F59E42" },   // yellow to orange
  Biology:   { from: "#FCA5A5", to: "#EF4444" },   // pink to red
};

const SubjectProgressCircle = ({
  name,
  progress,
  next,
  gradientId,
  gradient,
}: {
  name: string;
  progress: number;
  next: string;
  gradientId: string;
  gradient: Gradient;
}) => {
  const radius = 36;
  const stroke = 7;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progressStroke = (progress / 100) * circumference;

  return (
    <div className="flex items-center gap-5 mb-7 last:mb-0">
      <div className="relative" style={{ width: 80, height: 80 }}>
        <svg width={80} height={80}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradient.from} />
              <stop offset="100%" stopColor={gradient.to} />
            </linearGradient>
          </defs>
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            stroke="#E5E7EB"
            className="dark:stroke-slate-600"
            strokeWidth={stroke}
          />
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progressStroke}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.6s", filter: "drop-shadow(0 0 4px #fff9)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center font-extrabold text-lg text-slate-800 dark:text-slate-100 select-none">
          {progress}
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">%</span>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-base text-slate-900 dark:text-slate-100">{name}</span>
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-300 mt-2">
          <span className="font-bold text-slate-700 dark:text-slate-200">Next:</span> {next}
        </div>
      </div>
    </div>
  );
};

export default SubjectProgressCircle;
