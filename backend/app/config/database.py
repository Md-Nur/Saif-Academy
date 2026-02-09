from sqlmodel import SQLModel, create_engine, Session
from os import getenv
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/saif_academy")

engine = create_engine(DATABASE_URL)

def get_db():
    with Session(engine) as session:
        yield session

