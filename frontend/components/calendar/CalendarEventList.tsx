
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CalendarEvent } from '@/pages/Calendar';

interface CalendarEventListProps {
  date: Date;
  events: CalendarEvent[];
  onEventUpdate: (event: CalendarEvent) => void;
}

const eventTypeConfig = {
  'task': { 
    label: 'Task', 
    bg: 'bg-blue-100 dark:bg-blue-900/30', 
    text: 'text-blue-700 dark:text-blue-400',
    icon: '📋'
  },
  'study-session': { 
    label: 'Study Session', 
    bg: 'bg-green-100 dark:bg-green-900/30', 
    text: 'text-green-700 dark:text-green-400',
    icon: '📚'
  },
  'exam': { 
    label: 'Exam', 
    bg: 'bg-red-100 dark:bg-red-900/30', 
    text: 'text-red-700 dark:text-red-400',
    icon: '📝'
  },
  'deadline': { 
    label: 'Deadline', 
    bg: 'bg-orange-100 dark:bg-orange-900/30', 
    text: 'text-orange-700 dark:text-orange-400',
    icon: '⏰'
  },
  'reminder': { 
    label: 'Reminder', 
    bg: 'bg-purple-100 dark:bg-purple-900/30', 
    text: 'text-purple-700 dark:text-purple-400',
    icon: '🔔'
  }
};

const priorityConfig = {
  high: { bg: "bg-red-500", text: "text-white" },
  medium: { bg: "bg-yellow-500", text: "text-white" },
  low: { bg: "bg-green-500", text: "text-white" },
};

const CalendarEventList: React.FC<CalendarEventListProps> = ({
  date,
  events,
  onEventUpdate
}) => {
  const sortedEvents = events.sort((a, b) => a.time.localeCompare(b.time));

  const handleToggleComplete = (event: CalendarEvent) => {
    onEventUpdate({
      ...event,
      completed: !event.completed
    });
  };

  return (
    <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
          Events for {date.toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
          })}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {events.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <div className="text-4xl mb-2">📅</div>
            <p>No events scheduled for this day</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedEvents.map((event) => {
              const typeConfig = eventTypeConfig[event.type];
              const priority = priorityConfig[event.priority];
              
              return (
                <div
                  key={event.id}
                  className={cn(
                    "p-4 rounded-xl border transition-all duration-200 hover:shadow-lg",
                    typeConfig.bg,
                    event.completed && "opacity-60"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg">{typeConfig.icon}</span>
                        <h3 className={cn(
                          "font-semibold text-lg",
                          typeConfig.text,
                          event.completed && "line-through"
                        )}>
                          {event.title}
                        </h3>
                        <Badge 
                          className={cn(
                            "text-xs font-bold rounded-full",
                            priority.bg,
                            priority.text
                          )}
                        >
                          {event.priority}
                        </Badge>
                      </div>
                      
                      {event.description && (
                        <p className={cn("text-sm mb-3", typeConfig.text)}>
                          {event.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{event.time}</span>
                          {event.duration > 0 && (
                            <span className="text-gray-500">
                              ({event.duration}min)
                            </span>
                          )}
                        </div>
                        
                        {event.subject && (
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{event.subject}</span>
                          </div>
                        )}
                        
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs", typeConfig.text)}
                        >
                          {typeConfig.label}
                        </Badge>
                      </div>
                    </div>
                    
                    {(event.type === 'task' || event.type === 'study-session') && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleComplete(event)}
                        className={cn(
                          "ml-4 p-2 rounded-lg transition-colors",
                          event.completed 
                            ? "text-green-600 dark:text-green-400" 
                            : "text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                        )}
                      >
                        <CheckCircle 
                          size={20} 
                          className={event.completed ? "fill-current" : ""} 
                        />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CalendarEventList;
