
import { useState } from "react";

function TaskForm({ onAddTask, loading }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    const success = await onAddTask(trimmedTitle);

    if (success) {
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Enter a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading || !title.trim()}
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;
