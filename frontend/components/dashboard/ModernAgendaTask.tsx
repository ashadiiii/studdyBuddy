
import React, { useState } from "react";
import { cn } from "../../lib/utils";

function ModernPriorityBadge({ level }: { level: "high" | "medium" | "low" }) {
  const config = {
    high: { bg: "bg-gradient-to-r from-red-400 to-red-600", text: "text-white", glow: "shadow-red-400/50" },
    medium: { bg: "bg-gradient-to-r from-purple-400 to-purple-600", text: "text-white", glow: "shadow-purple-400/50" },
    low: { bg: "bg-gradient-to-r from-yellow-400 to-yellow-600", text: "text-white", glow: "shadow-yellow-400/50" },
  }[level];
  
  return (
    <span className={cn(
      "rounded-full px-3 py-1 text-xs font-bold shadow-lg transition-all duration-300 hover:scale-105",
      config.bg,
      config.text,
      config.glow
    )}>
      {level}
    </span>
  );
}

interface ModernAgendaTaskProps {
  title: string;
  subject: string;
  done: boolean;
  priority: "high" | "medium" | "low";
  onToggle: () => void;
  delay?: number;
}

const ModernAgendaTask: React.FC<ModernAgendaTaskProps> = ({
  title,
  subject,
  done,
  priority,
  onToggle,
  delay = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer",
        "hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
        done
          ? "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 opacity-75"
          : "bg-gradient-to-r from-white to-gray-50 border-gray-200 hover:border-gray-300 hover:bg-white"
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "both"
      }}
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="checkbox"
      aria-checked={done}
    >
      {/* Custom checkbox */}
      <div className={cn(
        "relative w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center",
        done
          ? "bg-gradient-to-r from-green-400 to-green-600 border-green-500 scale-110"
          : "border-gray-300 hover:border-gray-400 group-hover:scale-110"
      )}>
        {done && (
          <div className="text-white text-sm font-bold animate-fade-in">✓</div>
        )}
        {!done && isHovered && (
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-full animate-pulse" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className={cn(
          "font-semibold text-gray-900 transition-all duration-300 truncate",
          done && "line-through text-gray-500"
        )}>
          {title}
        </div>
        <div className="text-sm text-gray-600 font-medium">{subject}</div>
      </div>

      <ModernPriorityBadge level={priority} />
    </div>
  );
};

export default ModernAgendaTask;
