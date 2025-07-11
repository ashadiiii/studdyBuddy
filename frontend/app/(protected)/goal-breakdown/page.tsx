"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { 
  Loader2,
  Brain, 
  Target, 
  Clock, 
  BookOpen, 
  Link2, 
  Calendar,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Timer,
  FileText,
  Video,
  ExternalLink,
  Lightbulb,
  TrendingUp,
  ListOrdered
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface Subtask {
  title: string;
  instructions: string;
  estimatedTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  exercises: string[];
  tips: string[];
}


interface BreakdownResult {
  subject:string;
  estimatedTime: number;
  difficulty: string;
  subtasks: Subtask[];
  overallTips: string[];
}

const GoalBreakdown = () => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [subject, setSubject] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [breakdown, setBreakdown] = useState<BreakdownResult | null>(null);
  const {makeAuthenticatedRequest} = useAuth()
  const [isExporting,setIsExporting] = useState(false)

  const exportTasks = async () => {
    try{
      setIsExporting(true)
      console.log(JSON.stringify(breakdown))
      await makeAuthenticatedRequest('/api/v1/goalBreakdown/export-tasks', {
        method: 'POST',
        body: JSON.stringify(breakdown)
      });
      toast({
        title: "Success",
        description: "Successfully exported tasks.",
        variant: "default"
      });

    }
    catch (error) {
      console.error('Error exporting:', error);
      toast({
        title: "Error",
        description: "Failed to export tasks. Please try again.",
        variant: "destructive"
      });
    }
    finally{
      setIsExporting(false)
    }
  }
    // Call the actual goal breakdown API
  const generateBreakdown = async () => {
    if (!task || !subject || !deadline) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (task, subject, and deadline).",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Build the Goal object for the request body
      const goalData = {
        subject: subject,
        title: task,
        deadline: deadline,
        description: description || '',
      };

      const response = await makeAuthenticatedRequest('/api/v1/goalBreakdown/', {
        method: 'POST',
        body: JSON.stringify(goalData)
      });

      if (!response.ok) {
        throw new Error('Failed to generate breakdown');
      }

      const breakdown:BreakdownResult = await response.json();
      breakdown.subject = subject
      // Transform the API response to match our BreakdownResult format
      setBreakdown(breakdown);

    } catch (error) {
      console.error('Error generating breakdown:', error);
      toast({
        title: "Error",
        description: "Failed to generate goal breakdown. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'hard': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'medium': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'high': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl">
              <Brain className="text-white" size={32} strokeWidth={2} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              AI Goal Breakdown
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Transform complex tasks into manageable steps with AI-powered insights
          </p>
        </div>

        {/* Input Form */}
        <Card className="mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Target size={24} className="text-purple-600" />
              Describe Your Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Main Task/Goal *
                </label>
                <Input
                  placeholder="e.g., Revise for Chemistry exam, Write Psychology paper"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  className="bg-white/50 dark:bg-gray-900/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject/Area
                </label>
                <Input
                  placeholder="e.g., Chemistry, Psychology, Mathematics"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-white/50 dark:bg-gray-900/50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Additional Details (Optional)
              </label>
              <Textarea
                placeholder="Provide any specific requirements, topics to focus on, or constraints..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white/50 dark:bg-gray-900/50 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Deadline
              </label>
              <Input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="bg-white/50 dark:bg-gray-900/50"
              />
            </div>

            <Button
              onClick={generateBreakdown}
              disabled={!task || isGenerating}
              className="w-full h-12 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 animate-spin" size={20} />
                  AI is analyzing your goal...
                </>
              ) : (
                <>
                  <Brain className="mr-2" size={20} />
                  Generate Breakdown
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Breakdown Results */}
        {breakdown && (
          <div className="space-y-6">
            {/* Overview */}
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp size={24} className="text-green-600" />
                  Goal Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {breakdown.estimatedTime} hours
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Estimated Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {breakdown.difficulty}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Difficulty Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {breakdown.subtasks.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Subtasks</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subtasks */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <CheckCircle size={28} className="text-green-600" />
                Step-by-Step Breakdown
              </h2>
              
              {breakdown.subtasks.map((subtask, index) => (
                <Card key={index} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            {subtask.title}
                          </h3>
                          <div className="flex gap-2">
                            <Badge className={getDifficultyColor(subtask.difficulty)}>
                              {subtask.difficulty}
                            </Badge>
                            <Badge className={getPriorityColor(subtask.priority)}>
                              {subtask.priority} priority
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400">
                          {subtask.instructions}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Timer size={16} className="text-blue-600" />
                            <span className="text-gray-600 dark:text-gray-400">
                              Estimated time: <strong>{subtask.estimatedTime} hours</strong>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-green-600" />
                            <span className="text-gray-600 dark:text-gray-400">
                              Due: <strong>{subtask.dueDate}</strong>
                            </span>
                          </div>
                        </div>
                        
                        {/* Instructions Carousel */}
                        {subtask.exercises && subtask.exercises.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                              <ListOrdered size={16} />
                              Step-by-Step Instructions
                            </h4>
                            <Carousel className="w-full max-w-3xl mx-auto">
                              <CarouselContent>
                                {subtask.exercises.map((instruction, idx) => (
                                  <CarouselItem key={idx}>
                                    <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-700/50">
                                      <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                          {idx + 1}
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                          {instruction}
                                        </p>
                                      </div>
                                    </div>
                                  </CarouselItem>
                                ))}
                              </CarouselContent>
                              <CarouselPrevious />
                              <CarouselNext />
                            </Carousel>
                          </div>
                        )}
                        
                        {/* Tips */}
                        {subtask.tips.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                              <Lightbulb size={16} />
                              Pro Tips
                            </h4>
                            <ul className="space-y-1">
                              {subtask.tips.map((tip, idx) => (
                                <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                  <ArrowRight size={14} className="text-purple-600 mt-0.5 flex-shrink-0" />
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Overall Tips */}
            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-700/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-400">
                  <Sparkles size={24} />
                  General Success Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {breakdown.overallTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button 
                variant="outline" 
                onClick={() => setBreakdown(null)}
                className="px-6"
              >
                Start Over
              </Button>
              <Button 
                className="px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                onClick={exportTasks}>
          
                {isExporting? 
                (
                  <>
                    <Loader2 className="animate-spin w-6 h-6 text-primary" />
                    Exporting
                  </>
                ):
                (
                  <>
                    Export to Tasks
                  </>
                )
                }

              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalBreakdown;
