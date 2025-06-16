
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';

interface Subject {
  name: string;
  progress: number;
  color: string;
  tasks: { completed: number; total: number };
}

interface TaskStatusOverviewProps {
  subjects: Subject[];
}

const TaskStatusOverview: React.FC<TaskStatusOverviewProps> = ({ subjects }) => {
  const totalTasks = subjects.reduce((sum, subject) => sum + subject.tasks.total, 0);
  const completedTasks = subjects.reduce((sum, subject) => sum + subject.tasks.completed, 0);
  const pendingTasks = totalTasks - completedTasks;
  
  const overallProgress = Math.round((completedTasks / totalTasks) * 100);

  const getStatusColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600 dark:text-green-400';
    if (progress >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getStatusIcon = (progress: number) => {
    if (progress >= 80) return CheckCircle2;
    if (progress >= 60) return Clock;
    return AlertCircle;
  };

  return (
    <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <CheckCircle2 className="text-green-500" size={24} />
          Task Status Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Stats */}
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            {overallProgress}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Overall Completion
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            {completedTasks} of {totalTasks} tasks completed
          </div>
        </div>

        {/* Task Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-green-600 dark:text-green-400" size={20} />
              <span className="font-medium text-green-800 dark:text-green-200">Completed</span>
            </div>
            <span className="font-bold text-green-600 dark:text-green-400">{completedTasks}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700">
            <div className="flex items-center gap-2">
              <Circle className="text-orange-600 dark:text-orange-400" size={20} />
              <span className="font-medium text-orange-800 dark:text-orange-200">Pending</span>
            </div>
            <span className="font-bold text-orange-600 dark:text-orange-400">{pendingTasks}</span>
          </div>
        </div>

        {/* Subject Status */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Subject Status</h4>
          <div className="space-y-2">
            {subjects.map((subject) => {
              const StatusIcon = getStatusIcon(subject.progress);
              return (
                <div 
                  key={subject.name}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {subject.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusIcon 
                      className={getStatusColor(subject.progress)} 
                      size={16} 
                    />
                    <span className={`text-sm font-medium ${getStatusColor(subject.progress)}`}>
                      {subject.progress}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Motivation Message */}
        <div className="text-center p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700">
          <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">
            {overallProgress >= 80 
              ? "🌟 Excellent work! You're crushing your goals!"
              : overallProgress >= 60 
                ? "💪 Great progress! Keep up the momentum!"
                : "🚀 Every step counts! You're on your way!"
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskStatusOverview;
