import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import AppLayout from "../../layouts/AppLayout";
import ProgressChart from "../../components/progress-chart/ProgressChart";
import ProgressCard from "../../components/progress-card/ProgressCard";

import "./Dashboard.css";

const topicColors = {
    "Arrays": "#22c55e",
    "Binary Search": "#3b82f6",
    "Strings": "#f59e0b",
    "Graph": "#ef4444",
    "Dp": "#8b5cf6",
    "Greedy": "#06b6d4",
    "Heaps": "#f97316",
    "Stack & Queue": "#14b8a6",
    "Bst": "#6366f1",
    "Linked List": "#ec4899",
    "Binary Trees": "#84cc16",
    "Trie": "#a855f7",
    "Recursion & Backtracking": "#eab308",
    "Bit Manipulation": "#0ea5e9",
};

function Dashboard() {

    // ===========================
    // State
    // ===========================

    const [problems, setProblems] = useState([]);
    const [solvedProblems, setSolvedProblems] = useState([]);

    // ===========================
    // Fetch DSA Problems
    // ===========================

    useEffect(() => {

        fetch("http://localhost:8081/api/dsa/problems")
            .then((response) => response.json())
            .then((data) => {
                setProblems(data);
            });

    }, []);

    // ===========================
    // Fetch Solved Problems
    // ===========================

    useEffect(() => {

        const token = localStorage.getItem("token");

        fetch("http://localhost:8081/api/dsa/progress", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setSolvedProblems(data);
            });

    }, []);

    // ===========================
    // Build Topic Segments
    // ===========================

    const percentage =
        problems.length === 0 ? 0 : Math.round((solvedProblems.length / problems.length) * 100);

    const problemMap = {};

    problems.forEach((problem) => {
        problemMap[problem.id] = problem;
    });

    const dsaProgress = {};

    // Count total problems in each topic

    problems.forEach((problem) => {

        if (!dsaProgress[problem.topic]) {

            dsaProgress[problem.topic] = {
                total: 0,
                solved: 0,
            };

        }

        dsaProgress[problem.topic].total++;

    });

    // Count solved problems

    solvedProblems.forEach((solvedProblem) => {

        const problem = problemMap[solvedProblem.problemId];

        if (problem) {
            dsaProgress[problem.topic].solved++;
        }

    });

    // Calculate percentage

    Object.keys(dsaProgress).forEach((topic) => {

        dsaProgress[topic].percentage = Math.round(
            (dsaProgress[topic].solved * 100) /
            dsaProgress[topic].total
        );

    });

    // Convert object into array

    const segments = Object.entries(dsaProgress).map(([topic, topicData]) => ({

        label: topic,
        completed: topicData.solved,
        total: topicData.total,
        percentage: topicData.percentage,
        color: topicColors[topic] || "#94a3b8",
        remaining: topicData.total - topicData.solved,

    }));

    // ===========================
    // Summary
    // ===========================

    const dsaData = {

        title: "DSA",

        summary: {
            completed: solvedProblems.length,
            total: problems.length,
            percentage,
            label: "Solved",
        },

        segments,

    };

    const developmentData = {

        title: "Development",

        summary: {
            completed: solvedProblems.length,
            total: problems.length,
            percentage,
            label: "Solved",
        },

        segments,

    };

    const subjectsData = {

        title: "Subjects",

        summary: {
            completed: solvedProblems.length,
            total: problems.length,
            percentage,
            label: "Solved",
        },

        segments,

    };

    const overallData = {

        title: "Overall",

        summary: {
            completed: dsaData.summary.completed,
            total: dsaData.summary.total,
            percentage: dsaData.summary.percentage,
        },

        segments: [
            {
                label: "DSA",
                completed: dsaData.summary.completed,
                remaining:
                    dsaData.summary.total - dsaData.summary.completed,
                total: dsaData.summary.total,
                percentage: dsaData.summary.percentage,
                color: "#22c55e",
            },

            {
                label: "Development",
                completed: dsaData.summary.completed,
                remaining:
                    dsaData.summary.total - dsaData.summary.completed,
                total: dsaData.summary.total,
                percentage: dsaData.summary.percentage,
                color: "#22c55e",
            },

            {
                label: "Subjects",
                completed: dsaData.summary.completed,
                remaining:
                    dsaData.summary.total - dsaData.summary.completed,
                total: dsaData.summary.total,
                percentage: dsaData.summary.percentage,
                color: "#22c55e",
            },
        ],
    };

    // ===========================
    // JSX
    // ===========================

    return (

        <AppLayout>

            <div className="app">

                {/* Overall Progress */}

                <ProgressCard
                    data={overallData}
                />

                {/* DSA */}

                <ProgressCard
                    data={dsaData}
                    link="/dsa"
                    buttonText="Continue DSA"
                />

                {/* Development */}

                <ProgressCard
                    data={developmentData}
                    link="/development"
                    buttonText="Continue Development"
                />

                {/* Subjects */}

                <ProgressCard
                    data={subjectsData}
                    link="/subjects"
                    buttonText="Continue Subjects"
                />

            </div>

        </AppLayout>

    );
}

export default Dashboard;