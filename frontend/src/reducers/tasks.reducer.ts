// src/reducers/tasks.reducer.ts
import { createReducer } from "@reduxjs/toolkit";
import {
  FetchTasks,
  FetchTasksSuccess,
  FetchTasksFailure,
  CreateTask,
  CreateTaskSuccess,
  CreateTaskFailure,
  UpdateTask,
  UpdateTaskSuccess,
  UpdateTaskFailure,
} from "../actions/tasks.actions";

import type { TasksState } from "../models/tasks.model";

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const tasksReducer = createReducer(initialState, (builder) => {
  builder

    // 🔄 FETCH TASKS
    .addCase(FetchTasks, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(FetchTasksSuccess, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    })
    .addCase(FetchTasksFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // ➕ CREATE TASK
    .addCase(CreateTask, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(CreateTaskSuccess, (state, action) => {
      state.loading = false;
      state.tasks.push(action.payload);
    })
    .addCase(CreateTaskFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // ✏️ UPDATE TASK
    .addCase(UpdateTask, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(UpdateTaskSuccess, (state, action) => {
      state.loading = false;
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    })
    .addCase(UpdateTaskFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});
