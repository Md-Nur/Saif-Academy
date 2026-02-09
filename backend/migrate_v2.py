from sqlalchemy import text
from app.config.database import engine

def migrate():
    with engine.connect() as conn:
        print("Starting migration...")
        
        # Update courses table
        print("Updating courses table...")
        conn.execute(text("ALTER TABLE courses ADD COLUMN IF NOT EXISTS course_type VARCHAR DEFAULT 'recorded'"))
        conn.execute(text("ALTER TABLE courses ADD COLUMN IF NOT EXISTS is_free BOOLEAN DEFAULT FALSE"))
        conn.execute(text("ALTER TABLE courses ADD COLUMN IF NOT EXISTS video_url VARCHAR"))
        
        # Update batches table
        print("Updating batches table...")
        conn.execute(text("ALTER TABLE batches ADD COLUMN IF NOT EXISTS price_per_month INTEGER DEFAULT 1000"))
        
        # Update subscriptions table
        print("Updating subscriptions table...")
        conn.execute(text("ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS batch_id UUID REFERENCES batches(id)"))
        conn.execute(text("ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS course_id UUID REFERENCES courses(id)"))
        
        conn.commit()
        print("Migration completed successfully!")

if __name__ == "__main__":
    migrate()
