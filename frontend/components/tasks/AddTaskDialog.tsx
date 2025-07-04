
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Task } from '@/app/models';

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (task: Omit<Task, 'created_at' | 'id' | 'submission_content' | 'user_id' | 'duration' | 'resources'>) => void;
}

const subjects = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'History',
  'English',
  'French',
  'Computer Science',
  'Art',
  'Music'
];

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ open, onOpenChange, onAddTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    instructions: '',
    subject: '',
    due_date: '',
    priority: 'medium' as const,
    status: 'pending' as const,
    exercises: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.subject || !formData.due_date || !formData.instructions) {
      return;
    }
    const dueDateISO = new Date(formData.due_date).toISOString();


    onAddTask({
      ...formData,
      due_date:dueDateISO
    });

    // Reset form
    setFormData({
      title: '',
      instructions: '',
      subject: '',
      due_date: '',
      priority: 'medium',
      status: 'pending',
      exercises:''
    });

    onOpenChange(false);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Create New Task
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Task Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter task title..."
              className="h-12 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              required
            />
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <Label htmlFor="instructions" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Instructions
            </Label>
            <Textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) => updateField('instructions', e.target.value)}
              placeholder="Instructions of the task..."
              className="min-h-[80px] bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            />
          </div>

          {/* Subject and Due Date Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Subject *
              </Label>
              <Select value={formData.subject} onValueChange={(value) => updateField('subject', value)}>
                <SelectTrigger className="h-12 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="due_date" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Due Date *
              </Label>
              <Input
                id="due_date"
                type="date"
                value={formData.due_date}
                onChange={(e) => updateField('due_date', e.target.value)}
                className="h-12 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                required
              />
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Priority
            </Label>
            <Select value={formData.priority} onValueChange={(value: any) => updateField('priority', value)}>
              <SelectTrigger className="h-12 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                <SelectItem value="low" className="hover:bg-gray-100 dark:hover:bg-gray-700">Low</SelectItem>
                <SelectItem value="medium" className="hover:bg-gray-100 dark:hover:bg-gray-700">Medium</SelectItem>
                <SelectItem value="high" className="hover:bg-gray-100 dark:hover:bg-gray-700">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Exercises */}
          <div className="space-y-2">
            <Label htmlFor="exercises" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              exercises
            </Label>
            <Textarea
              id="exercises"
              value={formData.exercises}
              onChange={(e) => updateField('exercises', e.target.value)}
              placeholder="Add detailed instructions for this task..."
              className="min-h-[100px] bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit" 
              className="flex-1 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold"
              disabled={!formData.title || !formData.subject || !formData.due_date}
            >
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
