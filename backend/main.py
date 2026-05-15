from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func

import models
import schemas
from database import engine, get_db

# Create the database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Student Activity Tracker API")

# Add CORS support for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Student Activity Tracker API is running."}

@app.post("/activities", status_code=status.HTTP_201_CREATED)
def create_activity(activity: schemas.ActivityCreate, db: Session = Depends(get_db)):
    # Create the new activity model
    db_activity = models.Activity(
        name=activity.name.strip(),
        activity=activity.activity.strip(),
        hours=activity.hours
    )
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    
    return {
        "message": "Activity added successfully",
        "data": db_activity
    }

@app.get("/activities")
def get_activities(db: Session = Depends(get_db)):
    activities = db.query(models.Activity).all()
    return {"data": activities}

@app.delete("/activities/{activity_id}")
def delete_activity(activity_id: int, db: Session = Depends(get_db)):
    db_activity = db.query(models.Activity).filter(models.Activity.id == activity_id).first()
    if not db_activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    
    db.delete(db_activity)
    db.commit()
    
    return {"message": "Activity deleted successfully"}

@app.get("/summary")
def get_summary(db: Session = Depends(get_db)):
    # Calculate summary metrics
    total_entries = db.query(models.Activity).count()
    
    # Using SQL SUM for total hours
    total_hours_result = db.query(func.sum(models.Activity.hours)).scalar()
    total_hours = float(total_hours_result) if total_hours_result else 0.0
    
    # Using SQL to find the most active user
    most_active = db.query(
        models.Activity.name, 
        func.sum(models.Activity.hours).label("total_user_hours")
    ).group_by(models.Activity.name).order_by(func.sum(models.Activity.hours).desc()).first()
    
    most_active_user = most_active.name if most_active else "N/A"
    
    return {
        "data": {
            "total_entries": total_entries,
            "total_hours": round(total_hours, 1),
            "most_active_user": most_active_user
        }
    }
