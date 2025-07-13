// src/pages/TasksPage.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateAIPrompt,
  CreateTask,
  DeleteTask,
  FetchTasks,
  UpdateTask,
} from "../actions/tasks.actions";
import type { AppDispatch, RootState } from "../reducers/store";
import type { Task, TaskCreatePayload } from "../models/tasks.model";
import TaskForm from "./TaskForm";
import "../pages/taskPage.css";
import Mask from "../components/tasks/Mask";

export default function TasksPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error, insights } = useSelector(
    (state: RootState) => state.tasks
  );
  const [insightsAI, setInsightsAI] = useState<string | null>("");
  const [aiPrompt, setAIPrompt] = useState("");

  // Al montar el componente, cargar las tareas
  useEffect(() => {
    dispatch(FetchTasks());
  }, [dispatch]);

  useEffect(() => {
    setInsightsAI(insights);
  }, [insights]);

  // Cuando envías el formulario: decide si crear o actualizar
  const handleSubmit = (data: TaskCreatePayload, id?: number) => {
    if (id) {
      dispatch(UpdateTask({ id, data }));
    } else {
      dispatch(CreateTask(data));
    }
  };

  const fetchInsights = async (aiPrompt: string) => {
    dispatch(CreateAIPrompt(aiPrompt));
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
      <Mask active={loading} />
      <TaskForm onSubmit={handleSubmit} />
      {error && <p className="error-text">Error: {error}</p>}

      <div className="tasks-list">
        <h1 className="task-list-title">📋 Tasks list</h1>
        {tasks.length === 0 && !loading && <p>No tasks.</p>}
        <div className="tasks-grid">
          {tasks.map((task) => (
            <div className="task-card" key={task.id}>
              <strong>ID: {task.id}</strong>
              <h3>{task.title}</h3>
              {task.description && <p>{task.description}</p>}
              <p>
                State:{" "}
                <strong style={{ color: task.completed ? "#00796b" : "gray" }}>
                  {task.completed ? "Complete" : "To do"}
                </strong>
              </p>
              <p>
                <strong>Time spent:</strong> {task.time_spent} hours
              </p>

              <div className="task-buttons">
                <button onClick={() => toggleComplete(task)}>
                  {task.completed ? "Mark as to do" : "Mark as complete"}
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
      </div>
      <div className="insights">
        <textarea
          rows={7}
          placeholder="Prompt"
          onChange={(e) => setAIPrompt(e.target.value)}
        ></textarea>
        <button onClick={() => fetchInsights(aiPrompt)}>
          📊 Generate Insights
        </button>
        {insightsAI && (
          <div className="insights-box">
            <h3>📊Task insights</h3>
            <p>{insightsAI}</p>
          </div>
        )}
      </div>
    </div>
  );
}
