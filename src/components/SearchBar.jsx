import PropTypes from "prop-types";

function SearchBar({ search, setSearch }) {
    return (
        <input
            type="text"
            placeholder="Search Task"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    );
}

SearchBar.propTypes = {
    search: PropTypes.string.isRequired,
    setSearch: PropTypes.func.isRequired,
};

export default SearchBar;