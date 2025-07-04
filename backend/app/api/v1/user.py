from fastapi import APIRouter, Depends,HTTPException
from app.core.auth import get_current_user, get_user_id, get_user_email
from typing import Dict, Any
from app.core.superbase import get_supabase_client
from supabase import Client
from app.core.services.userService import get_user_data
router = APIRouter()

@router.get("/profile")
def get_user_info(user_id:str=Depends(get_user_id),supabase:Client = Depends(get_supabase_client)):
   result = get_user_data(user_id, supabase)
   return result
