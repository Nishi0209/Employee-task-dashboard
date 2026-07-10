import PropTypes from "prop-types";
import TaskItem from "./TaskItem";

function TaskList({
  filteredTasks,
}) {
  return (
    <ul>
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
        />
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  filteredTasks: PropTypes.array.isRequired,
};

export default TaskList;
