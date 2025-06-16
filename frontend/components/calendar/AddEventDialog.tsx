
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { CalendarEvent } from '@/pages/Calendar';

interface AddEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  selectedDate?: Date | null;
}

const AddEventDialog: React.FC<AddEventDialogProps> = ({
  open,
  onOpenChange,
  onAddEvent,
  selectedDate
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    time: '09:00',
    duration: 60,
    type: 'study-session' as CalendarEvent['type'],
    subject: '',
    priority: 'medium' as CalendarEvent['priority']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onAddEvent({
      ...formData,
      duration: Number(formData.duration)
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      date: selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      time: '09:00',
      duration: 60,
      type: 'study-session',
      subject: '',
      priority: 'medium'
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            Add New Event
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter event title"
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter event description"
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Time *
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Event Type *
            </Label>
            <Select value={formData.type} onValueChange={(value: CalendarEvent['type']) => 
              setFormData(prev => ({ ...prev, type: value }))
            }>
              <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="study-session">📚 Study Session</SelectItem>
                <SelectItem value="task">📋 Task</SelectItem>
                <SelectItem value="exam">📝 Exam</SelectItem>
                <SelectItem value="deadline">⏰ Deadline</SelectItem>
                <SelectItem value="reminder">🔔 Reminder</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Subject
              </Label>
              <Select value={formData.subject} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, subject: value }))
              }>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Priority *
              </Label>
              <Select value={formData.priority} onValueChange={(value: CalendarEvent['priority']) => 
                setFormData(prev => ({ ...prev, priority: value }))
              }>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Duration (minutes)
            </Label>
            <Input
              id="duration"
              type="number"
              min="0"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
              placeholder="60"
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
            >
              Add Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;
