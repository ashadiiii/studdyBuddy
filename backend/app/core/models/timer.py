from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TimerStartInput(BaseModel):
    user_id: str
    subject: str
    task: str

    class Config:
        schema_extra = {
            "example": {
                "user_id": "user_123",
                "subject": "Mathematics",
                "task": "Chapter 5 exercises"
            }
        }

class TimerStopInput(BaseModel):
    session_id: str
    user_id: str

    class Config:
        schema_extra = {
            "example": {
                "session_id": "550e8400-e29b-41d4-a716-446655440000",
                "user_id": "user_123"
            }
        }