
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Target, Brain, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Technique {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeRequired: string;
  bestFor: string[];
  steps: string[];
  benefits: string[];
  icon: string;
}

interface TechniqueCardProps {
  technique: Technique;
  isSelected: boolean;
  onClick: () => void;
  delay?: number;
}

const difficultyConfig = {
  beginner: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', label: 'Beginner' },
  intermediate: { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', label: 'Intermediate' },
  advanced: { color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', label: 'Advanced' },
};

const TechniqueCard: React.FC<TechniqueCardProps> = ({ technique, isSelected, onClick, delay = 0 }) => {
  const [showDetails, setShowDetails] = useState(false);
  const difficulty = difficultyConfig[technique.difficulty];

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
        "bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl",
        "hover:bg-white/90 dark:hover:bg-gray-800/90",
        isSelected && "ring-2 ring-purple-500 shadow-lg scale-[1.02]"
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "both"
      }}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{technique.icon}</span>
            <div>
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                {technique.name}
              </CardTitle>
              <Badge className={cn("text-xs mt-1", difficulty.color)}>
                {difficulty.label}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <Clock size={14} />
            <span className="text-xs">{technique.timeRequired}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
          {technique.description}
        </p>

        <div className="flex flex-wrap gap-1">
          {technique.bestFor.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {technique.bestFor.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{technique.bestFor.length - 3} more
            </Badge>
          )}
        </div>

        <Button
          variant={showDetails ? "secondary" : "outline"}
          size="sm"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            setShowDetails(!showDetails);
          }}
        >
          {showDetails ? 'Hide Details' : 'Learn More'}
        </Button>

        {showDetails && (
          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Target size={16} />
                How to Apply:
              </h4>
              <ol className="space-y-1">
                {technique.steps.map((step, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Brain size={16} />
                Benefits:
              </h4>
              <ul className="space-y-1">
                {technique.benefits.map((benefit, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TechniqueCard;
