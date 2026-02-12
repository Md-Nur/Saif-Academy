from sqlalchemy import text
from app.config.database import engine

def add_column():
    with engine.connect() as conn:
        print("Adding 'profile_picture' column to 'users' table...")
        try:
            conn.execute(text("ALTER TABLE users ADD COLUMN profile_picture TEXT;"))
            conn.commit()
            print("Successfully added column.")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    add_column()
