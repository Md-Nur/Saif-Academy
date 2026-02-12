
from sqlmodel import create_engine, text
from app.config.database import DATABASE_URL

engine = create_engine(DATABASE_URL)

def add_columns():
    with engine.connect() as conn:
        try:
            conn.execute(text("ALTER TABLE batches ADD COLUMN meeting_link_updated_at TIMESTAMPTZ"))
            print("Added meeting_link_updated_at to batches")
            conn.commit()
        except Exception as e:
            print(f"Error adding to batches: {e}")
            conn.rollback()

        try:
            conn.execute(text("ALTER TABLE courses ADD COLUMN meeting_link_updated_at TIMESTAMPTZ"))
            print("Added meeting_link_updated_at to courses")
            conn.commit()
        except Exception as e:
            print(f"Error adding to courses: {e}")
            conn.rollback()

if __name__ == "__main__":
    add_columns()
