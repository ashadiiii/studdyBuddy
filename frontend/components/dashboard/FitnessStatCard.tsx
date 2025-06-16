
import React from "react";
import { cn } from "@/lib/utils";

export interface FitnessStatCardProps {
  title: string;
  value: string;
  sub?: React.ReactNode;
  icon?: React.ReactNode;
  accentColor?: string; // tailwind class e.g. "from-blue-500 to-indigo-500"
  onClick?: () => void;
  children?: React.ReactNode;
}

const FitnessStatCard: React.FC<FitnessStatCardProps> = ({
  title,
  value,
  sub,
  icon,
  accentColor = "from-blue-400 to-blue-600",
  onClick,
  children,
}) => (
  <div
    className={cn(
      "relative flex flex-col justify-between min-w-[170px] bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl p-6 shadow-xl group transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl cursor-pointer",
      "before:absolute before:inset-0 before:rounded-2xl before:opacity-80 before:pointer-events-none before:z-[1]",
      "active:scale-[0.98]"
    )}
    style={{
      background: "linear-gradient(135deg,rgba(255,255,255,0.7) 60%,rgba(245,245,255,0.9))"
    }}
    onClick={onClick}
    tabIndex={0}
  >
    <div className="flex justify-between items-center mb-2">
      <div className="text-xs font-bold text-gray-500 tracking-[.08em] uppercase z-10">{title}</div>
      <div className="z-10">{icon}</div>
    </div>
    <div className={cn("text-4xl font-extrabold text-gray-900 mb-1 z-10")}>{value}</div>
    {sub && (
      <div className="text-xs font-semibold text-primary/70 my-1 z-10">{sub}</div>
    )}
    {/* Glass reflection */}
    <div className={cn(
      "pointer-events-none absolute left-2 top-2 right-2 h-[20%] rounded-xl bg-gradient-to-br from-white/90 to-white/0 blur-sm opacity-45 z-[2]"
    )} />
    {/* Optional children (progress/rings) */}
    {children}
  </div>
);

export default FitnessStatCard;
