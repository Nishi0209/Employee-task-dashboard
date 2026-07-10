import Login from "./components/Login";
import Stats from "./components/Stats";
import { useEffect, useState } from "react";
import { useState } from "react";
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

  const handleLogin = () => {
    if (!employeeId || !password) {
      alert("Please enter Employee ID and Password");
      return;
    }
    setIsLoggedIn(true);
  };

  const addTask = () => {
    if (!task.trim()) {
      return;
    }

    const isDuplicate = tasks.some(
      (t) =>
        t.text.trim().toLowerCase() === task.trim().toLowerCase()
    );

    if (isDuplicate) {
      setError("Task already exists.");
      return;
    }

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task.trim(),
        completed: false,
        dueDate,
        priority,
      },
    ]);

    setTask("");
    setDueDate("");
    setPriority("Medium");
    setError("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      ),
    );
  };

  const matchesSearch = (task, query) =>
    task.text.toLowerCase().includes(query.toLowerCase());

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
      <Login
        employeeId={employeeId}
        setEmployeeId={setEmployeeId}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    );
  }

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
                <div className="task-info">
                  <span
                    style={{
                      textDecoration: t.completed ? "line-through" : "none",
                    }}
                  >
                    {t.text}
                  </span>

                  <p className="task-details">
                    📅 Due: {t.dueDate || "Not Set"}
                  </p>

                  <p className="task-details">
                    {t.priority === "High" && "🔴 High"}
                    {t.priority === "Medium" && "🟡 Medium"}
                    {t.priority === "Low" && "🟢 Low"}
                  </p>
                </div>
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
