from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from os import getenv
from app.routes import auth_router, subscription_router, material_router, batch_router, course_router, live_router
from app.config.database import engine
from app.database import models
from sqlmodel import SQLModel
from dotenv import load_dotenv

load_dotenv()

# Create tables
SQLModel.metadata.create_all(bind=engine)

app = FastAPI(title="Saif Academy API")

origins = [
    getenv("FRONTEND_URL", "http://localhost:3001"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(subscription_router.router)
app.include_router(material_router.router)
app.include_router(batch_router.router)
app.include_router(course_router.router)
app.include_router(live_router.router)
