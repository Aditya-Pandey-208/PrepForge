import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import API_BASE_URL from "../../config/api";
import "./Register.css";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = () => {

        if (password !== confirmPassword) {
            setError("Please enter the same password in both fields.");
            return;
        }

        setLoading(true);

        setError("");
        setSuccessMessage("");
        const userData = {
            username,
            email,
            password
        };

        fetch(`${API_BASE_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then((response) => response.text())
        .then((data) => {

            if (data === "Email already registered" || data === "Username already taken") {
                setError(data);
                setLoading(false);
            } else {
                setSuccessMessage(data);
                setError("");
                setUsername("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");

                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
        })
        .catch(() => {
            setError("Registration failed.");
            setLoading(false);
        });
    };

    return (
    <AppLayout>
        <div className="register-container">

        <div className="register-card">

            <h1>Create Account</h1>

            <label>Username</label>
            <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value)
                    setError("");
                }}
                disabled={loading}
            />

            <label>Email</label>
            <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange = {(e) => {
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

            <label>Confirm Password</label>
            <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                }}
                disabled={loading}
            />

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {successMessage && (
                <p className="success-message">
                    {successMessage}
                </p>
            )}

            <button 
                className="register-btn"
                onClick={handleRegister}
                disabled={loading}
            >
                {loading ? "Registering..." : "Register"}
            </button>

            <Link to="/login" className="login-link">
                Already have an account? Login
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

export default Register;