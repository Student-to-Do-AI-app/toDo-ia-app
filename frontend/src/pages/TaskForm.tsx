import { useState } from "react";
import type { TaskCreatePayload } from "../models/tasks.model";

interface TaskFormProps {
  onSubmit: (data: TaskCreatePayload, id?: number) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setID] = useState<number>();
  const [timeSpent, setTimeSpent] = useState<number>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (id || title.trim()) {
      const payload: Partial<TaskCreatePayload> = {};

      if (title.trim()) payload.title = title;
      if (description.trim()) payload.description = description;
      if (typeof timeSpent === "number" && !isNaN(timeSpent)) {
        payload.time_spent = timeSpent;
      }

      onSubmit(payload, id);

      setTitle("");
      setDescription("");
      setID(undefined);
      setTimeSpent(undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>➕ Create or update a task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Task ID to update"
        value={id ?? ""}
        onChange={(e) => setID(parseInt(e.target.value))}
      />
      <input
        type="number"
        placeholder="Time in minutes"
        value={timeSpent ?? ""}
        onChange={(e) => setTimeSpent(parseInt(e.target.value))}
        min={0}
      />
      <button type="submit">Save</button>
    </form>
  );
}
