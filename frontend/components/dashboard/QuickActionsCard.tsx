
import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Timer, Users, Award, Calculator, FileText } from "lucide-react";

const QuickActionsCard: React.FC = () => {
  const quickActions = [
    { label: "Start Study Session", icon: Timer, color: "from-green-400 to-emerald-500" },
    { label: "Join Study Group", icon: Users, color: "from-blue-400 to-indigo-500" },
    { label: "View Achievements", icon: Award, color: "from-purple-400 to-violet-500" },
    { label: "Quick Calculator", icon: Calculator, color: "from-orange-400 to-red-500" },
    { label: "Take Notes", icon: FileText, color: "from-pink-400 to-rose-500" },
    { label: "Browse Library", icon: BookOpen, color: "from-teal-400 to-cyan-500" },
  ];

  return (
    <div className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden group hover:bg-white/80 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white/20 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl">
            <Timer className="text-white" size={20} strokeWidth={2.5} />
          </div>
          <div className="text-2xl font-black text-gray-800">Quick Actions</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`h-16 flex flex-col items-center gap-2 hover:scale-105 transition-all duration-300 bg-gradient-to-r ${action.color} text-white hover:shadow-lg group/btn`}
            >
              <action.icon size={20} className="group-hover/btn:scale-110 transition-transform" />
              <span className="text-xs font-semibold">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActionsCard;
