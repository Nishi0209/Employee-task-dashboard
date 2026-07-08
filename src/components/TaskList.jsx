import PropTypes from "prop-types";
import TaskItem from "./TaskItem";

function TaskList({
    filteredTasks,
    editingId,
    editText,
    setEditText,
    toggleTask,
    editTask,
    saveTask,
    deleteTask,
    cancelEdit,
    editDueDate,
    setEditDueDate,
    editPriority,
    setEditPriority,
    deleteId,
    confirmDelete,
    cancelDelete,
}) {
    return (
        <ul>
            {filteredTasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    editingId={editingId}
                    editText={editText}
                    setEditText={setEditText}
                    editDueDate={editDueDate}
                    setEditDueDate={setEditDueDate}
                    editPriority={editPriority}
                    setEditPriority={setEditPriority}
                    toggleTask={toggleTask}
                    editTask={editTask}
                    saveTask={saveTask}
                    deleteTask={deleteTask}
                    deleteId={deleteId}
                    confirmDelete={confirmDelete}
                    cancelDelete={cancelDelete}
                    cancelEdit={cancelEdit}
                />
            ))}
        </ul>
    );
}

TaskList.propTypes = {
    filteredTasks: PropTypes.array.isRequired,
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
    deleteId: PropTypes.number,
    confirmDelete: PropTypes.func.isRequired,
    cancelDelete: PropTypes.func.isRequired,
};

export default TaskList;