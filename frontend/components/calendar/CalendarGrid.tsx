
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CalendarEvent } from '@/pages/Calendar';

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  viewMode: 'month' | 'week' | 'day';
}

const eventTypeColors = {
  'task': 'bg-blue-500',
  'study-session': 'bg-green-500',
  'exam': 'bg-red-500',
  'deadline': 'bg-orange-500',
  'reminder': 'bg-purple-500'
};

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  events,
  selectedDate,
  onDateSelect,
  viewMode
}) => {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (viewMode === 'month') {
    return (
      <div className="space-y-4">
        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => (
            <div
              key={index}
              className={cn(
                "min-h-[100px] p-2 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer transition-all duration-200",
                date ? "hover:bg-gray-50 dark:hover:bg-gray-800" : "bg-gray-50 dark:bg-gray-900 cursor-default",
                date && isToday(date) && "bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600",
                date && isSelected(date) && "bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-600 ring-2 ring-purple-200 dark:ring-purple-700"
              )}
              onClick={() => date && onDateSelect(date)}
            >
              {date && (
                <>
                  <div className={cn(
                    "text-sm font-semibold mb-2",
                    isToday(date) ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-white"
                  )}>
                    {date.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {getEventsForDate(date).slice(0, 3).map(event => (
                      <div
                        key={event.id}
                        className={cn(
                          "text-xs px-2 py-1 rounded-md text-white font-medium truncate",
                          eventTypeColors[event.type]
                        )}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                    {getEventsForDate(date).length > 3 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 px-2">
                        +{getEventsForDate(date).length - 3} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Week and day views can be implemented later
  return (
    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
      {viewMode} view coming soon...
    </div>
  );
};

export default CalendarGrid;
