from enum import StrEnum, auto
from pydantic import BaseModel, UUID4 #type:ignore
from datetime import datetime
from app.models.user import User

class SubcriptionType(StrEnum):
    MONTHLY = auto()
    FULL_PAID = "full paid"
    FREE = auto()
    
class Subcription(BaseModel):
    id: UUID4
    user_id: str
    sub_type: SubcriptionType
    started_at: datetime = datetime.now()
    expires_at: datetime
    user: User
    
    
