
import React from "react";
import { Calendar } from "lucide-react";

interface Event {
  title: string;
  date: string;
  time: string;
  type: 'exam' | 'lab' | 'study' | 'assignment';
}

interface UpcomingEventsCardProps {
  upcomingEvents: Event[];
}

export default function UpcomingEventsCard({ upcomingEvents }: UpcomingEventsCardProps) {
  return (
    <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-3xl shadow-2xl overflow-hidden group hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/10 to-purple-50/30 dark:from-blue-900/10 dark:via-gray-800/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
            <Calendar className="text-white" size={20} strokeWidth={2.5} />
          </div>
          <div className="text-2xl font-black text-gray-800 dark:text-gray-100">Upcoming Events</div>
        </div>

        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-white/60 dark:bg-gray-700/60 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:scale-105 border border-white/40 dark:border-gray-600/40">
              <div className={`w-3 h-3 rounded-full ${
                event.type === 'exam' ? 'bg-red-500' :
                event.type === 'lab' ? 'bg-purple-500' :
                event.type === 'study' ? 'bg-blue-500' : 'bg-orange-500'
              }`} />
              <div className="flex-1">
                <div className="font-semibold text-gray-800 dark:text-gray-100">{event.title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{event.date} at {event.time}</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                event.type === 'exam' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                event.type === 'lab' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
                event.type === 'study' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
              }`}>
                {event.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
