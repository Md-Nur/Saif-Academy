from pydantic import BaseModel
from datetime import datetime

class Progress(BaseModel):
    id: str  # UUID4 can be used if needed
    user_id: str
    course_id: str
    lesson_id: str
    completed: bool = False
    updated_at: datetime = datetime.now()
