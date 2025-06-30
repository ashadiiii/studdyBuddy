from supabase import Client
from datetime import datetime,timedelta
from ..models.tasks import RescheduleTask
from ..models.schedule import SchedulerInput,ScheduleUserInput, CurrentScheduleResult, DaySchedule, ScheduleEvent, FreeSlot,Reschedule,scheduleItem
from .task_service import get_tasks_for_user_schedule
from .agentCall_service import call_agent
from ..utils.time_utils import subtract_time_period,get_duration_with_overnight
from typing import List
import json
from fastapi import HTTPException
from agents.schedular_agent import root_agent
from agents.schedular_agent import root_agent as reschedular_agent


def get_schedule(user_id:str,supabase:Client):
    '''This is for loading data to the UI'''
    response = supabase.table("schedule").select("*").eq("user_id",user_id).execute()
    rows = response.data
    events = []
    for row in rows:
        event = {
            "id": row["id"],
            "title":row["title"],
            "subject":row["subject"],
            "date":str(row["scheduled_date"]),
            "time":f"{str(row["scheduled_time_start"][:5])} - {str(row["scheduled_time_end"][:5])}",
            "duration":row["duration"],
            "type":row["type"],
            "priority":row["priority"],
            "completed":row["completed"]
        }
        events.append(event)
    return events

async def create_schedule(
    schedule:ScheduleUserInput,
    user_id:str,
    supabase:Client
):
    #1. Add entry to user_schedule_info
        #check if an entry already exists
    response = supabase.table("user_schedule_info").select("*").eq("user_id",user_id).execute()
    exists = response.data and len(response.data)>0
    schedule_user_info = schedule.model_dump()
        #if not add the current entry as a new row
    if exists:
        supabase.table("user_schedule_info") \
            .update(schedule) \
            .eq("user_info",user_id) \
            .execute()
        #Else update the existing information with the new date
    else:
        schedule_user_info["user_id"] = user_id
        supabase.table("user_schedule_info") \
                            .insert(schedule_user_info) \
                            .execute()
    #2. Delete all currently scheduled tasks(because it is going to be reconfigured)
    supabase.table('schedule').delete("*").eq("user_id",user_id).eq("type","Study session").execute()
    #3. Get task list information
    scheduler_input = SchedulerInput(
        ScheduleUserInput=schedule,
        Tasks=get_tasks_for_user_schedule(supabase=supabase,user_id=user_id)
    )
    #4. Create schedule
    #(i) add the age and education level attributes and convert the input to string
    response = supabase.table('users').select("education_level,age").eq('user_id', user_id).execute()
    user_data = response.data

    if not user_data or len(user_data) == 0:
        raise HTTPException(status_code=404, detail="User not found")

    #Converting to json string
    schedule_dict = scheduler_input.model_dump()
    user_info = user_data[0]
    schedule_dict['education_level'] = user_info['education_level']
    schedule_dict['age'] = user_info['age']
    schedule__str = json.dumps(schedule_dict)

    #(ii) Call the callBreakdown agent
    initial_state={
        "objectivesAndRequirements":"",
        "plan":"",
        "review":""
    }
    plan_obj = call_agent(agent=root_agent,output_key="plan",initial_state=initial_state,user_id=user_id,query=schedule__str)
    
    #4. Update the scheduler table with all the new tasks
    insert_schedule_rows(supabase, plan_obj,user_id)

def insert_schedule_rows(supabase, schedule_dict, user_id):
    for task in schedule_dict["schedule"]["tasks"]:
        task_id = task["task_id"]
        title = task["title"]
        priority = task["priority"]
        for slot in task["time_slots"]:
            # Parse date and times
            start_dt = slot["start_time"]  # e.g., "2024-08-23 14:00:00"
            end_dt = slot["end_time"]      # e.g., "2024-08-23 16:00:00"
            # Extract date and time parts
            scheduled_date = start_dt.split(" ")[0]
            scheduled_time_start = start_dt.split(" ")[1]
            scheduled_time_end = end_dt.split(" ")[1]
            duration = slot["duration"]    # e.g., "2 hours" or calculate as needed
            # Prepare row for insertion
            row = {
                "task_id": task_id,
                "user_id": user_id,
                "scheduled_date": scheduled_date,
                "scheduled_time_start": scheduled_time_start,
                "scheduled_time_end": scheduled_time_end,
                "duration": duration ,
                "type": "Task",
                "completed" :False,
                "title":title,
                "priority":priority
            }
            # Insert into schedule table
            response = supabase.table("schedule").insert(row).execute()
            if not response.data:
                print(f"Failed to insert schedule row for task {task_id}")


