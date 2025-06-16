
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Target, Clock, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  reason: string;
  urgency: 'high' | 'medium' | 'low';
  category: string;
  estimatedImpact: string;
  actionItems: string[];
  icon: string;
}

interface PersonalizedSuggestionsProps {
  recommendations: Recommendation[];
  learningStyle: string;
}

const urgencyConfig = {
  high: { color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', label: 'High Priority' },
  medium: { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', label: 'Medium Priority' },
  low: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', label: 'Low Priority' },
};

const PersonalizedSuggestions: React.FC<PersonalizedSuggestionsProps> = ({ recommendations, learningStyle }) => {
  const filteredRecommendations = recommendations.filter(rec => 
    rec.category === learningStyle || rec.category === 'general'
  );

  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200/50 dark:border-purple-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
            <Sparkles size={24} />
            AI Insights Based on Your Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">2.3x</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Productivity increase with visual techniques</div>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">85%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Success rate with Pomodoro sessions</div>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">12</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Day learning streak</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecommendations.map((recommendation, index) => {
          const urgency = urgencyConfig[recommendation.urgency];
          
          return (
            <Card
              key={recommendation.id}
              className={cn(
                "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
                "bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl"
              )}
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "both"
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{recommendation.icon}</span>
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                        {recommendation.title}
                      </CardTitle>
                      <Badge className={cn("text-xs mt-1", urgency.color)}>
                        {urgency.label}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-purple-500">
                    <TrendingUp size={14} />
                    <span className="text-xs font-semibold">{recommendation.estimatedImpact}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {recommendation.description}
                </p>

                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="flex items-start gap-2">
                    <Target size={16} className="text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 text-sm">Why this works for you:</h4>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">{recommendation.reason}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Action Steps:</h4>
                  <ul className="space-y-1">
                    {recommendation.actionItems.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                          {itemIndex + 1}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
                  onClick={() => {
                    // In a real app, this would implement the recommendation
                    console.log('Implementing recommendation:', recommendation.title);
                  }}
                >
                  <Sparkles className="mr-2" size={16} />
                  Try This Approach
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalizedSuggestions;
