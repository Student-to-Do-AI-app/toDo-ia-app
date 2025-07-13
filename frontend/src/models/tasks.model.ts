export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  user_id?: number;
  time_spent?: number;
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  insights: string | null;
}

export interface TaskCreatePayload {
  title?: string;
  description?: string;
  user_id?: number;
  time_spent?: number;
}

export interface TaskUpdatePayload {
  title?: string;
  description?: string;
  completed?: boolean;
}
