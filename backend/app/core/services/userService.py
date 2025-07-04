from supabase import Client
from ..superbase import get_supabase_client

def get_user_data(user_id:str,supabase:Client):
    result = supabase.table('users').select("*").eq("clerk_user_id",user_id).execute()
    if not result.data:
        print('user does not exist')
        return
    
    return result.data[0]