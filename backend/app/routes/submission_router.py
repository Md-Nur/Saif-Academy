from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.config.database import get_db
from app.database import models
from app.schemas import schemas
from app.dependencies import get_current_user
from typing import List
import uuid

router = APIRouter(prefix="/submissions", tags=["submissions"])

@router.post("/upload", response_model=schemas.SubmissionResponse)
def upload_submission(
    submission: schemas.SubmissionCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Join urls list into comma-separated string for DB
    url_string = ",".join(submission.urls)
    
    new_submission = models.StudentSubmission(
        user_id=current_user.id,
        title=submission.title,
        type=submission.type,
        url=url_string,
        batch_id=submission.batch_id,
        course_id=submission.course_id
    )
    db.add(new_submission)
    db.commit()
    db.refresh(new_submission)
    
    # Map back to response schema
    response_data = new_submission.model_dump()
    response_data["urls"] = new_submission.url.split(",") if new_submission.url else []
    response_data["user"] = new_submission.user
    
    return response_data

@router.get("/my", response_model=List[schemas.SubmissionResponse])
def get_my_submissions(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    statement = select(models.StudentSubmission).where(models.StudentSubmission.user_id == current_user.id)
    results = db.exec(statement).all()
    
    # Process each result to split URL string into list
    submissions = []
    for sub in results:
        sub_data = sub.model_dump()
        sub_data["urls"] = sub.url.split(",") if sub.url else []
        sub_data["user"] = sub.user
        submissions.append(sub_data)
        
    return submissions

@router.get("/all", response_model=List[schemas.SubmissionResponse])
def get_all_submissions(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    statement = select(models.StudentSubmission).order_by(models.StudentSubmission.created_at.desc())
    results = db.exec(statement).all()
    
    # Process each result to split URL string into list
    submissions = []
    for sub in results:
        sub_data = sub.model_dump()
        sub_data["urls"] = sub.url.split(",") if sub.url else []
        sub_data["user"] = sub.user
        submissions.append(sub_data)
        
    return submissions

@router.delete("/{submission_id}")
def delete_submission(
    submission_id: uuid.UUID,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    submission = db.get(models.StudentSubmission, submission_id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    
    db.delete(submission)
    db.commit()
    return {"success": True}
