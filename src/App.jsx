import { useState } from "react";
import "./App.css";

function App() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

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
          {tasks.map((t) => (
            <li key={t.id}>
              <span
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                }}
              >
                {t.text}
              </span>

              <button onClick={() => toggleTask(t.id)}>
                {t.completed ? "Undo" : "Complete"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;