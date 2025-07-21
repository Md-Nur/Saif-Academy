from pydantic import BaseModel, UUID4, EmailStr #type:ignore
from datetime import datetime
from typing import Optional, List
from app.models.user import User
from app.models.course import Course

class Institute(BaseModel):
    id: UUID4
    name: str
    address: Optional[str] = None
    users: List[User] = []
    courses: List[Course] = []