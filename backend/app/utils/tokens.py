from datetime import datetime, timedelta, timezone
import jwt
from os import environ

ALGORITHM = "HS256"

def create_token(data: dict, type: str = "access"):
    to_encode = data.copy()
    secrate_key = "abv"
    if type == "access":
        secrate_key = environ.get("JWT_ACCESS_KEY")
        
        expire = datetime.now(timezone.utc) + timedelta(days=3)
    else:
        secrate_key = environ.get("JWT_REFRESH_KEY")
        expire = datetime.now(timezone.utc) + timedelta(days=30)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, secrate_key, algorithm=ALGORITHM)
    return encoded_jwt
