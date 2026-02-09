from sqlalchemy import text
from app.config.database import engine

def migrate():
    with engine.connect() as conn:
        print("Starting migration v4...")
        
        # Add meeting_link to batches table
        print("Adding meeting_link to batches table...")
        conn.execute(text("ALTER TABLE batches ADD COLUMN IF NOT EXISTS meeting_link VARCHAR DEFAULT NULL"))

        # Add meeting_link to courses table
        print("Adding meeting_link to courses table...")
        conn.execute(text("ALTER TABLE courses ADD COLUMN IF NOT EXISTS meeting_link VARCHAR DEFAULT NULL"))
        
        conn.commit()
        print("Migration v4 completed successfully!")

if __name__ == "__main__":
    migrate()
