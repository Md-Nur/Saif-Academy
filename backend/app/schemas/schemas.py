from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID
from datetime import datetime
from app.database.models import UserRole

class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str
    class_level: Optional[int] = None
    phone: Optional[str] = None
    institute_name: Optional[str] = None

class UserLogin(BaseModel):
    identifier: str  # Can be email or phone number
    password: str

class User(UserBase):
    id: UUID
    role: UserRole
    class_level: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    institute_name: Optional[str] = None
    class_level: Optional[int] = None


class Token(BaseModel):
    access_token: str
    token_type: str
    role: str

class BatchResponse(BaseModel):
    id: UUID
    name: str
    class_level: int
    subject: str
    price_per_month: int
    teacher_id: Optional[UUID]
    meeting_link: Optional[str] = None

    class Config:
        from_attributes = True

class CourseResponse(BaseModel):
    id: UUID
    title: str
    description: str
    classLevel: int
    board: str
    subject: str
    price: float
    course_type: str
    is_free: bool
    video_url: Optional[str]
    instituteName: Optional[str]
    meeting_link: Optional[str] = None

    class Config:
        from_attributes = True

class SubscriptionCreate(BaseModel):
    trnx_id: str
    sender_number: str
    amount: int
    payment_method: str
    month: str
    batch_id: Optional[UUID] = None
    course_id: Optional[UUID] = None

class SubscriptionResponse(BaseModel):
    id: UUID
    trnx_id: str
    sender_number: str
    status: str
    month: str
    amount: int
    payment_method: str
    batch_id: Optional[UUID]
    course_id: Optional[UUID]
    created_at: datetime
    # Nested relationships for teacher dashboard identification
    user: Optional[UserBase] = None
    batch: Optional[BatchResponse] = None
    course: Optional[CourseResponse] = None

    class Config:
        from_attributes = True

class RoutineBase(BaseModel):
    day_of_week: str
    start_time: str
    end_time: str

class RoutineCreate(RoutineBase):
    batch_id: Optional[UUID] = None
    course_id: Optional[UUID] = None

class RoutineResponse(RoutineBase):
    id: UUID
    batch_id: Optional[UUID] = None
    course_id: Optional[UUID] = None

    class Config:
        from_attributes = True

class LiveSessionBase(BaseModel):
    title: str
    scheduled_at: datetime
    zoom_link: Optional[str] = None
    status: str = "scheduled"
    is_extra: bool = False

class LiveSessionCreate(LiveSessionBase):
    batch_id: Optional[UUID] = None
    course_id: Optional[UUID] = None

class LiveSessionResponse(LiveSessionBase):
    id: UUID
    batch_id: Optional[UUID] = None
    course_id: Optional[UUID] = None

    class Config:
        from_attributes = True

class ResourceCreate(BaseModel):
    title: str
    type: str
    url: str
    batch_id: UUID

class BatchCreate(BaseModel):
    name: str
    class_level: int
    subject: str
    price_per_month: Optional[int] = 1000
    meeting_link: Optional[str] = None

class CourseCreate(BaseModel):
    title: str
    description: str
    classLevel: int
    board: str
    subject: str
    price: float
    course_type: str = "recorded"
    is_free: bool = False
    video_url: Optional[str] = None # Can contain multiple comma-separated URLs
    instituteName: Optional[str] = None
    meeting_link: Optional[str] = None
