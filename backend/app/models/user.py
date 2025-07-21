from pydantic import BaseModel, UUID4, EmailStr #type:ignore
from enum import StrEnum, auto
from typing import List, Optional
from datetime import datetime
from app.models.course_purchase import Course_Purchase

class Role(StrEnum):
    STUDENT = auto()
    TEACHER = auto()
    ADMIN = auto()

class User(BaseModel):
    id: UUID4
    name: str
    email: EmailStr
    phone: str
    passwordHash: str
    class_level: int
    institute_name: str
    role: Optional[Role] = Role.STUDENT 
    purchases: List[Course_Purchase]
    created_at: datetime = datetime.now()
    

