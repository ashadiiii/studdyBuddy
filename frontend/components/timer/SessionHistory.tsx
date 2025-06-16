
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen, Coffee } from 'lucide-react';
import { TimerSession } from '@/pages/StudyTimer';
import { cn } from '@/lib/utils';

interface SessionHistoryProps {
  sessions: TimerSession[];
}

const SessionHistory: React.FC<SessionHistoryProps> = ({ sessions }) => {
  const getSessionIcon = (type: string) => {
    switch (type) {
      case 'focus': return <BookOpen size={14} />;
      case 'short-break':
      case 'long-break': return <Coffee size={14} />;
      default: return <Clock size={14} />;
    }
  };

  const getSessionColor = (type: string) => {
    switch (type) {
      case 'focus': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'short-break': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'long-break': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins}m`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Clock size={18} />
          Recent Sessions
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {sessions.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <div className="text-3xl mb-2">⏰</div>
            <p className="text-sm">No sessions completed yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Badge className={cn("text-xs", getSessionColor(session.type))}>
                    {getSessionIcon(session.type)}
                    {session.type.replace('-', ' ')}
                  </Badge>
                  
                  <div className="text-sm">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {session.subject || 'Study Session'}
                    </div>
                    {session.task && (
                      <div className="text-gray-500 dark:text-gray-400 text-xs">
                        {session.task}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right text-sm">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {formatDuration(session.actualDuration)}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">
                    {formatTime(session.completedAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SessionHistory;
