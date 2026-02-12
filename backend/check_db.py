import asyncio
from sqlmodel import Session, select
from app.config.database import engine
from app.database import models

async def check_nulls():
    with Session(engine) as db:
        print("Checking Batches...")
        batches = db.exec(select(models.Batch)).all()
        for b in batches:
            if b.price_per_month is None:
                print(f"Batch {b.id} ({b.name}) has NULL price_per_month")
            if b.description is None:
                # Description is Optional[str] in schema, so this should be fine
                pass

        print("\nChecking Courses...")
        courses = db.exec(select(models.Course)).all()
        for c in courses:
            if c.description is None:
                print(f"Course {c.id} ({c.title}) has NULL description")
            if c.price is None:
                print(f"Course {c.id} ({c.title}) has NULL price")

        print("\nChecking Subscriptions...")
        subs = db.exec(select(models.Subscription)).all()
        for s in subs:
            if s.created_at is None:
                print(f"Subscription {s.id} has NULL created_at")

if __name__ == "__main__":
    asyncio.run(check_nulls())
