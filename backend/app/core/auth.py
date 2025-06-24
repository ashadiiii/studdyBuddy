from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
import requests
import os
from jose.utils import base64url_decode
from jose import jwk

from typing import Optional, Dict, Any

# HTTPBearer security scheme for JWT tokens
security = HTTPBearer()

async def get_clerk_public_keys():
    """
    Fetch Clerk's public keys for JWT verification
    """
    try:
        # Get your Clerk issuer URL from environment
        clerk_issuer = os.getenv("CLERK_ISSUER_URL")
        if not clerk_issuer:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="CLERK_ISSUER_URL not configured"
            )
        
        # Fetch the JWKS (JSON Web Key Set) from Clerk
        jwks_url = f"{clerk_issuer}/.well-known/jwks.json"
        response = requests.get(jwks_url)
        response.raise_for_status()
        
        return response.json()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch Clerk public keys: {str(e)}"
        )

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict[str, Any]:
    """
    Step 1: Extract and verify JWT token from Authorization header
    This function is a dependency that automatically runs before your endpoint
    
    Args:
        credentials: Automatically extracted from 'Authorization: Bearer <token>' header
        
    Returns:
        Dict containing user information from JWT claims
        
    Raises:
        HTTPException: If token is invalid or missing
    """
    print("[AUTH] Incoming Authorization header:", credentials)
    try:
        # Step 1.1: Extract the JWT token from the credentials
        token = credentials.credentials
        print("[AUTH] Extracted JWT token:", token)
        
        # Step 1.2: Decode the JWT without verification first to get the key ID
        unverified_header = jwt.get_unverified_header(token)
        print("[AUTH] Unverified JWT header:", unverified_header)
        key_id = unverified_header.get("kid")
        if not key_id:
            print("[AUTH] No key ID found in JWT header")
        
        # Step 1.3: Fetch Clerk's public keys
        jwks = await get_clerk_public_keys()
        print("[AUTH] Clerk JWKS fetched:", jwks)
        
        # Step 1.4: Find the correct public key
        public_key = None
        for key in jwks.get("keys", []):
            if key.get("kid") == key_id:
                public_key = jwk.construct(key)
                print("[AUTH] Matching public key found for kid:", key_id)
                break
        
        if not public_key:
            print("[AUTH] No matching public key found for kid:", key_id)
        
        # Step 1.5: Verify and decode the JWT
        clerk_issuer = os.getenv("CLERK_ISSUER_URL")
        print("[AUTH] Using issuer for verification:", clerk_issuer)
        payload = jwt.decode(
            token,
            public_key,
            algorithms=["RS256"],
            issuer=clerk_issuer
        )
        print("[AUTH] Decoded JWT payload:", payload)
        
        # Step 1.6: Extract user information from claims
        user_id = payload.get("sub")
        if not user_id:
            print("[AUTH] No user ID found in JWT claims")
        
        # Step 1.7: Return structured user data from JWT claims
        return {
            "user_id": user_id,
            "email": payload.get("email"),
            "first_name": payload.get("given_name"),
            "last_name": payload.get("family_name"),
            "claims": payload  # Full JWT claims for additional data
        }
        
    except JWTError as e:
        print("[AUTH] JWTError:", str(e))
        # Step 1.8: Handle JWT-specific errors
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token: {str(e)}"
        )
    except Exception as e:
        print("[AUTH] General authentication error:", str(e))
        # Step 1.9: Handle any other authentication errors
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication failed: {str(e)}"
        )

async def get_user_id(current_user: Dict[str, Any] = Depends(get_current_user)) -> str:
    """
    Step 2: Convenience dependency that extracts just the user ID
    This is useful when you only need the user ID, not the full user object
    
    Args:
        current_user: The full user object from get_current_user dependency
        
    Returns:
        Just the user ID string
    """
    return current_user["user_id"]

async def get_user_email(current_user: Dict[str, Any] = Depends(get_current_user)) -> Optional[str]:
    """
    Step 3: Convenience dependency that extracts just the user email
    Useful when you only need the email address
    
    Args:
        current_user: The full user object from get_current_user dependency
        
    Returns:
        User's email address or None
    """
    return current_user.get("email") 