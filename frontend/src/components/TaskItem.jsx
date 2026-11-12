
function TaskItem({ task, onToggle, onDelete, loading }) {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id)}
          disabled={loading}
        />

        <span>{task.title}</span>
      </label>

      <button
        type="button"
        className="delete-btn"
        onClick={() => onDelete(task._id)}
        disabled={loading}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
