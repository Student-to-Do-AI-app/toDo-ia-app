// src/pages/TasksPage.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateTask,
  DeleteTask,
  FetchTasks,
  UpdateTask,
} from "../actions/tasks.actions";
import type { AppDispatch, RootState } from "../reducers/store";
import type { Task, TaskCreatePayload } from "../models/tasks.model";
import TaskForm from "./TaskForm";
import "../pages/taskPage.css";

export default function TasksPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );
  const [insights, setInsights] = useState("");

  // Al montar el componente, cargar las tareas
  useEffect(() => {
    dispatch(FetchTasks());
  }, [dispatch]);

  // Cuando envías el formulario: decide si crear o actualizar
  const handleSubmit = (data: TaskCreatePayload, id?: number) => {
    if (id) {
      dispatch(UpdateTask({ id, data }));
    } else {
      dispatch(CreateTask(data));
    }
  };

  const fetchInsights = async () => {
    const res = await fetch("http://localhost:8000/tasks/insights");
    const data = await res.json();
    setInsights(data.insights || "No se pudo generar insights");
  };

  // Cambiar el estado de completado
  const toggleComplete = (task: Task) => {
    dispatch(UpdateTask({ id: task.id, data: { completed: !task.completed } }));
  };

  // Eliminar tarea
  const removeTask = (id: number) => {
    dispatch(DeleteTask(id));
  };

  return (
    <div className="tasks-container">
      <TaskForm onSubmit={handleSubmit} />

      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <h1>📋 Tasks list</h1>
      {tasks.length === 0 && !loading && <p>No tasks.</p>}

      <div className="tasks-grid">
        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <strong>ID: {task.id}</strong>

            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <p>
              State:{" "}
              <strong style={{ color: task.completed ? "green" : "gray" }}>
                {task.completed ? "Complete" : "To do"}
              </strong>
              <strong>Time spent: {task.time_spent}</strong>
            </p>

            <div className="task-buttons">
              <button onClick={() => toggleComplete(task)}>
                {task.completed ? "Mark as incomplete" : "Mark as complete"}
              </button>

              <button
                className="delete-btn"
                onClick={() => removeTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={fetchInsights}>Generar insights IA</button>
      {insights && (
        <div className="insights-box">
          <h3>📊 Insights de tus tareas</h3>
          <p>{insights}</p>
        </div>
      )}
    </div>
  );
}
