"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';
import { 
  Brain, 
  FileText, 
  Zap, 
  Target, 
  Clock, 
  CheckCircle, 
  XCircle,
  RotateCcw,
  TrendingUp,
  BookOpen,
  Award
} from 'lucide-react';
import QuizGenerator from '../../../components/knowledge-evaluator/QuizGenerator';
import FlashcardSystem from '../../../components/knowledge-evaluator/FlashcardSystem';
import PastPaperAnalyzer from '../../../components/knowledge-evaluator/PastPaperAnalyzer';
import KnowledgeMetrics from '../../../components/knowledge-evaluator/KnowledgeMetrics';

interface QuizSession {
  id: string;
  subject: string;
  topic: string;
  score: number;
  totalQuestions: number;
  duration: number;
  completedAt: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const KnowledgeEvaluator = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [recentSessions] = useState<QuizSession[]>([
    {
      id: '1',
      subject: 'Mathematics',
      topic: 'Calculus',
      score: 8,
      totalQuestions: 10,
      duration: 12,
      completedAt: '2024-06-14T10:30:00',
      difficulty: 'intermediate'
    },
    {
      id: '2',
      subject: 'Physics',
      topic: 'Thermodynamics',
      score: 7,
      totalQuestions: 8,
      duration: 15,
      completedAt: '2024-06-14T09:15:00',
      difficulty: 'advanced'
    },
    {
      id: '3',
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
      score: 9,
      totalQuestions: 12,
      duration: 18,
      completedAt: '2024-06-13T16:45:00',
      difficulty: 'intermediate'
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
            <Brain className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Knowledge Evaluator
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Assess your knowledge with AI-powered quizzes, flashcards & past papers
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Total Quizzes</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">47</p>
                </div>
                <Target className="text-blue-500" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400">Average Score</p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">84%</p>
                </div>
                <TrendingUp className="text-green-500" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 dark:text-purple-400">Study Streak</p>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">12 days</p>
                </div>
                <Zap className="text-purple-500" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 dark:text-orange-400">Time Studied</p>
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">24h</p>
                </div>
                <Clock className="text-orange-500" size={24} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Brain size={16} />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center gap-2">
            <Target size={16} />
            Quiz
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="flex items-center gap-2">
            <RotateCcw size={16} />
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="papers" className="flex items-center gap-2">
            <FileText size={16} />
            Past Papers
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center gap-2">
            <Award size={16} />
            Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Recent Sessions */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen size={20} />
                Recent Assessment Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <Target className="text-white" size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {session.subject} - {session.topic}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getDifficultyColor(session.difficulty)}>
                          {session.difficulty}
                        </Badge>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(session.completedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(session.score, session.totalQuestions)}`}>
                      {session.score}/{session.totalQuestions}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {session.duration}min
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Target className="text-white/90 group-hover:scale-110 transition-transform" size={32} />
                  <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quick Quiz</h3>
                <p className="text-white/80 mb-4">Generate an instant quiz on any topic</p>
                <Button 
                  variant="secondary" 
                  className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                  onClick={() => setActiveTab('quiz')}
                >
                  Start Quiz
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-teal-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <RotateCcw className="text-white/90 group-hover:scale-110 transition-transform" size={32} />
                  <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse" />
                </div>
                <h3 className="text-xl font-bold mb-2">Flashcards</h3>
                <p className="text-white/80 mb-4">Review with spaced repetition</p>
                <Button 
                  variant="secondary" 
                  className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                  onClick={() => setActiveTab('flashcards')}
                >
                  Study Cards
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <FileText className="text-white/90 group-hover:scale-110 transition-transform" size={32} />
                  <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse" />
                </div>
                <h3 className="text-xl font-bold mb-2">Past Papers</h3>
                <p className="text-white/80 mb-4">Analyze previous exam papers</p>
                <Button 
                  variant="secondary" 
                  className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                  onClick={() => setActiveTab('papers')}
                >
                  Analyze Papers
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quiz">
          <QuizGenerator />
        </TabsContent>

        <TabsContent value="flashcards">
          <FlashcardSystem />
        </TabsContent>

        <TabsContent value="papers">
          <PastPaperAnalyzer />
        </TabsContent>

        <TabsContent value="metrics">
          <KnowledgeMetrics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeEvaluator;