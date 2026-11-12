
import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete, loadingId }) {
  if (tasks.length === 0) {
    return <p className="empty-message">No tasks yet. Add your first task!</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          loading={loadingId === task._id}
        />
      ))}
    </ul>
  );
}

export default TaskList;
