import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import "./Dashboard.css";

function Dashboard() {
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([] );
  const [topicProgress, setTopicProgress] = useState({});

  useEffect(() => {
      fetch("http://localhost:8081/api/dsa/problems")
          .then(response => response.json())
          .then(data => {
              setProblems(data);
          });

  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8081/api/dsa/progress", {
          headers: {
            Authorization: `Bearer ${token}`
          }
      })
          .then(response => response.json())
          .then(data => {
            console.log(data.length);
              setSolvedProblems(data);
          });
  }, []);

  useEffect(() => {
      if (problems.length === 0) {
          return;
      }

      const progress = {};
      problems.forEach((problem) => {

        if (!progress[problem.topic]) {
            progress[problem.topic] = {
                total: 0,
                solved: 0
            };
        }
        progress[problem.topic].total++;
      });

      solvedProblems.forEach((solvedProblem) => {
        const problem = problems.find(
            (problem) => problem.id === solvedProblem.problemId
        );

        if (problem) {
            progress[problem.topic].solved++;
        }
     });

    Object.keys(progress).forEach((topic) => {

      progress[topic].percentage = Math.round(
          (progress[topic].solved * 100) /
          progress[topic].total
      );

    });

    setTopicProgress(progress);
  }, [problems, solvedProblems]);

  const percentage =
    problems.length === 0
        ? 0
        : Math.round((solvedProblems.length / problems.length) * 100);

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

        <div className="dsa-content">

            <div className="dsa-chart">

                <div className="pie-chart">
                    {percentage}%
                </div>

            </div>

            <div className="dsa-topics">

                {
                    Object.entries(topicProgress).map(([topic, progress]) => (

                        <div
                            className="topic-progress-row"
                            key={topic}
                        >

                            <span className="topic-name">
                                {topic}
                            </span>

                            <span className="topic-percentage">
                                {progress.percentage}%
                            </span>

                            <span className="topic-count">
                                {progress.solved} / {progress.total}
                            </span>

                        </div>

                    ))
                }

            </div>

        </div>

        <p>
            Progress: {solvedProblems.length} / {problems.length}
        </p>

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