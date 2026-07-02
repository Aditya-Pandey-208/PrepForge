import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AppLayout from "../../layouts/AppLayout";
import { handleUnauthorized } from "../../utils/auth";
import API_BASE_URL from "../../config/api";
import "../../App.css";
import "./Development.css";

function Development() {

  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {

      fetch(`${API_BASE_URL}/api/development/problems`)
          .then((response) => response.json())
          .then((data) => {
              setProblems(data);
          });

  }, []);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
        return;
    }

    fetch(`${API_BASE_URL}/api/development/progress`, {
        headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(handleUnauthorized)
            .then((response) => response.json())
            .then((data) => {
                const solved = data.map(progress => progress.problemId);
                setSolvedProblems(solved);
            })
            .catch(() => {});

    }, []);

  const groupedProblems = {};
  problems.forEach((problem) => {

      if (!groupedProblems[problem.topic]) {
          groupedProblems[problem.topic] = [];
      }

      groupedProblems[problem.topic].push(problem);
  });

    const handleCheckboxChange = (problemId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        fetch(`${API_BASE_URL}/api/development/progress`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                problemId: problemId
            })
        })
        .then(handleUnauthorized)
        .then((response) => response.text())
        .then(data => {
            if (data === "Solved") {

                setSolvedProblems(previous => [
                    ...previous,
                    problemId
            ]);
            } else {
                setSolvedProblems(previous =>
                    previous.filter(id => id !== problemId)
                );
            }
        })
        .catch(() => {});
    };

    return (
    <AppLayout>
      <div className="development-container">

            <header className="development-header">
                <h1>Development Roadmap</h1>
            </header>

            {!token && (
                <p className="login-message">
                    Log in to save and track your progress.
                </p>
            )}

          {Object.entries(groupedProblems).map(
            ([topic, questions]) => (
                <section
                    key={topic}
                    className="topic-card"
                >
                    <h2>{topic}</h2>
                    {questions.map((problem) => (
                      <div
                          key={problem.id}
                          className="question-row"
                      >
                        <input
                            type="checkbox"
                            checked={solvedProblems.includes(problem.id)}
                            onChange={() => handleCheckboxChange(problem.id)}
                            disabled={!token}
                        />

                          <a
                              href={problem.link}
                              target="_blank"
                              rel="noreferrer"
                          >
                              {problem.name}
                          </a>

                          <span>
                              {problem.difficulty}
                          </span>
                      </div>
                  ))}

                </section>
            )
        )}

      </div>
    </AppLayout>
  );
}

export default Development;