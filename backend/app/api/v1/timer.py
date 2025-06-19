from fastapi import APIRouter, HTTPException
from ...core.superbase import supabase
from ...core.models.timer import TimerStartInput, TimerStopInput
from datetime import datetime , timezone,timedelta

#Initialise router
router = APIRouter(prefix="/timer",tags=["timer"])

@router.post("/start")
async def start_timer(input_data: TimerStartInput):
    try:
        #1. Insert session data
        response = await supabase.table("timer_sessions").insert({
            "user_id": input_data.user_id,
            "subject": input_data.subject,
            "task": input_data.task
        }).execute()
        
        #2. Aknowledge database transaction error
        if response.error():
            raise HTTPException(status_code=400, detail=response.error.message)
        
        #3. Return success message
        return{
            "message": "Timer started", "session_id": response.data[0]["id"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post('/stop')
async def stop_timer(input_data: TimerStopInput):
    try:
        #1. Retrieve current session
        session = await supabase.table("timer_sessions").select("*").eq("id",input_data.session_id).eq("user_id",input_data.user_id).eq("end_time",None).execute()
        if not session.data:
            raise HTTPException(status_code=400,detail="Session not found or already stopped")
        
        #2. Calculate session duration with the extracted information
        session_data = session.data[0]
        end_time = datetime.now(timezone.utc)
        duration = int((end_time - session_data["start_time"]).total_seconds())

        #3. Update that timer session data in the table with the duration
        response = await superbase.table("timer_sessions").update({
            "end_time":end_time,
            "duration":duration,
        }).eq("id",input_data.session_id).execute()
        if response.error:
             raise HTTPException(status_code=400, detail=response.error.message)
        return {"message": "Timmer stopped", "duration": duration}
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))
    

#For the dashboard
@router.get('/today-focus')
async def get_today_focus(user_id:str):
    try:
        #Get today's start and end timestamps
        today_start = datetime.now(timezone.utc).replace(hour=0,minute=0,second=0,microsecond=0)
        today_end = today_start + timedelta(days=1)

        #Query today's total duration
        today_response = await supabase.table("timer_sessions").select("duration").eq("user_id",user_id).gte("created_at",today_start).lt("created_at",today_end).execute()
        if today_response.error:
            raise HTTPException(status_code=400, detail=today_response.eror.message)
        
        today_seconds = sum (session["duration"] for session in today_response.data if session["duration"])
        todays_hours = today_seconds/3600 if today_seconds else 0

        #Get yesterdays start and end timestamps
        yesterday_start = today_start - timedelta(days=1)
        yesterday_end = today_start

        #Query yesterday's total duration
        yesterday_response = await supabase.table("timer_sessions").select("duration").eq("user_id",user_id).gte("created_at",yesterday_start).lt("created_at",yesterday_end).execute()
        if yesterday_response.error:
            raise HTTPException(status_code=400,detail=yesterday_response.error.message)
        
        yesterday_seconds = sum(session["duration"] for session in yesterday_response if session["duration"])
        yesterday_hours = yesterday_seconds/3600 if yesterday_seconds else 0

        #calculate percentage change
        percentage_change = 0
        if yesterday_hours > 0:
            percentage_change = ((todays_hours - yesterday_hours)/yesterday_hours) *100
            percentage_str = f"+{percentage_change:.0f}%" if percentage_change > 0 else f"{percentage_change:.0f}"

            return {
                "today_focus" : f"{todays_hours:.1f}h",
                "percentage_change": percentage_str,
                "today_seconds": today_seconds,
                "yesterday_seconods": yesterday_seconds
            }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stats")
async def get_study_stats(user_id:str):
    try:
        #Today's total time 
        today_start = datetime.now(timezone.utc).replace(hour=0,minute=0,second=0,microsecond=0)
        today_end = today_start + timedelta(days=1)
        today_response = await supabase.table("timer_sessions").select("duration").eq("user_id",user_id).gte("created_at",today_start).lt("created_at",today_end).execute()
        today_seconds = sum(session["duration"] for session in today_response.data if session["duration"])
        today_minutes = today_seconds / 60 if today_seconds else 0

        #Total focus time
        total_response = await supabase.table("timer_sessions").select("duration").eq("user_id",user_id).execute()
        total_seconds = sum(session["duration"] for session in total_response.data if session["duration"])
        total_minutes = total_seconds/60 if total_seconds else 0

        #completed sessions
        completed_response = await supabase.table("timer_sessions").select("id").eq("user_id",user_id).is_not("end_time",None).execute()
        completed_sessions = len(completed_response.data)

        #Streak
        current_date = datetime.now(timezone.utc).date()
        streak =0
        for i in range(10):
            date_start = datetime.combine(current_date - timedelta(days=1),datetime.min.time()).replace(tzinfo=timezone.utc)
            date_end = date_start + timedelta(days=1)
            day_response = await supabase.table("timer_sessions").select("id").eq("user_id",user_id).gte("created_at",date_start).lt("created_at",date_end).execute()
            if day_response.data:
                streak+=1
            else:
                break

        return {
            "today_minutes": f"{today_minutes:.0f}m",
            "total_focus_minutes": f"{total_minutes:.0f}m",
            "completed_sessions": completed_sessions,
            "streak_days": streak
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/sessions")
async def get_sessions(user_id:str):
    try:
        response = await supabase.table("timer_sessions").select("*").eq("user_id",user_id).order("created_at",desc=True).limit(5).execute()
        if response.error:
            raise HTTPException(status_code=400, detail=response.error.message)
        
        sessions = [
        {
            "id": str(session["id"]),
            "type": "focus",
            "plannedDuration": 25 * 60,
            "actualDuration": session["duration"] or 0,
            "completedAt": session["end_time"] or session["created_at"],
            "subject":session["subject"],
            "task":session["task"],
        } 
        for session in response.data]

        return sessions
    
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))