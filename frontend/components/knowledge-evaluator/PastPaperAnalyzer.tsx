
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Upload, 
  Brain, 
  TrendingUp, 
  Target, 
  Clock,
  CheckCircle,
  AlertCircle,
  BookOpen
} from 'lucide-react';

interface PastPaper {
  id: string;
  title: string;
  subject: string;
  year: number;
  type: 'exam' | 'mock' | 'practice';
  difficulty: string;
  topics: string[];
  analysisComplete: boolean;
  score?: number;
  totalMarks?: number;
  timeSpent?: number;
  weakAreas?: string[];
  strengths?: string[];
}

const PastPaperAnalyzer = () => {
  const [mode, setMode] = useState<'library' | 'upload' | 'analysis'>('library');
  const [selectedPaper, setSelectedPaper] = useState<PastPaper | null>(null);

  // Sample past papers
  const [pastPapers] = useState<PastPaper[]>([
    {
      id: '1',
      title: 'Mathematics A-Level Paper 1',
      subject: 'Mathematics',
      year: 2023,
      type: 'exam',
      difficulty: 'Advanced',
      topics: ['Calculus', 'Algebra', 'Geometry'],
      analysisComplete: true,
      score: 78,
      totalMarks: 100,
      timeSpent: 120,
      weakAreas: ['Integration by parts', 'Complex numbers'],
      strengths: ['Basic differentiation', 'Linear equations']
    },
    {
      id: '2',
      title: 'Physics GCSE Paper 2',
      subject: 'Physics',
      year: 2023,
      type: 'mock',
      difficulty: 'Intermediate',
      topics: ['Electricity', 'Magnetism', 'Waves'],
      analysisComplete: true,
      score: 85,
      totalMarks: 100,
      timeSpent: 90,
      weakAreas: ['Electromagnetic induction'],
      strengths: ['Circuit analysis', 'Wave properties']
    },
    {
      id: '3',
      title: 'Chemistry Advanced Paper',
      subject: 'Chemistry',
      year: 2024,
      type: 'practice',
      difficulty: 'Advanced',
      topics: ['Organic Chemistry', 'Physical Chemistry'],
      analysisComplete: false
    }
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'mock': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'practice': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const startAnalysis = (paper: PastPaper) => {
    setSelectedPaper(paper);
    setMode('analysis');
  };

  if (mode === 'library') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Past Paper Library</h2>
            <p className="text-gray-600 dark:text-gray-300">Analyze exam papers with AI insights</p>
          </div>
          <Button 
            onClick={() => setMode('upload')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Upload className="mr-2" size={16} />
            Upload Paper
          </Button>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Total Papers</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{pastPapers.length}</p>
                </div>
                <FileText className="text-blue-500" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400">Average Score</p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">81%</p>
                </div>
                <TrendingUp className="text-green-500" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 dark:text-purple-400">Analyzed</p>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    {pastPapers.filter(p => p.analysisComplete).length}
                  </p>
                </div>
                <Brain className="text-purple-500" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 dark:text-orange-400">Study Time</p>
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">14h</p>
                </div>
                <Clock className="text-orange-500" size={24} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastPapers.map((paper) => (
            <Card key={paper.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {paper.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {paper.subject} • {paper.year}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(paper.type)}>
                        {paper.type}
                      </Badge>
                      {paper.analysisComplete && (
                        <CheckCircle className="text-green-500" size={16} />
                      )}
                    </div>
                  </div>

                  {paper.analysisComplete && paper.score && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Score</span>
                        <span className="font-semibold">{paper.score}/{paper.totalMarks}</span>
                      </div>
                      <Progress value={(paper.score / (paper.totalMarks || 100)) * 100} />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {paper.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {paper.topics.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{paper.topics.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <Button 
                    onClick={() => startAnalysis(paper)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    {paper.analysisComplete ? (
                      <>
                        <BookOpen className="mr-2" size={16} />
                        View Analysis
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2" size={16} />
                        Analyze Paper
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'upload') {
    return (
      <div className="space-y-6">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
          <CardHeader>
            <CardTitle>Upload Past Paper</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center">
              <Upload className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Upload your past paper
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Drag and drop your exam paper or click to browse
              </p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Choose File
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <input 
                  type="text" 
                  placeholder="e.g., Mathematics"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Year</label>
                <input 
                  type="number" 
                  placeholder="2024"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setMode('library')} className="flex-1">
                Cancel
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Brain className="mr-2" size={16} />
                Upload & Analyze
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (mode === 'analysis' && selectedPaper) {
    return (
      <div className="space-y-6">
        {/* Paper Header */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedPaper.title}</h2>
                <p className="text-white/80">{selectedPaper.subject} • {selectedPaper.year}</p>
              </div>
              {selectedPaper.score && (
                <div className="text-right">
                  <div className="text-3xl font-bold">{selectedPaper.score}%</div>
                  <div className="text-white/80">Overall Score</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {selectedPaper.analysisComplete ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Strengths */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle size={20} />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedPaper.strengths?.map((strength, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="text-green-500" size={16} />
                    <span className="text-gray-900 dark:text-white">{strength}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Weak Areas */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertCircle size={20} />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedPaper.weakAreas?.map((area, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <AlertCircle className="text-red-500" size={16} />
                    <span className="text-gray-900 dark:text-white">{area}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card className="lg:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain size={20} />
                  AI Study Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-blue-200 dark:border-blue-700 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Focus Areas</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Spend extra time on integration techniques and complex number operations
                    </p>
                  </div>
                  <div className="p-4 border border-green-200 dark:border-green-700 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Study Method</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Use spaced repetition for formula memorization
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    Generate Practice Quiz
                  </Button>
                  <Button variant="outline">
                    Create Study Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
            <CardContent className="p-12 text-center">
              <Brain className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Analysis in Progress
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                AI is analyzing this paper to provide insights and recommendations
              </p>
              <Progress value={75} className="max-w-md mx-auto mb-4" />
              <p className="text-sm text-gray-500">This may take a few minutes...</p>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setMode('library')}>
            Back to Library
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default PastPaperAnalyzer;
