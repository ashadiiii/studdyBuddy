
import React from "react";
import { cn } from "@/lib/utils";

interface SubjectProgressBarProps {
  value: number;
  color: string;
}

export default function SubjectProgressBar({ value, color }: SubjectProgressBarProps) {
  return (
    <div className="w-full h-3 rounded-full bg-slate-100 relative overflow-hidden">
      <div
        className={cn("h-full absolute left-0 top-0 transition-all", color)}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
