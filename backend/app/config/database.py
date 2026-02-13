from sqlmodel import SQLModel, create_engine, Session
from os import getenv
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/saif_academy")

engine = create_engine(DATABASE_URL)

def get_db():
    """
    Dependency to get a database session.
    Yields a session and closes it after use.
    """
    with Session(engine) as session:
        yield session

