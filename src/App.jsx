import { useState } from "react";
import "./App.css";

function App() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (employeeId && password) {
      alert("Login Successful");
    } else {
      alert("Please enter Employee ID and Password");
    }
  };

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

export default App;