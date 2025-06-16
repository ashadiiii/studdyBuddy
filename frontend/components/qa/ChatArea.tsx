
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Bot, 
  User,
  Zap
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  category?: string;
}

interface ChatAreaProps {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  isLoading: boolean;
  onSendMessage: (content: string) => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  inputValue,
  setInputValue,
  isLoading,
  onSendMessage
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage(inputValue);
    }
  };

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 h-[700px] flex flex-col">
      {/* Chat Header */}
      <CardHeader className="border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600">
              <AvatarFallback className="bg-transparent">
                <Bot className="w-5 h-5 text-white" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Study Assistant</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Online • Ready to help</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 dark:text-green-400">Active</span>
          </div>
        </div>
      </CardHeader>
      
      {/* Messages */}
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'assistant' && (
                  <Avatar className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 flex-shrink-0">
                    <AvatarFallback className="bg-transparent">
                      <Bot className="w-4 h-4 text-white" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className={`text-xs ${
                      message.type === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    {message.category && message.category !== 'greeting' && (
                      <Badge variant="secondary" className="text-xs ml-2">
                        {message.category}
                      </Badge>
                    )}
                  </div>
                </div>
                
                {message.type === 'user' && (
                  <Avatar className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 flex-shrink-0">
                    <AvatarFallback className="bg-transparent">
                      <User className="w-4 h-4 text-white" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-4 justify-start">
                <Avatar className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600">
                  <AvatarFallback className="bg-transparent">
                    <Bot className="w-4 h-4 text-white" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Input Area */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your studies..."
                className="pr-12 h-12 rounded-xl border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                disabled={isLoading}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Zap className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <Button 
              onClick={() => onSendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              size="icon"
              className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Press Enter to send • AI responses are generated for demonstration
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
