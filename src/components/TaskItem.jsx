import PropTypes from "prop-types";

function TaskItem({
    task,
    editingId,
    editText,
    setEditText,
    toggleTask,
    editTask,
    saveTask,
    deleteTask,
}) {
    return (
        <li>
            {editingId === task.id ? (
                <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                />
            ) : (
                <div className="task-info">
                    <span
                        style={{
                            textDecoration: task.completed
                                ? "line-through"
                                : "none",
                        }}
                    >
                        {task.text}
                    </span>

                    <p className="task-details">
                        📅 Due: {task.dueDate || "Not Set"}
                    </p>

                    <p className="task-details">
                        {task.priority === "High" && "🔴 High"}
                        {task.priority === "Medium" && "🟡 Medium"}
                        {task.priority === "Low" && "🟢 Low"}
                    </p>
                </div>
            )}

            <div>
                <button onClick={() => toggleTask(task.id)}>
                    {task.completed ? "Undo" : "Complete"}
                </button>

                {editingId === task.id ? (
                    <button onClick={saveTask}>Save</button>
                ) : (
                    <button onClick={() => editTask(task)}>
                        Edit
                    </button>
                )}

                <button onClick={() => deleteTask(task.id)}>
                    Delete
                </button>
            </div>
        </li>
    );
}

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    editingId: PropTypes.number,
    editText: PropTypes.string.isRequired,
    setEditText: PropTypes.func.isRequired,
    toggleTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
    saveTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

export default TaskItem;