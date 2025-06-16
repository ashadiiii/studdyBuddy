"use client";

import Link from "next/link" // Change from react-router-dom
import { usePathname } from "next/navigation" // Instead of useLocation
import {
  LayoutDashboard,
  Calendar,
  ListTodo,
  BrainCircuit,
  Clock,
  TrendingUp,
  MessageSquareMore,
  BookOpenCheck,
  Sparkles,
  Trophy,
  HelpCircle,
  Timer,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
const navSections = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", to: "/", icon: LayoutDashboard },
    ]
  },
  {
    label: "Planning & Organization",
    items: [
      { label: "Tasks", to: "/tasks", icon: ListTodo },
      { label: "Goal Breakdown (AI)", to: "/goal-breakdown", icon: BrainCircuit },
      { label: "Schedule", to: "/schedule", icon: Calendar },
    ]
  },
  {
    label: "Study Tools",
    items: [
      { label: "Study Timer", to: "/study-timer", icon: Timer },
      { label: "Knowledge Evaluator", to: "/knowledge-evaluator", icon: HelpCircle },
      { label: "Note Generator", to: "/note-generator", icon: Clock },
      { label: "Q&A", to: "/qa", icon: MessageSquareMore },
    ]
  },
  {
    label: "Progress & Insights",
    items: [
      { label: "Progress", to: "/progress", icon: TrendingUp },
      { label: "Study Blog", to: "/study-blog", icon: MessageSquareMore },
      { label: "Recommendations", to: "/recommendations", icon: Sparkles },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);

  const toggleSection = (sectionLabel: string) => {
    setCollapsedSections(prev => 
      prev.includes(sectionLabel) 
        ? prev.filter(label => label !== sectionLabel)
        : [...prev, sectionLabel]
    );
  };

  return (
    <aside className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 px-3 py-6 h-screen min-w-[220px] fixed left-0 top-0 z-40 shadow-lg overflow-y-auto">
      <div className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
        <span className="text-2xl">📚</span>
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Study Assistant
        </span>
      </div>
      
      <nav className="flex flex-col gap-4">
        {navSections.map((section) => {
          const isCollapsed = collapsedSections.includes(section.label);
          
          return (
            <div key={section.label} className="space-y-1">
              <button
                onClick={() => toggleSection(section.label)}
                className="flex items-center justify-between w-full px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                <span>{section.label}</span>
                <ChevronDown 
                  className={`w-3 h-3 transition-transform ${isCollapsed ? '-rotate-90' : ''}`} 
                />
              </button>
              
              {!isCollapsed && (
                <div className="space-y-1 pl-1">
                  {section.items.map(({ label, to, icon: Icon }) => (
                    <Link
                      href={to}
                      key={to}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:scale-105 group
                        ${pathname === to 
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg" 
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-100"
                        }`}
                    >
                      <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                        pathname === to ? "text-white" : "text-gray-500 dark:text-gray-400"
                      }`} />
                      <span className="text-sm">{label}</span>
                      {pathname === to && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
