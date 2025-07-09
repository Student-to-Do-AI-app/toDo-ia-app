import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchTasks } from "../actions/tasks.actions";
import type { Task } from "../models/tasks.model";
import type { AppDispatch, RootState } from "../reducers/store";

export default function TasksPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    dispatch(FetchTasks());
  }, [dispatch]);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Lista de Tareas</h1>

      {loading && <p>Cargando tareas...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && tasks.length === 0 && <p>No hay tareas aún.</p>}

      <ul>
        {tasks.map((task: Task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.description}{" "}
            {task.completed ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
}
