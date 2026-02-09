from sqlmodel import Session, create_engine, text
from app.config.database import DATABASE_URL

def migrate():
    engine = create_engine(DATABASE_URL)
    with Session(engine) as session:
        print("Migrating database changes...")
        
        # Add payment_method column to subscriptions table
        try:
            session.exec(text("ALTER TABLE subscriptions ADD COLUMN payment_method VARCHAR DEFAULT 'bkash'"))
            print("Added payment_method column to subscriptions table")
        except Exception as e:
            print(f"Error adding payment_method column (might already exist): {e}")

        session.commit()
        print("Migration complete!")

if __name__ == "__main__":
    migrate()
