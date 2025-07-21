from pydantic import BaseModel, UUID4 #type: ignore
from datetime import datetime
from app.models.user import User
from app.models.course import Course

class Course_Purchase(BaseModel):
    id: UUID4
    user_id: str
    course_id: str
    purchase_at: datetime = datetime.now()
    expires_at: datetime
    user: User
    course: Course