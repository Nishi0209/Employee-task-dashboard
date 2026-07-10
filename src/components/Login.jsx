import PropTypes from "prop-types";

function Login({
  employeeId,
  setEmployeeId,
  password,
  setPassword,
  handleLogin,
}) {
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

Login.propTypes = {
  employeeId: PropTypes.string.isRequired,
  setEmployeeId: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
