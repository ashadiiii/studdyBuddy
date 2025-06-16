
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  RotateCcw, 
  Plus, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  XCircle, 
  Brain,
  Clock,
  Target,
  Zap
} from 'lucide-react';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  topic: string;
  lastReviewed: string;
  nextReview: string;
  interval: number;
  easeFactor: number;
}

const FlashcardSystem = () => {
  const [mode, setMode] = useState<'library' | 'study' | 'create'>('library');
  const [selectedDeck, setSelectedDeck] = useState<string>('');
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studyStats, setStudyStats] = useState({ correct: 0, incorrect: 0 });

  // Sample flashcards
  const [flashcards] = useState<Flashcard[]>([
    {
      id: '1',
      question: 'What is the derivative of sin(x)?',
      answer: 'cos(x)',
      difficulty: 'medium',
      subject: 'Mathematics',
      topic: 'Calculus',
      lastReviewed: '2024-06-13',
      nextReview: '2024-06-14',
      interval: 1,
      easeFactor: 2.5
    },
    {
      id: '2',
      question: 'What is Newton\'s second law of motion?',
      answer: 'Force equals mass times acceleration (F = ma)',
      difficulty: 'easy',
      subject: 'Physics',
      topic: 'Mechanics',
      lastReviewed: '2024-06-12',
      nextReview: '2024-06-14',
      interval: 2,
      easeFactor: 2.6
    }
  ]);

  const getDecksBySubject = () => {
    const decks = flashcards.reduce((acc, card) => {
      const key = `${card.subject} - ${card.topic}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(card);
      return acc;
    }, {} as Record<string, Flashcard[]>);
    return decks;
  };

  const handleCardResponse = (difficulty: 'again' | 'hard' | 'good' | 'easy') => {
    const responseMap = { again: 0, hard: 1, good: 2, easy: 3 };
    const response = responseMap[difficulty];
    
    if (response >= 2) {
      setStudyStats(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setStudyStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }

    // Move to next card
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
      setShowAnswer(false);
    } else {
      setMode('library');
      setCurrentCard(0);
      setShowAnswer(false);
    }
  };

  const startStudySession = (deckName: string) => {
    setSelectedDeck(deckName);
    setMode('study');
    setCurrentCard(0);
    setShowAnswer(false);
    setStudyStats({ correct: 0, incorrect: 0 });
  };

  if (mode === 'library') {
    const decks = getDecksBySubject();

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Flashcard Library</h2>
            <p className="text-gray-600 dark:text-gray-300">Study with spaced repetition</p>
          </div>
          <Button 
            onClick={() => setMode('create')}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <Plus className="mr-2" size={16} />
            Create Deck
          </Button>
        </div>

        {/* Study Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Total Cards</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{flashcards.length}</p>
                </div>
                <Brain className="text-blue-500" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400">Due Today</p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">5</p>
                </div>
                <Clock className="text-green-500" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 dark:text-purple-400">Mastered</p>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">23</p>
                </div>
                <Target className="text-purple-500" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 dark:text-orange-400">Streak</p>
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">7 days</p>
                </div>
                <Zap className="text-orange-500" size={24} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Decks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(decks).map(([deckName, cards]) => {
            const dueCards = cards.filter(card => new Date(card.nextReview) <= new Date()).length;
            
            return (
              <Card key={deckName} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{deckName}</h3>
                      {dueCards > 0 && (
                        <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                          {dueCards} due
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {cards.length} cards
                    </div>
                    
                    <Button 
                      onClick={() => startStudySession(deckName)}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <RotateCcw className="mr-2" size={16} />
                      Study Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  if (mode === 'study') {
    const deckCards = flashcards.filter(card => `${card.subject} - ${card.topic}` === selectedDeck);
    const card = deckCards[currentCard];
    const progress = ((currentCard + 1) / deckCards.length) * 100;

    return (
      <div className="space-y-6">
        {/* Study Header */}
        <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">{selectedDeck}</h2>
                <p className="text-white/80">Card {currentCard + 1} of {deckCards.length}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/80">Session Progress</div>
                <div className="text-lg font-semibold">
                  ✅ {studyStats.correct} ❌ {studyStats.incorrect}
                </div>
              </div>
            </div>
            <Progress value={progress} className="h-2 bg-white/20" />
          </CardContent>
        </Card>

        {/* Flashcard */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 min-h-[400px]">
          <CardContent className="p-8">
            <div className="space-y-6 text-center">
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                {card.difficulty}
              </Badge>
              
              <div className="space-y-8">
                {/* Question */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Question:
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    {card.question}
                  </p>
                </div>

                {/* Answer */}
                {showAnswer && (
                  <div className="border-t pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Answer:
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      {card.answer}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-6">
                {!showAnswer ? (
                  <Button 
                    onClick={() => setShowAnswer(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Eye className="mr-2" size={16} />
                    Show Answer
                  </Button>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button 
                      onClick={() => handleCardResponse('again')}
                      variant="destructive"
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Again
                    </Button>
                    <Button 
                      onClick={() => handleCardResponse('hard')}
                      variant="outline"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50"
                    >
                      Hard
                    </Button>
                    <Button 
                      onClick={() => handleCardResponse('good')}
                      variant="outline"
                      className="border-green-300 text-green-600 hover:bg-green-50"
                    >
                      Good
                    </Button>
                    <Button 
                      onClick={() => handleCardResponse('easy')}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Easy
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setMode('library')}>
            Back to Library
          </Button>
        </div>
      </div>
    );
  }

  if (mode === 'create') {
    return (
      <div className="space-y-6">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
          <CardHeader>
            <CardTitle>Create New Flashcard Deck</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="e.g., Mathematics" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input id="topic" placeholder="e.g., Calculus" />
              </div>
            </div>
            
            <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Upload notes or documents to auto-generate flashcards with AI
              </p>
              <Button variant="outline">
                <Plus className="mr-2" size={16} />
                Upload Files
              </Button>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setMode('library')} className="flex-1">
                Cancel
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                <Brain className="mr-2" size={16} />
                Generate with AI
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default FlashcardSystem;
