
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Task } from '@/pages/Tasks';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  delay?: number;
}

const priorityConfig = {
  high: { 
    bg: "bg-gradient-to-r from-red-400 to-red-600", 
    text: "text-white", 
    glow: "shadow-red-400/50",
    label: "high"
  },
  medium: { 
    bg: "bg-gradient-to-r from-yellow-400 to-orange-500", 
    text: "text-white", 
    glow: "shadow-yellow-400/50",
    label: "medium"
  },
  low: { 
    bg: "bg-gradient-to-r from-green-400 to-green-600", 
    text: "text-white", 
    glow: "shadow-green-400/50",
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

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const priority = priorityConfig[task.priority];
  const status = statusConfig[task.status];
  
  const dueDate = new Date(task.dueDate);
  const isOverdue = dueDate < new Date() && task.status !== 'completed';
  const isDueSoon = dueDate <= new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) && task.status !== 'completed';

  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
        "bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl",
        "hover:bg-white/90 dark:hover:bg-gray-800/90",
        task.status === 'completed' && "opacity-75"
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "both"
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        {/* Header with Priority and Status */}
        <div className="flex justify-between items-start mb-4">
          <Badge 
            className={cn(
              "rounded-full px-3 py-1 text-xs font-bold shadow-lg transition-all duration-300",
              priority.bg,
              priority.text,
              priority.glow,
              isHovered && "scale-105"
            )}
          >
            {priority.label}
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

        {/* Task Title */}
        <h3 className={cn(
          "font-bold text-lg mb-2 line-clamp-2 transition-colors duration-300",
          "text-gray-900 dark:text-white",
          task.status === 'completed' && "line-through text-gray-500 dark:text-gray-400"
        )}>
          {task.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {task.description}
        </p>

        {/* Subject */}
        <div className="mb-4">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Subject:</span>
          <span className="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            {task.subject}
          </span>
        </div>

        {/* Due Date */}
        <div className={cn(
          "flex items-center gap-2 text-sm",
          isOverdue ? "text-red-600 dark:text-red-400" :
          isDueSoon ? "text-orange-600 dark:text-orange-400" :
          "text-gray-600 dark:text-gray-400"
        )}>
          <Calendar size={16} />
          <span className="font-medium">
            Due: {dueDate.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: dueDate.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
            })}
          </span>
          {isOverdue && (
            <Badge variant="destructive" className="text-xs ml-auto">
              Overdue
            </Badge>
          )}
          {isDueSoon && !isOverdue && (
            <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs ml-auto">
              Due Soon
            </Badge>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-end">
          <Button
            size="sm"
            className={cn(
              "transition-all duration-300",
              "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
              "hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-600 hover:text-white",
              "group-hover:scale-105"
            )}
          >
            Open Task
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
