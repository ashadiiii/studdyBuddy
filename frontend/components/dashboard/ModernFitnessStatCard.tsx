
import React from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export interface ModernFitnessStatCardProps {
  title: string;
  value: string;
  sub?: React.ReactNode;
  icon?: React.ReactNode;
  gradient?: string;
  delay?: number;
  progress?: number;
  onClick?: () => void;
  isClickable?: boolean;
}

const ModernFitnessStatCard: React.FC<ModernFitnessStatCardProps> = ({
  title,
  value,
  sub,
  icon,
  gradient = "from-blue-400 to-blue-600",
  delay = 0,
  progress,
  onClick,
  isClickable = false,
}) => (
  <div
    className={cn(
      "group relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl hover:bg-white/80",
      "before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/40 before:to-white/10 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
      isClickable && "cursor-pointer active:scale-[0.98]"
    )}
    style={{
      animationDelay: `${delay}ms`,
      animationFillMode: "both"
    }}
    onClick={onClick}
    tabIndex={isClickable ? 0 : undefined}
  >
    {/* Gradient glow effect */}
    <div className={cn(
      "absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl blur-xl",
      gradient
    )} />
    
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <div className="text-sm font-bold text-gray-500 tracking-wider uppercase">
          {title}
        </div>
        <div className={cn(
          "p-2 rounded-2xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-110",
          gradient
        )}>
          <div className="text-white drop-shadow-lg">
            {icon}
          </div>
        </div>
      </div>
      
      <div className="text-3xl font-black text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
        {value}
      </div>
      
      {sub && (
        <div className="text-sm font-semibold text-gray-600 mb-3">
          {sub}
        </div>
      )}
      
      {typeof progress === "number" && (
        <div className="space-y-2">
          <Progress 
            value={progress} 
            className="h-2 bg-gray-200"
          />
          <div className="text-xs font-bold text-gray-500 text-right">
            {progress}%
          </div>
        </div>
      )}
      
      {isClickable && (
        <div className="absolute top-3 right-3 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
      )}
    </div>
  </div>
);

export default ModernFitnessStatCard;
