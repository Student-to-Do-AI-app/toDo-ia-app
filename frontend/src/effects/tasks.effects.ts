import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  aiPrompt,
} from "../services/tasks.services"; // ✅ importa createTask del servicio
import {
  FetchTasks,
  FetchTasksSuccess,
  FetchTasksFailure,
  CreateTask,
  CreateTaskSuccess,
  CreateTaskFailure,
  UpdateTaskSuccess,
  UpdateTaskFailure,
  UpdateTask,
  DeleteTaskFailure,
  DeleteTask,
  CreateAIPrompt,
  CreateAIPromptTaskFailure,
  CreateAIPromptSuccess,
} from "../actions/tasks.actions";
import type {
  Task,
  TaskCreatePayload,
  TaskUpdatePayload,
} from "../models/tasks.model";
import type { PayloadAction } from "@reduxjs/toolkit";

// 📦 GET tasks
function* handleFetchTasks(): Generator<unknown, void, Task[]> {
  try {
    const response: Task[] = yield call(getTasks);
    yield put(FetchTasksSuccess(response));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(FetchTasksFailure(error.message));
    } else {
      yield put(FetchTasksFailure("Ocurrió un error desconocido"));
    }
  }
}

// ➕ CREATE task
function* handleCreateTask(action: PayloadAction<TaskCreatePayload>) {
  try {
    // ✅ aquí debe ser createTask, el servicio que hace la petición POST
    const response: Task = yield call(createTask, action.payload);
    yield put(CreateTaskSuccess(response));
    yield put(FetchTasks()); // refresca lista
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(CreateTaskFailure(error.message));
    } else {
      yield put(CreateTaskFailure("Ocurrió un error desconocido"));
    }
  }
}

function* handleUpdateTask(
  action: PayloadAction<{ id: number; data: TaskUpdatePayload }>
) {
  try {
    const response: Task = yield call(
      updateTask,
      action.payload.id,
      action.payload.data
    );
    yield put(UpdateTaskSuccess(response));
    yield put(FetchTasks()); // refresca la lista
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(UpdateTaskFailure(error.message));
    } else {
      yield put(UpdateTaskFailure("Ocurrió un error desconocido"));
    }
  }
}

function* handleDeleteTask(action: PayloadAction<number>) {
  try {
    yield call(deleteTask, action.payload);
    yield put(FetchTasks()); // refresca lista
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(DeleteTaskFailure(error.message));
    } else {
      yield put(DeleteTaskFailure("Ocurrió un error desconocido"));
    }
  }
}

function* handleAIPrompt(action: PayloadAction<string>) {
  try {
    const response: {
      data: {
        insights: string;
      };
    } = yield call(aiPrompt, action.payload);
    yield put(CreateAIPromptSuccess(response.data.insights));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(CreateAIPromptTaskFailure(error.message));
    } else {
      yield put(CreateAIPromptTaskFailure("Ocurrió un error desconocido"));
    }
  }
}

// 👀 watcher
export default function* tasksSaga() {
  yield all([
    takeLatest(FetchTasks.type, handleFetchTasks),
    takeLatest(CreateTask.type, handleCreateTask),
    takeLatest(UpdateTask.type, handleUpdateTask),
    takeLatest(DeleteTask.type, handleDeleteTask),
    takeLatest(CreateAIPrompt.type, handleAIPrompt),
  ]);
}
