from sqlmodel import Session, select
from app.config.database import engine
from app.database.models import User

with Session(engine) as session:
    users = session.exec(select(User)).all()
    for u in users:
        print(f"Email: {u.email}, Role: {u.role}")
