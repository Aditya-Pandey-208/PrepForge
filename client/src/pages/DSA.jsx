import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/DSA.css";

function DSA() {

  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {

      fetch("http://localhost:8081/api/dsa/problems")
          .then((response) => response.json())
          .then((data) => {
              setProblems(data);
          });

  }, []);

  useEffect(() => {

    fetch("http://localhost:8081/api/dsa/progress", {
        headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                const solved = data.map(progress => progress.problemId);
                console.log(solved);
                setSolvedProblems(solved);
            });

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
        fetch("http://localhost:8081/api/dsa/progress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                problemId: problemId
            })
        })
        .then(response => response.text())
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
        });
    };

    return (
      <div className="dsa-container">

          <header className="dsa-header">
              <h1>DSA Roadmap</h1>

              <Link to="/">
                  <button className="back-btn">
                      Back to Dashboard
                  </button>
              </Link>
          </header>

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
  );
}

export default DSA;