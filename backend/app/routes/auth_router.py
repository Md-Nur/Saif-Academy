from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.config.database import get_db
from app.database import models
from app.schemas import schemas
from app.utils import security
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from app.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=schemas.Token)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    statement = select(models.User).where(models.User.email == user.email)
    db_user = db.exec(statement).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = security.hash_password(user.password)
    new_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password,
        role=models.UserRole.STUDENT,
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
    
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user

