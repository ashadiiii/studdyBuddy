
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart3, Clock, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface PerformanceData {
  weeklyProgress: Array<{ week: string; score: number; techniques: number }>;
  subjectPerformance: Array<{ subject: string; score: number; improvement: number }>;
  timeDistribution: Array<{ technique: string; hours: number; effectiveness: number }>;
  streakData: { current: number; longest: number; weeklyGoal: number };
}

interface PerformanceInsightsProps {
  performanceData: PerformanceData;
}

const PerformanceInsights: React.FC<PerformanceInsightsProps> = ({ performanceData }) => {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium">Study Streak</p>
                <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                  {performanceData.streakData.current} days
                </p>
                <p className="text-green-600 dark:text-green-400 text-xs">
                  Longest: {performanceData.streakData.longest} days
                </p>
              </div>
              <TrendingUp className="text-green-500" size={32} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Weekly Goal</p>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                  {Math.round((performanceData.streakData.current / performanceData.streakData.weeklyGoal) * 100)}%
                </p>
                <p className="text-blue-600 dark:text-blue-400 text-xs">
                  {performanceData.streakData.current}/{performanceData.streakData.weeklyGoal} days
                </p>
              </div>
              <Target className="text-blue-500" size={32} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border border-purple-200/50 dark:border-purple-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Avg. Effectiveness</p>
                <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                  {Math.round(performanceData.timeDistribution.reduce((acc, item) => acc + item.effectiveness, 0) / performanceData.timeDistribution.length)}%
                </p>
                <p className="text-purple-600 dark:text-purple-400 text-xs">
                  Based on techniques used
                </p>
              </div>
              <BarChart3 className="text-purple-500" size={32} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} />
              Weekly Progress Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData.weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="week" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock size={20} />
              Time Distribution by Technique
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData.timeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="technique" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Performance */}
      <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 size={20} />
            Subject Performance Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData.subjectPerformance.map((subject) => (
              <div key={subject.subject} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {subject.subject}
                  </div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {subject.score}%
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {subject.improvement >= 0 ? (
                    <TrendingUp className="text-green-500" size={16} />
                  ) : (
                    <TrendingDown className="text-red-500" size={16} />
                  )}
                  <Badge 
                    className={`${subject.improvement >= 0 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}
                  >
                    {subject.improvement >= 0 ? '+' : ''}{subject.improvement}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceInsights;
