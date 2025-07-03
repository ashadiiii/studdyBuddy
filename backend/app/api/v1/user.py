from fastapi import APIRouter, Depends,HTTPException
from app.core.auth import get_current_user, get_user_id, get_user_email
from typing import Dict, Any
from app.core.superbase import get_supabase_client
from supabase import Client

router = APIRouter()

@router.get("/profile")
async def get_user_info(user_id:str=Depends(get_user_id),superbase:Client = Depends(get_supabase_client)):
    result = superbase.table('users').select("*").eq("clerk_user_id",user_id).execute()
    if not result.data:
        print('user does not exist')
        return
    
    return result.data[0]

