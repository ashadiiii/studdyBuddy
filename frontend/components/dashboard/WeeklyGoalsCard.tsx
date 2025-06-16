import React, { useState } from "react";
import { Target, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import GoalsManagementModal from "./GoalsManagementModal";

interface WeeklyGoal {
  title: string;
  current: number;
  target: number;
  progress: number;
}

interface WeeklyGoalsCardProps {
  weeklyGoals: WeeklyGoal[];
  onGoalsUpdate: (goals: WeeklyGoal[]) => void;
}

export default function WeeklyGoalsCard({ weeklyGoals, onGoalsUpdate }: WeeklyGoalsCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddUpdateGoals = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-3xl shadow-2xl overflow-hidden group hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-500 h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-white/10 to-blue-50/30 dark:from-green-900/10 dark:via-gray-800/10 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl">
              <Target className="text-white" size={20} strokeWidth={2.5} />
            </div>
            <div className="text-2xl font-black text-gray-800 dark:text-gray-100">Weekly Goals</div>
          </div>

          <div className="space-y-6 mb-8">
            {weeklyGoals.map((goal, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700 dark:text-gray-200">{goal.title}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{goal.current}/{goal.target}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-700/70 relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000 ease-out rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{goal.progress}% complete</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleAddUpdateGoals}
              variant="outline"
              className="bg-white/50 dark:bg-gray-700/50 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 rounded-2xl px-6 py-2 font-semibold"
            >
              <Plus size={16} className="mr-2" />
              Add/Update Goals
            </Button>
          </div>
        </div>
      </div>

      <GoalsManagementModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        goals={weeklyGoals}
        onGoalsUpdate={onGoalsUpdate}
      />
    </>
  );
}
