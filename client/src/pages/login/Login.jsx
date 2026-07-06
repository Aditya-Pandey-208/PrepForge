import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import API_BASE_URL from "../../config/api";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = () => {

        if (!email.trim() || !password.trim()) {
            setError("Please fill all fields.");
            return;
        }
        setError("");
        setLoading(true);

        const loginData = {
            email,
            password,
        };

        fetch(`${API_BASE_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        })
            .then(async (response) => {
                const data = await response.json();
                if (!response.ok) {
                    setLoading(false);
                    setError(data.message);
                    return;
                }

                localStorage.setItem("username", data.username);
                localStorage.setItem("token", data.token);

                navigate("/");
            })
            .catch(() => {
                setLoading(false);
                setError("Login Failed");
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
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        disabled={loading}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError("");
                        }}
                        disabled={loading}
                    />

                    <button
                        className="login-btn"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    <Link to="/register" className="register-link">
                        <span className="link-text">
                            Don't have an account?
                        </span>{" "}
                        <span className="link-action">
                            Register
                        </span>
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