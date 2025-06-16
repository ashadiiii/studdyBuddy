"use client"
import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { QuickStartSection } from '../../../components/qa/QuickStartSection';
import { ChatArea } from '../../../components/qa/ChatArea';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  category?: string;
}

interface QuickQuestion {
  id: string;
  text: string;
  category: string;
  icon: React.ElementType;
  color: string;
}

const QA = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI Study Assistant. I can help you with homework, explain concepts, provide study tips, and answer any academic questions you have. What would you like to learn about today?",
      type: 'assistant',
      timestamp: new Date(),
      category: 'greeting'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      type: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response (in a real app, this would call an AI API)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content),
        type: 'assistant',
        timestamp: new Date(),
        category: 'response'
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000); // Random delay for realism
  };

  const generateAIResponse = (question: string): string => {
    const responses = [
      "That's a great question! Let me break this down for you step by step...",
      "I'd be happy to help you understand this concept. Here's what you need to know...",
      "This is an important topic in your studies. Let me explain it clearly...",
      "Excellent question! This relates to several key concepts we should explore...",
      "I can see why this might be confusing. Let me clarify this for you...",
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    if (question.toLowerCase().includes('math') || question.toLowerCase().includes('calculate')) {
      return `${randomResponse} Mathematics is all about patterns and logical thinking. For this type of problem, I recommend breaking it down into smaller steps and working through each one methodically. Would you like me to walk through a specific example?`;
    }
    
    if (question.toLowerCase().includes('study') || question.toLowerCase().includes('learn')) {
      return `${randomResponse} Effective studying involves active engagement with the material. Try techniques like the Pomodoro method, spaced repetition, and teaching concepts back to yourself. What specific subject are you struggling with?`;
    }
    
    return `${randomResponse} This is a complex topic that requires careful consideration. I recommend starting with the fundamentals and building up your understanding gradually. Feel free to ask follow-up questions as we work through this together!`;
  };

  const handleQuickQuestion = (question: QuickQuestion) => {
    handleSendMessage(question.text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              AI Study Assistant
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get instant help with your studies. Ask questions, get explanations, and enhance your learning with AI-powered assistance.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar - Quick Actions */}
          <div className="xl:col-span-1">
            <QuickStartSection 
              onQuestionClick={handleQuickQuestion}
              isLoading={isLoading}
            />
          </div>

          {/* Chat Area - Main Content */}
          <div className="xl:col-span-3">
            <ChatArea
              messages={messages}
              inputValue={inputValue}
              setInputValue={setInputValue}
              isLoading={isLoading}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QA;