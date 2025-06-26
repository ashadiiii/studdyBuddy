from datetime import datetime
from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel, Field
from datetime import datetime

class Goal(BaseModel):
    subject: str
    title:str
    deadline:Optional[str] 
    description: Optional[str] 

