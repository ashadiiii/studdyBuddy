import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

def get_supabase_client() -> Client:
    """
    Creates and returns a Supabase client instance.
    This function can be used as a FastAPI dependency.
    """
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    
    if not url or not key:
        raise ValueError("Supabase URL and Key must be set in environment variables.")
        
    return create_client(url, key)

# You can keep a global instance for non-FastAPI uses if needed,
# but the function is better for dependency injection.
supabase: Client = get_supabase_client()