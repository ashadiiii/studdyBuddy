from pydantic import BaseModel, Field, validator
from typing import List, Optional, Dict, Tuple
from datetime import datetime, date, time
import re
from .tasks import TaskForSchedule,RescheduleTask


class ScheduleUserInput(BaseModel):
    description: Optional[str] = Field(..., description="Description specifying user requirements and preferences")
    unavailable_dates_and_times: str = Field(..., description="String of unavailable dates and times (e.g., '2025-07-10 18:00-20:00, 2025-07-11 14:00-16:00')")
    available_days_and_times: str = Field(..., description="String of available days (e.g., 'Monday, Tuesday, Saturday') along with the available slots (e.g., ['18:00-20:00', '09:00-11:00'])")
    preffered_time_slots: List[str] = Field(..., description="List of preferred time slots (e.g., ['18:00-20:00', '09:00-11:00'])")
    study_pace: str = Field(..., description="Study pace (1 to 5, 1=relaxed, 5=intensive)")
    study_intensity: str = Field(..., description="Study intensity (1 to 5, 1=light review, 5=deep focus)")    
    study_session_period:str
    break_time:str

class SchedulerInput(BaseModel):
    ScheduleUserInput: ScheduleUserInput 
    Tasks: List[TaskForSchedule] = Field(..., description="List of tasks with their details")


class TimeSlot(BaseModel):
    date:str
    start:str
    end:str
    title:Optional[str]

class ScheduleEvent(BaseModel):
    task: str
    start: str
    end: str
    priority: str

class DaySchedule(BaseModel):
    date: str
    events: List[ScheduleEvent]

class FreeSlot(BaseModel):
    date: str
    free_slots: List[Tuple[str, str]]

class CurrentScheduleResult(BaseModel):
    current_schedule: List[DaySchedule]
    available_slots: List[FreeSlot]


class Reschedule(BaseModel):
    task_to_reschedule: RescheduleTask
    available_time_slots: List[FreeSlot]
    current_schedule: List[DaySchedule]
    break_time: str
    session_duration: str
    study_pace: int
    user_study_intensity: int
    user_preference_description: Optional[str]


class scheduleItem(BaseModel):
    taskId: Optional[str]
    userId: str
    scheduled_date: date = Field(..., description="Date of the scheduled event")
    scheduled_time_start: time = Field(..., description="Start time of the event")
    scheduled_time_end: time = Field(..., description="End time of the event")
    duration: str = Field(..., description="Duration calculated from start and end times")
    session_type: str
    completed: bool
    title: str
    priority: str
