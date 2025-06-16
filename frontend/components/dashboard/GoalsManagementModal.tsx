
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WeeklyGoal {
  title: string;
  current: number;
  target: number;
  progress: number;
}

interface GoalsManagementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goals: WeeklyGoal[];
  onGoalsUpdate: (goals: WeeklyGoal[]) => void;
}

export default function GoalsManagementModal({ 
  open, 
  onOpenChange, 
  goals, 
  onGoalsUpdate 
}: GoalsManagementModalProps) {
  const [editingGoals, setEditingGoals] = useState<WeeklyGoal[]>(goals);
  const { toast } = useToast();

  const handleAddGoal = () => {
    const newGoal: WeeklyGoal = {
      title: "New Goal",
      current: 0,
      target: 10,
      progress: 0
    };
    setEditingGoals([...editingGoals, newGoal]);
  };

  const handleRemoveGoal = (index: number) => {
    setEditingGoals(editingGoals.filter((_, i) => i !== index));
  };

  const handleGoalChange = (index: number, field: keyof WeeklyGoal, value: string | number) => {
    const updatedGoals = editingGoals.map((goal, i) => {
      if (i === index) {
        const updatedGoal = { ...goal, [field]: value };
        // Recalculate progress when current or target changes
        if (field === 'current' || field === 'target') {
          const current = field === 'current' ? Number(value) : updatedGoal.current;
          const target = field === 'target' ? Number(value) : updatedGoal.target;
          updatedGoal.progress = target > 0 ? Math.round((current / target) * 100) : 0;
        }
        return updatedGoal;
      }
      return goal;
    });
    setEditingGoals(updatedGoals);
  };

  const handleSave = () => {
    onGoalsUpdate(editingGoals);
    onOpenChange(false);
    toast({
      title: "Goals Updated",
      description: "Your weekly goals have been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditingGoals(goals);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Manage Weekly Goals
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          {editingGoals.map((goal, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Goal {index + 1}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveGoal(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <X size={16} />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`title-${index}`}>Goal Title</Label>
                  <Input
                    id={`title-${index}`}
                    value={goal.title}
                    onChange={(e) => handleGoalChange(index, 'title', e.target.value)}
                    placeholder="Enter goal title"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`current-${index}`}>Current Progress</Label>
                  <Input
                    id={`current-${index}`}
                    type="number"
                    min="0"
                    value={goal.current}
                    onChange={(e) => handleGoalChange(index, 'current', Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`target-${index}`}>Target</Label>
                  <Input
                    id={`target-${index}`}
                    type="number"
                    min="1"
                    value={goal.target}
                    onChange={(e) => handleGoalChange(index, 'target', Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Progress: {goal.progress}%</span>
                  <span>{goal.current}/{goal.target}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(goal.progress, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
          
          <Button
            onClick={handleAddGoal}
            variant="outline"
            className="w-full border-dashed border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20"
          >
            <Plus size={16} className="mr-2" />
            Add New Goal
          </Button>
        </div>
        
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            Save Goals
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
