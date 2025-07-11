from fastapi import APIRouter, status, Depends,HTTPException,Body
from backend.app.core.models.tasks import Task
from backend.app.core.models.goal import Goal,Breakdown
from backend.app.core.auth  import get_user_id
from backend.app.core.superbase import get_supabase_client
from supabase import Client
from typing import List
from dotenv import load_dotenv
from agents.goalBreakdown_agent import root_agent
from backend.app.core.services.agentCall_service import call_agent
from backend.app.core.services.userService import get_user_data
import json
from datetime import datetime,date

load_dotenv()
router = APIRouter()

protips=[]

@router.post('/')
async def create_breakdown(goal:Goal = Body(...), client_user_id:str = Depends(get_user_id),supabase:Client= Depends(get_supabase_client)):
    #add user education level to the Goal
    goal_dict = goal.model_dump()
    
    user_data = get_user_data(client_user_id,supabase)
    user_id = user_data['id']
    if not user_data or len(user_data) == 0:
        raise HTTPException(status_code=404, detail="User not found")

    goal_dict['education_level'] = user_data['education_level']
    goal_dict['age'] = user_data['age']
    goal_dict['current_date'] = date.today().isoformat()
    goal_str = json.dumps(goal_dict)

    #Call the callBreakdown agent
    response = await call_agent(root_agent,'plan',{},user_id,goal_str)
    return response


@router.post('/export-tasks')
async def export_to_tasks(
    breakdown: Breakdown,
    clerk_user_id: str = Depends(get_user_id),
    supabase: Client = Depends(get_supabase_client)
):
    """
    Create tasks in the database from a plan JSON (as returned by the breakdown agent).
    """
    created_tasks = []
    breakdown = breakdown.model_dump()
    subtasks = breakdown['subtasks']
    subject = breakdown['subject']

    print(breakdown)

    for task_data in subtasks:
        # Try to get a title, fallback to description
        user_info = get_user_data(clerk_user_id,supabase)

        #Add the missing attributes
        task_data['user_id'] = user_info['id']
        task_data['created_at'] = datetime.now().date().isoformat()  # 'YYYY-MM-DD'
        task_data['due_date'] = task_data.pop('dueDate').isoformat()
        task_data['status'] = 'pending'
        task_data['subject'] = subject
        task_data['duration'] = task_data.pop('estimatedTime')
        task_data.pop('difficulty')
   
        # Insert into DB (adjust if you use a different method)
        response = supabase.table('tasks').insert(task_data).execute()
        if not response.data:
            raise HTTPException(status_code=500, detail="Failed to create task")
        created_tasks.append(response.data[0])

    return created_tasks