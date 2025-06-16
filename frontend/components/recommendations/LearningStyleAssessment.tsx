
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Brain, Eye, Ear, Hand } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LearningStyleAssessmentProps {
  onComplete: (style: string) => void;
  onClose: () => void;
}

const questions = [
  {
    id: 1,
    question: "When studying new material, I prefer to:",
    options: [
      { text: "Read and highlight text", style: "visual", icon: <Eye size={16} /> },
      { text: "Listen to lectures or explanations", style: "auditory", icon: <Ear size={16} /> },
      { text: "Take notes and write summaries", style: "reading", icon: <Brain size={16} /> },
      { text: "Use hands-on practice and experiments", style: "kinesthetic", icon: <Hand size={16} /> }
    ]
  },
  {
    id: 2,
    question: "I best remember information when:",
    options: [
      { text: "I can see diagrams and charts", style: "visual", icon: <Eye size={16} /> },
      { text: "I hear it explained out loud", style: "auditory", icon: <Ear size={16} /> },
      { text: "I read and write about it", style: "reading", icon: <Brain size={16} /> },
      { text: "I practice or do it myself", style: "kinesthetic", icon: <Hand size={16} /> }
    ]
  },
  {
    id: 3,
    question: "When solving problems, I tend to:",
    options: [
      { text: "Draw pictures or mind maps", style: "visual", icon: <Eye size={16} /> },
      { text: "Talk through the problem", style: "auditory", icon: <Ear size={16} /> },
      { text: "Write out the steps", style: "reading", icon: <Brain size={16} /> },
      { text: "Try different approaches", style: "kinesthetic", icon: <Hand size={16} /> }
    ]
  }
];

const styleDescriptions = {
  visual: {
    name: "Visual Learner",
    description: "You learn best through seeing and visualizing information",
    icon: <Eye size={24} />,
    color: "from-blue-500 to-indigo-600"
  },
  auditory: {
    name: "Auditory Learner", 
    description: "You learn best through hearing and discussing information",
    icon: <Ear size={24} />,
    color: "from-green-500 to-emerald-600"
  },
  reading: {
    name: "Reading/Writing Learner",
    description: "You learn best through reading and writing activities",
    icon: <Brain size={24} />,
    color: "from-purple-500 to-violet-600"
  },
  kinesthetic: {
    name: "Kinesthetic Learner",
    description: "You learn best through hands-on activities and practice",
    icon: <Hand size={24} />,
    color: "from-orange-500 to-red-600"
  }
};

const LearningStyleAssessment: React.FC<LearningStyleAssessmentProps> = ({ onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleAnswer = (style: string) => {
    const newAnswers = [...answers, style];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const styleCounts = newAnswers.reduce((acc, style) => {
        acc[style] = (acc[style] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const dominantStyle = Object.entries(styleCounts).reduce((a, b) => 
        styleCounts[a[0]] > styleCounts[b[0]] ? a : b
      )[0];
      
      setResult(dominantStyle);
      setShowResult(true);
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-2xl">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 p-2"
          >
            <X size={16} />
          </Button>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Brain className="text-purple-500" size={28} />
            Learning Style Assessment
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400">
            Discover your optimal learning approach to get personalized study recommendations
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {!showResult ? (
            <>
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Current Question */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {questions[currentQuestion].question}
                </h3>
                
                <div className="grid grid-cols-1 gap-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="p-4 h-auto text-left justify-start hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200"
                      onClick={() => handleAnswer(option.style)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-purple-500">
                          {option.icon}
                        </div>
                        <span>{option.text}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Results */
            <div className="text-center space-y-6">
              <div className={cn(
                "mx-auto w-20 h-20 rounded-full flex items-center justify-center text-white",
                `bg-gradient-to-r ${styleDescriptions[result as keyof typeof styleDescriptions].color}`
              )}>
                {styleDescriptions[result as keyof typeof styleDescriptions].icon}
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  You're a {styleDescriptions[result as keyof typeof styleDescriptions].name}!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {styleDescriptions[result as keyof typeof styleDescriptions].description}
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => onComplete(result)}
                  className={cn(
                    "text-white font-semibold px-8",
                    `bg-gradient-to-r ${styleDescriptions[result as keyof typeof styleDescriptions].color}`
                  )}
                >
                  Get My Recommendations
                </Button>
                <Button variant="outline" onClick={resetAssessment}>
                  Retake Assessment
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningStyleAssessment;
