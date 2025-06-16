"use client"
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Slider } from "../../../components/ui/slider";
import { Badge } from "../../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Checkbox } from "../../../components/ui/checkbox";
import { toast } from "../../../hooks/use-toast";
import { Clock, Calendar as CalendarIcon, Target, BookOpen, Zap, AlertCircle, Sparkles, TrendingUp, ChevronLeft, ChevronRight, Settings, Plus } from "lucide-react";
import CalendarGrid from '../../../components/calendar/CalendarGrid';
import CalendarEventList from '../../../components/calendar/CalendarEventList';
import AddEventDialog from '../../../components/calendar/AddEventDialog';
import { CalendarEvent } from '../calendar/page';

type ScheduleInput = {
  availability: string;
  pace: number;
  intensity: number;
  preferredTimes: string[];
  studyDuration: number;
  breakDuration: number;
};

const DEFAULT: ScheduleInput = { 
  availability: "", 
  pace: 3, 
  intensity: 3,
  preferredTimes: [],
  studyDuration: 90,
  breakDuration: 15
};

const timeSlots = [
  "06:00-09:00", "09:00-12:00", "12:00-15:00", 
  "15:00-18:00", "18:00-21:00", "21:00-24:00"
];

const sampleSchedule: CalendarEvent[] = [
  {
    id: "1",
    title: "Chemistry - Organic Compounds",
    subject: "Chemistry",
    date: new Date().toISOString().split('T')[0],
    time: "09:00",
    duration: 90,
    type: "study-session",
    priority: "high",
    completed: false
  },
  {
    id: "2",
    title: "Mathematics - Calculus Practice",
    subject: "Mathematics",
    date: new Date().toISOString().split('T')[0],
    time: "14:00",
    duration: 90,
    type: "study-session",
    priority: "medium",
    completed: false
  },
  {
    id: "3",
    title: "Physics - Review Session",
    subject: "Physics",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: "19:00",
    duration: 60,
    type: "study-session",
    priority: "low",
    completed: false
  }
];

export default function Schedule() {
  const [form, setForm] = useState<ScheduleInput>(DEFAULT);
  const [schedule, setSchedule] = useState<CalendarEvent[]>(sampleSchedule);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isGenerating, setIsGenerating] = useState(false);
  const [showReconfigure, setShowReconfigure] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSlider(name: keyof ScheduleInput, value: number[]) {
    setForm(f => ({ ...f, [name]: value[0] }));
  }

  function handleTimeSlotChange(timeSlot: string, checked: boolean) {
    setForm(f => ({
      ...f,
      preferredTimes: checked 
        ? [...f.preferredTimes, timeSlot]
        : f.preferredTimes.filter(t => t !== timeSlot)
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setSchedule(sampleSchedule);
      setShowReconfigure(false);
      setIsGenerating(false);
      toast({ 
        title: "Schedule Updated!", 
        description: "Your personalized study schedule has been regenerated." 
      });
    }, 2000);
  }

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
    setSchedule(prev => [...prev, event]);
  };

  const selectedDateEvents = selectedDate ? schedule.filter(event => 
    event.date === selectedDate.toISOString().split('T')[0]
  ) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 py-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-gray-100 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
            Study Schedule
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your AI-generated personalized study calendar
          </p>
          
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => setShowReconfigure(true)}
              variant="outline"
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            >
              <Settings className="w-4 h-4 mr-2" />
              Reconfigure Schedule
            </Button>
            <Button 
              onClick={() => setShowAddDialog(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </div>
        </div>

        {/* Main Calendar View */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Calendar */}
          <Card className="xl:col-span-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
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
                events={schedule}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                viewMode="month"
              />
            </CardContent>
          </Card>

          {/* Today's Schedule Summary */}
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-600" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No sessions scheduled</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedDateEvents.slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.time}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {event.subject}
                      </Badge>
                    </div>
                  ))}
                  {selectedDateEvents.length > 3 && (
                    <p className="text-xs text-muted-foreground text-center">
                      +{selectedDateEvents.length - 3} more sessions
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Events for Selected Date */}
        {selectedDate && selectedDateEvents.length > 0 && (
          <CalendarEventList 
            date={selectedDate}
            events={selectedDateEvents}
            onEventUpdate={(updatedEvent) => {
              setSchedule(prev => prev.map(event => 
                event.id === updatedEvent.id ? updatedEvent : event
              ));
            }}
          />
        )}

        {/* Reconfigure Modal */}
        {showReconfigure && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    Reconfigure Schedule
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowReconfigure(false)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                          Availability Description
                        </label>
                        <Input
                          name="availability"
                          value={form.availability}
                          placeholder="e.g., Mon/Wed/Fri 6pm-9pm, weekends morning"
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div>
                        <label className="block mb-3 font-medium text-gray-700 dark:text-gray-300">
                          Preferred Time Slots
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map(slot => (
                            <div key={slot} className="flex items-center space-x-2">
                              <Checkbox
                                id={slot}
                                checked={form.preferredTimes.includes(slot)}
                                onCheckedChange={(checked:boolean) => 
                                  handleTimeSlotChange(slot, checked as boolean)
                                }
                              />
                              <label htmlFor={slot} className="text-sm">
                                {slot}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                          Study Session Duration
                        </label>
                        <Select
                          value={form.studyDuration.toString()}
                          onValueChange={(value:string) => setForm(f => ({ ...f, studyDuration: parseInt(value) }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="45">45 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="90">1.5 hours</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                          Break Duration
                        </label>
                        <Select
                          value={form.breakDuration.toString()}
                          onValueChange={(value:string) => setForm(f => ({ ...f, breakDuration: parseInt(value) }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">10 minutes</SelectItem>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="20">20 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="block font-medium text-gray-700 dark:text-gray-300">
                        Study Pace: {form.pace}/5
                      </label>
                      <Slider 
                        min={1} 
                        max={5} 
                        step={1} 
                        value={[form.pace]} 
                        onValueChange={(v : number[]) => handleSlider('pace', v)} 
                      />
                      <div className="text-sm text-gray-500 flex justify-between">
                        <span>Relaxed</span>
                        <span>Intensive</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block font-medium text-gray-700 dark:text-gray-300">
                        Study Intensity: {form.intensity}/5
                      </label>
                      <Slider 
                        min={1} 
                        max={5} 
                        step={1} 
                        value={[form.intensity]} 
                        onValueChange={(v: number[]) => handleSlider('intensity', v)}
                      />
                      <div className="text-sm text-gray-500 flex justify-between">
                        <span>Light review</span>
                        <span>Deep focus</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" 
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Update Schedule
                        </>
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowReconfigure(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
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
}