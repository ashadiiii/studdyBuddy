
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Target, 
  Brain, 
  Clock, 
  Award, 
  Zap,
  Calendar,
  BookOpen
} from 'lucide-react';

const KnowledgeMetrics = () => {
  const subjectProgress = [
    { subject: 'Mathematics', progress: 85, level: 'Advanced', trend: '+5%' },
    { subject: 'Physics', progress: 78, level: 'Intermediate', trend: '+12%' },
    { subject: 'Chemistry', progress: 72, level: 'Intermediate', trend: '+8%' },
    { subject: 'Biology', progress: 91, level: 'Advanced', trend: '+3%' }
  ];

  const weeklyActivity = [
    { day: 'Mon', quizzes: 3, score: 85 },
    { day: 'Tue', quizzes: 2, score: 78 },
    { day: 'Wed', quizzes: 4, score: 92 },
    { day: 'Thu', quizzes: 1, score: 88 },
    { day: 'Fri', quizzes: 3, score: 75 },
    { day: 'Sat', quizzes: 5, score: 89 },
    { day: 'Sun', quizzes: 2, score: 94 }
  ];

  const achievements = [
    { title: 'Quiz Master', description: '50+ quizzes completed', icon: '🏆', earned: true },
    { title: 'Perfect Score', description: '10 perfect quiz scores', icon: '⭐', earned: true },
    { title: 'Study Streak', description: '7 days of continuous study', icon: '🔥', earned: true },
    { title: 'Speed Demon', description: 'Complete quiz in under 5 minutes', icon: '⚡', earned: false }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Advanced': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Intermediate': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Beginner': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Knowledge Metrics</h2>
        <p className="text-gray-600 dark:text-gray-300">Track your learning progress and performance insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Brain size={32} />
              <div className="text-right">
                <div className="text-2xl font-bold">87%</div>
                <div className="text-white/80 text-sm">Avg. Score</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} />
              <span className="text-sm">+15% this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Target size={32} />
              <div className="text-right">
                <div className="text-2xl font-bold">147</div>
                <div className="text-white/80 text-sm">Quizzes Done</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="text-sm">21 this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Zap size={32} />
              <div className="text-right">
                <div className="text-2xl font-bold">12</div>
                <div className="text-white/80 text-sm">Day Streak</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award size={16} />
              <span className="text-sm">Personal best!</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock size={32} />
              <div className="text-right">
                <div className="text-2xl font-bold">24h</div>
                <div className="text-white/80 text-sm">Study Time</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={16} />
              <span className="text-sm">4.2h this week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Progress */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target size={20} />
              Subject Mastery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {subjectProgress.map((subject) => (
              <div key={subject.subject} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {subject.subject}
                    </h4>
                    <Badge className={getLevelColor(subject.level)}>
                      {subject.level}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {subject.progress}%
                    </span>
                    <span className="text-sm text-green-600 dark:text-green-400">
                      {subject.trend}
                    </span>
                  </div>
                </div>
                <Progress value={subject.progress} className="h-3" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar size={20} />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyActivity.map((day, index) => (
                <div key={day.day} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                      {day.day}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {day.quizzes} quizzes
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {day.score}% avg score
                      </div>
                    </div>
                  </div>
                  <div className="w-16">
                    <Progress value={day.score} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award size={20} />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.title}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  achievement.earned
                    ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-60'
                }`}
              >
                <div className="text-center space-y-3">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                      Earned
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain size={20} />
            AI Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-blue-200 dark:border-blue-700 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">🚀 Strength</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                You excel at quick recall questions and perform best in morning study sessions
              </p>
            </div>
            <div className="p-4 border border-yellow-200 dark:border-yellow-700 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
              <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">⚠️ Challenge</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Complex problem-solving questions need more practice, especially in Physics
              </p>
            </div>
            <div className="p-4 border border-green-200 dark:border-green-700 rounded-lg bg-green-50 dark:bg-green-900/20">
              <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">💡 Recommendation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Schedule difficult topics for your peak performance hours (9-11 AM)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeMetrics;
