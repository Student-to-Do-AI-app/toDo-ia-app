// src/actions/tasks.actions.ts
import { createAction } from "@reduxjs/toolkit";
import type {
  Task,
  TaskCreatePayload,
  TaskUpdatePayload,
} from "../models/tasks.model";

// 🔄 Fetch tasks
export const FetchTasks = createAction("[Tasks] fetch tasks");
export const FetchTasksSuccess = createAction<Task[]>(
  "[Tasks] fetch tasks success"
);
export const FetchTasksFailure = createAction<string>(
  "[Tasks] fetch tasks failure"
);

// ➕ Create task
export const CreateTask = createAction<TaskCreatePayload>(
  "[Tasks] create task"
);
export const CreateTaskSuccess = createAction<Task>(
  "[Tasks] create task success"
);
export const CreateTaskFailure = createAction<string>(
  "[Tasks] create task failure"
);

// ✏️ Update task
export const UpdateTask = createAction<{ id: number; data: TaskUpdatePayload }>(
  "[Tasks] update task"
);
export const UpdateTaskSuccess = createAction<Task>(
  "[Tasks] update task success"
);
export const UpdateTaskFailure = createAction<string>(
  "[Tasks] update task failure"
);
