from fastapi import APIRouter , Depends, status
from ...core.models.tasks import Task
from ...core.auth import get_user_id
from ...core.superbase import get_supabase_client
from supabase import Client
from fastapi import HTTPException
from pydantic import List

router = APIRouter()

# The get_user_id dependency is responsible for extracting and validating the user ID from the JWT token provided in the Authorization header.


#CREATE OPERATION
@router.post('/',status_code=status.HTTP_201_CREATED)
def create_task(task: Task, user_id:str = Depends(get_user_id),superbase :Client = Depends(get_supabase_client)):
    #Convert task to a dict object
    task_dict = task.model_dump()

    #Create task resources from agent
    task_dict['resources'] = {}

    #Add user id to it
    task_dict['user_id'] = user_id

    try:
        #Insert task to table
        response = superbase.table('tasks').insert(task_dict).execute()
    except Exception as e:
        # Database or connection error
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

    if not response.data:
        # Insert failed, possibly due to validation or constraint error
        raise HTTPException(status_code=400, detail=f"Task creation failed: {response.error if hasattr(response, 'error') else 'Unknown error'}")

    return response.data[0]



#READ OPERATION
#Get all tasks under that user
@router.get('/',response_model=List[Task])
def get_all_tasks(user_id: str = Depends(get_user_id), superbase: Client = Depends(get_supabase_client)):
    try: 
        response = superbase.table('task').select('*').eq("user_id",user_id).execute()
        return response.data
    
    except Exception as e:
        # Database or connection error
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

#Get the task selected by the user
@router.get('/{task_id}',response_model=Task)
def get_task(task_id:str,user_id:str=Depends(get_user_id),superbase:Client= Depends(get_supabase_client)):
    response = superbase.table('task').select('*').eq('user_id',user_id).eq('task_id',task_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Task not found")
    return response.data    


#UPDATE OPERATIONS

#change status
@router.patch('/{task_id}/status')
def update_task_status(task_id: str, status: str, user_id: str = Depends(get_user_id), superbase = Depends(get_supabase_client)):
    # Validate status
    if status not in ("pending", "in_progress", "completed"):
        raise HTTPException(status_code=400, detail="Invalid status value.")
    response = superbase.table('tasks').update({"status": status}).eq("id", task_id).eq("user_id", user_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Task not found or not owned by user.")
    return response.data[0]

#Add submission
@router.patch('/{task_id}/submission')
def add_submission(task_id: str, submission_content: str, user_id: str = Depends(get_user_id), superbase = Depends(get_supabase_client)):
    response = superbase.table('tasks').update({"submission_content": submission_content}).eq("id", task_id).eq("user_id", user_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Task not found or not owned by user.")
    return response.data[0]

#Update resources
@router.patch('/{task_id}/resources')
def update_resources(task_id: str, user_id: str = Depends(get_user_id), superbase = Depends(get_supabase_client)):
    #call the resources agent for this
    resources = {}
    
    response = superbase.table('tasks').update({"resources": resources}).eq("id", task_id).eq("user_id", user_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Task not found or not owned by user.")
    return response.data[0]



#REMOVE OPERATION
@router.delete('/')
def remove_all_tasks(user_id: str = Depends(get_user_id), superbase: Client = Depends(get_supabase_client)):
    response = superbase.table('tasks').delete().eq('user_id', user_id).execute()
    if not response.data or (isinstance(response.data, list) and len(response.data) == 0):
        return {"message": "No tasks found to delete."}
    return {"deleted": len(response.data), "tasks": response.data}


@router.delete('/{task_id}')
def remove_task(task_id: str, user_id: str = Depends(get_user_id), superbase: Client = Depends(get_supabase_client)):
    response = superbase.table('tasks').delete().eq('id', task_id).eq('user_id', user_id).execute()
    if not response.data or (isinstance(response.data, list) and len(response.data) == 0):
        raise HTTPException(status_code=404, detail="Task not found or not owned by user.")
    return {"deleted": 1, "task": response.data[0]}