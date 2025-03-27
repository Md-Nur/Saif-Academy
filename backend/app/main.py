from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from os import environ
from app.routes.user_router import user_router
from app.routes.batch_router import batch_router
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

origins = [
    environ.get("FRONTEND_URL"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(batch_router)
app.include_router(user_router)
