
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink } from "lucide-react";

const ModernResourcesCard = () => (
  <div className="relative bg-gradient-to-br from-green-50/70 via-white/60 to-emerald-50/70 backdrop-blur-xl border border-green-200/30 rounded-3xl p-8 shadow-2xl group hover:shadow-3xl transition-all duration-500">
    {/* Animated glow */}
    <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
    
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl">
          <BookOpen className="text-white" size={20} strokeWidth={2.5} />
        </div>
        <span className="font-black text-xl text-gray-800">Resources</span>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="group/resource bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-green-200/50 transition-all duration-300 hover:bg-white/80 hover:scale-[1.02] hover:shadow-md cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-bold text-gray-800 group-hover/resource:text-gray-900 transition-colors">
                Khan Academy: Calculus
              </div>
              <div className="text-sm text-gray-600">Interactive lessons</div>
            </div>
            <div className="text-2xl font-black text-green-600">65%</div>
          </div>
          <Progress value={65} className="h-2 bg-gray-200" />
        </div>
        
        <div className="group/resource bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-green-200/50 transition-all duration-300 hover:bg-white/80 hover:scale-[1.02] hover:shadow-md cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-bold text-gray-800 group-hover/resource:text-gray-900 transition-colors">
                Coursera: Organic Chemistry
              </div>
              <div className="text-sm text-gray-600">Video course</div>
            </div>
            <div className="text-2xl font-black text-green-600">30%</div>
          </div>
          <Progress value={30} className="h-2 bg-gray-200" />
        </div>
      </div>
      
      <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
        <ExternalLink className="mr-2" size={18} />
        Browse All Courses
      </Button>
    </div>
  </div>
);

export default ModernResourcesCard;
