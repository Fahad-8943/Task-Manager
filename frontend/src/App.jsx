import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Swal from "sweetalert2";

import {
  getTasks,
  addTask,
  toggleTask,
  deleteTask,
} from "./services/TaskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data.data);
      } catch (err) {
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (title) => {
    setAdding(true);
    setError("");

    try {
      const response = await addTask(title);

      setTasks((prev) => [...prev, response.data.data]);
      return true;
    } catch (err) {
      setError("Failed to add task.");
      return false;
    } finally {
      setAdding(false);
    }
  };

  const handleToggle = async (id) => {
    setLoadingId(id);
    setError("");

    try {
      const response = await toggleTask(id);
      const updatedTask = response.data.data;

      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task)),
      );
    } catch (err) {
      setError("Failed to update task.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "#ffffff",
    });

    if (!result.isConfirmed) return;

    setLoadingId(id);
    setError("");

    try {
      await deleteTask(id);

      setTasks((prev) => prev.filter((task) => task._id !== id));

      await Swal.fire({
        title: "Deleted!",
        text: "Your task has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        background: "#1f2937",
        color: "#ffffff",
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the task.",
        icon: "error",
        background: "#1f2937",
        color: "#ffffff",
      });
    } finally {
      setLoadingId(null);
    }
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="app-container">
      <div className="task-card">
        <h1>My Tasks</h1>
        <p className="subtitle">Stay organized. Get things done.</p>

        <TaskForm onAddTask={handleAddTask} loading={adding} />

        {error && <p className="error-message">{error}</p>}

        <div className="task-header">
          <h2>Your Tasks</h2>
          <span>{tasks.length} tasks</span>
        </div>

        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
            loadingId={loadingId}
          />
        )}

        <p className="task-summary">
          {completedCount} completed · {tasks.length - completedCount} remaining
        </p>
      </div>
    </div>
  );
}

export default App;
