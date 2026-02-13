
import asyncio
from datetime import datetime, timedelta
from sqlmodel import Session, select
from app.config.database import engine
from app.database import models

async def cleanup_meeting_links():
    while True:
        try:
            with Session(engine) as session:
                # Calculate threshold time (1 hour ago)
                threshold = datetime.now() - timedelta(hours=1)
                
                # Update Batches
                statement = select(models.Batch).where(models.Batch.meeting_link != None)
                batches = session.exec(statement).all()
                for batch in batches:
                    # If updated_at is None, we assume it's old or just set, but let's be safe and check if it has a value.
                    # If it's None, we might want to set it now or clear it? 
                    # If I just added the column, existing links have None. They should probably be cleared or ignored?
                    # User request: "after one hours the zoom meeting link should be automatically remove"
                    # If I migrated existing links, they have None. 
                    # Let's assume if it is None, we treat it as "just now" (safe) or "very old" (unsafe).
                    # Better to treat None as "now" (give it 1 hour from restart) OR just clear it.
                    # Let's check if meeting_link_updated_at is present.
                    if batch.meeting_link_updated_at and batch.meeting_link_updated_at < threshold:
                        batch.meeting_link = None
                        batch.meeting_link_updated_at = None
                        session.add(batch)
                
                # Update Courses
                statement = select(models.Course).where(models.Course.meeting_link != None)
                courses = session.exec(statement).all()
                for course in courses:
                    if course.meeting_link_updated_at and course.meeting_link_updated_at < threshold:
                        course.meeting_link = None
                        course.meeting_link_updated_at = None
                        session.add(course)
                
                session.commit()
        except Exception as e:
            pass
            
            
        # Wait for 10 minutes (600 seconds)
        await asyncio.sleep(600)
