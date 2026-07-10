import PropTypes from "prop-types";

function Stats({
  totalTasks,
  completedTasks,
  pendingTasks,
}) {
  const progress =
        totalTasks === 0
          ? 0
          : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="stats">
      <h4>Task Progress</h4>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="progress-text">
        {progress}% Completed
      </p>

      <p>Total Tasks : {totalTasks}</p>
      <p>Completed : {completedTasks}</p>
      <p>Pending : {pendingTasks}</p>
    </div>
  );
}

Stats.propTypes = {
  totalTasks: PropTypes.number.isRequired,
  completedTasks: PropTypes.number.isRequired,
  pendingTasks: PropTypes.number.isRequired,
};

export default Stats;
