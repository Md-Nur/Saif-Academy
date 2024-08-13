from fastapi import FastAPI

app = FastAPI()


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


@app.get("/batches/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}
