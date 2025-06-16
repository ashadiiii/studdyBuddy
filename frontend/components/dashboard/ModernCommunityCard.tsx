
import React from "react";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp } from "lucide-react";

const ModernCommunityCard = () => (
  <div className="relative bg-gradient-to-br from-blue-50/70 via-white/60 to-indigo-50/70 backdrop-blur-xl border border-blue-200/30 rounded-3xl p-8 shadow-2xl group hover:shadow-3xl transition-all duration-500">
    {/* Animated glow */}
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
    
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
          <Users className="text-white" size={20} strokeWidth={2.5} />
        </div>
        <span className="font-black text-xl text-gray-800">Community</span>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="group/post bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-blue-200/50 transition-all duration-300 hover:bg-white/80 hover:scale-[1.02] hover:shadow-md cursor-pointer">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🏆</span>
            <span className="font-bold text-gray-800 group-hover/post:text-gray-900 transition-colors">Study Tips: Active Recall</span>
          </div>
          <div className="text-sm text-gray-600">124 likes • 32 comments</div>
        </div>
        
        <div className="group/post bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-blue-200/50 transition-all duration-300 hover:bg-white/80 hover:scale-[1.02] hover:shadow-md cursor-pointer">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🧪</span>
            <span className="font-bold text-gray-800 group-hover/post:text-gray-900 transition-colors">My Chemistry Journey</span>
          </div>
          <div className="text-sm text-gray-600">89 likes • 15 comments</div>
        </div>
      </div>
      
      <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
        <TrendingUp className="mr-2" size={18} />
        Join the Community
      </Button>
    </div>
  </div>
);

export default ModernCommunityCard;
