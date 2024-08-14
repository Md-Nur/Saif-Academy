from fastapi import APIRouter

batch_router = APIRouter()


@batch_router.get("/batches")
def get_all_batches():
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
