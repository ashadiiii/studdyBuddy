from fastapi import APIRouter, HTTPException,Depends
from ...core.auth import get_user_id
from ...core.superbase import get_supabase_client
from supabase import Client
from ...core.models.schedule import SchedulerInput,ScheduleUserInput
from ...core.models.tasks import TaskForSchedule

from dotenv import load_dotenv

router = APIRouter()
load_dotenv()
#Reconfigure schedule
@router.post('/')
def reconfigure_schedule(schedule:ScheduleUserInput,
    user_id:str= Depends(get_user_id),
    supabase:Client = Depends(get_supabase_client)
):
    create_schedule(schedule,user_id,supabase)
    schedule = get_schedule(user_id,supabase)


@router.post('/{task_id}')
def reschedule_task(
    task_id:str,
    user_id:str = Depends(get_user_id),
    supabase:Client = Depends(get_supabase_client),
):
    #reschedule
    reschedule_task(user_id=user_id,supabase=supabase,task_id=task_id)
    #display updated schedule
    get_schedule(user_id=user_id,supabase=supabase)

      
