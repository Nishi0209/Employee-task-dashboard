import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [employeeId, setEmployeeId] = useState(
  localStorage.getItem("employeeId") || ""
);

const [password, setPassword] = useState("");

const [isLoggedIn, setIsLoggedIn] = useState(
  JSON.parse(localStorage.getItem("isLoggedIn")) || false
);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  useEffect(() => {
  localStorage.setItem("employeeId", employeeId);
  localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
}, [employeeId, isLoggedIn]);


  const handleLogin = () => {
    if (!employeeId || !password) {
      alert("Please enter Employee ID and Password");
      return;
    }
    setIsLoggedIn(true);
  };

  const addTask = () => {
    if (!task.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
      },
    ]);

    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };


  const filteredTasks = tasks.filter((task) => {
  const matchesSearch = task.text
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesFilter =
    filter === "All" ||
    (filter === "Completed" && task.completed) ||
    (filter === "Pending" && !task.completed);

  return matchesSearch && matchesFilter;
});

const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !== id));
};

const editTask = (task) => {
  setEditingId(task.id);
  setEditText(task.text);
};

const saveTask = () => {
  setTasks(
    tasks.map((task) =>
      task.id === editingId
        ? { ...task, text: editText }
        : task
    )
  );

  setEditingId(null);
  setEditText("");
};


const logout = () => {
  localStorage.removeItem("employeeId");
  localStorage.removeItem("isLoggedIn");

  setEmployeeId("");
  setPassword("");
  setIsLoggedIn(false);
};

const totalTasks = tasks.length;

const completedTasks = tasks.filter(
  (task) => task.completed
).length;

const pendingTasks = totalTasks - completedTasks;


  if (!isLoggedIn) {
    return (
      <div className="container">
        <div className="login-box">
          <h1>Employee Login</h1>

          <input
            type="text"
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="dashboard">
        <h1>Employee Task Dashboard</h1>

        <h3>Welcome, {employeeId}</h3>

        <div className="stats">
  <p>Total Tasks : {totalTasks}</p>
  <p>Completed : {completedTasks}</p>
  <p>Pending : {pendingTasks}</p>
</div>

        <button onClick={logout}>Logout</button>

        <input
           type="text"
            placeholder="Search Task"
           value={search}
            onChange={(e) => setSearch(e.target.value)}
/>

<select
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
>
  <option>All</option>
  <option>Pending</option>
  <option>Completed</option>
</select>

        <div className="task-input">
          <input
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button onClick={addTask}>Add Task</button>
        </div>

        <ul>
          {filteredTasks.map((t) => (
            <li key={t.id}>
             {editingId === t.id ? (
  <input
    value={editText}
    onChange={(e) => setEditText(e.target.value)}
  />
) : (
  <span
    style={{
      textDecoration: t.completed
        ? "line-through"
        : "none",
    }}
  >
    {t.text}
  </span>
)}

              <div>
  <button onClick={() => toggleTask(t.id)}>
    {t.completed ? "Undo" : "Complete"}
  </button>

  {editingId === t.id ? (
    <button onClick={saveTask}>Save</button>
  ) : (
    <button onClick={() => editTask(t)}>
      Edit
    </button>
  )}

  <button onClick={() => deleteTask(t.id)}>
    Delete
  </button>
</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;