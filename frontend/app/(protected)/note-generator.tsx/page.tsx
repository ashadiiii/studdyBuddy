"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Textarea } from '../../../components/ui/textarea';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { 
  FileText, 
  Upload, 
  Link, 
  BookOpen, 
  Download, 
  Share, 
  Sparkles,
  Brain,
  Target,
  Eye,
  Settings,
  MessageSquare,
  CheckCircle
} from 'lucide-react';

const NoteGenerator = () => {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [complexity, setComplexity] = useState('intermediate');
  const [format, setFormat] = useState('structured');
  const [focus, setFocus] = useState('balanced');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState('');

  const complexityLevels = [
    { value: 'basic', label: 'Basic', description: 'Simple explanations for beginners' },
    { value: 'intermediate', label: 'Intermediate', description: 'Balanced depth and clarity' },
    { value: 'advanced', label: 'Advanced', description: 'Comprehensive technical detail' }
  ];

  const noteFormats = [
    { value: 'structured', label: 'Structured Notes', icon: FileText },
    { value: 'cornell', label: 'Cornell Notes', icon: BookOpen },
    { value: 'mindmap', label: 'Mind Map', icon: Brain },
    { value: 'bullets', label: 'Bullet Summary', icon: Target }
  ];

  const focusAreas = [
    { value: 'definitions', label: 'Definitions & Key Terms' },
    { value: 'examples', label: 'Examples & Applications' },
    { value: 'visual', label: 'Visual Aids & Diagrams' },
    { value: 'balanced', label: 'Balanced Approach' }
  ];

  const generateNotes = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const sampleNotes = `# ${topic || 'Generated Notes'}

## Key Concepts

### Definition
${topic === 'Photosynthesis' ? 'Photosynthesis is the process by which plants convert light energy into chemical energy (glucose) using carbon dioxide and water.' : 'Key concept explanation based on your input topic.'}

### Important Points
• ${complexity === 'basic' ? 'Simple breakdown of main ideas' : complexity === 'intermediate' ? 'Detailed explanation with examples' : 'Comprehensive analysis with technical details'}
• Process involves multiple stages and reactions
• Critical for understanding ecosystem energy flow

### Formulas & Equations
${topic === 'Photosynthesis' ? '6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂' : 'Relevant formulas will be displayed here'}

### Key Terms
- **Chloroplast**: Organelle where photosynthesis occurs
- **Chlorophyll**: Green pigment that captures light energy
- **ATP**: Energy currency of cells

### Examples & Applications
${focus === 'examples' ? '• Real-world applications and case studies\n• Practical examples from daily life\n• Industry applications' : '• Brief examples to illustrate concepts\n• Connections to other topics'}

### Summary
${format === 'cornell' ? 'Cornell Notes format with cue column for questions and summary section' : format === 'mindmap' ? 'Central concept with branching ideas and connections' : 'Structured summary of all key points covered'}
`;
      setGeneratedNotes(sampleNotes);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          🎯 Personalized Note Generator
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          AI-powered note generation tailored to your learning style and goals
        </p>
        <div className="flex justify-center gap-2">
          <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered
          </Badge>
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            <Brain className="w-3 h-3 mr-1" />
            Personalized
          </Badge>
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <Target className="w-3 h-3 mr-1" />
            Goal-Oriented
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Content Input
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="topic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="topic">Topic</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="link">Link</TabsTrigger>
                </TabsList>
                <TabsContent value="topic" className="space-y-4">
                  <div>
                    <Label htmlFor="topic">Topic or Subject</Label>
                    <Input
                      id="topic"
                      placeholder="e.g., Photosynthesis for GCSE Biology"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="content" className="space-y-4">
                  <div>
                    <Label htmlFor="content">Paste Content or Upload File</Label>
                    <Textarea
                      id="content"
                      placeholder="Paste your lecture notes, textbook content, or syllabus here..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="mt-1 min-h-[120px]"
                    />
                    <Button variant="outline" className="mt-2 w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload PDF/Document
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="link" className="space-y-4">
                  <div>
                    <Label htmlFor="link">YouTube or Resource Link</Label>
                    <Input
                      id="link"
                      placeholder="https://youtube.com/watch?v=..."
                      className="mt-1"
                    />
                    <Button variant="outline" className="mt-2 w-full">
                      <Link className="w-4 h-4 mr-2" />
                      Extract Content
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Personalization Settings */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Personalization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Complexity Level</Label>
                <Select value={complexity} onValueChange={setComplexity}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {complexityLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div>
                          <div className="font-medium">{level.label}</div>
                          <div className="text-sm text-gray-500">{level.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Note Format</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {noteFormats.map((formatOption) => (
                    <Button
                      key={formatOption.value}
                      variant={format === formatOption.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFormat(formatOption.value)}
                      className="flex items-center gap-2 text-left justify-start"
                    >
                      <formatOption.icon className="w-4 h-4" />
                      <span className="text-xs">{formatOption.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Focus Area</Label>
                <Select value={focus} onValueChange={setFocus}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {focusAreas.map((area) => (
                      <SelectItem key={area.value} value={area.value}>
                        {area.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={generateNotes} 
                disabled={!topic && !content || isGenerating}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating Notes...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Generate Notes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Generated Notes Section */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Generated Notes
                </CardTitle>
                {generatedNotes && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Create Flashcards
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {generatedNotes ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-green-700 dark:text-green-300 font-medium">
                      Notes generated successfully!
                    </span>
                  </div>
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border text-sm">
                      {generatedNotes}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Ready to Generate Notes
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md">
                      Enter a topic or paste content on the left, customize your preferences, and click "Generate Notes" to create personalized study materials.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI-Powered</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Advanced AI analyzes your content and learning style to create optimal notes
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-700">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Personalized</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tailored to your complexity level, format preference, and focus areas
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Multiple Formats</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Choose from structured notes, Cornell format, mind maps, or bullet summaries
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NoteGenerator;