def reschedule_task(user_id:str, supabase:Client, task_id:str):
    #1. Format input
    #get task information
    response = supabase.table("tasks").select("*").eq("user_id",user_id).execute()
    task_info = response.data[0]

    task_title = task_info["title"]
    task_description = task_info["description"]
    task_duration = task_info["duration"]
    task_deadline = task_info["due_date"]
    task_priority = task_info["priority"]
    task = RescheduleTask(title=task_title, description=task_description, duration=task_duration,deadline=task_deadline,priority=task_priority )

    current_date = datetime.now()
    response = supabase.table('user_schedule_info').select("*").eq("user_id",user_id)
    row = response.data[0]
    available_days_times = row["available_days_and_times"]
    preffered_time_slots = row["preffered_time_slots"]
    #Get all available time slots: Returns a dict response
    available_slots = get_available_time_slots(available_days_times,current_date,task_deadline,preffered_time_slots)
    #substract out the slots that are unvailable
    result = get_current_schedule(user_id,available_slots,supabase)
    
    break_time = row["break_time"]
    study_session = row["study_session_duration"]
    pace = row["study_pace"]
    intensity = row["study_intensity"]
    description = row["description"]

    input = Reschedule(
        task_to_reschedule=task,
        available_time_slots=result.available_slots,
        current_schedule=result.current_schedule,
        break_time=break_time,
        study_session_duration=study_session,
        study_pace=pace,
        user_study_intensity=intensity,
        user_preference_description=description
        )
    
    reschedule__str = json.dumps(input.model_dump())

    #2. call agent
    result = call_agent(reschedular_agent,"rescheduled_dates",{"rescheduled_dates":""},user_id,reschedule__str)
    
    #3. update schedule
    for rs in result:
        duration = get_duration_with_overnight(rs['start'],rs['end'])
        row = {
                "task_id": task_id,
                "user_id": user_id,
                "scheduled_date": rs['date'],
                "scheduled_time_start": rs['start'],
                "scheduled_time_end": rs['end'],
                "duration": duration,
                "type": "Task",
                "completed" :False,
                "title":task_title,
                "priority":task_priority
            }
            # Insert into schedule table
        response = supabase.table("schedule").insert(row).execute()
        if not response.data:
            print(f"Failed to insert schedule row for task {task_id}")


    return result

def get_available_time_slots(available_days_times, current_date, deadline, preffered_time_slots):
    slots = []
    days_map = {
        'monday':0, 'tuesday':1, 'wednesday':2, 'thursday':3, 
        'friday':4, 'saturday':5, 'sunday':6 
    }
    current = datetime.strptime(current_date,"%Y-%m-%d").date()
    end = datetime.strptime(deadline,"%Y-%m-%d").date()
    while current<=end:
        #finds the weekday for the given date but gives it index format with 0 for monday to 6 for sunday
        weekday = current.weekday()
        for day , time_period in available_days_times.items():
            #checks if the current day is a weekday that is given in available days
            if days_map[day.lower()] == weekday:
                if time_period=="":
                    for slot in preffered_time_slots:
                        slots.append(f'{current} {slot}')
                else:
                    slots.append(f'{current} {time_period}')
        current += timedelta(days=1)
    return slots

def get_current_schedule( user_id:str, available_slots:List[str], supabase:Client):
    #This method creates the current schedule in the available time slots and updates available time slots
    updated_available_slots = []
    current_schedule = []
    for slot in available_slots:
        date, time = slot.split(" ")
        initial_start, initial_end = time.split("-")
        free_slots = [(initial_start, initial_end)]
        response = supabase.table('schedule').select("*").eq('user_id', user_id).eq('scheduled_date', date).execute()
        day_schedule = {'date': date, 'events': []}
        if response.data:
            for row in response.data:
                start_time = row['scheduled_time_start']
                end_time = row['scheduled_time_end']
                event = ScheduleEvent(task=row['title'], start=start_time, end=end_time, priority=row['priority'])
                day_schedule['events'].append(event)
                new_free_slots = []
                for free_start, free_end in free_slots:
                    result = subtract_time_period(free_start, free_end, start_time, end_time)
                    new_free_slots.extend(result)
                free_slots = new_free_slots
        updated_available_slots.append(FreeSlot(date=date, free_slots=free_slots))
        current_schedule.append(DaySchedule(date=date, events=day_schedule['events']))
    
    return {'current_schedule':current_schedule, 'available_slots':updated_available_slots}


def add_event(event:scheduleItem,superbase:Client):
    response = superbase.table('schedule').insert(event).execute()
    if response.data:
        print('event added!')
    else:
        HTTPException(400,'DB error in inserting details')

def edit_event(event:scheduleItem,schedule_id:str,user_id:str,superbase:Client):
    response = superbase.table('schedule').update(event).eq("user_id",user_id).eq("id",schedule_id).execute()
    if response.data:
        print('event updated!')
    else:
        HTTPException(400,'DB error in inserting details')

def delete_event(schedule_id:str,user_id:str,superbase:Client):
    response = superbase.table('schedule').delete().eq("user_id",user_id).eq("id",schedule_id).execute()
    if response.data:
        print('event deleted!')
    else:
        HTTPException(400,'DB error in inserting details')


