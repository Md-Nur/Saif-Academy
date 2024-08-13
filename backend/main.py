from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "https://saif-academy.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/batches")
def read_item():
    batches = []
    for i in range(10):
        batches.append(
            {
                "id": i,
                "title": f"HSC{i+1}",
                "desc": f"Description of HSC{i+1}",
                "imgUrl": "https://unmesh.com/media/Images/Unmesh/Program/MAP23F.png",
            }
        )

    return batches

