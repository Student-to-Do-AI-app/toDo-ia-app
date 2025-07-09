// src/sagas/tasks.saga.ts
import { call, put, takeLatest, all } from "redux-saga/effects";
import { getTasks } from "../services/tasks.services";
import {
  FetchTasks,
  FetchTasksSuccess,
  FetchTasksFailure,
} from "../actions/tasks.actions";
import type { Task } from "../models/tasks.model";

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

export default function* rootSaga() {
  yield all([takeLatest(FetchTasks.type, handleFetchTasks)]);
}
