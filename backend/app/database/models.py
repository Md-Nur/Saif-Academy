from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, Enum, DateTime, func, Text, JSON
import enum
import uuid
from datetime import datetime

class UserRole(str, enum.Enum):
    TEACHER = "teacher"
    STUDENT = "student"
    ADMIN = "admin"

class SubscriptionStatus(str, enum.Enum):
    PENDING = "PENDING"
    VERIFIED = "VERIFIED"
    REJECTED = "REJECTED"
    EXPIRED = "EXPIRED"

class User(SQLModel, table=True):
    """
    Represents a user in the system (Student, Teacher, or Admin).
    Stores authentication details, profile information, and relationships to subscriptions and batches.
    """
    __tablename__ = "users"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str
    email: str = Field(unique=True, index=True)
    hashed_password: str
    role: UserRole = Field(sa_column=Column(Enum(UserRole), default=UserRole.STUDENT))
    class_level: Optional[int] = Field(default=None)
    phone: str = Field(unique=True, index=True)
    institute_name: str = Field(default="")
    profile_picture: Optional[str] = Field(default=None)
    created_at: Optional[datetime] = Field(sa_column=Column(DateTime(timezone=True), server_default=func.now()))

    subscriptions: List["Subscription"] = Relationship(back_populates="user")
    batches: List["Batch"] = Relationship(back_populates="teacher")

class Batch(SQLModel, table=True):
    """
    Batches are for live classes with a monthly subscription model.
    """
    __tablename__ = "batches"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str
    class_level: int
    subject: str = Field(default="English 1st Paper")
    price_per_month: int = Field(default=1000) # Added default monthly price
    teacher_id: Optional[uuid.UUID] = Field(default=None, foreign_key="users.id")
    
    teacher: Optional["User"] = Relationship(back_populates="batches")
    resources: List["Resource"] = Relationship(back_populates="batch")
    
    description: Optional[str] = Field(default=None, sa_column=Column(Text))
    meeting_link: Optional[str] = Field(default=None)
    meeting_link_updated_at: Optional[datetime] = Field(default=None, sa_column=Column(DateTime(timezone=True)))

class Subscription(SQLModel, table=True):
    """
    Tracks user payments for batches or courses.
    Includes transaction ID, payment status, and expiration for monthly subscriptions.
    """
    __tablename__ = "subscriptions"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: Optional[uuid.UUID] = Field(default=None, foreign_key="users.id")
    batch_id: Optional[uuid.UUID] = Field(default=None, foreign_key="batches.id")
    course_id: Optional[uuid.UUID] = Field(default=None, foreign_key="courses.id")
    trnx_id: str = Field(unique=True)
    sender_number: str = Field(default="")
    status: SubscriptionStatus = Field(sa_column=Column(Enum(SubscriptionStatus), default=SubscriptionStatus.PENDING))
    payment_method: str = Field(default="bkash")
    amount: int
    month: str # e.g., "2024-05"
    created_at: Optional[datetime] = Field(sa_column=Column(DateTime(timezone=True), server_default=func.now()))
    expires_at: Optional[datetime] = Field(default=None, sa_column=Column(DateTime(timezone=True)))

    user: Optional["User"] = Relationship(back_populates="subscriptions")
    batch: Optional["Batch"] = Relationship()
    course: Optional["Course"] = Relationship()

class Resource(SQLModel, table=True):
    __tablename__ = "resources"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str
    type: str # "pdf", "link", "video"
    url: str
    batch_id: Optional[uuid.UUID] = Field(default=None, foreign_key="batches.id")
    course_id: Optional[uuid.UUID] = Field(default=None, foreign_key="courses.id")

    batch: Optional["Batch"] = Relationship(back_populates="resources")
    course: Optional["Course"] = Relationship()

class StudentSubmission(SQLModel, table=True):
    __tablename__ = "student_submissions"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id")
    batch_id: Optional[uuid.UUID] = Field(default=None, foreign_key="batches.id")
    course_id: Optional[uuid.UUID] = Field(default=None, foreign_key="courses.id")
    title: str
    type: str # "hw", "cw"
    url: str = Field(sa_column=Column(Text))
    created_at: Optional[datetime] = Field(sa_column=Column(DateTime(timezone=True), server_default=func.now()))

    user: Optional["User"] = Relationship()
    batch: Optional["Batch"] = Relationship()
    course: Optional["Course"] = Relationship()

class ClassRoutine(SQLModel, table=True):
    __tablename__ = "class_routines"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    batch_id: Optional[uuid.UUID] = Field(default=None, foreign_key="batches.id")
    course_id: Optional[uuid.UUID] = Field(default=None, foreign_key="courses.id")
    day_of_week: str # "Monday", "Tuesday", etc.
    start_time: str # "18:00"
    end_time: str # "19:00"

    batch: Optional["Batch"] = Relationship()
    course: Optional["Course"] = Relationship()

class LiveSession(SQLModel, table=True):
    __tablename__ = "live_sessions"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    batch_id: Optional[uuid.UUID] = Field(default=None, foreign_key="batches.id")
    course_id: Optional[uuid.UUID] = Field(default=None, foreign_key="courses.id")
    title: str
    scheduled_at: datetime
    zoom_link: Optional[str] = None
    status: str = Field(default="scheduled") # "scheduled", "postponed", "completed"
    is_extra: bool = Field(default=False)

    batch: Optional["Batch"] = Relationship()
    course: Optional["Course"] = Relationship()

class Course(SQLModel, table=True):
    """
    Represents a self-paced recorded course.
    Includes course details, price, and links to hosted videos.
    """
    __tablename__ = "courses"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str
    description: str = Field(sa_column=Column(Text))
    classLevel: int
    board: str
    subject: str
    price: float
    course_type: str = Field(default="recorded") # "live" or "recorded"
    is_free: bool = Field(default=False)
    video_url: Optional[str] = Field(default=None, sa_column=Column(Text))
    instituteName: Optional[str] = None
    created_at: Optional[datetime] = Field(sa_column=Column(DateTime(timezone=True), server_default=func.now()))
    
    meeting_link: Optional[str] = Field(default=None)
    meeting_link_updated_at: Optional[datetime] = Field(default=None, sa_column=Column(DateTime(timezone=True)))

class QuizQuestion(SQLModel, table=True):
    """
    Represents a grammar quiz question.
    """
    __tablename__ = "quiz_questions"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    question: str = Field(sa_column=Column(Text))
    options: List[str] = Field(sa_column=Column(JSON))
    correct_answer: int
    explanation: str = Field(sa_column=Column(Text))
    created_at: Optional[datetime] = Field(sa_column=Column(DateTime(timezone=True), server_default=func.now()))

class Testimonial(SQLModel, table=True):
    """
    Represents a student testimonial displayed on the home page.
    """
    __tablename__ = "testimonials"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str
    role: str  # e.g., "HSC Student", "SSC Student"
    content: str = Field(sa_column=Column(Text))
    rating: int = Field(default=5)  # 1-5 stars
    avatar: Optional[str] = Field(default=None)  # URL to avatar image
    is_approved: bool = Field(default=False)  # Only approved testimonials are shown
    created_at: Optional[datetime] = Field(sa_column=Column(DateTime(timezone=True), server_default=func.now()))
