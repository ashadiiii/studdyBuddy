
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Calendar, CheckCircle, ExternalLink, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Task } from '@/app/models';
import AddTaskDialog from '@/components/tasks/AddTaskDialog';
import { useAuth } from '@/hooks/useAuth';
import AIResourcesSideBar from '@/components/resources/AIResourcesSidebar'

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
  const [workNotes, setWorkNotes] = useState(task.submission_content || '');;
  const [showAddDialog, setShowAddDialog] = useState(false);
  const {makeAuthenticatedRequest} = useAuth()
  const priority = priorityConfig[task.priority];
  const status = statusConfig[task.status];
  const dueDate = new Date(task.due_date);

  const handleMarkComplete =async () => {
    const response = await makeAuthenticatedRequest(`/api/v1/tasks/${task.id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({status: task.status === 'completed'? 'pending' : 'completed'})
    });
    if (!response.ok) return;
    const updatedTask = await response.json();
    onUpdate(updatedTask);
  };

  const handleSubmitWork = async () => {
    // In a real app, this would save the work notes
    console.log('Work submitted:', workNotes);
    const response = await makeAuthenticatedRequest(`/api/v1/tasks/${task.id}/submission`, {
      method: 'PATCH',
      body: JSON.stringify({submission_content:workNotes})
    });
    if (!response.ok) return;
    const updatedTask = await response.json();
    console.log(updatedTask)
    onUpdate(updatedTask);
  };

  const handleAddResources = async () => {
    const response = await makeAuthenticatedRequest(`/api/v1/tasks/${task.id}/resources`, {
      method: 'PATCH'
    });
    if (!response.ok) return;
    const updatedTask = await response.json();
    onUpdate(updatedTask);
  }

  const handleEditFullTask =async (newTask: Omit<Task, 'created_at' | 'submission_content' | 'user_id' | 'duration' | 'resources'>) => {
    try{
    console.log(newTask)
    const response = await makeAuthenticatedRequest(`/api/v1/tasks/${newTask.id}`,{
      method:'PATCH',
      body:JSON.stringify(newTask)
      })
      if (!response.ok) throw new Error('Failed to add task');
      const updatedTask: Task = await response.json(); // This will include the id from the DB
      console.log(updatedTask)
      console.log('task updated')
      onUpdate(updatedTask)
  }
  catch(err){
    console.error('Error adding task: ',err)
  }
  }

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
              {task.instructions}
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
          <div className="flex flex-wrap gap-4 items-center">
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

          <Button
            onClick={() => setShowAddDialog(true)}
            className="font-semibold px-8 py-3 rounded-xl transition-all duration-300 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl hover:scale-105">
            Edit Task
          </Button>
          </div>
          

        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Task Instructions */}
          <div className="lg:col-span-3 space-y-8">
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
            {task.exercises && (
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    Exercises
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {task.exercises
                      .split(',')
                      .map((exercise, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <span className="font-mono text-gray-800 dark:text-gray-200">{exercise.trim()}</span>
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
                  Save Your Work
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
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-900 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Your Work
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* AI Resources Sidebar */}
          <div className="lg:col-span-2 space-y-6">
          <AIResourcesSideBar 
            resources={task.resources}
            onGenerateResources={handleAddResources}
            />
          </div>
      </div>
      <AddTaskDialog 
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddTask={handleEditFullTask}
        initialValues={task}
      />
    </div>
    </div>
  );
};


export default TaskDetail;
