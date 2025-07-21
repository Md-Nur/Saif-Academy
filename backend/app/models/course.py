from pydantic import BaseModel, UUID4, Field #type: ignore
from enum import StrEnum, auto
from typing import Optional, List
from app.models.video_lesson import Video_Lesson
from app.models.zoom_class import Zoom_Class
from app.models.course_purchase import Course_Purchase
from datetime import datetime


class BoardType(StrEnum):
    NCTB = auto()
    ENGLISH_VERSION = "english version"
    ENGLISH_MEDIUM = "english medium"
    CADET = auto()
    
class SubjectType(StrEnum):
    ENGLISH_1ST = "english 1st"
    ENGLISH_2ND = "english 2nd"
    GRAMMAR = auto()
    VOCABULARY = auto()
    WRITING = auto()
    COMPREHENSION = auto()
    
class PriceType(StrEnum):
    FREE = auto()
    MONTHLY = auto()
    ONE_TIME = "one time"

class Course(BaseModel):
    id: UUID4
    title: str
    description: str
    classLevel: int = Field(..., ge=3, le=12)
    board: BoardType
    subject: SubjectType
    instituteName: Optional[str] = None
    price_type: PriceType
    price: float = Field(..., ge=0)
    video_lessons: List[Video_Lesson]
    zoom_classes: List[Zoom_Class]
    purchase: List[Course_Purchase] = []
    created_at: datetime = datetime.now()
    