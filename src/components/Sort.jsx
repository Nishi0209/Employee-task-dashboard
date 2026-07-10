import PropTypes from "prop-types";

function Sort({
  sortBy,
  setSortBy,
}) {
  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
    >
      <option value="Newest">Newest</option>
      <option value="Oldest">Oldest</option>
      <option value="Priority">Priority</option>
      <option value="Due Date">Due Date</option>
    </select>
  );
}

Sort.propTypes = {
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
};

export default Sort;
