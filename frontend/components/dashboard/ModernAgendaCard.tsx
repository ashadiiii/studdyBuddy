
import React from "react";
import { Button } from "@/components/ui/button";
import { List, Sparkles } from "lucide-react";
import ModernAgendaTask from "./ModernAgendaTask";

interface AgendaTaskType {
  title: string;
  subject: string;
  done: boolean;
  priority: "high" | "medium" | "low";
}

interface ModernAgendaCardProps {
  tasks: AgendaTaskType[];
  onToggleTask: (index: number) => void;
  onOpenAI: () => void;
}

const ModernAgendaCard: React.FC<ModernAgendaCardProps> = ({
  tasks,
  onToggleTask,
  onOpenAI,
}) => {
  return (
    <div className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden group hover:bg-white/80 transition-all duration-500">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/20 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
            <List className="text-white" size={20} strokeWidth={2.5} />
          </div>
          <div className="text-2xl font-black text-gray-800">Today's Agenda</div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3 mb-8">
          {tasks.map((task, index) => (
            <ModernAgendaTask
              key={index}
              title={task.title}
              subject={task.subject}
              done={task.done}
              priority={task.priority}
              onToggle={() => onToggleTask(index)}
              delay={index * 100}
            />
          ))}
        </div>

        {/* AI Action Button */}
        <div className="flex justify-center">
          <Button
            onClick={onOpenAI}
            className="group/btn bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Sparkles className="mr-2 group-hover/btn:animate-spin transition-transform" size={18} />
            Ask AI to Plan Your Day
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModernAgendaCard;
