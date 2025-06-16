
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Calendar, Flame } from 'lucide-react';

interface WeeklyData {
  day: string;
  completed: number;
  goal: number;
}

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
  weeklyData: WeeklyData[];
}

const StreakTracker: React.FC<StreakTrackerProps> = ({
  currentStreak,
  longestStreak,
  weeklyData
}) => {
  return (
    <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Flame className="text-orange-500" size={24} />
          Streak Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Streak Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border border-orange-200 dark:border-orange-700">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {currentStreak}
            </div>
            <div className="text-sm text-orange-700 dark:text-orange-300 font-medium">
              Current Streak
            </div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-700">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {longestStreak}
            </div>
            <div className="text-sm text-purple-700 dark:text-purple-300 font-medium">
              Best Streak
            </div>
          </div>
        </div>

        {/* Weekly Activity */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Calendar size={16} />
            This Week's Activity
          </h4>
          <div className="grid grid-cols-7 gap-2">
            {weeklyData.map((day, index) => {
              const isComplete = day.completed >= day.goal;
              const completionRate = Math.min((day.completed / day.goal) * 100, 100);
              
              return (
                <div key={day.day} className="text-center">
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {day.day}
                  </div>
                  <div 
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 hover:scale-110 ${
                      isComplete 
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg' 
                        : completionRate > 0 
                          ? 'bg-gradient-to-br from-yellow-200 to-orange-300 text-orange-800' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                    title={`${day.completed}/${day.goal} tasks completed`}
                  >
                    {isComplete ? '✓' : day.completed}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Motivation */}
        <div className="text-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700">
          <Trophy className="mx-auto text-yellow-500 mb-2" size={24} />
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {currentStreak >= 7 
              ? "🔥 Amazing! You're on fire with your consistency!" 
              : currentStreak >= 3 
                ? "💪 Great job! Keep building that habit!" 
                : "🌟 Start your streak today - you've got this!"
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakTracker;
