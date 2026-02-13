from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select, or_
from sqlalchemy import func
from app.config.database import get_db
from app.database import models
from app.schemas import schemas
from app.utils import security
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from app.dependencies import get_current_user
from app.utils.email import send_reset_password_email

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=schemas.Token)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    statement = select(models.User).where(models.User.email == user.email)
    db_user = db.exec(statement).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Check if this is the first user in the database
    user_count_statement = select(func.count()).select_from(models.User)
    user_count = db.exec(user_count_statement).one()
    
    # If first user, make them a teacher, otherwise student
    role = models.UserRole.TEACHER if user_count == 0 else models.UserRole.STUDENT
    
    hashed_password = security.hash_password(user.password)
    new_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password,
        role=role,
        class_level=user.class_level,
        phone=user.phone or "",
        institute_name=user.institute_name or ""
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token = security.create_access_token(data={"sub": str(new_user.id), "role": str(new_user.role)})
    return {"access_token": access_token, "token_type": "bearer", "role": new_user.role}

@router.post("/login", response_model=schemas.Token)
def login(user_credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    # Check if identifier is email or phone
    if "@" in user_credentials.identifier:
        # It's an email
        statement = select(models.User).where(models.User.email == user_credentials.identifier)
    else:
        # It's a phone number
        statement = select(models.User).where(models.User.phone == user_credentials.identifier)
    
    user = db.exec(statement).first()
    if not user or not security.verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = security.create_access_token(data={"sub": str(user.id), "role": str(user.role)})
    return {"access_token": access_token, "token_type": "bearer", "role": user.role}

@router.get("/me", response_model=schemas.User)
def get_me(current_user: models.User = Depends(get_current_user)):
    return current_user

@router.patch("/profile", response_model=schemas.User)
def update_profile(
    profile_data: schemas.UserUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Update only the fields that are provided
    if profile_data.name is not None:
        current_user.name = profile_data.name
    if profile_data.phone is not None:
        current_user.phone = profile_data.phone
    if profile_data.institute_name is not None:
        current_user.institute_name = profile_data.institute_name
    if profile_data.class_level is not None:
        current_user.class_level = profile_data.class_level
    if profile_data.profile_picture is not None:
        current_user.profile_picture = profile_data.profile_picture
    
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user

@router.patch("/promote/{user_id}", response_model=schemas.User)
def promote_user(
    user_id: models.uuid.UUID,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Allow any teacher to promote any other user to the TEACHER role.
    """
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only teachers can promote other users"
        )
    
    target_user = db.get(models.User, user_id)
    if not target_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    target_user.role = models.UserRole.TEACHER
    db.add(target_user)
    db.commit()
    db.refresh(target_user)
    return target_user

@router.get("/users", response_model=List[schemas.User])
def search_users(
    q: Optional[str] = None,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Search for users by name, email, or phone. Restricted to teachers.
    """
    if current_user.role != models.UserRole.TEACHER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Forbidden: Only teachers can search users"
        )
    
    statement = select(models.User)
    if q:
        statement = statement.where(
            or_(
                models.User.name.ilike(f"%{q}%"),
                models.User.email.ilike(f"%{q}%"),
                models.User.phone.ilike(f"%{q}%")
            )
        )
    
    # Exclude teachers from the search results to avoid re-promoting them
    # statement = statement.where(models.User.role == models.UserRole.STUDENT)
    
    results = db.exec(statement.limit(20)).all()
    return results

@router.post("/forgot-password")
def forgot_password(
    request: schemas.ForgotPasswordRequest,
    db: Session = Depends(get_db)
):
    statement = select(models.User).where(models.User.email == request.email)
    user = db.exec(statement).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="No account found with this email address.")
    
    # Generate 15 minute token
    expires = security.timedelta(minutes=15)
    token = security.create_access_token(
        data={"sub": str(user.id), "type": "password_reset"},
        expires_delta=expires
    )
    
    reset_url = f"{security.getenv('FRONTEND_URL', 'http://localhost:3000')}/reset-password?token={token}"
    
    # Send real email
    send_reset_password_email(user.email, reset_url)
    
    return {"message": "If an account exists with this email, a reset link has been sent."}

@router.post("/reset-password")
def reset_password(
    request: schemas.ResetPasswordRequest,
    db: Session = Depends(get_db)
):
    try:
        payload = jwt.decode(request.token, security.SECRET_KEY, algorithms=[security.ALGORITHM])
        user_id = payload.get("sub")
        token_type = payload.get("type")
        
        if not user_id or token_type != "password_reset":
            raise HTTPException(status_code=400, detail="Invalid token")
            
        user = db.get(models.User, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
            
        user.hashed_password = security.hash_password(request.new_password)
        db.add(user)
        db.commit()
        
        return {"success": True, "message": "Password updated successfully"}
        
    except JWTError:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

