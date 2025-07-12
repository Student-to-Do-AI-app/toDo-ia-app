from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import datetime


class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    completed: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    time_spent: Optional[int] = Field(default=None, ge=0)
    user_id: Optional[int] = Field(default=None, index=True)
