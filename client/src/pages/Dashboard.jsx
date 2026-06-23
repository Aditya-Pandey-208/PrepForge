import { Link, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };
  const username = localStorage.getItem("username");
  return (
    <div className="app">

      <header className="navbar">
        <h1>PrepForge</h1>

        {username ? (
          <div className="user-section">

            <span className="username">
              {username}
            </span>

            <button
              className="login-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>
        ) : (
          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>
        )}

      </header>

      <section className="card">
        <h2>Overall Progress</h2>

        <div className="pie-chart">
          0%
        </div>

        <p>Progress: 0%</p>
      </section>

      <section className="card">
        <h2>DSA</h2>

        <div className="pie-chart">
          0%
        </div>

        <p>Progress: 0%</p>

        <Link to="/dsa">
            <button className="continue-btn">
                Continue DSA
            </button>
        </Link>
      </section>

      <section className="card">
        <h2>Development</h2>

        <div className="pie-chart">
          0%
        </div>

        <p>Progress: 0%</p>

        <Link to="/development">
            <button className="continue-btn">
                Continue Development
            </button>
        </Link>
      </section>

      <section className="card">
        <h2>Core Subjects</h2>

        <div className="pie-chart">
          0%
        </div>

        <p>Progress: 0%</p>

        <Link to="/subjects">
            <button className="continue-btn">
                Continue Subjects
            </button>
        </Link>
      </section>

    </div>
  );
}

export default Dashboard;