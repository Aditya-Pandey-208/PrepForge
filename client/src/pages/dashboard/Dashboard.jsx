import { Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import "./Dashboard.css";

function Dashboard() {
  return (
    <AppLayout>
      <div className="app">
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
    </AppLayout>
  );
}

export default Dashboard;