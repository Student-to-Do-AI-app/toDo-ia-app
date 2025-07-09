import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import type { RootState } from "../../reducers/store";
import type { Task } from "../../models/tasks.model";

export default function TaskList() {
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {tasks.map((task: Task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
