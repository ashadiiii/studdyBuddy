
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

function PriorityBadge({ level }: { level: "high" | "medium" | "low" }) {
  const color = {
    high: "bg-red-100 text-red-600",
    medium: "bg-purple-100 text-purple-600",
    low: "bg-yellow-100 text-yellow-700",
  }[level];
  return (
    <span className={cn("rounded px-2.5 py-0.5 text-xs font-semibold", color)}>
      {level}
    </span>
  );
}

interface AgendaTaskProps {
  title: string;
  subject: string;
  done: boolean;
  priority: "high" | "medium" | "low";
  onToggle: () => void;
}

// Interactive agenda task with text-only check/circle indicator
const AgendaTask: React.FC<AgendaTaskProps> = ({
  title,
  subject,
  done,
  priority,
  onToggle,
}) => (
  <div
    className={cn(
      "flex items-center px-4 py-3 rounded-lg mb-1 border transition-all relative group cursor-pointer focus-within:ring-2 ring-ring hover:scale-[1.015] duration-150",
      done
        ? "bg-slate-50 text-muted-foreground line-through opacity-80"
        : "bg-slate-100 hover:bg-slate-200 shadow-sm"
    )}
    tabIndex={0}
    onClick={onToggle}
    onKeyDown={(e) => {
      if (e.key === " " || e.key === "Enter") onToggle();
    }}
    aria-checked={done}
    role="checkbox"
  >
    {/* Replacing icons with text: "✔" if done, "○" if not */}
    <span className={cn(
      "text-lg mr-3 text-primary transition-all duration-150 font-bold select-none",
      done ? "scale-100 animate-pop" : "opacity-80"
    )}>
      {done ? "✔" : "○"}
    </span>
    <div className="flex-1 truncate">
      <div className={cn("font-medium truncate", done && "line-through")}>{title}</div>
      <div className="text-xs text-slate-400">{subject}</div>
    </div>
    <PriorityBadge level={priority} />
  </div>
);

export default AgendaTask;
