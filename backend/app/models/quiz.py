from pydantic import BaseModel, UUID4  # type: ignore
from typing import List

class Quiz(BaseModel):
    id: UUID4
    course_id: str
    question: str
    options: List[str]
    correct_answer: str