from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.config.database import get_db
from app.database import models
from app.schemas import schemas
from app.dependencies import get_current_user

router = APIRouter(prefix="/quizzes", tags=["quizzes"])

@router.get("/questions", response_model=List[schemas.QuizQuestionResponse])
def get_quiz_questions(db: Session = Depends(get_db)):
    """
    Retrieves all grammar quiz questions.
    """
    statement = select(models.QuizQuestion).order_by(models.QuizQuestion.created_at.desc())
    return db.exec(statement).all()

@router.post("/questions", response_model=schemas.QuizQuestionResponse)
def create_quiz_question(
    question: schemas.QuizQuestionCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Teacher-only endpoint to create a new quiz question.
    """
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    db_question = models.QuizQuestion(**question.model_dump())
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

@router.delete("/questions/{question_id}")
def delete_quiz_question(
    question_id: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Teacher-only endpoint to delete a quiz question.
    """
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    statement = select(models.QuizQuestion).where(models.QuizQuestion.id == question_id)
    question = db.exec(statement).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    db.delete(question)
    db.commit()
    return {"success": True, "message": "Question deleted"}
