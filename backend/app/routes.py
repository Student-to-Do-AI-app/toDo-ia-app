from fastapi import APIRouter, HTTPException, Query, Depends
from sqlmodel import Session, select  # 👈 usa select de sqlmodel
from typing import Optional, List
from app.database import get_session
from app import crud
from .models import Task
from ollama import Client
from app.schemas import TaskCreate, TaskRead, TaskUpdate

router = APIRouter()

client = Client(host="http://127.0.0.1:11434")  # asegúrate de que Ollama corre ahí


def generate_insights_from_tasks(prompt: str) -> str:
    response = client.chat(
        model="llama3",  # usa el modelo que tengas disponible
        messages=[
            {
                "role": "system",
                "content": "Eres un asistente experto en gestión de tareas y productividad. Ayuda a dar insights sobre un backlog de tareas.",
            },
            {"role": "user", "content": prompt},
        ],
    )
    return response["message"]["content"]


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


@router.post("/tasks/insights")
def get_tasks_insights(
    prompt: str = Body(default=None), db: Session = Depends(get_session)
):
    if not prompt:
        # Si no se envía prompt, construirlo con las tareas
        tasks = db.exec(select(Task)).all()
        prompt = "Dame insights de estas tareas:\n" + "\n".join(
            f"- {t.title} (Completada: {t.completed}, Tiempo: {t.time_spent})"
            for t in tasks
        )
    response = client.chat(
        model="llama3",  # tu modelo de ollama
        messages=[{"role": "user", "content": prompt}],
    )
    return {"insights": response["message"]["content"]}
