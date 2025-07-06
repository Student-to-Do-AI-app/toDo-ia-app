from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select
from app.database import engine
from app.models import Task
from app.schemas import TaskCreate, TaskRead, TaskUpdate

router = APIRouter()


# ✅ Crear una nueva tarea
@router.post("/tasks", response_model=TaskRead)
def create_task(task_data: TaskCreate):
    task = Task(title=task_data.title, description=task_data.description)
    with Session(engine) as session:
        session.add(task)
        session.commit()
        session.refresh(task)
        return task


# ✅ Obtener todas las tareas
@router.get("/tasks", response_model=list[TaskRead])
def get_tasks(user_id: Optional[int] = Query(default=None)):
    with Session(engine) as session:
        query = select(Task)
        if user_id is not None:
            query = query.where(Task.user_id == user_id)
        tasks = session.exec(query).all()
        return tasks


@router.patch("/tasks/{task_id}", response_model=TaskRead)
def patch_task(task_id: int, task_data: TaskUpdate):
    with Session(engine) as session:
        task = session.get(Task, task_id)
        if not task:
            raise HTTPException(status_code=404, detail="Tarea no encontrada")

        # Solo actualiza si el campo fue enviado
        if task_data.title is not None:
            task.title = task_data.title
        if task_data.description is not None:
            task.description = task_data.description
        if task_data.completed is not None:
            task.completed = task_data.completed

        session.add(task)
        session.commit()
        session.refresh(task)
        return task


@router.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    with Session(engine) as session:
        task = session.get(Task, task_id)
        if not task:
            raise HTTPException(status_code=404, detail="Tarea no encontrada")

        session.delete(task)
        session.commit()
        return {"detail": "Tarea eliminada correctamente"}
