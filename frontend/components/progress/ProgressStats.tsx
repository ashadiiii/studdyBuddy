

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Trophy, Calendar } from 'lucide-react';

interface ProgressStatsProps {
  overallProgress: number;
  weeklyGoal: number;
  currentStreak: number;
  longestStreak: number;
}

const ProgressStats: React.FC<ProgressStatsProps> = ({
  overallProgress,
  weeklyGoal,
  currentStreak,
  longestStreak
}) => {
  const stats = [
    {
      title: 'Overall Progress',
      value: `${overallProgress}%`,
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      progress: overallProgress,
      description: 'Total completion across all subjects'
    },
    {
      title: 'Weekly Goal',
      value: `${weeklyGoal}%`,
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      progress: weeklyGoal,
      description: 'This week\'s target achievement'
    },
    {
      title: 'Current Streak',
      value: `${currentStreak} days`,
      icon: Calendar,
      color: 'from-orange-500 to-red-500',
      progress: (currentStreak / 30) * 100,
      description: 'Consecutive days of progress'
    },
    {
      title: 'Best Streak',
      value: `${longestStreak} days`,
      icon: Trophy,
      color: 'from-purple-500 to-pink-500',
      progress: (longestStreak / 30) * 100,
      description: 'Your personal best streak'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.title}
                </div>
              </div>
            </div>
            
            <Progress 
              value={stat.progress} 
              className="h-2 mb-2"
            />
            
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProgressStats;
