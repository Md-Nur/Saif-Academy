from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlmodel import Session, select
from app.config.database import get_db
from app.database import models
from app.utils.security import SECRET_KEY, ALGORITHM
from datetime import datetime
from uuid import UUID

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    Retrieves the current authenticated user from the JWT token.
    Raises 401 Unauthorized if the token is invalid or the user doesn't exist.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    statement = select(models.User).where(models.User.id == user_id)
    user = db.exec(statement).first()
    if user is None:
        raise credentials_exception
    return user

async def check_subscription(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Middleware dependency to verify if the user has an active subscription for the current month.
    Exempts users with the TEACHER role.
    Checks the 'subscriptions' table for a 'verified' status matching the current YYYY-MM.
    """
    if current_user.role == models.UserRole.TEACHER:
        return True
    
    # Calculate current month in YYYY-MM format
    current_month = datetime.now().strftime("%Y-%m")
    
    # Query for a verified subscription for the current user and month
    statement = select(models.Subscription).where(
        models.Subscription.user_id == current_user.id,
        models.Subscription.month == current_month,
        models.Subscription.status == models.SubscriptionStatus.VERIFIED
    )
    subscription = db.exec(statement).first()
    
    if not subscription:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Active subscription required for the current month"
        )
    return True
