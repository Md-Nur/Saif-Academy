from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from app.config.database import get_db
from app.database import models
from app.schemas import schemas
from app.dependencies import get_current_user, check_subscription
from typing import List

router = APIRouter(prefix="/materials", tags=["materials"])

@router.get("/live-classes", dependencies=[Depends(check_subscription)])
def get_live_classes(db: Session = Depends(get_db)):
    # This would normally fetch from a zoom_classes table or similar
    # For now, returning dummy data to demonstrate access control
    return [{"title": "English 2nd Paper Live Class", "link": "https://zoom.us/j/123456789"}]

@router.post("/upload")
def upload_material(
    resource: schemas.ResourceCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    new_resource = models.Resource(
        title=resource.title,
        type=resource.type,
        url=resource.url,
        batch_id=resource.batch_id,
        course_id=resource.course_id
    )
    db.add(new_resource)
    db.commit()
    db.refresh(new_resource)
    return new_resource
