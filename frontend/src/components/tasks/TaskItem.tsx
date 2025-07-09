import type { Task } from "../../models/tasks.model";

export default function TaskItem({ task }: { task: Task }) {
  return (
    <li>
      <strong>{task.title}</strong> — {task.completed ? "✅" : "❌"}
    </li>
  );
}
