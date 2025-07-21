from pydantic import BaseModel, UUID4
from datetime import datetime
from app.models.course import Course


class Video_Lesson(BaseModel):
    id: UUID4
    course_id: str
    title: str
    youtube_id: str # e.g., "dQw4w9WgXcQ"
    course: Course
    created_at: datetime = datetime.now()