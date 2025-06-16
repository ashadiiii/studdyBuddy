import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { cn } from '../../../lib/utils';
import CalendarGrid from '../../../components/calendar/CalendarGrid';
import CalendarEventList from '../../../components/calendar/CalendarEventList';
import AddEventDialog from '../../../components/calendar/AddEventDialog';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: 'task' | 'study-session' | 'exam' | 'deadline' | 'reminder';
  subject?: string;
  priority: 'high' | 'medium' | 'low';
  completed?: boolean;
}

const initialEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Math Quiz',
    description: 'Chapter 5-6 quadratic equations',
    date: '2024-06-15',
    time: '09:00',
    duration: 90,
    type: 'exam',
    subject: 'Mathematics',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Study Session - Physics',
    description: 'Review pendulum motion concepts',
    date: '2024-06-16',
    time: '14:00',
    duration: 120,
    type: 'study-session',
    subject: 'Physics',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'History Essay Due',
    description: 'Submit World War II essay',
    date: '2024-06-18',
    time: '23:59',
    duration: 0,
    type: 'deadline',
    subject: 'History',
    priority: 'high'
  },
  {
    id: '4',
    title: 'Biology Lab Report',
    description: 'Complete cell division lab analysis',
    date: '2024-06-20',
    time: '16:00',
    duration: 60,
    type: 'task',
    subject: 'Biology',
    priority: 'medium'
  }
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleAddEvent = (newEvent: Omit<CalendarEvent, 'id'>) => {
    const event: CalendarEvent = {
      ...newEvent,
      id: Date.now().toString()
    };
    setEvents(prev => [...prev, event]);
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
              <CalendarIcon className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Study Calendar
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Plan and track your study schedule
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {['month', 'week', 'day'].map((mode) => (
                <Button
                  key={mode}
                  variant={viewMode === mode ? 'default' : 'ghost'}
                  size="sm"
                  className={cn(
                    "text-xs font-semibold capitalize",
                    viewMode === mode 
                      ? "bg-white dark:bg-gray-700 shadow-sm" 
                      : "hover:bg-gray-50 dark:hover:bg-gray-700"
                  )}
                  onClick={() => setViewMode(mode as any)}
                >
                  {mode}
                </Button>
              ))}
            </div>
            
            <Button 
              onClick={() => setShowAddDialog(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="mr-2" size={18} />
              Add Event
            </Button>
          </div>
        </div>

        {/* Calendar Header with Navigation */}
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <ChevronLeft size={20} />
                </Button>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h2>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <ChevronRight size={20} />
                </Button>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
                className="font-semibold"
              >
                Today
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <CalendarGrid 
              currentDate={currentDate}
              events={events}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              viewMode={viewMode}
            />
          </CardContent>
        </Card>

        {/* Events for Selected Date */}
        {selectedDate && (
          <CalendarEventList 
            date={selectedDate}
            events={selectedDateEvents}
            onEventUpdate={(updatedEvent) => {
              setEvents(prev => prev.map(event => 
                event.id === updatedEvent.id ? updatedEvent : event
              ));
            }}
          />
        )}

        {/* Add Event Dialog */}
        <AddEventDialog 
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          onAddEvent={handleAddEvent}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
};

export default Calendar;
