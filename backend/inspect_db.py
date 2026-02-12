from sqlalchemy import inspect
from app.config.database import engine

def inspect_db():
    inspector = inspect(engine)
    for table_name in inspector.get_table_names():
        print(f"Table: {table_name}")
        columns = [c['name'] for c in inspector.get_columns(table_name)]
        print(f"  Columns: {', '.join(columns)}")

if __name__ == "__main__":
    inspect_db()
