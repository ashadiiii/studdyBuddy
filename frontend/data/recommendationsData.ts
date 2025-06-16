
export const learningTechniques = [
  {
    id: 'pomodoro',
    name: 'Pomodoro Technique',
    description: 'Break study sessions into 25-minute focused intervals with 5-minute breaks.',
    category: 'universal',
    difficulty: 'beginner' as const,
    timeRequired: '25-30 min',
    bestFor: ['visual', 'auditory', 'kinesthetic', 'focus', 'time-management'],
    steps: [
      'Choose a task to work on',
      'Set a timer for 25 minutes',
      'Work on the task until timer rings',
      'Take a 5-minute break',
      'Repeat 3-4 times, then take a longer break'
    ],
    benefits: [
      'Improves focus and concentration',
      'Reduces mental fatigue',
      'Helps track productivity',
      'Prevents burnout'
    ],
    icon: '🍅'
  },
  {
    id: 'active-recall',
    name: 'Active Recall',
    description: 'Test yourself on material instead of just re-reading notes.',
    category: 'universal',
    difficulty: 'intermediate' as const,
    timeRequired: '15-45 min',
    bestFor: ['reading', 'visual', 'memorization', 'exam-prep'],
    steps: [
      'Study material once',
      'Close books and notes',
      'Write down everything you remember',
      'Check against original material',
      'Identify gaps and review'
    ],
    benefits: [
      'Strengthens memory retention',
      'Identifies knowledge gaps',
      'Improves exam performance',
      'More efficient than passive reading'
    ],
    icon: '🧠'
  },
  {
    id: 'spaced-repetition',
    name: 'Spaced Repetition',
    description: 'Review material at increasing intervals to improve long-term retention.',
    category: 'universal',
    difficulty: 'intermediate' as const,
    timeRequired: '10-20 min',
    bestFor: ['reading', 'visual', 'memorization', 'vocabulary'],
    steps: [
      'Learn new material',
      'Review after 1 day',
      'Review after 3 days',
      'Review after 1 week',
      'Review after 2 weeks, then monthly'
    ],
    benefits: [
      'Maximizes long-term retention',
      'Reduces study time over time',
      'Prevents forgetting',
      'Scientifically proven effective'
    ],
    icon: '📅'
  },
  {
    id: 'feynman',
    name: 'Feynman Technique',
    description: 'Explain concepts in simple terms as if teaching someone else.',
    category: 'universal',
    difficulty: 'advanced' as const,
    timeRequired: '20-40 min',
    bestFor: ['auditory', 'reading', 'complex-concepts', 'understanding'],
    steps: [
      'Choose a concept to learn',
      'Write an explanation in simple terms',
      'Identify gaps in understanding',
      'Review source material for gaps',
      'Simplify and use analogies'
    ],
    benefits: [
      'Deepens understanding',
      'Reveals knowledge gaps',
      'Improves communication skills',
      'Enhances problem-solving'
    ],
    icon: '👨‍🏫'
  },
  {
    id: 'mind-mapping',
    name: 'Mind Mapping',
    description: 'Create visual diagrams connecting related concepts and ideas.',
    category: 'visual',
    difficulty: 'beginner' as const,
    timeRequired: '15-30 min',
    bestFor: ['visual', 'brainstorming', 'organization', 'creativity'],
    steps: [
      'Start with main topic in center',
      'Add major subtopics as branches',
      'Connect related ideas with lines',
      'Use colors and images',
      'Review and refine connections'
    ],
    benefits: [
      'Improves visual learning',
      'Shows relationships between ideas',
      'Enhances creativity',
      'Better information organization'
    ],
    icon: '🗺️'
  },
  {
    id: 'memory-palace',
    name: 'Memory Palace',
    description: 'Associate information with familiar locations to improve recall.',
    category: 'visual',
    difficulty: 'advanced' as const,
    timeRequired: '30-60 min',
    bestFor: ['visual', 'kinesthetic', 'memorization', 'sequences'],
    steps: [
      'Choose a familiar location',
      'Plan a specific route through it',
      'Associate information with locations',
      'Visualize walking the route',
      'Practice retrieving information'
    ],
    benefits: [
      'Powerful memorization technique',
      'Works for sequential information',
      'Long-lasting memory formation',
      'Useful for speeches and lists'
    ],
    icon: '🏰'
  },
  {
    id: 'rubber-duck',
    name: 'Rubber Duck Debugging',
    description: 'Explain your problem or concept out loud to an inanimate object.',
    category: 'auditory',
    difficulty: 'beginner' as const,
    timeRequired: '10-20 min',
    bestFor: ['auditory', 'problem-solving', 'debugging', 'understanding'],
    steps: [
      'Get a rubber duck (or any object)',
      'Explain the problem step by step',
      'Describe what you expect to happen',
      'Identify where expectations differ',
      'Work through the solution aloud'
    ],
    benefits: [
      'Clarifies thinking process',
      'Helps identify errors',
      'Improves problem-solving',
      'No judgment or interruption'
    ],
    icon: '🦆'
  },
  {
    id: 'hands-on-practice',
    name: 'Hands-on Practice',
    description: 'Learn by doing through practical exercises and real-world application.',
    category: 'kinesthetic',
    difficulty: 'beginner' as const,
    timeRequired: '30-90 min',
    bestFor: ['kinesthetic', 'practical-skills', 'problem-solving', 'application'],
    steps: [
      'Find practical exercises',
      'Start with simple examples',
      'Practice without looking at solutions',
      'Build complexity gradually',
      'Apply to real-world scenarios'
    ],
    benefits: [
      'Develops practical skills',
      'Improves muscle memory',
      'Better retention through action',
      'Builds confidence'
    ],
    icon: '🔧'
  }
];

