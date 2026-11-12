import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const getTasks = () => API.get("/tasks");

export const addTask = (title) =>
  API.post("/tasks", { title });

export const toggleTask = (id) =>
  API.patch(`/tasks/${id}`);

export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);