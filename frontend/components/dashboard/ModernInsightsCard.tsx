
import React from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb, Sparkles } from "lucide-react";

const aiInsights = [
  "🧠 Take a 15-minute break – you've been studying for 2 hours",
  "⚗️ Review Chemistry basics before tomorrow's lab",
  "📈 Your Physics performance improved 20% this week!",
  "🎯 Consider using spaced repetition for better retention"
];

const ModernInsightsCard = ({ onAsk }: { onAsk: () => void }) => (
  <div className="relative bg-gradient-to-br from-yellow-50/70 via-white/60 to-orange-50/70 backdrop-blur-xl border border-yellow-200/30 rounded-3xl p-8 shadow-2xl group hover:shadow-3xl transition-all duration-500">
    {/* Animated glow */}
    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-pink-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
    
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl">
          <Lightbulb className="text-white" size={20} strokeWidth={2.5} />
        </div>
        <span className="font-black text-xl text-gray-800">AI Insights</span>
      </div>
      
      <div className="space-y-4 mb-6">
        {aiInsights.map((insight, i) => (
          <div 
            key={i} 
            className="group/insight bg-white/60 backdrop-blur-sm px-4 py-3 rounded-2xl border border-yellow-200/50 transition-all duration-300 hover:bg-white/80 hover:scale-[1.02] hover:shadow-md cursor-pointer"
            style={{
              animationDelay: `${i * 100}ms`,
              animationFillMode: "both"
            }}
          >
            <div className="text-sm font-medium text-gray-800 group-hover/insight:text-gray-900 transition-colors">
              {insight}
            </div>
          </div>
        ))}
      </div>
      
      <Button
        onClick={onAsk}
        className="group/btn w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <Sparkles className="mr-2 group-hover/btn:animate-spin transition-transform" size={18} />
        Get More Insights
      </Button>
    </div>
  </div>
);

export default ModernInsightsCard;
