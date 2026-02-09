from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.config.database import get_db
from app.database import models
from app.schemas import schemas
from app.dependencies import get_current_user
from typing import List, Optional
import uuid

router = APIRouter(prefix="/subscriptions", tags=["subscriptions"])

@router.post("/", response_model=schemas.SubscriptionResponse)
def create_subscription(
    sub: schemas.SubscriptionCreate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    # Check if trnx_id already exists
    statement = select(models.Subscription).where(models.Subscription.trnx_id == sub.trnx_id)
    existing = db.exec(statement).first()
    if existing:
        raise HTTPException(status_code=400, detail="Transaction ID already exists")

    new_sub = models.Subscription(
        user_id=current_user.id,
        batch_id=sub.batch_id,
        course_id=sub.course_id,
        trnx_id=sub.trnx_id,
        sender_number=sub.sender_number,
        amount=sub.amount,
        payment_method=sub.payment_method,
        month=sub.month,
        status=models.SubscriptionStatus.PENDING
    )
    db.add(new_sub)
    db.commit()
    db.refresh(new_sub)
    return new_sub

@router.get("/me", response_model=List[schemas.SubscriptionResponse])
def get_my_subscriptions(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    statement = select(models.Subscription).where(models.Subscription.user_id == current_user.id)
    return db.exec(statement).all()

from sqlalchemy.orm import joinedload

@router.get("/pending", response_model=List[schemas.SubscriptionResponse])
def get_pending_subscriptions(
    batch_id: Optional[uuid.UUID] = None,
    course_id: Optional[uuid.UUID] = None,
    month: Optional[str] = None,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    statement = select(models.Subscription).where(
        models.Subscription.status == models.SubscriptionStatus.PENDING
    )
    
    if batch_id:
        statement = statement.where(models.Subscription.batch_id == batch_id)
    
    if course_id:
        statement = statement.where(models.Subscription.course_id == course_id)
    
    if month:
        statement = statement.where(models.Subscription.month == month)

    statement = statement.options(
        joinedload(models.Subscription.user),
        joinedload(models.Subscription.batch),
        joinedload(models.Subscription.course)
    )
    return db.exec(statement).all()

@router.patch("/{sub_id}/verify")
def verify_subscription(
    sub_id: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    statement = select(models.Subscription).where(models.Subscription.id == sub_id)
    sub = db.exec(statement).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Subscription not found")
    
    sub.status = models.SubscriptionStatus.VERIFIED
    db.add(sub)
    db.commit()
@router.get("/my-batches", response_model=List[schemas.BatchResponse])
def get_my_batches(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Select unique batches where user has any subscription
    statement = select(models.Batch).join(models.Subscription).where(models.Subscription.user_id == current_user.id).distinct()
    return db.exec(statement).all()

@router.get("/my-courses", response_model=List[schemas.CourseResponse])
def get_my_courses(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    statement = select(models.Course).join(models.Subscription).where(models.Subscription.user_id == current_user.id).distinct()
    return db.exec(statement).all()
