from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.config.database import get_db
from app.database import models
from app.schemas import schemas
from app.dependencies import get_current_user

router = APIRouter(prefix="/testimonials", tags=["testimonials"])

@router.get("/", response_model=List[schemas.TestimonialResponse])
def get_testimonials(db: Session = Depends(get_db)):
    """
    Get all approved testimonials for display on the home page.
    """
    statement = select(models.Testimonial).where(models.Testimonial.is_approved == True)
    testimonials = db.exec(statement).all()
    return testimonials

@router.post("/", response_model=schemas.TestimonialResponse)
def create_testimonial(
    testimonial: schemas.TestimonialCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create a new testimonial. Only teachers can create testimonials.
    """
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only teachers can create testimonials"
        )
    
    new_testimonial = models.Testimonial(
        name=testimonial.name,
        role=testimonial.role,
        content=testimonial.content,
        rating=testimonial.rating,
        avatar=testimonial.avatar,
        is_approved=True  # Auto-approve since only teachers can create
    )
    
    db.add(new_testimonial)
    db.commit()
    db.refresh(new_testimonial)
    return new_testimonial

@router.patch("/{testimonial_id}", response_model=schemas.TestimonialResponse)
def update_testimonial(
    testimonial_id: models.uuid.UUID,
    testimonial: schemas.TestimonialCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update an existing testimonial. Only teachers can update testimonials.
    """
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only teachers can update testimonials"
        )
    
    db_testimonial = db.get(models.Testimonial, testimonial_id)
    if not db_testimonial:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Testimonial not found"
        )
    
    db_testimonial.name = testimonial.name
    db_testimonial.role = testimonial.role
    db_testimonial.content = testimonial.content
    db_testimonial.rating = testimonial.rating
    if testimonial.avatar:
        db_testimonial.avatar = testimonial.avatar
    
    db.add(db_testimonial)
    db.commit()
    db.refresh(db_testimonial)
    return db_testimonial

@router.delete("/{testimonial_id}")
def delete_testimonial(
    testimonial_id: models.uuid.UUID,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Delete a testimonial. Only teachers can delete testimonials.
    """
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only teachers can delete testimonials"
        )
    
    db_testimonial = db.get(models.Testimonial, testimonial_id)
    if not db_testimonial:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Testimonial not found"
        )
    
    db.delete(db_testimonial)
    db.commit()
    return {"success": True, "message": "Testimonial deleted"}
