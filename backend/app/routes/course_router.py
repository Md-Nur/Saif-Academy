from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.config.database import get_db
from app.database import models
from app.schemas import schemas
from app.dependencies import get_current_user
from typing import List
import uuid

router = APIRouter(prefix="/courses", tags=["courses"])

@router.get("/", response_model=List[schemas.CourseResponse])
def get_all_courses(db: Session = Depends(get_db)):
    statement = select(models.Course)
    return db.exec(statement).all()

@router.get("/{course_id}", response_model=schemas.CourseResponse)
def get_course(course_id: uuid.UUID, db: Session = Depends(get_db)):
    statement = select(models.Course).where(models.Course.id == course_id)
    course = db.exec(statement).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@router.post("/", response_model=schemas.CourseResponse)
def create_course(
    course: schemas.CourseCreate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    new_course = models.Course(
        title=course.title,
        description=course.description,
        classLevel=course.classLevel,
        board=course.board,
        subject=course.subject,
        price=course.price,
        course_type=course.course_type,
        is_free=course.is_free,
        video_url=course.video_url,
        instituteName=course.instituteName,
        meeting_link=course.meeting_link
    )
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course

@router.put("/{course_id}", response_model=schemas.CourseResponse)
def update_course(
    course_id: uuid.UUID,
    course_update: schemas.CourseCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    statement = select(models.Course).where(models.Course.id == course_id)
    course = db.exec(statement).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    course.title = course_update.title
    course.description = course_update.description
    course.classLevel = course_update.classLevel
    course.board = course_update.board
    course.subject = course_update.subject
    course.price = course_update.price
    course.course_type = course_update.course_type
    course.is_free = course_update.is_free
    course.video_url = course_update.video_url
    course.instituteName = course_update.instituteName
    course.meeting_link = course_update.meeting_link
    
    db.add(course)
    db.commit()
    db.refresh(course)
    return course

@router.delete("/{course_id}")
def delete_course(
    course_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    statement = select(models.Course).where(models.Course.id == course_id)
    course = db.exec(statement).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    db.delete(course)
    db.commit()
    return {"message": "Course deleted successfully"}
