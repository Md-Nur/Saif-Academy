from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.config.database import get_db
from app.database import models
from app.schemas import schemas
from app.dependencies import get_current_user
from typing import List
import uuid

router = APIRouter(prefix="/batches", tags=["batches"])

@router.get("/", response_model=List[schemas.BatchResponse])
def get_all_batches(db: Session = Depends(get_db)):
    statement = select(models.Batch)
    return db.exec(statement).all()

@router.get("/{batch_id}", response_model=schemas.BatchResponse)
def get_batch(batch_id: uuid.UUID, db: Session = Depends(get_db)):
    statement = select(models.Batch).where(models.Batch.id == batch_id)
    batch = db.exec(statement).first()
    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")
    return batch

@router.post("/", response_model=schemas.BatchResponse)
def create_batch(
    batch: schemas.BatchCreate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    from datetime import datetime
    
    new_batch = models.Batch(
        name=batch.name,
        class_level=batch.class_level,
        subject=batch.subject,
        price_per_month=batch.price_per_month,
        teacher_id=current_user.id,
        description=batch.description,
        meeting_link=batch.meeting_link,
        meeting_link_updated_at=datetime.now() if batch.meeting_link else None
    )
    db.add(new_batch)
    db.commit()
    db.refresh(new_batch)
    return new_batch

@router.put("/{batch_id}", response_model=schemas.BatchResponse)
def update_batch(
    batch_id: uuid.UUID,
    batch_update: schemas.BatchCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    statement = select(models.Batch).where(models.Batch.id == batch_id)
    batch = db.exec(statement).first()
    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")
    
    # Check if meeting link is being updated
    if batch_update.meeting_link != batch.meeting_link:
        from datetime import datetime
        batch.meeting_link_updated_at = datetime.now() if batch_update.meeting_link else None

    batch.name = batch_update.name
    batch.class_level = batch_update.class_level
    batch.subject = batch_update.subject
    batch.price_per_month = batch_update.price_per_month
    batch.description = batch_update.description
    batch.meeting_link = batch_update.meeting_link
    
    db.add(batch)
    db.commit()
    db.refresh(batch)
    return batch

@router.delete("/{batch_id}")
def delete_batch(
    batch_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    statement = select(models.Batch).where(models.Batch.id == batch_id)
    batch = db.exec(statement).first()
    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")
    
    db.delete(batch)
    db.commit()
    return {"message": "Batch deleted successfully"}

@router.patch("/{batch_id}/remove-link")
def remove_batch_link(
    batch_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Teacher-only endpoint to remove the meeting link from a batch.
    """
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    statement = select(models.Batch).where(models.Batch.id == batch_id)
    batch = db.exec(statement).first()
    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")
    
    batch.meeting_link = None
    batch.meeting_link_updated_at = None
    db.add(batch)
    db.commit()
    db.refresh(batch)
    return {"success": True, "message": "Meeting link removed"}
