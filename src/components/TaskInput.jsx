import PropTypes from "prop-types";

function TaskInput({
  task,
  setTask,
  addTask,
  dueDate,
  setDueDate,
  priority,
  setPriority,
  error,
}) {
  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      {error && <p className="error">{error}</p>}

      <button onClick={addTask}>
                Add Task
      </button>
    </div>
  );
}

TaskInput.propTypes = {
  task: PropTypes.string.isRequired,
  setTask: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  dueDate: PropTypes.string.isRequired,
  setDueDate: PropTypes.func.isRequired,
  priority: PropTypes.string.isRequired,
  setPriority: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default TaskInput;
