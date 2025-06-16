
import React from "react";
import { cn } from "@/lib/utils";

interface PriorityBadgeProps {
  level: "high" | "medium" | "low";
}

export default function PriorityBadge({ level }: PriorityBadgeProps) {
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
