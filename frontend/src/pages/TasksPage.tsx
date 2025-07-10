// src/pages/TasksPage.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchTasks } from "../actions/tasks.actions";
import "../pages/TaskPage.css"; // para estilos rápidos
import type { AppDispatch, RootState } from "../reducers/store";
import TaskForm from "./TaskForm";

export default function TasksPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    dispatch(FetchTasks());
  }, [dispatch]);

  return (
    <div className="tasks-container">
      <TaskForm />
      {loading && <p>Cargando tareas...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <h1>📋 Lista de tareas</h1>

      <div className="tasks-grid">
        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
              Estado:{" "}
              <strong style={{ color: task.completed ? "green" : "gray" }}>
                {task.completed ? "Completada" : "Pendiente"}
              </strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
