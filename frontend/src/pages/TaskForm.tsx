import { useState } from "react";
import { useDispatch } from "react-redux";
import { CreateTask } from "../actions/tasks.actions";
import type { AppDispatch } from "../reducers/store";

export default function TaskForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(CreateTask({ title, description }));
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>➕ Nueva tarea</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Agregar tarea</button>
    </form>
  );
}
