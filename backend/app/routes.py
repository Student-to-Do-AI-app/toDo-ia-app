from fastapi import APIRouter, HTTPException, Query, Depends
from sqlmodel import Session, select
from typing import Optional, List
from app.database import get_session
from app import crud
from .models import Task
from ollama import Client
from app.schemas import TaskCreate, TaskRead, TaskUpdate

router = APIRouter()

client = Client(host="http://127.0.0.1:11434")


def generate_insights_from_tasks(prompt: str) -> str:
    response = client.chat(
        model="llama3",
        messages=[
            {
                "role": "system",
                "content": "You are an expert assistant in task management and productivity. Help provide insights on a backlog of tasks.",
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
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_session)):
    success = crud.delete_task(db, task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"detail": "Task deleted"}


@router.get("/tasks/insights")
def get_tasks_insights(db: Session = Depends(get_session)):
    tasks = db.exec(select(Task)).all()
    prompt = "Generate the more importants of these tasks:\n" + "\n".join(
        f"- {t.title} (state: {t.completed}, time: {t.time_spent})" for t in tasks
    )
    insights = generate_insights_from_tasks(prompt)
    return {"insights": insights}
