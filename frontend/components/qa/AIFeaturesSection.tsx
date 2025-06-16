
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain,
  Zap,
  BookOpen,
  Target,
  Users,
  TrendingUp
} from 'lucide-react';

export const AIFeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'Smart Analysis',
      description: 'AI-powered concept breakdown',
      color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      badge: 'Active'
    },
    {
      icon: Zap,
      title: 'Instant Help',
      description: 'Get answers in seconds',
      color: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
      badge: 'Fast'
    },
    {
      icon: BookOpen,
      title: 'Study Guide',
      description: 'Personalized learning paths',
      color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      badge: 'Smart'
    },
    {
      icon: Target,
      title: 'Goal Tracking',
      description: 'Monitor your progress',
      color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
      badge: 'Pro'
    },
  ];

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          AI Features
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${feature.color}`}>
            <div className="flex items-center gap-3 flex-1">
              <feature.icon className="w-4 h-4" />
              <div className="flex-1">
                <p className="text-sm font-medium">{feature.title}</p>
                <p className="text-xs opacity-70">{feature.description}</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              {feature.badge}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
