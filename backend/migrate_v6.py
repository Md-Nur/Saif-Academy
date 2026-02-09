from sqlmodel import Session, create_engine, text
from app.config.database import DATABASE_URL

def migrate():
    engine = create_engine(DATABASE_URL)
    
    # Add is_free column to courses table
    with Session(engine) as session:
        try:
            session.exec(text("ALTER TABLE courses ADD COLUMN is_free BOOLEAN DEFAULT FALSE"))
            session.commit()
            print("Added is_free column to courses table")
        except Exception as e:
            session.rollback()
            print(f"Error adding is_free column (might already exist): {e}")

    # Add video_url column to courses table
    with Session(engine) as session:
        try:
            session.exec(text("ALTER TABLE courses ADD COLUMN video_url VARCHAR DEFAULT NULL"))
            session.commit()
            print("Added video_url column to courses table")
        except Exception as e:
            session.rollback()
            print(f"Error adding video_url column (might already exist): {e}")

    print("Migration complete!")

if __name__ == "__main__":
    migrate()
