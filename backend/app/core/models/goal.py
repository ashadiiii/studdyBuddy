from datetime import datetime
from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel, Field
from datetime import datetime
from backend.app.core.models.tasks import Subtask

class Goal(BaseModel):
    subject: str
    title:str
    deadline:Optional[str] 
    description: Optional[str] 

class Breakdown(BaseModel):
    subject:str
    estimatedTime:int
    difficulty:str
    subtasks: List[Subtask]
    overallTips:  List[str]