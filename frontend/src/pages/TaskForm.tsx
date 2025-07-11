import { useState } from "react";
import type { TaskCreatePayload } from "../models/tasks.model";

interface TaskFormProps {
  onSubmit: (data: TaskCreatePayload, id?: number) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setID] = useState<number>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      // Si hay id, lo pasamos; si no, undefined
      onSubmit({ title, description }, id);
      setTitle("");
      setDescription("");
      setID(undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>➕ Crear o actualizar tarea</h2>
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
      <input
        type="number"
        placeholder="ID de tarea para actualizar (opcional)"
        value={id ?? ""}
        onChange={(e) => setID(parseInt(e.target.value))}
      />
      <button type="submit">Guardar tarea</button>
    </form>
  );
}