export const personalizedRecommendations = [
  {
    id: 'math-visual',
    title: 'Visual Math Problem Solving',
    description: 'Use diagrams and visual representations to tackle complex math problems more effectively.',
    reason: 'Your visual learning style shows 40% better performance when using graphical methods for math.',
    urgency: 'high' as const,
    category: 'visual',
    estimatedImpact: '+25%',
    actionItems: [
      'Draw diagrams for word problems',
      'Use color coding for different equation parts',
      'Create visual step-by-step solution guides',
      'Practice with graphing tools and apps'
    ],
    icon: '📊'
  },
  {
    id: 'chemistry-spaced',
    title: 'Spaced Repetition for Chemistry',
    description: 'Implement spaced repetition for chemical formulas and reactions to improve retention.',
    reason: 'You struggle with chemistry memorization - spaced repetition can improve retention by 60%.',
    urgency: 'high' as const,
    category: 'general',
    estimatedImpact: '+40%',
    actionItems: [
      'Create flashcards for chemical formulas',
      'Review reactions daily for 3 days, then weekly',
      'Use apps like Anki for automated spacing',
      'Focus on patterns in chemical behavior'
    ],
    icon: '⚗️'
  },
  {
    id: 'physics-feynman',
    title: 'Physics Concept Explanation',
    description: 'Use the Feynman technique to master complex physics concepts by teaching them.',
    reason: 'Your high physics performance suggests you understand concepts well - teaching reinforces this.',
    urgency: 'medium' as const,
    category: 'general',
    estimatedImpact: '+20%',
    actionItems: [
      'Explain physics concepts to study partners',
      'Create simple analogies for complex ideas',
      'Record yourself explaining difficult topics',
      'Identify and address knowledge gaps'
    ],
    icon: '⚡'
  },
  {
    id: 'break-reminder',
    title: 'Strategic Break Scheduling',
    description: 'You tend to study for long periods - implementing breaks will boost your productivity.',
    reason: 'Data shows your focus drops after 45 minutes. Strategic breaks can maintain peak performance.',
    urgency: 'medium' as const,
    category: 'general',
    estimatedImpact: '+30%',
    actionItems: [
      'Set 45-minute study blocks with 10-minute breaks',
      'Take a 30-minute break every 2-3 hours',
      'Include physical movement in breaks',
      'Stay hydrated during study sessions'
    ],
    icon: '⏰'
  },
  {
    id: 'biology-visual',
    title: 'Biology Process Visualization',
    description: 'Create visual flowcharts and diagrams for biological processes to improve understanding.',
    reason: 'Biology involves many complex processes - visual learners retain 65% more with diagrams.',
    urgency: 'low' as const,
    category: 'visual',
    estimatedImpact: '+35%',
    actionItems: [
      'Draw cellular processes step-by-step',
      'Use mind maps for biological systems',
      'Create visual timelines for evolution',
      'Color-code different biological components'
    ],
    icon: '🧬'
  },
  {
    id: 'study-group',
    title: 'Collaborative Learning Sessions',
    description: 'Join or form study groups to leverage social learning and fill knowledge gaps.',
    reason: 'Your discussion-based learning shows improvement - group sessions can enhance this.',
    urgency: 'low' as const,
    category: 'auditory',
    estimatedImpact: '+15%',
    actionItems: [
      'Form weekly study groups for each subject',
      'Take turns explaining difficult concepts',
      'Quiz each other on important material',
      'Share different problem-solving approaches'
    ],
    icon: '👥'
  }
];

export const performanceData = {
  weeklyProgress: [
    { week: 'Week 1', score: 65, techniques: 2 },
    { week: 'Week 2', score: 72, techniques: 3 },
    { week: 'Week 3', score: 78, techniques: 4 },
    { week: 'Week 4', score: 85, techniques: 4 },
    { week: 'Week 5', score: 82, techniques: 5 },
    { week: 'Week 6', score: 88, techniques: 5 }
  ],
  subjectPerformance: [
    { subject: 'Mathematics', score: 85, improvement: 12 },
    { subject: 'Physics', score: 92, improvement: 8 },
    { subject: 'Chemistry', score: 78, improvement: -3 },
    { subject: 'Biology', score: 81, improvement: 15 }
  ],
  timeDistribution: [
    { technique: 'Pomodoro', hours: 12, effectiveness: 85 },
    { technique: 'Active Recall', hours: 8, effectiveness: 92 },
    { technique: 'Mind Mapping', hours: 6, effectiveness: 78 },
    { technique: 'Spaced Rep.', hours: 4, effectiveness: 95 },
    { technique: 'Practice', hours: 10, effectiveness: 88 }
  ],
  streakData: {
    current: 12,
    longest: 18,
    weeklyGoal: 5
  }
};
