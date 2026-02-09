from sqlmodel import Session, select, create_engine
from app.database.models import User
from app.config.database import DATABASE_URL

print(f"Testing connection to: {DATABASE_URL}")
engine = create_engine(DATABASE_URL)

try:
    with Session(engine) as session:
        statement = select(User).limit(1)
        user = session.exec(statement).first()
        print("Success! Connection established and query successful.")
except Exception as e:
    print(f"Error: {e}")
