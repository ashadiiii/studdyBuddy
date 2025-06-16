
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Clock, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Play,
  Settings,
  Zap
} from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizConfig {
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  timeLimit: number;
}

const QuizGenerator = () => {
  const [mode, setMode] = useState<'setup' | 'active' | 'results'>('setup');
  const [config, setConfig] = useState<QuizConfig>({
    subject: '',
    topic: '',
    difficulty: 'medium',
    questionCount: 10,
    timeLimit: 15
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample questions for demo
  const sampleQuestions: Question[] = [
    {
      id: '1',
      question: 'What is the derivative of x² with respect to x?',
      options: ['x', '2x', 'x²', '2'],
      correctAnswer: 1,
      explanation: 'Using the power rule: d/dx(x²) = 2x¹ = 2x',
      difficulty: 'easy'
    },
    {
      id: '2',
      question: 'Which of the following is a fundamental force in physics?',
      options: ['Magnetic force', 'Electromagnetic force', 'Centripetal force', 'Friction'],
      correctAnswer: 1,
      explanation: 'Electromagnetic force is one of the four fundamental forces in nature.',
      difficulty: 'medium'
    }
  ];

  const [questions] = useState<Question[]>(sampleQuestions);

  const handleStartQuiz = async () => {
    if (!config.subject || !config.topic) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    setMode('active');
    setTimeRemaining(config.timeLimit * 60); // Convert to seconds
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setMode('results');
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    setMode('setup');
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setTimeRemaining(0);
  };

  if (mode === 'setup') {
    return (
      <div className="space-y-6">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings size={20} />
              Quiz Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Mathematics, Physics, Chemistry"
                  value={config.subject}
                  onChange={(e) => setConfig({...config, subject: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Calculus, Thermodynamics, Organic Chemistry"
                  value={config.topic}
                  onChange={(e) => setConfig({...config, topic: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select value={config.difficulty} onValueChange={(value: 'easy' | 'medium' | 'hard') => setConfig({...config, difficulty: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Number of Questions</Label>
                <Select value={config.questionCount.toString()} onValueChange={(value) => setConfig({...config, questionCount: parseInt(value)})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Questions</SelectItem>
                    <SelectItem value="10">10 Questions</SelectItem>
                    <SelectItem value="15">15 Questions</SelectItem>
                    <SelectItem value="20">20 Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Time Limit (minutes)</Label>
                <Select value={config.timeLimit.toString()} onValueChange={(value) => setConfig({...config, timeLimit: parseInt(value)})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="20">20 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleStartQuiz} 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              disabled={!config.subject || !config.topic || isGenerating}
            >
              {isGenerating ? (
                <>
                  <Brain className="animate-spin mr-2" size={16} />
                  Generating Quiz with AI...
                </>
              ) : (
                <>
                  <Play className="mr-2" size={16} />
                  Start Quiz
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (mode === 'active') {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="space-y-6">
        {/* Quiz Header */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">{config.subject} - {config.topic}</h2>
                <p className="text-white/80">Question {currentQuestion + 1} of {questions.length}</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span className="font-mono">{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>
            <Progress value={progress} className="h-2 bg-white/20" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  {question.difficulty}
                </Badge>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {question.question}
              </h3>

              <div className="grid gap-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {selectedAnswers[currentQuestion] === index && (
                          <CheckCircle className="text-white" size={14} />
                        )}
                      </div>
                      <span className="text-gray-900 dark:text-white">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" disabled={currentQuestion === 0}>
                  Previous
                </Button>
                <Button 
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (mode === 'results') {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    return (
      <div className="space-y-6">
        {/* Results Header */}
        <Card className={`border-0 text-white ${
          percentage >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
          percentage >= 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
          'bg-gradient-to-r from-red-500 to-pink-600'
        }`}>
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center">
                {percentage >= 80 ? <CheckCircle size={40} /> : 
                 percentage >= 60 ? <Zap size={40} /> : <XCircle size={40} />}
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
                <p className="text-white/80">You scored {score} out of {questions.length} questions</p>
              </div>
              <div className="text-5xl font-bold">{percentage.toFixed(0)}%</div>
            </div>
          </CardContent>
        </Card>

        {/* Question Review */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
          <CardHeader>
            <CardTitle>Question Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {isCorrect ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Question {index + 1}: {question.question}
                      </h4>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Your answer: </span>
                          <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                            {question.options[userAnswer]}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Correct answer: </span>
                            <span className="text-green-600">{question.options[question.correctAnswer]}</span>
                          </p>
                        )}
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={resetQuiz} variant="outline" className="flex-1">
            <RotateCcw className="mr-2" size={16} />
            Take Another Quiz
          </Button>
          <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Brain className="mr-2" size={16} />
            Review with Flashcards
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default QuizGenerator;
