import PropTypes from "prop-types";
import Stats from "./Stats";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import Sort from "./Sort";

function Dashboard({
  employeeId,
  logout,
  totalTasks,
  completedTasks,
  pendingTasks,
  search,
  setSearch,
  filter,
  setFilter,
  task,
  setTask,
  addTask,
  dueDate,
  setDueDate,
  priority,
  setPriority,
  error,
  filteredTasks,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="container">
      <div className="dashboard">
        <h1>Employee Task Dashboard</h1>

        <h3>Welcome, {employeeId}</h3>

        <Stats
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          pendingTasks={pendingTasks}
        />

        <button onClick={logout}>
                    Logout
        </button>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <Filter
          filter={filter}
          setFilter={setFilter}
        />
        <Sort
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <TaskInput
          task={task}
          setTask={setTask}
          addTask={addTask}
          dueDate={dueDate}
          setDueDate={setDueDate}
          priority={priority}
          setPriority={setPriority}
          error={error}
        />

        <TaskList
          filteredTasks={filteredTasks}
        />
      </div>
    </div>
  );
}
Dashboard.propTypes = {
  employeeId: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,

  totalTasks: PropTypes.number.isRequired,
  completedTasks: PropTypes.number.isRequired,
  pendingTasks: PropTypes.number.isRequired,

  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,

  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,

  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,

  task: PropTypes.string.isRequired,
  setTask: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,

  dueDate: PropTypes.string.isRequired,
  setDueDate: PropTypes.func.isRequired,

  priority: PropTypes.string.isRequired,
  setPriority: PropTypes.func.isRequired,

  error: PropTypes.string,

  filteredTasks: PropTypes.array.isRequired,
};

export default Dashboard;
