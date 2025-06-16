
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Progress as ProgressBar } from '../../../components/ui/progress';
import { Badge } from '../../../components/ui/badge';
import { TrendingUp, Target, Calendar, Trophy, Book, Clock, CheckCircle2, Circle } from 'lucide-react';
import ProgressStats from '../../../components/progress/ProgressStats';
import SubjectProgressChart from '../../../components/progress/SubjectProgressChart';
import StreakTracker from '../../../components/progress/StreakTracker';
import WeeklyProgress from '../../../components/progress/WeeklyProgress';
import TaskStatusOverview from '../../../components/progress/TaskStatusOverview';

const Progress = () => {
  // Sample data - in a real app, this would come from your state management
  const overallProgress = 73;
  const weeklyGoal = 85;
  const currentStreak = 12;
  const longestStreak = 18;
  
  const subjectProgress = [
    { name: 'Mathematics', progress: 85, color: '#8B5CF6', tasks: { completed: 12, total: 15 } },
    { name: 'Chemistry', progress: 67, color: '#10B981', tasks: { completed: 8, total: 12 } },
    { name: 'Physics', progress: 78, color: '#F59E0B', tasks: { completed: 14, total: 18 } },
    { name: 'Biology', progress: 45, color: '#EF4444', tasks: { completed: 9, total: 20 } },
    { name: 'History', progress: 92, color: '#3B82F6', tasks: { completed: 11, total: 12 } },
  ];

  const weeklyData = [
    { day: 'Mon', completed: 3, goal: 4 },
    { day: 'Tue', completed: 5, goal: 4 },
    { day: 'Wed', completed: 2, goal: 4 },
    { day: 'Thu', completed: 4, goal: 4 },
    { day: 'Fri', completed: 6, goal: 4 },
    { day: 'Sat', completed: 1, goal: 4 },
    { day: 'Sun', completed: 3, goal: 4 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <span className="text-2xl">📈</span>
              Visual Progress Tracker
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track your academic progress and stay motivated
            </p>
          </div>
          <Badge 
            variant="secondary" 
            className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700"
          >
            Week {new Date().getWeek()} Progress
          </Badge>
        </div>

        {/* Progress Stats */}
        <ProgressStats 
          overallProgress={overallProgress}
          weeklyGoal={weeklyGoal}
          currentStreak={currentStreak}
          longestStreak={longestStreak}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subject Progress Chart */}
          <SubjectProgressChart subjects={subjectProgress} />
          
          {/* Streak Tracker */}
          <StreakTracker 
            currentStreak={currentStreak}
            longestStreak={longestStreak}
            weeklyData={weeklyData}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Progress */}
          <div className="lg:col-span-2">
            <WeeklyProgress weeklyData={weeklyData} />
          </div>
          
          {/* Task Status Overview */}
          <TaskStatusOverview subjects={subjectProgress} />
        </div>

        {/* Detailed Subject Progress */}
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Book className="text-purple-500" size={24} />
              Subject Progress Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {subjectProgress.map((subject, index) => (
              <div 
                key={subject.name}
                className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-gray-50/50 dark:from-gray-700/50 dark:to-gray-800/50 border border-gray-200/30 dark:border-gray-600/30 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {subject.name}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {subject.tasks.completed}/{subject.tasks.total} tasks
                    </Badge>
                  </div>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">
                    {subject.progress}%
                  </span>
                </div>
                <ProgressBar 
                  value={subject.progress} 
                  className="h-3"
                  style={{
                    background: `linear-gradient(to right, ${subject.color}20, ${subject.color}10)`
                  }}
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <span>Completed: {subject.tasks.completed}</span>
                  <span>Remaining: {subject.tasks.total - subject.tasks.completed}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper to get week number
declare global {
  interface Date {
    getWeek(): number;
  }
}

Date.prototype.getWeek = function() {
  const onejan = new Date(this.getFullYear(), 0, 1);
  const today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
  const dayOfYear = ((today.getTime() - onejan.getTime() + 86400000) / 86400000);
  return Math.ceil(dayOfYear / 7);
};

export default Progress;