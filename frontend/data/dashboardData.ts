
export const subjectColors = {
  Mathematics: "bg-[#7C3AED]",     // purple
  Chemistry:   "bg-[#059669]",     // green
  Physics:     "bg-[#F59E42]",     // orange
  Biology:     "bg-[#EF4444]",     // red
};

export const subjects = [
  {
    name: "Mathematics",
    progress: 75,
    next: "Calculus Problem Set",
    due: "Today",
    color: subjectColors.Mathematics,
    timeSpent: "2.5h",
    grade: "A-"
  },
  {
    name: "Chemistry",
    progress: 60,
    next: "Organic Reactions Lab",
    due: "Tomorrow",
    color: subjectColors.Chemistry,
    timeSpent: "1.8h",
    grade: "B+"
  },
  {
    name: "Physics",
    progress: 85,
    next: "Thermodynamics Quiz",
    due: "Friday",
    color: subjectColors.Physics,
    timeSpent: "3.2h",
    grade: "A"
  },
  {
    name: "Biology",
    progress: 45,
    next: "Cell Division Notes",
    due: "Monday",
    color: subjectColors.Biology,
    timeSpent: "1.2h",
    grade: "B"
  },
];

export const agendaTasksInitial = [
  { 
    title: "Complete Chemistry Lab Report", 
    subject: "Chemistry", 
    done: true, 
    priority: "high" as const,
    timeEstimate: "2h",
    deadline: "Today 11:59 PM"
  },
  { 
    title: "Review Physics Chapter 12", 
    subject: "Physics", 
    done: false, 
    priority: "medium" as const,
    timeEstimate: "1h",
    deadline: "Tomorrow 2:00 PM"
  },
  { 
    title: "Math Problem Set 1-15", 
    subject: "Mathematics", 
    done: false, 
    priority: "high" as const,
    timeEstimate: "1.5h",
    deadline: "Friday 9:00 AM"
  },
  { 
    title: "Biology Reading Assignment", 
    subject: "Biology", 
    done: false, 
    priority: "low" as const,
    timeEstimate: "45m",
    deadline: "Next Monday"
  },
  { 
    title: "Prepare for Calculus Exam", 
    subject: "Mathematics", 
    done: false, 
    priority: "high" as const,
    timeEstimate: "3h",
    deadline: "Next Week"
  },
];

export const upcomingEvents = [
  { title: "Physics Lab Session", time: "10:00 AM", date: "Today", type: "lab" as const },
  { title: "Math Study Group", time: "3:00 PM", date: "Tomorrow", type: "study" as const },
  { title: "Chemistry Exam", time: "9:00 AM", date: "Friday", type: "exam" as const },
  { title: "Biology Project Due", time: "11:59 PM", date: "Sunday", type: "assignment" as const },
];

export const weeklyGoals = [
  { title: "Complete 5 Chemistry Labs", progress: 80, target: 5, current: 4 },
  { title: "Study 25 hours total", progress: 68, target: 25, current: 17 },
  { title: "Finish 3 chapters in Physics", progress: 33, target: 3, current: 1 },
  { title: "Submit all assignments", progress: 75, target: 4, current: 3 },
];

export const reminders = [
  {
    id: 1,
    title: "Physics Lab Due Tomorrow",
    description: "Complete thermodynamics experiment report",
    time: "Due: Tomorrow 11:59 PM",
    priority: "high" as const,
    type: "assignment" as const
  },
  {
    id: 2,
    title: "Study Group Meeting",
    description: "Mathematics study session with Sarah and Mike",
    time: "Today 3:00 PM",
    priority: "medium" as const,
    type: "event" as const
  },
  {
    id: 3,
    title: "Take a Break",
    description: "You've been studying for 2 hours straight",
    time: "Now",
    priority: "low" as const,
    type: "wellness" as const
  }
];

export const ringChartColors = [
  "#6366F1", // purple
  "#22C55E", // green
  "#F59E42", // orange
  "#EF4444", // red
];

export const subjectGradients = {
  Mathematics: { from: "#818CF8", to: "#7C3AED" },   // indigo to violet
  Chemistry:   { from: "#3EE9A4", to: "#059669" },   // teal to emerald
  Physics:     { from: "#FDE68A", to: "#F59E42" },   // yellow to orange
  Biology:     { from: "#FCA5A5", to: "#EF4444" },   // pink to red
};
