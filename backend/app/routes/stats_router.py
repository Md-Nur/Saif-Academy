from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select, func
from app.config.database import get_db
from app.database import models
from app.schemas import schemas
from app.dependencies import get_current_user

router = APIRouter(prefix="/stats", tags=["stats"])

@router.get("/platform", response_model=schemas.PlatformStats)
def get_platform_stats(db: Session = Depends(get_db)):
    """
    Get platform-wide statistics for display on the home page.
    """
    # Count total students
    student_count = db.exec(
        select(func.count()).select_from(models.User).where(models.User.role == models.UserRole.STUDENT)
    ).one()
    
    # Count total teachers
    teacher_count = db.exec(
        select(func.count()).select_from(models.User).where(models.User.role == models.UserRole.TEACHER)
    ).one()
    
    # Count total batches
    batch_count = db.exec(
        select(func.count()).select_from(models.Batch)
    ).one()
    
    # Count total courses
    course_count = db.exec(
        select(func.count()).select_from(models.Course)
    ).one()
    
    # Calculate total programs (batches + courses)
    total_programs = batch_count + course_count
    
    return {
        "total_students": student_count,
        "total_teachers": teacher_count,
        "total_batches": batch_count,
        "total_courses": course_count,
        "total_programs": total_programs
    }

@router.get("/user", response_model=schemas.UserStats)
def get_user_stats(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get statistics for the current user (enrollment count, attendance, etc.)
    """
    # Get all verified subscriptions for this user
    verified_subs = db.exec(
        select(models.Subscription).where(
            models.Subscription.user_id == current_user.id,
            models.Subscription.status == models.SubscriptionStatus.VERIFIED
        )
    ).all()
    
    # Count unique batch_ids and course_ids
    unique_batch_ids = set()
    unique_course_ids = set()
    
    for sub in verified_subs:
        if sub.batch_id:
            unique_batch_ids.add(sub.batch_id)
        if sub.course_id:
            unique_course_ids.add(sub.course_id)
    
    enrolled_batches = len(unique_batch_ids)
    enrolled_courses = len(unique_course_ids)
    total_enrollments = enrolled_batches + enrolled_courses
    
    # TODO: Implement attendance tracking
    # For now, return None for attendance percentage
    attendance_percentage = None
    
    return {
        "enrolled_batches": enrolled_batches,
        "enrolled_courses": enrolled_courses,
        "total_enrollments": total_enrollments,
        "attendance_percentage": attendance_percentage
    }

@router.get("/teacher", response_model=schemas.TeacherStats)
def get_teacher_stats(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get statistics for teachers (active students, monthly revenue, pending payments)
    """
    # Verify user is a teacher
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only teachers can access this endpoint"
        )
    
    # Get all verified subscriptions
    verified_subs = db.exec(
        select(models.Subscription).where(
            models.Subscription.status == models.SubscriptionStatus.VERIFIED
        )
    ).all()
    
    # Count unique students with verified subscriptions
    unique_students = set(sub.user_id for sub in verified_subs)
    active_students = len(unique_students)
    
    # Calculate this month's revenue (sum of verified payments this month)
    from datetime import datetime
    current_month = datetime.now().month
    current_year = datetime.now().year
    
    monthly_revenue = 0.0
    for sub in verified_subs:
        if sub.updated_at and sub.updated_at.month == current_month and sub.updated_at.year == current_year:
            monthly_revenue += float(sub.amount)
    
    # Count pending payments
    pending_count = db.exec(
        select(func.count()).select_from(models.Subscription).where(
            models.Subscription.status == models.SubscriptionStatus.PENDING
        )
    ).one()
    
    return {
        "active_students": active_students,
        "monthly_revenue": monthly_revenue,
        "pending_payments": pending_count
    }
