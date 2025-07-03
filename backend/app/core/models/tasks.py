from datetime import datetime
from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel, Field

class Task(BaseModel):
    title: str
    description: Optional[str] = None
    subject: str
    dueDate: datetime
    priority: str = Field(
        default="medium",
        pattern="^(low|medium|high)$"
    )
    status: str = Field(
        default="pending",
        pattern="^(pending|in_progress|completed)$"
    )
    instructions: Optional[str] = None
    exercises: Optional[List[str]] = None
    aiResources: List[dict] = Field(default_factory=list)
    submission_content: Optional[str] = None
    duration: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Complete Math Assignment",
                "description": "Solve problems 1-10 from Chapter 3",
                "subject": "Mathematics",
                "due_date": "2024-03-29T23:59:59Z",
                "priority": "high",
                "status": "pending",
                "instructions": "Show all work and include explanations",
                "exercises": ["1:...", "2:...", "3:..."],
                "resources": [{"type": "textbook", "url": "https://example.com/math-book"}],
                "submission_content": None,
                "duration": None,
                "created_at": "2024-03-20T23:59:59Z"
            }
        } 

class TaskForSchedule(BaseModel):
    task_id:str = Field(...,description="The id of the task, retrieved from the supabase table")
    title: str = Field(..., description="The title of the task")
    priority: str = Field(..., description="Priority level of the task (e.g., Easy, Medium, Hard)")
    description: str = Field(..., description="Detailed description of the task")
    duration: Optional[str] = Field(None, description="Estimated duration of the task (e.g., '3 hours') or None if to be estimated")
    deadline: Optional[str] = Field(None,description="gives the date in which the task must be completed before")

class RescheduleTask(BaseModel):
    title:str
    description:str
    duration:str
    deadline:str
    priority:str
