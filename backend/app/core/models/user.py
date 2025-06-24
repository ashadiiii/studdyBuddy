from pydantic import BaseModel, Field
from typing import List

class UserCreate(BaseModel):
    education_level: str = Field(..., example="University")
    age: int = Field(..., ge=13, le=100, example=20)
    subjects: List[str] = Field(..., example=["Chemistry", "Mathematics"])

    class Config:
        schema_extra = {
            "example": {
                "education_level": "University",
                "age": 20,
                "subjects": ["Chemistry", "Mathematics"]
            }
        }