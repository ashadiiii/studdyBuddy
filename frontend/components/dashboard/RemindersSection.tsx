
import React from "react";
import { BellRing, BookOpen, Calendar, AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface Reminder {
  id: number;
  title: string;
  description: string;
  time: string;
  priority: "high" | "medium" | "low";
  type: "assignment" | "event" | "wellness";
}

interface RemindersSectionProps {
  reminders: Reminder[];
}

export default function RemindersSection({ reminders }: RemindersSectionProps) {
  const shouldUseSlider = reminders.length > 3;

  const renderReminderCard = (reminder: Reminder) => (
    <div key={reminder.id} className="bg-white/60 dark:bg-slate-800/60 rounded-2xl p-4 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 border border-white/40 dark:border-slate-600/40">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${
          reminder.priority === 'high' ? 'bg-red-100 dark:bg-red-900/40' :
          reminder.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/40' : 'bg-green-100 dark:bg-green-900/40'
        }`}>
          {reminder.type === 'assignment' ? <BookOpen className="w-4 h-4 text-red-600 dark:text-red-400" /> :
           reminder.type === 'event' ? <Calendar className="w-4 h-4 text-yellow-600 dark:text-yellow-400" /> :
           <AlertCircle className="w-4 h-4 text-green-600 dark:text-green-400" />}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{reminder.title}</div>
          <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">{reminder.description}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">{reminder.time}</div>
        </div>
        <div className={`w-2 h-2 rounded-full ${
          reminder.priority === 'high' ? 'bg-red-500' :
          reminder.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
        }`} />
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 rounded-3xl shadow-2xl overflow-hidden group hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-white/10 to-red-50/30 dark:from-orange-900/10 dark:via-slate-800/10 dark:to-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl">
              <BellRing className="text-white" size={20} strokeWidth={2.5} />
            </div>
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100">Smart Reminders & Focus Nudges</div>
          </div>

          {shouldUseSlider ? (
            <Carousel className="w-full" opts={{ align: "start" }}>
              <CarouselContent className="-ml-2 md:-ml-4">
                {reminders.map((reminder) => (
                  <CarouselItem key={reminder.id} className="pl-2 md:pl-4 md:basis-1/3">
                    {renderReminderCard(reminder)}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reminders.map((reminder) => renderReminderCard(reminder))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
