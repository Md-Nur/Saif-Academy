from sqlmodel import create_engine, text

DATABASE_URL = "postgresql://md.nurealamsiddiquee:@localhost:5432/saif_academy"

def migrate():
    engine = create_engine(DATABASE_URL)
    with engine.connect() as conn:
        print("Upgrading video_url to TEXT...")
        try:
            conn.execute(text("ALTER TABLE courses ALTER COLUMN video_url TYPE TEXT;"))
            conn.commit()
            print("Migration successful: video_url is now TEXT.")
        except Exception as e:
            print(f"Migration failed or already applied: {e}")

if __name__ == "__main__":
    migrate()
