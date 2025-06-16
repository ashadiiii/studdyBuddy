"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Book } from 'lucide-react';

interface Subject {
  name: string;
  progress: number;
  color: string;
  tasks: { completed: number; total: number };
}

interface SubjectProgressChartProps {
  subjects: Subject[];
}

const SubjectProgressChart: React.FC<SubjectProgressChartProps> = ({ subjects }) => {
  const chartData = subjects.map(subject => ({
    name: subject.name,
    value: subject.progress,
    color: subject.color,
    completed: subject.tasks.completed,
    total: subject.tasks.total
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white">{data.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Progress: {data.value}%
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tasks: {data.completed}/{data.total}
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
          <Book className="text-blue-500" size={24} />
          Subject Progress Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke={entry.color}
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry: any) => (
                  <span style={{ color: entry.color }} className="text-sm font-medium">
                    {value} ({entry.payload.value}%)
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectProgressChart;
