from typing import Optional
from datetime import datetime
from pydantic import BaseModel


# Esquema para crear una tarea (no necesita ID ni fecha)
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    user_id: Optional[int] = None


# Esquema para actualizar una tarea (parcial o total)
class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    user_id: Optional[int] = None


# Esquema para devolver una tarea (incluye ID y fecha)
class TaskRead(BaseModel):
    id: int
    title: str
    description: Optional[str]
    completed: bool
    created_at: datetime
    user_id: Optional[int]

    class Config:
        orm_mode = True
