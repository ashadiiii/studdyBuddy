from datetime import datetime
from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel, Field

class Task(BaseModel):
    title: str
    description: Optional[str] = None
    subject: str
    due_date: datetime
    priority: str = Field(
        default="medium",
        pattern="^(low|medium|high)$"
    )
    status: str = Field(
        default="pending",
        pattern="^(pending|in_progress|completed)$"
    )
    instructions: Optional[str] = None
    resources: List[dict] = Field(default_factory=list)
    submission_content: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Complete Math Assignment",
                "description": "Solve problems 1-10 from Chapter 3",
                "subject": "Mathematics",
                "due_date": "2024-03-20T23:59:59Z",
                "priority": "high",
                "status": "pending",
                "instructions": "Show all work and include explanations",
                "resources": [{"type": "textbook", "url": "https://example.com/math-book"}],
                "submission_content": None
            }
        } 

class TaskForSchedule(BaseModel):
    task_id:str = Field(...,description="The id of the task, retrieved from the supabase table")
    title: str = Field(..., description="The title of the task")
    priority: str = Field(..., description="Priority level of the task (e.g., Easy, Medium, Hard)")
    description: str = Field(..., description="Detailed description of the task")
    duration: Optional[str] = Field(None, description="Estimated duration of the task (e.g., '3 hours') or None if to be estimated")
    dependencies: List[str] = Field(default_factory=list, description="List of task titles that this task depends on")
    deadline: Optional[str] = Field(None,description="gives the date in which the task must be completed before")

class RescheduleTask(BaseModel):
    title:str
    description:str
    duration:str
    deadline:str
    priority:str
