from fastapi import APIRouter, Depends
from app.core.auth import get_current_user, get_user_id, get_user_email
from typing import Dict, Any

router = APIRouter()

@router.get("/me")
async def get_current_user_info(current_user: Dict[str, Any] = Depends(get_current_user)):
    """
    Step 4: Endpoint that returns full user information
    Demonstrates using the full user object dependency
    
    This endpoint will:
    1. Automatically extract the JWT token from Authorization header
    2. Verify the token with Clerk
    3. Fetch user details from Clerk
    4. Return the complete user information
    """
    return {
        "message": "Authentication successful",
        "user": current_user
    }

@router.get("/verify")
async def verify_token(user_id: str = Depends(get_user_id)):
    """
    Step 5: Simple token verification endpoint
    Demonstrates using the convenience user_id dependency
    
    This endpoint will:
    1. Verify the token (same as above)
    2. Return just the user ID if successful
    3. Return 401 if token is invalid
    """
    return {
        "message": "Token is valid",
        "user_id": user_id
    }

@router.get("/email")
async def get_user_email_endpoint(email: str = Depends(get_user_email)):
    """
    Step 6: Endpoint that returns user email
    Demonstrates using the email-specific dependency
    
    This shows how you can create specialized dependencies
    for different parts of user data
    """
    return {
        "message": "Email retrieved successfully",
        "email": email
    } 