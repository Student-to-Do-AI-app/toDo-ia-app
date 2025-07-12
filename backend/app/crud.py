from sqlmodel import Session, select
from typing import Optional, List
from app.models import Task
from app.schemas import TaskCreate, TaskUpdate


def create_task(db: Session, task_data: TaskCreate) -> Task:
    task = Task(
        title=task_data.title,
        description=task_data.description,
        user_id=task_data.user_id,
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def get_tasks(db: Session, user_id: Optional[int] = None) -> List[Task]:
    query = select(Task)
    if user_id is not None:
        query = query.where(Task.user_id == user_id)
    return db.exec(query).all()


def update_task(db: Session, task_id: int, task_data: TaskUpdate) -> Optional[Task]:
    task = db.get(Task, task_id)
    if not task:
        return None

    if task_data.title is not None:
        task.title = task_data.title
    if task_data.description is not None:
        task.description = task_data.description
    if task_data.completed is not None:
        task.completed = task_data.completed
    if task_data.time_spent is not None:
        task.time_spent = task_data.time_spent

    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def delete_task(db: Session, task_id: int) -> bool:
    task = db.get(Task, task_id)
    if not task:
        return False
    db.delete(task)
    db.commit()
    return True
