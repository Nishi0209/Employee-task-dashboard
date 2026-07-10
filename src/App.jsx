import Login from "./components/Login";
import Stats from "./components/Stats";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
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

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <Filter
          filter={filter}
          setFilter={setFilter}
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
          editingId={editingId}
          editText={editText}
          setEditText={setEditText}
          toggleTask={toggleTask}
          editTask={editTask}
          saveTask={saveTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
