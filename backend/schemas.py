from pydantic import BaseModel, Field

class ActivityBase(BaseModel):
    name: str = Field(..., min_length=1, description="Student Name")
    activity: str = Field(..., min_length=1, description="Activity Description")
    hours: float = Field(..., gt=0, description="Hours spent (must be positive)")

class ActivityCreate(ActivityBase):
    pass

class ActivityResponse(ActivityBase):
    id: int

    class Config:
        from_attributes = True
