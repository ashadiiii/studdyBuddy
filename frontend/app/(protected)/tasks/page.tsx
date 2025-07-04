"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Search, Plus, Calendar, ArrowLeft } from 'lucide-react';
import { cn } from '../../../lib/utils';
import TaskCard from '../../../components/tasks/TaskCard';
import TaskDetail from '../../../components/tasks/TaskDetail';
import AddTaskDialog from '../../../components/tasks/AddTaskDialog';
import { useAuth } from '@/hooks/useAuth';
import {Task} from '@/app/models'

// const initialTasks: Task[] = [
//   {
//     id: '1',
//     title: 'Complete Math Chapter 5',
//     description: 'Finish exercises 1-20 on quadratic equations',
//     subject: 'Mathematics',
//     dueDate: '2024-06-15',
//     priority: 'high',
//     status: 'pending',
//     instructions: 'Solve the following quadratic equations using the quadratic formula and factoring methods.',
//     exercises: [
//       'x² + 5x + 6 = 0',
//       '2x² - 7x + 3 = 0',
//       'x² - 4x - 5 = 0',
//       '3x² + 2x - 8 = 0'
//     ],
//     aiResources: [
//       'Khan Academy - Quadratic Equations',
//       'Wolfram Alpha - Equation Solver',
//       'MIT OpenCourseWare - Algebra'
//     ]
//   },
//   {
//     id: '2',
//     title: 'History Essay Draft',
//     description: 'Write first draft of World War II essay',
//     subject: 'History',
//     dueDate: '2024-06-18',
//     priority: 'medium',
//     status: 'in progress',
//     instructions: 'Write a comprehensive essay analyzing the causes and consequences of World War II.',
//     exercises: [],
//     aiResources: [
//       'Britannica - World War II',
//       'National WWII Museum Resources',
//       'History.com - WWII Timeline'
//     ]
//   },
//   {
//     id: '3',
//     title: 'Physics Lab Report',
//     description: 'Submit lab report on pendulum experiment',
//     subject: 'Physics',
//     dueDate: '2024-06-20',
//     priority: 'low',
//     status: 'pending',
//     instructions: 'Complete the lab report analyzing the pendulum motion experiment data.',
//     exercises: [],
//     aiResources: [
//       'Physics Classroom - Pendulum Motion',
//       'Khan Academy - Simple Harmonic Motion'
//     ]
//   },
//   {
//     id: '4',
//     title: 'French Vocabulary Quiz',
//     description: 'Study 50 new vocabulary words',
//     subject: 'French',
//     dueDate: '2024-06-14',
//     priority: 'high',
//     status: 'completed',
//     instructions: 'Memorize and practice 50 new French vocabulary words for the upcoming quiz.',
//     exercises: [],
//     aiResources: [
//       'Duolingo - French Vocabulary',
//       'Conjuguemos - French Practice'
//     ]
//   },
//   {
//     id: '5',
//     title: 'Biology Reading',
//     description: 'Read Chapter 8: Cell Division',
//     subject: 'Biology',
//     dueDate: '2024-06-16',
//     priority: 'medium',
//     status: 'in progress',
//     instructions: 'Read and take notes on Chapter 8 covering mitosis and meiosis.',
//     exercises: [],
//     aiResources: [
//       'Khan Academy - Cell Division',
//       'Crash Course Biology - Mitosis'
//     ]
//   }
// ];

const filterTabs = [
  { id: 'all', label: 'All', count: 0 },
  { id: 'pending', label: 'Pending', count: 0 },
  { id: 'in progress', label: 'In Progress', count: 0 },
  { id: 'completed', label: 'Completed', count: 0 }
];

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const {makeAuthenticatedRequest} = useAuth()
  useEffect(() => {
    const fetchTasks = async () => {
      try{
        const response = await makeAuthenticatedRequest('/api/v1/tasks',{
          method:'GET'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        console.log(data)
        setTasks(data);
        console.log('tasks:')
        console.log(tasks)
      } 
      
      catch (error) {
        console.error('Error fetching tasks:', error);
      } 
      finally {
        setLoading(false);
      }
    };
    fetchTasks();
  },[]);
  // Update filter counts
  const updatedTabs = filterTabs.map(tab => ({
    ...tab,
    count: tab.id === 'all' 
      ? tasks.length 
      : tasks.filter(task => task.status === tab.id).length
  }));

  // Filter tasks based on search and active filter
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.subject.toLowerCase().includes(searchQuery.toLowerCase()) ;
    
    const matchesFilter = activeFilter === 'all' || task.status === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  // This function updates the task in the list and the selected task
  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prev =>
      prev.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
    console.log(updatedTask)
    setSelectedTask(updatedTask); // This will rerender TaskDetail with new data
  };

  const handleAddTask =async (newTask: Omit<Task, 'created_at' | 'id' | 'submission_content' | 'user_id' | 'duration' | 'resources'>) => {
    try{
    const response = await makeAuthenticatedRequest('/api/v1/tasks',{
      method:'POST',
      body:JSON.stringify(newTask)
      })
      if (!response.ok) throw new Error('Failed to add task');
      const createdTask: Task = await response.json(); // This will include the id from the DB
      console.log(newTask)
      setTasks(prev => [...prev, createdTask]);
      console.log('new task added to list')
  }
  catch(err){
    console.error('Error adding task: ',err)
  }

  };

  if (selectedTask) {
    return (
      <TaskDetail 
        task={selectedTask} 
        onBack={() => setSelectedTask(null)}
        onUpdate={handleTaskUpdate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <span className="text-2xl">📋</span>
              Task Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Keep track of your assignments and study goals
            </p>
          </div>
          <Button 
            onClick={() => setShowAddDialog(true)}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus className="mr-2" size={18} />
            Add Task
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl h-12 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {updatedTabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeFilter === tab.id ? "default" : "ghost"}
              onClick={() => setActiveFilter(tab.id)}
              className={cn(
                "rounded-full px-6 py-2 font-semibold whitespace-nowrap transition-all duration-300 capitalize",
                activeFilter === tab.id
                  ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg scale-105"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 text-gray-700 dark:text-gray-300"
              )}
            >
              {tab.label}
              <Badge 
                variant="secondary" 
                className={cn(
                  "ml-2 text-xs",
                  activeFilter === tab.id 
                    ? "bg-white/20 text-white border-white/30" 
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                )}
              >
                {tab.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task, index) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onClick={() => setSelectedTask(task)}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No tasks found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery 
                ? "Try adjusting your search terms or filters"
                : "Create your first task to get started"
              }
            </p>
            {!searchQuery && (
              <Button 
                onClick={() => setShowAddDialog(true)}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
              >
                <Plus className="mr-2" size={18} />
                Add Your First Task
              </Button>
            )}
          </div>
        )}
      </div>

      <AddTaskDialog 
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddTask={handleAddTask}
      />
    </div>
  );
};

export default Tasks;