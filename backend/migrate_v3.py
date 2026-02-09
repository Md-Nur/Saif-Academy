from sqlalchemy import text
from app.config.database import engine

def migrate():
    with engine.connect() as conn:
        print("Starting migration v3...")
        
        # Add sender_number to subscriptions table
        print("Adding sender_number to subscriptions table...")
        conn.execute(text("ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS sender_number VARCHAR DEFAULT ''"))
        
        conn.commit()
        print("Migration v3 completed successfully!")

if __name__ == "__main__":
    migrate()
