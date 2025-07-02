'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, User, GraduationCap, Target, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const educationLevels = [
  { value: 'high_school', label: 'High School' },
  { value: 'university', label: 'University' },
  { value: 'graduate', label: 'Graduate School' },
];

const subjectOptions = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
  'English', 'History', 'Geography', 'Economics', 'Psychology',
  'Engineering', 'Medicine', 'Law', 'Business', 'Arts',
  'Art', 'Music', 'Physical Education', 'Foreign Languages'
];

export default function OnboardingForm({ onSuccess }: { onSuccess?: () => void }) {
  const { createUserProfile, loading, error } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    education_level: '',
    age: '',
    subjects: [] as string[],
  });
  const [customSubject, setCustomSubject] = useState('');

  const handleSubjectChange = (subject: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      subjects: checked
        ? [...prev.subjects, subject]
        : prev.subjects.filter(s => s !== subject)
    }));
  };

  const addCustomSubject = () => {
    if (customSubject.trim() && !formData.subjects.includes(customSubject.trim())) {
      setFormData(prev => ({
        ...prev,
        subjects: [...prev.subjects, customSubject.trim()]
      }));
      setCustomSubject('');
    }
  };

  const removeSubject = (subjectToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s !== subjectToRemove)
    }));
  };

  const handleCustomSubjectKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomSubject();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('handleSubmit called', e);
    e.preventDefault();
    if (!formData.age || !formData.education_level || formData.subjects.length === 0) {
      toast({
        title: 'Please complete all fields',
        description: 'Fill in your age, education level, and select at least one subject.',
        variant: 'destructive',
      });
      return;
    }
    try {
      await createUserProfile({
        education_level: formData.education_level,
        age: parseInt(formData.age),
        subjects: formData.subjects,
      });
      toast({
        title: 'Welcome to Study Assistant!',
        description: 'Your profile has been set up successfully.'
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      toast({
        title: 'Failed to create profile',
        description: error || 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="relative w-full max-w-2xl z-10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 dark:from-blue-500/10 dark:to-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-slate-700/50 shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl">
              <BookOpen className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Complete Your Profile
            </h1>
          </div>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
            Help us personalize your learning experience by sharing some basic information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Age Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                  <User className="text-white" size={16} />
                </div>
                <Label htmlFor="age" className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  What's your age?
                </Label>
              </div>
              <Input
                id="age"
                type="number"
                min="5"
                max="100"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                placeholder="Enter your age"
                className="text-lg p-4 border-2 border-gray-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl"
              />
            </div>
            {/* Education Level Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl">
                  <GraduationCap className="text-white" size={16} />
                </div>
                <Label className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  What level of education are you currently in?
                </Label>
              </div>
              <Select
                value={formData.education_level}
                onValueChange={(value) => setFormData(prev => ({ ...prev, education_level: value }))}
              >
                <SelectTrigger className="text-lg p-4 border-2 border-gray-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl">
                  <SelectValue placeholder="Select your education level" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600">
                  {educationLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value} className="text-lg p-3">
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Subjects Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                  <Target className="text-white" size={16} />
                </div>
                <Label className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Which subjects are you studying?
                </Label>
              </div>
              {/* Custom subject input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Add a custom subject..."
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  onKeyUp={handleCustomSubjectKeyPress}
                  className="flex-1 text-sm p-3 border-2 border-gray-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl"
                />
                <Button
                  type="button"
                  onClick={addCustomSubject}
                  disabled={!customSubject.trim()}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
                >
                  <Plus size={16} />
                </Button>
              </div>
              {/* Selected subjects display */}
              {formData.subjects.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Selected subjects:
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.subjects.map((subject) => (
                      <div
                        key={subject}
                        className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{subject}</span>
                        <button
                          type="button"
                          onClick={() => removeSubject(subject)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-bold text-lg leading-none"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Predefined subjects */}
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                  Or select from common subjects:
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {subjectOptions.map((subject) => (
                    <div key={subject} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors">
                      <Checkbox
                        id={subject}
                        checked={formData.subjects.includes(subject)}
                        onCheckedChange={(checked:boolean) => handleSubjectChange(subject, checked as boolean)}
                        className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                      />
                      <Label
                        htmlFor={subject}
                        className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer flex-1"
                      >
                        {subject}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg"
              disabled={loading}
            >
              {loading ? 'Creating Profile...' : 'Complete Setup & Start Learning'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 