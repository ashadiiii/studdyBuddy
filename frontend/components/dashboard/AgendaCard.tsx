import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AiAssistantModal from "./AiAssistantModal";
import AgendaTask from "./AgendaTask";
import { List } from "lucide-react"; // Lucide icon

interface AgendaTaskType {
  title: string;
  subject: string;
  done: boolean;
  priority: "high" | "medium" | "low";
}
const agendaTasksInitial: AgendaTaskType[] = [
  { title: "Complete Chemistry Lab Report", subject: "Chemistry", done: true, priority: "high" },
  { title: "Review Physics Chapter 12", subject: "Physics", done: false, priority: "medium" },
  { title: "Math Problem Set 1-15", subject: "Mathematics", done: false, priority: "high" },
  { title: "Biology Reading Assignment", subject: "Biology", done: false, priority: "low" },
];

const AgendaCard = () => {
  const [aiOpen, setAiOpen] = useState(false);
  const [agendaTasks, setAgendaTasks] = useState(agendaTasksInitial);

  function toggleTask(idx: number) {
    setAgendaTasks(tasks =>
      tasks.map((task, i) => (i === idx ? { ...task, done: !task.done } : task))
    );
  }

  return (
    <div className="relative w-full max-w-xl bg-white/85 rounded-3xl border border-white/40 backdrop-blur-xl shadow-2xl px-7 py-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="text-xl font-extrabold tracking-wide">Today's Agenda</div>
        <List className="text-blue-500" size={21} strokeWidth={2.1} />
      </div>
      <div className="mb-7 flex gap-2">
        <Button variant="secondary" size="sm" className="rounded-full px-6 hover:scale-105">Tasks</Button>
        <Button variant="ghost" size="sm" className="rounded-full px-6 hover:scale-105">Schedule</Button>
        <Button variant="ghost" size="sm" className="rounded-full px-6 hover:scale-105">Assessments</Button>
      </div>
      <div className="space-y-2 mb-5">
        {agendaTasks.map((t, i) => (
          <AgendaTask
            key={i}
            title={t.title}
            subject={t.subject}
            done={t.done}
            priority={t.priority}
            onToggle={() => toggleTask(i)}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          variant="outline"
          className="text-xs font-bold px-5 py-2 rounded-lg animate-fade-in"
          onClick={() => setAiOpen(true)}
        >
          <span className="material-symbols-outlined text-primary text-base mr-2">smart_toy</span>
          Ask AI to Plan Workout
        </Button>
        <AiAssistantModal open={aiOpen} onOpenChange={setAiOpen} />
      </div>
    </div>
  );
};

export default AgendaCard;
