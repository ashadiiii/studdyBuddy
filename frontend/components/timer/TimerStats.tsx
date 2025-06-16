
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, TrendingUp, Clock, Flame } from 'lucide-react';
import { TimerSession } from '@/pages/StudyTimer';

interface TimerStatsProps {
  sessions: TimerSession[];
}

const TimerStats: React.FC<TimerStatsProps> = ({ sessions }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaySessions = sessions.filter(session => 
    session.completedAt >= today && session.type === 'focus'
  );

  const totalFocusTime = sessions
    .filter(session => session.type === 'focus')
    .reduce((total, session) => total + session.actualDuration, 0);

  const totalSessions = sessions.filter(session => session.type === 'focus').length;
  
  const todayFocusTime = todaySessions.reduce((total, session) => total + session.actualDuration, 0);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const stats = [
    {
      title: 'Today',
      value: formatTime(todayFocusTime),
      subtitle: `${todaySessions.length} sessions`,
      icon: Target,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Total Time',
      value: formatTime(totalFocusTime),
      subtitle: 'Focus sessions',
      icon: Clock,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Sessions',
      value: totalSessions.toString(),
      subtitle: 'Completed',
      icon: TrendingUp,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Streak',
      value: '3',
      subtitle: 'Days',
      icon: Flame,
      color: 'text-orange-600 dark:text-orange-400'
    }
  ];

  return (
    <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
          Study Stats
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex p-2 rounded-lg bg-gray-100 dark:bg-gray-700 mb-2 ${stat.color}`}>
                <stat.icon size={16} />
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {stat.subtitle}
              </div>
              <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mt-1">
                {stat.title}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimerStats;
