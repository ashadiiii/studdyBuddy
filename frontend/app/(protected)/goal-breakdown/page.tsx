"use client"

import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { 
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
  TrendingUp
} from 'lucide-react';
import { cn } from '../../../lib/utils';

interface Subtask {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  resources: Resource[];
  tips: string[];
}

interface Resource {
  type: 'video' | 'article' | 'document' | 'practice';
  title: string;
  url: string;
  description: string;
}

interface BreakdownResult {
  mainGoal: string;
  estimatedTotalTime: string;
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

  // Mock AI breakdown function (replace with actual AI service)
  const generateBreakdown = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response based on the input
    const mockBreakdown: BreakdownResult = {
      mainGoal: task,
      estimatedTotalTime: "12-15 hours",
      difficulty: "Medium",
      subtasks: [
        {
          id: '1',
          title: 'Review Core Concepts',
          description: 'Go through fundamental principles and theories covered in the course',
          estimatedTime: '3-4 hours',
          difficulty: 'medium',
          priority: 'high',
          dueDate: '2 days before exam',
          resources: [
            {
              type: 'video',
              title: 'Khan Academy - Core Concepts',
              url: '#',
              description: 'Comprehensive video series covering fundamental topics'
            },
            {
              type: 'document',
              title: 'Course Textbook - Chapters 1-5',
              url: '#',
              description: 'Official textbook with detailed explanations'
            }
          ],
          tips: [
            'Create concept maps to visualize relationships',
            'Use active recall instead of passive reading',
            'Take breaks every 45 minutes'
          ]
        },
        {
          id: '2',
          title: 'Practice Problem Sets',
          description: 'Complete practice problems and past exam questions',
          estimatedTime: '4-5 hours',
          difficulty: 'hard',
          priority: 'high',
          dueDate: '1 day before exam',
          resources: [
            {
              type: 'practice',
              title: 'Past Exam Papers (2020-2023)',
              url: '#',
              description: 'Collection of previous exam questions with solutions'
            },
            {
              type: 'article',
              title: 'Problem-Solving Strategies',
              url: '#',
              description: 'Guide to approaching complex problems systematically'
            }
          ],
          tips: [
            'Time yourself while solving problems',
            'Review mistakes thoroughly',
            'Focus on problem types you find challenging'
          ]
        },
        {
          id: '3',
          title: 'Create Study Materials',
          description: 'Make flashcards, summary notes, and formula sheets',
          estimatedTime: '2-3 hours',
          difficulty: 'easy',
          priority: 'medium',
          dueDate: '3 days before exam',
          resources: [
            {
              type: 'article',
              title: 'Effective Note-Taking Methods',
              url: '#',
              description: 'Techniques for creating memorable study materials'
            }
          ],
          tips: [
            'Use colors and diagrams in your notes',
            'Keep formula sheets concise',
            'Test yourself with flashcards regularly'
          ]
        },
        {
          id: '4',
          title: 'Final Review & Mock Test',
          description: 'Complete a full practice exam under timed conditions',
          estimatedTime: '3 hours',
          difficulty: 'medium',
          priority: 'high',
          dueDate: 'Day before exam',
          resources: [
            {
              type: 'practice',
              title: 'Full-Length Practice Test',
              url: '#',
              description: 'Complete mock exam with time constraints'
            }
          ],
          tips: [
            'Simulate actual exam conditions',
            'Review any last-minute weak areas',
            'Get adequate sleep before the exam'
          ]
        }
      ],
      overallTips: [
        'Start early to avoid cramming',
        'Use the Pomodoro Technique for focused study sessions',
        'Form a study group for difficult concepts',
        'Stay hydrated and maintain a healthy sleep schedule',
        'Review material multiple times using spaced repetition'
      ]
    };
    
    setBreakdown(mockBreakdown);
    setIsGenerating(false);
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

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={16} />;
      case 'article': return <FileText size={16} />;
      case 'document': return <BookOpen size={16} />;
      case 'practice': return <Target size={16} />;
      default: return <Link2 size={16} />;
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
                Additional Details
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
                Deadline (Optional)
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
                      {breakdown.estimatedTotalTime}
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
                <Card key={subtask.id} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
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
                          {subtask.description}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Timer size={16} className="text-blue-600" />
                            <span className="text-gray-600 dark:text-gray-400">
                              Estimated time: <strong>{subtask.estimatedTime}</strong>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-green-600" />
                            <span className="text-gray-600 dark:text-gray-400">
                              Due: <strong>{subtask.dueDate}</strong>
                            </span>
                          </div>
                        </div>
                        
                        {/* Resources */}
                        {subtask.resources.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                              <BookOpen size={16} />
                              Recommended Resources
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {subtask.resources.map((resource, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                                  {getResourceIcon(resource.type)}
                                  <div className="flex-1">
                                    <div className="font-medium text-sm text-gray-800 dark:text-gray-200">
                                      {resource.title}
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">
                                      {resource.description}
                                    </div>
                                  </div>
                                  <ExternalLink size={14} className="text-gray-400" />
                                </div>
                              ))}
                            </div>
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
              >
                Export to Tasks
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalBreakdown;
