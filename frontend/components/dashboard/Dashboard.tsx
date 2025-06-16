"use client";

import React, { useState } from "react";
import { ThemeToggle } from "../ThemeToggle";
import AiAssistantModal from "../dashboard/AiAssistantModal";
import ModernFitnessStatCard from "../dashboard/ModernFitnessStatCard";
import ModernSubjectProgressSection from "../dashboard/ModernSubjectProgressSection";
import ModernAgendaCard from "../dashboard/ModernAgendaCard";
import ModernInsightsCard from "../dashboard/ModernInsightsCard";
import ModernCommunityCard from "../dashboard/ModernCommunityCard";
import DashboardHeader from "../dashboard/DashboardHeader";
import WeeklyGoalsCard from "../dashboard/WeeklyGoalsCard";
import UpcomingEventsCard from "../dashboard/UpcomingEventsCard";
import RemindersSection from "../dashboard/RemindersSection";
import { subjects, agendaTasksInitial, upcomingEvents, weeklyGoals as initialWeeklyGoals, reminders } from "../../data/dashboardData";

const Dashboard = () => {
  const [aiOpen, setAiOpen] = useState(false);
  const [agendaTasks, setAgendaTasks] = useState(agendaTasksInitial);
  const [weeklyGoals, setWeeklyGoals] = useState(initialWeeklyGoals);

  function toggleTask(idx: number) {
    setAgendaTasks(tasks =>
      tasks.map((task, i) =>
        i === idx ? { ...task, done: !task.done } : task
      )
    );
  }

  const handleGoalsUpdate = (updatedGoals: typeof weeklyGoals) => {
    setWeeklyGoals(updatedGoals);
  };

  const completedTasks = agendaTasks.filter(t => t.done).length;
  const totalTasks = agendaTasks.length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 py-8 px-1 md:py-10 relative overflow-hidden">
      {/* Animated background elements - enhanced for dark mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-700/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/10 to-orange-600/10 dark:from-pink-500/20 dark:to-orange-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 relative z-10">
        {/* ENHANCED HEADER */}
        <DashboardHeader />

        {/* ENHANCED TOP STATS - removed gamification-related stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <ModernFitnessStatCard
            title="Today's Focus"
            value="4.2h"
            sub="+20% from yesterday"
            icon={<span className="text-blue-500">⏰</span>}
            gradient="from-blue-400 to-indigo-500"
            delay={100}
          />
          <ModernFitnessStatCard
            title="Completion Rate"
            value={`${completionRate}%`}
            sub={`${completedTasks}/${totalTasks} tasks done`}
            icon={<span className="text-green-500">✅</span>}
            gradient="from-green-400 to-emerald-500"
            delay={200}
            progress={completionRate}
          />
          <ModernFitnessStatCard
            title="Current GPA"
            value="3.7"
            sub="↗️ Trending up!"
            icon={<span className="text-purple-500">🏆</span>}
            gradient="from-purple-400 to-violet-500"
            delay={250}
          />
          <ModernFitnessStatCard
            title="AI Suggestions"
            value="5"
            sub="New insights available"
            icon={<span className="text-yellow-500">⚡</span>}
            gradient="from-yellow-400 to-orange-500"
            delay={300}
            onClick={() => setAiOpen(true)}
            isClickable={true}
          />
        </div>

        {/* SMART REMINDERS SECTION */}
        <RemindersSection reminders={reminders} />

        {/* SUBJECT PROGRESS + WEEKLY GOALS SIDE BY SIDE */}
        <div className="flex flex-col xl:flex-row gap-8 mb-8">
          <div className="xl:max-w-md">
            <ModernSubjectProgressSection subjects={subjects} />
          </div>
          <div className="flex-1 min-w-[320px]">
            <WeeklyGoalsCard 
              weeklyGoals={weeklyGoals} 
              onGoalsUpdate={handleGoalsUpdate}
            />
          </div>
        </div>

        {/* UPCOMING EVENTS + AI INSIGHTS SIDE BY SIDE */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="flex-1">
            <UpcomingEventsCard upcomingEvents={upcomingEvents} />
          </div>
          
          <div className="flex-1">
            <ModernInsightsCard onAsk={() => setAiOpen(true)} />
          </div>
        </div>

        {/* AGENDA CARD FULL WIDTH BELOW */}
        <div className="mb-12 flex flex-col items-center">
          <div className="w-full max-w-6xl">
            <ModernAgendaCard 
              tasks={agendaTasks} 
              onToggleTask={toggleTask}
              onOpenAI={() => setAiOpen(true)}
            />
          </div>
        </div>

        {/* GRID BELOW: Community only */}
        <div className="grid grid-cols-1 gap-8 mb-10">
          <ModernCommunityCard />
        </div>
      </div>

      <AiAssistantModal open={aiOpen} onOpenChange={setAiOpen} />
    </div>
  );
};

export default Dashboard;