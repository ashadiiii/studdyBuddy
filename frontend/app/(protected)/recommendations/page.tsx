"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Brain, Clock, Target, TrendingUp, BookOpen, Zap, Users, Calendar } from 'lucide-react';
import { cn } from '../../../lib/utils';
import LearningStyleAssessment from '../../../components/recommendations/LearningStyleAssessment';
import TechniqueCard from '../../../components/recommendations/TechniqueCard';
import PersonalizedSuggestions from '../../../components/recommendations/PersonalizedSuggestions';
import PerformanceInsights from '../../../components/recommendations/PerformanceInsights';
import { learningTechniques, personalizedRecommendations, performanceData } from '../../../data/recommendationsData';

const Recommendations = () => {
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null);
  const [learningStyle, setLearningStyle] = useState<string>('visual');
  const [showAssessment, setShowAssessment] = useState(false);

  const filteredTechniques = learningTechniques.filter(technique => 
    technique.bestFor.includes(learningStyle) || technique.category === 'universal'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
            <span className="text-3xl">🎯</span>
            Personalized Study Recommendations
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            AI-powered study strategies tailored to your learning style, performance trends, and current tasks
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2">
              <Brain className="mr-2" size={16} />
              AI Powered
            </Badge>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2">
              <TrendingUp className="mr-2" size={16} />
              Adaptive Learning
            </Badge>
          </div>
        </div>

        {/* Learning Style Assessment */}
        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200/50 dark:border-purple-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
              <Brain size={24} />
              Your Learning Style: <span className="capitalize font-bold">{learningStyle}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <p className="text-purple-700 dark:text-purple-300">
                Understanding your learning style helps us recommend the most effective study techniques for you.
              </p>
              <Button
                onClick={() => setShowAssessment(true)}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
              >
                <Target className="mr-2" size={16} />
                Retake Assessment
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="techniques" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl">
            <TabsTrigger value="techniques" className="flex items-center gap-2">
              <BookOpen size={16} />
              Study Techniques
            </TabsTrigger>
            <TabsTrigger value="personalized" className="flex items-center gap-2">
              <Zap size={16} />
              For You
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <TrendingUp size={16} />
              Performance
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar size={16} />
              Schedule
            </TabsTrigger>
          </TabsList>

          {/* Study Techniques Tab */}
          <TabsContent value="techniques" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTechniques.map((technique, index) => (
                <TechniqueCard
                  key={technique.id}
                  technique={technique}
                  isSelected={selectedTechnique === technique.id}
                  onClick={() => setSelectedTechnique(technique.id)}
                  delay={index * 100}
                />
              ))}
            </div>
          </TabsContent>

          {/* Personalized Recommendations Tab */}
          <TabsContent value="personalized" className="space-y-6">
            <PersonalizedSuggestions 
              recommendations={personalizedRecommendations}
              learningStyle={learningStyle}
            />
          </TabsContent>

          {/* Performance Insights Tab */}
          <TabsContent value="performance" className="space-y-6">
            <PerformanceInsights performanceData={performanceData} />
          </TabsContent>

          {/* Schedule Integration Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar size={24} />
                  Apply Techniques to Your Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Based on your current tasks and learning style, here are optimized study sessions for your schedule:
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Mathematics - Today 2:00 PM</h4>
                    <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">Recommended: Pomodoro Technique (25min focus + 5min break)</p>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                      Add to Calendar
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Chemistry - Tomorrow 10:00 AM</h4>
                    <p className="text-green-700 dark:text-green-300 text-sm mb-2">Recommended: Active Recall + Visual Memory Palace</p>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                      Add to Calendar
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-700">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Physics - Friday 3:00 PM</h4>
                    <p className="text-purple-700 dark:text-purple-300 text-sm mb-2">Recommended: Feynman Technique + Practice Problems</p>
                    <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                      Add to Calendar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Learning Style Assessment Modal */}
      {showAssessment && (
        <LearningStyleAssessment
          onComplete={(style) => {
            setLearningStyle(style);
            setShowAssessment(false);
          }}
          onClose={() => setShowAssessment(false)}
        />
      )}
    </div>
  );
};

export default Recommendations;