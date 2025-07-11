# tests/test_crud.py
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_ping():
    response = client.get("/ping")
    assert response.status_code == 200
    assert response.json() == {"message": "pong"}


def test_create_and_get_task():
    # Crear tarea
    create_resp = client.post(
        "/tasks", json={"title": "Test tarea", "description": "Descripción test"}
    )
    assert create_resp.status_code == 200
    task_data = create_resp.json()
    assert task_data["title"] == "Test tarea"
    assert task_data["description"] == "Descripción test"
    assert isinstance(task_data["id"], int)
    task_id = task_data["id"]

    # Listar tareas y verificar que esté incluida
    list_resp = client.get("/tasks")
    assert list_resp.status_code == 200
    tasks = list_resp.json()
    assert any(t["id"] == task_id for t in tasks)

    # Actualizar tarea: marcar como completada
    update_resp = client.patch(f"/tasks/{task_id}", json={"completed": True})
    assert update_resp.status_code == 200
    updated_task = update_resp.json()
    assert updated_task["completed"] is True

    # Eliminar tarea
    delete_resp = client.delete(f"/tasks/{task_id}")
    assert delete_resp.status_code == 200
    delete_data = delete_resp.json()
    assert delete_data["detail"] == "Tarea eliminada correctamente"
