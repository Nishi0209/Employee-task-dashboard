import PropTypes from "prop-types";

function Filter({ filter, setFilter }) {
  return (
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option>All</option>
      <option>Pending</option>
      <option>Completed</option>
    </select>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default Filter;
