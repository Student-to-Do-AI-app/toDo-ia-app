import { call, put, takeLatest, all } from "redux-saga/effects";
import { getTasks, createTask } from "../services/tasks.services"; // ✅ importa createTask del servicio
import {
  FetchTasks,
  FetchTasksSuccess,
  FetchTasksFailure,
  CreateTask,
  CreateTaskSuccess,
  CreateTaskFailure,
} from "../actions/tasks.actions";
import type { Task, TaskCreatePayload } from "../models/tasks.model";
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

// 👀 watcher
export default function* tasksSaga() {
  yield all([
    takeLatest(FetchTasks.type, handleFetchTasks),
    takeLatest(CreateTask.type, handleCreateTask),
  ]);
}
