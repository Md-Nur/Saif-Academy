from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional, Union, Any
from jose import jwt
from os import getenv

PWD_CONTEXT = CryptContext(schemes=["pbkdf2_sha256", "bcrypt_sha256", "bcrypt"], deprecated="auto")
SECRET_KEY = getenv("JWT_SECRET_KEY", "your-secret-key-for-saif-academy")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 1 week

def hash_password(password: str) -> str:
    return PWD_CONTEXT.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return PWD_CONTEXT.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
