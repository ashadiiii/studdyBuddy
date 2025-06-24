from fastapi import APIRouter, Depends, HTTPException, status
from app.core.models.user import UserCreate
from app.core.superbase import get_supabase_client
from app.core.auth import get_user_id
from supabase import Client

router = APIRouter()

@router.post("/onboarding")
async def create_user_profile(
    user_data: UserCreate,
    clerk_user_id: str = Depends(get_user_id),
    supabase: Client = Depends(get_supabase_client)
):
    """
    Step 7: Protected endpoint using dependency-based authentication
    
    This endpoint demonstrates:
    1. Automatic token verification via get_user_id dependency
    2. Automatic user ID extraction
    3. Database operations with authenticated user ID
    """
    
    # Step 7.1: Check if user already exists
    response = supabase.table("users").select("*").eq("clerk_user_id", clerk_user_id).execute()
    if response.data:
        raise HTTPException(status_code=400, detail="User profile already exists")

    # Step 7.2: Insert new user data
    data = user_data.model_dump()
    data["clerk_user_id"] = clerk_user_id
    response = supabase.table("users").insert(data).execute()

    if not response.data:
        raise HTTPException(status_code=500, detail="Failed to create user profile")

    return {"message": "User profile created successfully", "user": response.data[0]}