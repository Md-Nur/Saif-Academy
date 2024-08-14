from pydantic import BaseModel
from enum import Enum


class User_Type(str, Enum):
    student = "student"
    teacher = "teacher"
    admin = "admin"


class User(BaseModel):
    name: str
    email: str = ""
    phone: str
    password: str
    s_class: int
    edu_inst: str = ""
    enrolled_batches: list = []
    avatar: str = ""
    is_approved: bool = False
    user_type: User_Type = User_Type.student
    refresh_token: str = ""

