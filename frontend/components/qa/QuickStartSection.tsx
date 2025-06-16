import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calculator, 
  BookOpen, 
  Lightbulb,
  Clock,
  Sparkles
} from 'lucide-react';

interface QuickQuestion {
  id: string;
  text: string;
  category: string;
  icon: React.ElementType;
  color: string;
}

const quickQuestions: QuickQuestion[] = [
  {
    id: '1',
    text: 'Explain the Pythagorean theorem',
    category: 'Mathematics',
    icon: Calculator,
    color: 'blue',
  },
  {
    id: '2',
    text: 'What is photosynthesis?',
    category: 'Science',
    icon: BookOpen,
    color: 'green',
  },
  {
    id: '3',
    text: 'How do I improve my study habits?',
    category: 'Study Tips',
    icon: Lightbulb,
    color: 'yellow',
  },
  {
    id: '4',
    text: 'What is the best time to study?',
    category: 'Productivity',
    icon: Clock,
    color: 'purple',
  },
];

interface QuickStartSectionProps {
  onQuestionClick: (question: QuickQuestion) => void;
  isLoading: boolean;
}

export const QuickStartSection: React.FC<QuickStartSectionProps> = ({ onQuestionClick, isLoading }) => {
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 border-blue-200/50 dark:border-blue-700/50 text-blue-600 dark:text-blue-400',
      green: 'from-green-500/10 to-green-600/10 hover:from-green-500/20 hover:to-green-600/20 border-green-200/50 dark:border-green-700/50 text-green-600 dark:text-green-400',
      yellow: 'from-yellow-500/10 to-yellow-600/10 hover:from-yellow-500/20 hover:to-yellow-600/20 border-yellow-200/50 dark:border-yellow-700/50 text-yellow-600 dark:text-yellow-400',
      purple: 'from-purple-500/10 to-purple-600/10 hover:from-purple-500/20 hover:to-purple-600/20 border-purple-200/50 dark:border-purple-700/50 text-purple-600 dark:text-purple-400',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          Quick Start
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {quickQuestions.map((question) => (
            <Button
              key={question.id}
              variant="ghost"
              className={`w-full justify-start text-left h-auto p-4 bg-gradient-to-r rounded-xl border transition-all duration-200 ${getColorClasses(question.color)}`}
              onClick={() => onQuestionClick(question)}
              disabled={isLoading}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 flex-shrink-0">
                  <question.icon className="w-4 h-4" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1 leading-tight line-clamp-2 break-words">{question.text}</p>
                  <p className="text-xs opacity-70 truncate">{question.category}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
