import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
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
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [sortBy, setSortBy] = useState("Newest");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");

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
        createdAt: Date.now(),
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

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case "Oldest":
        return a.id - b.id;

      case "Priority": {
        const priorityOrder = {
          High: 1,
          Medium: 2,
          Low: 3,
        };

        return (
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
        );
      }

      case "Due Date":
        return (
          new Date(a.dueDate || 0) -
          new Date(b.dueDate || 0)
        );

      case "Newest":
      default:
        return b.id - a.id;
    }
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
    setEditDueDate(task.dueDate || "");
    setEditPriority(task.priority || "Medium");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
    setEditDueDate("");
    setEditPriority("Medium");
  };



  const saveTask = () => {
    const isDuplicate = tasks.some(
      (task) =>
        task.id !== editingId &&
        task.text.trim().toLowerCase() ===
        editText.trim().toLowerCase()
    );

    if (isDuplicate) {
      alert("Task already exists.");
      return;
    }

    setTasks(
      tasks.map((task) =>
        task.id === editingId
          ? {
            ...task,
            text: editText.trim(),
            dueDate: editDueDate,
            priority: editPriority,
          }
          : task
      )
    );

    cancelEdit();
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
    <Dashboard
      employeeId={employeeId}
      logout={logout}
      totalTasks={totalTasks}
      completedTasks={completedTasks}
      pendingTasks={pendingTasks}
      search={search}
      setSearch={setSearch}
      filter={filter}
      setFilter={setFilter}
      task={task}
      setTask={setTask}
      addTask={addTask}
      dueDate={dueDate}
      setDueDate={setDueDate}
      priority={priority}
      setPriority={setPriority}
      error={error}
      filteredTasks={sortedTasks}
      sortBy={sortBy}
      setSortBy={setSortBy}

      editingId={editingId}
      editText={editText}
      setEditText={setEditText}

      editDueDate={editDueDate}
      setEditDueDate={setEditDueDate}

      editPriority={editPriority}
      setEditPriority={setEditPriority}

      toggleTask={toggleTask}
      editTask={editTask}
      saveTask={saveTask}
      cancelEdit={cancelEdit}
      deleteTask={deleteTask}
    />
  );
}

export default App;
