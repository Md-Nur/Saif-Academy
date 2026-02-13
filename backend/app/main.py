from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from os import getenv
from app.routes import auth_router, subscription_router, material_router, batch_router, course_router, live_router, quiz_router, submission_router, stats_router, testimonial_router
from app.config.database import engine
from app.database import models
from sqlmodel import SQLModel
from dotenv import load_dotenv

load_dotenv()

# Create tables
SQLModel.metadata.create_all(bind=engine)

from contextlib import asynccontextmanager
import asyncio
from app.tasks import cleanup_meeting_links

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Start the background task
    task = asyncio.create_task(cleanup_meeting_links())
    yield
    # Cancel the task on shutdown
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        pass

app = FastAPI(title="Saif Academy API", lifespan=lifespan)

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
app.include_router(quiz_router.router)
app.include_router(submission_router.router)
app.include_router(live_router.router)
app.include_router(stats_router.router)
app.include_router(testimonial_router.router)
