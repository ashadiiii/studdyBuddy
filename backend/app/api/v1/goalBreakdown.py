from fastapi import APIRouter, status, Depends,HTTPException
from ...core.models.tasks import Task
from ...core.models.goal import Goal
from ...core.auth  import get_user_id
from ...core.superbase import get_supabase_client
from supabase import Client
from pydantic import List
from .....agents.goalBreakdown_agent.agent import root_agent as agent
from dotenv import load_dotenv
import re
import uuid
from dotenv import load_dotenv
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types
from agents.goalBreakdown_agent import root_agent
import json


load_dotenv()
router = APIRouter()

@router.get('/',response_model=List[Task])
async def create_breakdown(goal:Goal, user_id:str = Depends(get_user_id),supabase:Client= Depends(get_supabase_client)):
    #add user education level to the Goal
    goal_dict = goal.model_dump()
    
    response = supabase.table('users').select(columns=["education_level","eq"]).eq('user_id',user_id).execute()
    user_info = response.data
    goal_dict['education_level']=user_info['education_level']
    goal_dict['age'] = user_info['age']
    goal_str = json.dumps(goal_dict)

    #Call the callBreakdown agent
    session_service_stateful = InMemorySessionService()
    initial_state={
        "objectivesAndRequirements":"",
        "plan":"",
        "review":""
    }
    
    APP_NAME="Minerva"
    USER_ID=user_id
    SESSION_ID=str(uuid.uuid4())

    runner = Runner(
        agent=root_agent,
        app_name=APP_NAME,
        session_service=session_service_stateful,
    )

    content = types.Content(role="user", parts=[types.Part(text=goal_str)])


    existing_sessions = await session_service_stateful.list_sessions(
        app_name=APP_NAME,
        user_id=USER_ID,
    )

    # If there's an existing session, use it, otherwise create a new one
    if existing_sessions and len(existing_sessions.sessions) > 0:
        # Use the most recent session
        SESSION_ID = existing_sessions.sessions[0].id
        print(f"Continuing existing session: {SESSION_ID}")
    else:
        # Create a new session with initial state
        new_session = await session_service_stateful.create_session(
            app_name=APP_NAME,
            user_id=USER_ID,
            state=initial_state,
        )
        SESSION_ID = new_session.id
        print(f"Created new session: {SESSION_ID}")

    
    async for event in runner.run_async(
        user_id=USER_ID, session_id=SESSION_ID, new_message=content
    ):
        if event.is_final_response():
            if(event.content
                and event.content.parts
                and hasattr(event.content.parts[0], "text")
                and event.content.parts[0].text
            ):
                final_response = event.content.parts[0].text.strip()
                print(final_response)

    session = await session_service_stateful.get_session(app_name=APP_NAME, user_id=USER_ID, session_id=SESSION_ID)
    plan = session.state.get("plan","unknown")

    match = re.search(r"\{.*\}", plan, re.DOTALL)
    if match:
        plan_json_str = match.group(0)
        plan_obj = json.loads(plan_json_str)
        print(plan_obj)
        print(type(plan_obj))
    else:
        print("No JSON found in string.")
    
    #return json answer
    return plan_obj

from fastapi import APIRouter, Depends, HTTPException, status, Body
from ...core.models.tasks import Task, TaskCreate
from ...core.auth import get_user_id
from ...core.superbase import get_supabase_client
from supabase import Client
from typing import List
import json
from datetime import datetime, timedelta

router = APIRouter()

@router.post('/export-tasks', response_model=List[Task])
async def export_to_tasks(
    plan: dict = Body(..., example={"Subtasks": []}),
    goal: Goal = Body(...),
    user_id: str = Depends(get_user_id),
    supabase: Client = Depends(get_supabase_client)
):
    """
    Create tasks in the database from a plan JSON (as returned by the breakdown agent).
    """
    created_tasks = []
    subtasks = plan.get("Subtasks", [])
    main_deadline = goal.deadline

    for subtask in subtasks:
        # Try to get a title, fallback to description
        title = subtask.get("Task Title") or subtask.get("Task description", "Untitled Task")
        description = subtask.get("Task description", "")
        pro_tips = subtask.get("Pro Tips", "")
        full_description = f"{description}\n\nPro Tips: {pro_tips}" if pro_tips else description

        # Parse due date
        due_date = subtask.get("When is it due respect to final deadline", main_deadline)
        dt = datetime.strptime(due_date, "%Y-%m-%d %H:%M:%S")
        pretty_date = dt.strftime("%A, %B %d, %Y")

        # Priority and status
        priority = subtask.get("Priority level", "medium").lower()
        status = "pending"
        duration = subtask.get("Time duration")

        #resources

        # Build the task create model
        task_data = {
            "user_id":user_id,
            "title": title,
            "description": full_description,
            "subject": goal.subject,
            "due_date": pretty_date,
            "priority": priority,
            "status": status,
            "instructions": "",
            "resources": [],
            "submission_content": "",
        }

        # Insert into DB (adjust if you use a different method)
        response = supabase.table('tasks').insert(task_data).execute()
        if not response.data:
            raise HTTPException(status_code=500, detail="Failed to create task")
        created_tasks.append(response.data[0])



        ##functionality to update schedule as well
        #Call the schedular for the updated task list


    return created_tasks