// app/models.ts

export interface TimerSession {
    id: string;
    type: "focus" | "short-break" | "long-break";
    plannedDuration: number;
    actualDuration: number;
    completedAt: Date;
    subject?: string;
    task?: string;
  }
  
  export interface TimerConfig {
    focusDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    sessionsUntilLongBreak: number;
    autoStartBreaks: boolean;
    autoStartFocus: boolean;
  }
  
  export interface StudyStats {
    today_minutes: string;
    total_focus_minutes: string;
    completed_sessions: number;
    streak_days: number;
  }
  
  export interface TodayFocusResponse {
    today_focus: string;
    percentage_change: string;
    today_seconds: number;
    yesterday_seconds: number;
  }