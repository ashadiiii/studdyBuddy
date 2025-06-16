"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Progress } from '../../../components/ui/progress';
import { Badge } from '../../../components/ui/badge';
import TimerSettings from '../../../components/timer/TimerSettings';
import SessionHistory from '../../../components/timer/SessionHistory';
import TimerStats from '../../../components/timer/TimerStats';
import { Play, Pause, Square, RotateCcw, Settings } from 'lucide-react';

export interface TimerSession {
  id: string;
  type: 'focus' | 'short-break' | 'long-break';
  plannedDuration: number;
  actualDuration: number;
  completedAt: Date;
  subject?: string;
  task?: string;
}

interface TimerConfig {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
  autoStartBreaks: boolean;
  autoStartFocus: boolean;
}

const StudyTimer = () => {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState<'focus' | 'short-break' | 'long-break'>('focus');
  const [completedSessions, setCompletedSessions] = useState(0);
  const [sessions, setSessions] = useState<TimerSession[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [subject, setSubject] = useState('');
  const [task, setTask] = useState('');
  
  const [config, setConfig] = useState<TimerConfig>({
    focusDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionsUntilLongBreak: 4,
    autoStartBreaks: false,
    autoStartFocus: false,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sessionStartTime = useRef<Date | null>(null);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);
    } else if (time === 0) {
      handleSessionComplete();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, time]);

  const handleSessionComplete = () => {
    setIsRunning(false);
    
    if (sessionStartTime.current) {
      const sessionDuration = Math.floor((Date.now() - sessionStartTime.current.getTime()) / 1000);
      const newSession: TimerSession = {
        id: Date.now().toString(),
        type: currentSession,
        plannedDuration: getDurationForSession(currentSession) * 60,
        actualDuration: sessionDuration,
        completedAt: new Date(),
        subject: subject || undefined,
        task: task || undefined,
      };
      
      setSessions(prev => [newSession, ...prev].slice(0, 10));
    }

    if (currentSession === 'focus') {
      setCompletedSessions(prev => prev + 1);
      const nextSession = (completedSessions + 1) % config.sessionsUntilLongBreak === 0 
        ? 'long-break' 
        : 'short-break';
      setCurrentSession(nextSession);
      setTime(getDurationForSession(nextSession) * 60);
      
      if (config.autoStartBreaks) {
        setIsRunning(true);
        sessionStartTime.current = new Date();
      }
    } else {
      setCurrentSession('focus');
      setTime(config.focusDuration * 60);
      
      if (config.autoStartFocus) {
        setIsRunning(true);
        sessionStartTime.current = new Date();
      }
    }
  };

  const getDurationForSession = (session: 'focus' | 'short-break' | 'long-break') => {
    switch (session) {
      case 'focus': return config.focusDuration;
      case 'short-break': return config.shortBreakDuration;
      case 'long-break': return config.longBreakDuration;
    }
  };

  const handleStart = () => {
    setIsRunning(true);
    if (!sessionStartTime.current) {
      sessionStartTime.current = new Date();
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTime(getDurationForSession(currentSession) * 60);
    sessionStartTime.current = null;
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentSession('focus');
    setTime(config.focusDuration * 60);
    setCompletedSessions(0);
    sessionStartTime.current = null;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSessionColor = () => {
    switch (currentSession) {
      case 'focus': return 'bg-blue-500';
      case 'short-break': return 'bg-green-500';
      case 'long-break': return 'bg-purple-500';
    }
  };

  const getProgressPercentage = () => {
    const total = getDurationForSession(currentSession) * 60;
    return ((total - time) / total) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Study Timer
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Focus with the Pomodoro Technique
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Timer */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-between items-center">
                  <Badge className={`${getSessionColor()} text-white text-sm px-3 py-1`}>
                    {currentSession.replace('-', ' ').toUpperCase()}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    <Settings size={16} />
                  </Button>
                </div>
                <CardTitle className="text-6xl font-mono font-bold text-gray-900 dark:text-white mt-4">
                  {formatTime(time)}
                </CardTitle>
                <Progress 
                  value={getProgressPercentage()} 
                  className="w-full h-2 mt-4"
                />
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Subject and Task Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g., Mathematics"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Task
                    </label>
                    <input
                      type="text"
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                      placeholder="e.g., Chapter 5 exercises"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Timer Controls */}
                <div className="flex justify-center gap-4">
                  {!isRunning ? (
                    <Button onClick={handleStart} size="lg" className="px-8">
                      <Play size={20} className="mr-2" />
                      Start
                    </Button>
                  ) : (
                    <Button onClick={handlePause} size="lg" className="px-8" variant="secondary">
                      <Pause size={20} className="mr-2" />
                      Pause
                    </Button>
                  )}
                  
                  <Button onClick={handleStop} size="lg" variant="outline">
                    <Square size={20} className="mr-2" />
                    Stop
                  </Button>
                  
                  <Button onClick={handleReset} size="lg" variant="outline">
                    <RotateCcw size={20} className="mr-2" />
                    Reset
                  </Button>
                </div>

                {/* Session Progress */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Completed Sessions: <span className="font-bold text-gray-900 dark:text-white">{completedSessions}</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Next long break in {config.sessionsUntilLongBreak - (completedSessions % config.sessionsUntilLongBreak)} sessions
                  </p>
                </div>

                {/* Settings Panel */}
                {showSettings && (
                  <TimerSettings 
                    config={config} 
                    onConfigChange={setConfig}
                    onClose={() => setShowSettings(false)}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stats and History */}
          <div className="space-y-6">
            <TimerStats sessions={sessions} />
            <SessionHistory sessions={sessions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyTimer;