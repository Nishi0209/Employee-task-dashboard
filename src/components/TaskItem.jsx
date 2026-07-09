import PropTypes from "prop-types";
import { useTaskContext } from "../context/TaskContext";
import { getTaskStatus } from "../utils/taskStatus";

function TaskItem({ task }) {
    const {
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
        deleteId,
        confirmDelete,
        cancelDelete,
    } = useTaskContext();

    const isEditing = editingId === task.id;
    const { status, statusClass } = getTaskStatus(task.dueDate);

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

                    {status && (
                        <p className={`task-status ${statusClass}`}>
                            {status}
                        </p>
                    )}

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

                        {deleteId === task.id ? (
                            <>
                                <button onClick={deleteTask}>
                                    Yes
                                </button>

                                <button onClick={cancelDelete}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button onClick={() => confirmDelete(task.id)}>
                                Delete
                            </button>
                        )}
                    </>
                )}
            </div>
        </li>
    );
}

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
};

export default TaskItem;