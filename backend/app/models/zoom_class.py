from pydantic import BaseModel, UUID4, HttpUrl  # type: ignore
from datetime import datetime
from app.models.course import Course

class Zoom_Class(BaseModel):
    id: UUID4
    course_id: str
    title: str
    scheduled_at: datetime
    zoom_link: HttpUrl
    course: Course