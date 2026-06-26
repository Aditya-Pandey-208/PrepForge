import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
      setError("");
      setSuccess("");
      fetch("http://localhost:8081/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => response.json())

        .then((data) => {
          if (data.token) {
            setError("");
            setSuccess("");

            localStorage.setItem("username", data.username);
            localStorage.setItem("token", data.token);

            navigate("/");

        } else {
            setError("Invalid Credentials");
            setSuccess("");
        }
        })
        .catch(() => {
          setError("Login Failed");
          setSuccess("");
        });
    };
    return (
    <AppLayout>
      <div className="login-container">

        <div className="login-card">

          <h1>PrepForge Login</h1>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="login-btn"
            onClick={handleLogin}
          >
            Login
          </button>

          {success && (
            <p className="success-message">
              {success}
            </p>
          )}

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <Link to="/register" className="register-link">
            New User? Register
          </Link>

          <Link to="/">
            <button className="back-btn">
              Back to Dashboard
            </button>
          </Link>

        </div>

      </div>
    </AppLayout>
    );
}

export default Login;