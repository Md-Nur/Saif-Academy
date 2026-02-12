from sqlalchemy import text
from app.config.database import engine

def add_column():
    with engine.connect() as conn:
        print("Adding 'description' column to 'batches' table...")
        try:
            conn.execute(text("ALTER TABLE batches ADD COLUMN description TEXT;"))
            conn.commit()
            print("Successfully added column.")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    add_column()
