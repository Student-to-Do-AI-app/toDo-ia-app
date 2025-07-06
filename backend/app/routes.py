from fastapi import APIRouter, HTTPException, Query, Depends
from sqlmodel import Session
from typing import Optional, List
from app.database import get_session
from app import crud
from app.schemas import TaskCreate, TaskRead, TaskUpdate

router = APIRouter()


@router.post("/tasks", response_model=TaskRead)
def create_task(task_data: TaskCreate, db: Session = Depends(get_session)):
    return crud.create_task(db, task_data)


@router.get("/tasks", response_model=List[TaskRead])
def get_tasks(
    user_id: Optional[int] = Query(default=None), db: Session = Depends(get_session)
):
    return crud.get_tasks(db, user_id)


@router.patch("/tasks/{task_id}", response_model=TaskRead)
def patch_task(task_id: int, task_data: TaskUpdate, db: Session = Depends(get_session)):
    task = crud.update_task(db, task_id, task_data)
    if not task:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return task


@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_session)):
    success = crud.delete_task(db, task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return {"detail": "Tarea eliminada correctamente"}
