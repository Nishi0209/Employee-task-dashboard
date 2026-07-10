import PropTypes from "prop-types";

function TaskItem({
    task,
    editingId,
    editText,
    setEditText,
    editDueDate,
    setEditDueDate,
    editPriority,
    setEditPriority,
    toggleTask,
    editTask,
    saveTask,
    cancelEdit,
    deleteTask,
}) {
    const isEditing = editingId === task.id;

    return (
        <li>
            {isEditing ? (
                <div className="edit-task">
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder="Task Name"
                    />

                    <input
                        type="date"
                        value={editDueDate}
                        onChange={(e) => setEditDueDate(e.target.value)}
                    />

                    <select
                        value={editPriority}
                        onChange={(e) => setEditPriority(e.target.value)}
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
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

            <div className="task-actions">
                {isEditing ? (
                    <>
                        <button onClick={saveTask}>
                            Save
                        </button>

                        <button onClick={cancelEdit}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => toggleTask(task.id)}>
                            {task.completed ? "Undo" : "Complete"}
                        </button>

                        <button onClick={() => editTask(task)}>
                            Edit
                        </button>

                        <button onClick={() => deleteTask(task.id)}>
                            Delete
                        </button>
                    </>
                )}
            </div>
        </li>
    );
}

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,

    editingId: PropTypes.number,

    editText: PropTypes.string.isRequired,
    setEditText: PropTypes.func.isRequired,

    editDueDate: PropTypes.string.isRequired,
    setEditDueDate: PropTypes.func.isRequired,

    editPriority: PropTypes.string.isRequired,
    setEditPriority: PropTypes.func.isRequired,

    toggleTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
    saveTask: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

export default TaskItem;