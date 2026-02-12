from sqlalchemy import text
from app.config.database import engine

def add_rejected_status():
    with engine.connect() as conn:
        print("Adding 'rejected' status to subscriptionstatus enum...")
        try:
            # PostgreSQL doesn't allow adding values inside a transaction for ENUMs in some cases,
            # but usually 'ALTER TYPE name ADD VALUE' works outside transaction.
            # SQLModel uses String if not explicitly native Enum, let's check.
            # In models.py it is Enum(SubscriptionStatus).
            # If it's a native PG enum:
            conn.execute(text("COMMIT")) # Close current transaction
            conn.execute(text("ALTER TYPE subscriptionstatus ADD VALUE 'rejected';"))
            print("Successfully added 'rejected' to enum.")
        except Exception as e:
            print(f"Notice (might already exist or not an enum): {e}")

if __name__ == "__main__":
    add_rejected_status()
