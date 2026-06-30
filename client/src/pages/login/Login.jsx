import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AppLayout from "../../layouts/AppLayout";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [expiredMessage, setExpiredMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get("expired")) {
            setExpiredMessage("Your session has expired. Please login again.");
            navigate("/login", { replace: true });
        }
    }, [location, navigate]);

    const handleLogin = () => {
      setError("");
      setSuccess("");
      setExpiredMessage("");
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
            setExpiredMessage("");

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

          {
              expiredMessage &&
              <p className="expired-message">
                  {expiredMessage}
              </p>
          }

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