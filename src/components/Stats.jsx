import PropTypes from "prop-types";

function Stats({
    totalTasks,
    completedTasks,
    pendingTasks,
}) {
    return (
        <div className="stats">
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