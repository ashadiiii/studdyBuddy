
import React, { useState } from "react";
import { cn } from "@/lib/utils";

type Gradient = {
  from: string;
  to: string;
};

const ModernSubjectProgressCircle = ({
  name,
  progress,
  next,
  gradientId,
  gradient,
  delay = 0,
}: {
  name: string;
  progress: number;
  next: string;
  gradientId: string;
  gradient: Gradient;
  delay?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progressStroke = (progress / 100) * circumference;

  return (
    <div 
      className="group flex items-center gap-6 p-4 rounded-2xl transition-all duration-300 hover:bg-white/40 hover:backdrop-blur-sm cursor-pointer"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "both"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative" style={{ width: 88, height: 88 }}>
        {/* Glow effect */}
        <div className={cn(
          "absolute inset-0 rounded-full transition-opacity duration-500",
          isHovered ? "opacity-30" : "opacity-0"
        )} 
        style={{
          background: `radial-gradient(circle, ${gradient.from}40, transparent 70%)`,
          filter: "blur(8px)"
        }} />
        
        <svg width={88} height={88} className="relative z-10 transform transition-transform duration-300 group-hover:scale-105">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradient.from} />
              <stop offset="100%" stopColor={gradient.to} />
            </linearGradient>
            <filter id={`glow-${gradientId}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background circle */}
          <circle
            cx={44}
            cy={44}
            r={normalizedRadius}
            fill="none"
            stroke="#F1F5F9"
            strokeWidth={stroke}
          />
          
          {/* Progress circle */}
          <circle
            cx={44}
            cy={44}
            r={normalizedRadius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progressStroke}
            strokeLinecap="round"
            filter={isHovered ? `url(#glow-${gradientId})` : undefined}
            style={{ 
              transition: "stroke-dashoffset 1s ease-in-out, filter 0.3s",
              transformOrigin: "center",
              transform: "rotate(-90deg)"
            }}
          />
        </svg>
        
        {/* Progress text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-gray-800">{progress}</span>
          <span className="text-xs font-bold text-gray-500">%</span>
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-lg text-gray-900 group-hover:text-gray-800 transition-colors">
            {name}
          </span>
          <div 
            className="w-3 h-3 rounded-full"
            style={{ background: `linear-gradient(45deg, ${gradient.from}, ${gradient.to})` }}
          />
        </div>
        <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
          <span className="font-semibold">Next:</span> {next}
        </div>
      </div>
    </div>
  );
};

export default ModernSubjectProgressCircle;
