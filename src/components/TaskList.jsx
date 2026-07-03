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
                    toggleTask={toggleTask}
                    editTask={editTask}
                    saveTask={saveTask}
                    deleteTask={deleteTask}
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
    toggleTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
    saveTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

export default TaskList;