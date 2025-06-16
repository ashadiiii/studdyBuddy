
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Calendar, CheckCircle, ExternalLink, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Task } from '@/pages/Tasks';

interface TaskDetailProps {
  task: Task;
  onBack: () => void;
  onUpdate: (task: Task) => void;
}

const priorityConfig = {
  high: { 
    bg: "bg-gradient-to-r from-red-400 to-red-600", 
    text: "text-white", 
    label: "high"
  },
  medium: { 
    bg: "bg-gradient-to-r from-yellow-400 to-orange-500", 
    text: "text-white", 
    label: "medium"
  },
  low: { 
    bg: "bg-gradient-to-r from-green-400 to-green-600", 
    text: "text-white", 
    label: "low"
  },
};

const statusConfig = {
  pending: { 
    bg: "bg-yellow-100 dark:bg-yellow-900/30", 
    text: "text-yellow-700 dark:text-yellow-400",
    label: "pending"
  },
  'in progress': { 
    bg: "bg-blue-100 dark:bg-blue-900/30", 
    text: "text-blue-700 dark:text-blue-400",
    label: "in progress"
  },
  completed: { 
    bg: "bg-green-100 dark:bg-green-900/30", 
    text: "text-green-700 dark:text-green-400",
    label: "completed"
  },
};

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onBack, onUpdate }) => {
  const [workNotes, setWorkNotes] = useState('');
  
  const priority = priorityConfig[task.priority];
  const status = statusConfig[task.status];
  const dueDate = new Date(task.dueDate);

  const handleMarkComplete = () => {
    onUpdate({
      ...task,
      status: task.status === 'completed' ? 'pending' : 'completed'
    });
  };

  const handleSubmitWork = () => {
    // In a real app, this would save the work notes
    console.log('Work submitted:', workNotes);
    setWorkNotes('');
    // Show success message
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
          >
            <ArrowLeft size={20} />
          </Button>
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Back to Tasks</span>
        </div>

        {/* Task Header */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {task.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {task.description}
            </p>
            
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Subject:</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">{task.subject}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar size={16} />
                <span>Due: {dueDate.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
              </div>
              
              <Badge 
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-bold",
                  priority.bg,
                  priority.text
                )}
              >
                {priority.label} priority
              </Badge>
              
              <Badge 
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold capitalize",
                  status.bg,
                  status.text
                )}
              >
                {status.label}
              </Badge>
            </div>
          </div>

          <Button
            onClick={handleMarkComplete}
            className={cn(
              "font-semibold px-8 py-3 rounded-xl transition-all duration-300",
              task.status === 'completed'
                ? "bg-gray-500 hover:bg-gray-600 text-white"
                : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl hover:scale-105"
            )}
          >
            <CheckCircle className="mr-2" size={18} />
            {task.status === 'completed' ? 'Mark as Incomplete' : 'Mark as Complete'}
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Instructions */}
          <div className="lg:col-span-2 space-y-8">
            {task.instructions && (
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    Task Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {task.instructions}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Exercises */}
            {task.exercises && task.exercises.length > 0 && (
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    Exercises
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {task.exercises.map((exercise, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <span className="font-mono text-gray-800 dark:text-gray-200">{exercise}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submit Work Section */}
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <CheckCircle size={20} />
                  Submit Your Work
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400">
                  Record your completed work and solutions for future reference
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Describe your work, solutions, findings, or any notes about completing this task..."
                  value={workNotes}
                  onChange={(e) => setWorkNotes(e.target.value)}
                  className="min-h-[120px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl"
                />
                <Button
                  onClick={handleSubmitWork}
                  disabled={!workNotes.trim()}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Your Work
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* AI Resources Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-700/50 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Lightbulb className="text-yellow-500" size={20} />
                  AI Recommended Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {task.aiResources?.map((resource, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white/70 dark:bg-gray-800/70 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {resource}
                      </span>
                      <ExternalLink size={14} className="text-gray-400 group-hover:text-blue-500" />
                    </div>
                  </div>
                ))}
                
                <Button
                  variant="outline"
                  className="w-full mt-4 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                >
                  Get More Resources
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
