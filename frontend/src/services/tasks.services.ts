import axios from "axios";
import type {
  Task,
  TaskCreatePayload,
  TaskUpdatePayload,
} from "../models/tasks.model";

const API_URL = "http://localhost:8000"; // cambia si usas otro puerto/backend

export const getTasks = async (userId?: number): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/tasks`, {
    params: userId ? { user_id: userId } : {},
  });
  return response.data;
};

export const createTask = async (data: TaskCreatePayload): Promise<Task> => {
  const response = await axios.post(`${API_URL}/tasks`, data);
  return response.data;
};

export const updateTask = async (
  id: number,
  data: TaskUpdatePayload
): Promise<Task> => {
  const response = await axios.patch(`${API_URL}/tasks/${id}`, data);
  return response.data;
};
