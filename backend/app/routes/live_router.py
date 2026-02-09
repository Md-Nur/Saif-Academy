from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.config.database import get_db
from app.database import models
from app.schemas import schemas
from app.dependencies import get_current_user
from typing import List, Optional
import uuid
from datetime import datetime, timedelta

router = APIRouter(prefix="/live", tags=["live"])

@router.post("/routines", response_model=schemas.RoutineResponse)
def create_routine(
    routine: schemas.RoutineCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    if not routine.batch_id and not routine.course_id:
        raise HTTPException(status_code=400, detail="Either batch_id or course_id must be provided")

    new_routine = models.ClassRoutine(**routine.dict())
    db.add(new_routine)
    db.commit()
    db.refresh(new_routine)
    return new_routine

@router.get("/routines", response_model=List[schemas.RoutineResponse])
def get_routines(
    batch_id: Optional[uuid.UUID] = None, 
    course_id: Optional[uuid.UUID] = None, 
    db: Session = Depends(get_db)
):
    statement = select(models.ClassRoutine)
    if batch_id:
        statement = statement.where(models.ClassRoutine.batch_id == batch_id)
    if course_id:
        statement = statement.where(models.ClassRoutine.course_id == course_id)
        
    return db.exec(statement).all()

@router.patch("/routines/{routine_id}", response_model=schemas.RoutineResponse)
def update_routine(
    routine_id: uuid.UUID,
    routine_update: schemas.RoutineCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    statement = select(models.ClassRoutine).where(models.ClassRoutine.id == routine_id)
    routine = db.exec(statement).first()
    if not routine:
        raise HTTPException(status_code=404, detail="Routine not found")
    
    routine.batch_id = routine_update.batch_id
    routine.course_id = routine_update.course_id
    routine.day_of_week = routine_update.day_of_week
    routine.start_time = routine_update.start_time
    routine.end_time = routine_update.end_time
    
    db.add(routine)
    db.commit()
    db.refresh(routine)
    return routine

@router.delete("/routines/{routine_id}")
def delete_routine(
    routine_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    statement = select(models.ClassRoutine).where(models.ClassRoutine.id == routine_id)
    routine = db.exec(statement).first()
    if not routine:
        raise HTTPException(status_code=404, detail="Routine not found")
    
    db.delete(routine)
    db.commit()
    return {"success": True, "message": "Routine deleted successfully"}

@router.post("/sessions", response_model=schemas.LiveSessionResponse)
def create_session(
    session: schemas.LiveSessionCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    if not session.batch_id and not session.course_id:
         raise HTTPException(status_code=400, detail="Either batch_id or course_id must be provided")

    new_session = models.LiveSession(**session.dict())
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return new_session

@router.get("/sessions", response_model=List[schemas.LiveSessionResponse])
def get_sessions(
    batch_id: Optional[uuid.UUID] = None, 
    course_id: Optional[uuid.UUID] = None,
    db: Session = Depends(get_db)
):
    statement = select(models.LiveSession)
    if batch_id:
        statement = statement.where(models.LiveSession.batch_id == batch_id)
    if course_id:
        statement = statement.where(models.LiveSession.course_id == course_id)
    
    # Order by scheduled_at desc
    statement = statement.order_by(models.LiveSession.scheduled_at.desc())
    return db.exec(statement).all()

@router.get("/student/next-session")
def get_next_session(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Get the absolute next live session for the student based on their enrollments.
    Prioritizes specific LiveSession overrides over recurring ClassRoutines.
    """
    # 1. Get all active enrollments (verified subscriptions)
    statement = select(models.Subscription).where(
        models.Subscription.user_id == current_user.id,
        models.Subscription.status == models.SubscriptionStatus.VERIFIED
    )
    subscriptions = db.exec(statement).all()
    
    batch_ids = [sub.batch_id for sub in subscriptions if sub.batch_id]
    course_ids = [sub.course_id for sub in subscriptions if sub.course_id]

    if not batch_ids and not course_ids:
        return {"next_session": None}

    now = datetime.now()

    # 2. Check for upcoming specific LiveSessions (overrides/extras)
    # We look for sessions scheduled for the future
    live_sessions_query = select(models.LiveSession).where(
        (models.LiveSession.batch_id.in_(batch_ids)) | 
        (models.LiveSession.course_id.in_(course_ids))
    ).where(
        models.LiveSession.scheduled_at > now,
        models.LiveSession.status != "cancelled"
    ).order_by(models.LiveSession.scheduled_at.asc()).limit(1)
    
    next_live_session = db.exec(live_sessions_query).first()

    # 3. Check for recurring ClassRoutines
    # This is more complex. We need to find the next occurrence of any routine.
    # For simplicity in this iteration, we will rely on LiveSessions if created by teacher.
    # However, to be fully dynamic, we should project routines to the next occurrence.
    
    # Strategy: 
    # - If there is a LiveSession scheduled soon, return it.
    # - If not, we could calculate the next routine time. 
    # - For now, let's return the specific LiveSession if it exists. 
    # - If the teacher hasn't created a specific session object, the student relies on the static routine list (which they can see in their dashboard).
    # - BUT the requirement says "if a student visits his dashboard... he might see the live link... or next schedule time".
    
    # Let's try to calculate the next routine occurrence for the "Next Class" display.
    
    routines_query = select(models.ClassRoutine).where(
        (models.ClassRoutine.batch_id.in_(batch_ids)) | 
        (models.ClassRoutine.course_id.in_(course_ids))
    )
    routines = db.exec(routines_query).all()
    
    next_routine_occurrence = None
    next_routine = None

    # Helper map for day of week
    days_map = {
        "Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3, 
        "Friday": 4, "Saturday": 5, "Sunday": 6
    }
    
    current_weekday = now.weekday() # Mon=0, Sun=6
    
    for routine in routines:
        # Parse time
        try:
            r_hour, r_minute = map(int, routine.start_time.split(':'))
        except ValueError:
            continue
            
        r_weekday = days_map.get(routine.day_of_week)
        if r_weekday is None:
            continue
            
        # Calculate days until next occurrence
        days_ahead = r_weekday - current_weekday
        if days_ahead < 0: # Target day already happened this week
            days_ahead += 7
        elif days_ahead == 0: # Today
            # Check if time has passed
            routine_time = now.replace(hour=r_hour, minute=r_minute, second=0, microsecond=0)
            if routine_time < now:
                days_ahead += 7
        
        # Calculate actaul date
        next_date = now.replace(hour=r_hour, minute=r_minute, second=0, microsecond=0) + timedelta(days=days_ahead)
        
        if next_routine_occurrence is None or next_date < next_routine_occurrence:
            next_routine_occurrence = next_date
            next_routine = routine

    # Compare next_live_session and next_routine_occurrence
    final_next_session = None
    source_type = None # "live_session" or "routine"
    
    if next_live_session and next_routine_occurrence:
        if next_live_session.scheduled_at < next_routine_occurrence:
             final_next_session = next_live_session
             source_type = "live_session"
        else:
             final_next_session = next_routine
             source_type = "routine"
    elif next_live_session:
        final_next_session = next_live_session
        source_type = "live_session"
    elif next_routine_occurrence:
        final_next_session = next_routine
        source_type = "routine"
    
    if not final_next_session:
        return {"next_session": None}

    # Format response
    response = {
        "title": final_next_session.title if source_type == "live_session" else f"Regular Class ({final_next_session.day_of_week})",
        "start_time": final_next_session.scheduled_at.isoformat() if source_type == "live_session" else next_routine_occurrence.isoformat(),
        "zoom_link": final_next_session.zoom_link if source_type == "live_session" else None, # Routines don't have dynamic links usually, unless we add it to routine model or fetch from batch default
        "is_live": False, # Logic to determine if currently live
        "batch_name": None,
        "course_title": None
    }

    # Populate batch/course info and determine meeting link for routine
    default_meeting_link = None
    if final_next_session.batch:
        response["batch_name"] = final_next_session.batch.name
        default_meeting_link = final_next_session.batch.meeting_link
    if final_next_session.course:
        response["course_title"] = final_next_session.course.title
        default_meeting_link = final_next_session.course.meeting_link
        
    if source_type == "routine" and default_meeting_link:
        response["zoom_link"] = default_meeting_link
        
    # Check if live (e.g. within 15 mins before start or during class)
    # Asssume 1 hour class duration for routines if not specified
    start_dt = datetime.fromisoformat(response["start_time"])
    end_dt = start_dt + timedelta(hours=1) # Default 1 hour
    
    if source_type == "routine":
        try:
             # Try to Use actual end time if available
             h, m = map(int, final_next_session.end_time.split(':'))
             # This end time is on the day of occurrence
             end_dt = start_dt.replace(hour=h, minute=m)
        except:
            pass

    # Window: 15 mins before start until end
    if (start_dt - timedelta(minutes=15)) <= now <= end_dt:
        response["is_live"] = True
        # If it's a routine and we don't have a specific link, we might want to return a default or null to prompt user
        # But if source is live_session, we have zoom_link
        
    return {"next_session": response}
