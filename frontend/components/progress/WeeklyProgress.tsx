"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BarChart3 } from 'lucide-react';

interface WeeklyData {
  day: string;
  completed: number;
  goal: number;
}

interface WeeklyProgressProps {
  weeklyData: WeeklyData[];
}

const WeeklyProgress: React.FC<WeeklyProgressProps> = ({ weeklyData }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Completed: {payload[0].value} tasks
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Goal: {payload[1].value} tasks
          </p>
          <p className="text-sm font-medium">
            {payload[0].value >= payload[1].value ? '🎯 Goal Achieved!' : '📈 Keep Going!'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <BarChart3 className="text-green-500" size={24} />
          Weekly Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
              <XAxis 
                dataKey="day" 
                stroke="#6b7280"
                className="dark:stroke-gray-400"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280"
                className="dark:stroke-gray-400"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="completed" 
                name="Completed Tasks"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="goal" 
                name="Daily Goal"
                fill="#e5e7eb"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Weekly Summary */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700/50 dark:to-blue-900/20">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {weeklyData.reduce((sum, day) => sum + day.completed, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Completed</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {weeklyData.reduce((sum, day) => sum + day.goal, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Weekly Goal</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {Math.round((weeklyData.reduce((sum, day) => sum + day.completed, 0) / weeklyData.reduce((sum, day) => sum + day.goal, 0)) * 100)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyProgress;
