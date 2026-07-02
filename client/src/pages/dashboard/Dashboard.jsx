import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import AppLayout from "../../layouts/AppLayout";
import { handleUnauthorized } from "../../utils/auth";
import ProgressChart from "../../components/progress-chart/ProgressChart";
import ProgressCard from "../../components/progress-card/ProgressCard";
import API_BASE_URL from "../../config/api";

import "./Dashboard.css";

const dsaColors = {
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

const developmentColors = {
    "HTML": "#e34f26",
    "CSS": "#1572b6",
    "JavaScript": "#f7df1e",
    "TypeScript": "#3178c6",
    "Git": "#f05032",
    "GitHub": "#24292e",
    "React": "#61dafb",
    "Next.js": "#000000",
    "Redux": "#764abc",
    "Tailwind CSS": "#06b6d4",
    "Bootstrap": "#7952b3",
    "Node.js": "#3c873a",
    "Express.js": "#6b7280",
    "REST API": "#f97316",
    "Authentication": "#dc2626",
    "JWT": "#9333ea",
    "MongoDB": "#13aa52",
    "SQL": "#2563eb",
    "Deployment": "#0f766e",
    "Docker": "#2496ed",
    "CI/CD": "#ef4444",
    "System Design": "#8b5cf6",
    "Testing": "#ec4899"
};

const subjectColors = {
    "OOP": "#2563eb",
    "Operating Systems": "#dc2626",
    "DBMS": "#16a34a",
    "Computer Networks": "#ea580c",
    "COA": "#7c3aed",
    "TOC": "#0ea5e9",
    "Software Engineering": "#ec4899",
    "Compiler Design": "#ca8a04"
};

function Dashboard() {

    // ===========================
    // State
    // ===========================

    const [dsaProblems, setDsaProblems] = useState([]);
    const [dsaSolvedProblems, setDsaSolvedProblems] = useState([]);
    const [developmentProblems, setDevelopmentProblems] = useState([]);
    const [developmentSolvedProblems, setDevelopmentSolvedProblems] = useState([]);
    const [subjectProblems, setSubjectProblems] = useState([]);
    const [subjectSolvedProblems, setSubjectSolvedProblems] = useState([]);

    // ===========================
    // Fetch DSA Problems
    // ===========================

    useEffect(() => {

        fetch(`${API_BASE_URL}/api/dsa/problems`)
            .then((response) => response.json())
            .then((data) => {
                setDsaProblems(data);
            });

    }, []);
    
    // ===========================
    // Fetch Development Problems
    // ===========================

    useEffect(() => {

        fetch(`${API_BASE_URL}/api/development/problems`)
            .then((response) => response.json())
            .then((data) => {
                setDevelopmentProblems(data);
            });

    }, []);
    
    // ===========================
    // Fetch Subject Problems
    // ===========================

    useEffect(() => {

        fetch(`${API_BASE_URL}/api/subject/problems`)
            .then((response) => response.json())
            .then((data) => {
                setSubjectProblems(data);
            });

    }, []);




    // ===========================
    // Fetch DSA Solved Problems
    // ===========================

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        fetch(`${API_BASE_URL}/api/dsa/progress`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(handleUnauthorized)
            .then((response) => response.json())
            .then((data) => {
                setDsaSolvedProblems(data);
            })
            .catch(() => {});

    }, []);


    // ===========================
    // Fetch Development Solved Problems
    // ===========================

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        fetch(`${API_BASE_URL}/api/development/progress`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(handleUnauthorized)
            .then((response) => response.json())
            .then((data) => {
                setDevelopmentSolvedProblems(data);
            })
            .catch(() => {});

    }, []);

    // ===========================
    // Fetch Subject Solved Problems
    // ===========================

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        fetch(`${API_BASE_URL}/api/subject/progress`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(handleUnauthorized)
            .then((response) => response.json())
            .then((data) => {
                setSubjectSolvedProblems(data);
            })
            .catch(() => {});

    }, []);


    // ===========================
    // Build Topic Segments
    // ===========================

    const dsaPercentage =
        dsaProblems.length === 0 ? 0 
        : Math.round((dsaSolvedProblems.length / dsaProblems.length) * 100);
    
    const developmentPercentage =
        developmentProblems.length === 0 ? 0 
        : Math.round((developmentSolvedProblems.length / developmentProblems.length) * 100);
    
    const subjectPercentage =
        subjectProblems.length === 0 ? 0 
        : Math.round((subjectSolvedProblems.length / subjectProblems.length) * 100);

    const dsaProblemMap = {};
    const developmentProblemMap = {};
    const subjectProblemMap = {};

    dsaProblems.forEach((problem) => {
        dsaProblemMap[problem.id] = problem;
    });
    
    developmentProblems.forEach((problem) => {
        developmentProblemMap[problem.id] = problem;
    });
    
    subjectProblems.forEach((problem) => {
        subjectProblemMap[problem.id] = problem;
    });

    const dsaProgress = {};
    const developmentProgress = {};
    const subjectProgress = {};



    // Count total dsa problems in each topic

    dsaProblems.forEach((problem) => {

        if (!dsaProgress[problem.topic]) {

            dsaProgress[problem.topic] = {
                total: 0,
                solved: 0,
            };

        }

        dsaProgress[problem.topic].total++;

    });

    // Count total development problems in each topic

    developmentProblems.forEach((problem) => {

        if (!developmentProgress[problem.topic]) {

            developmentProgress[problem.topic] = {
                total: 0,
                solved: 0,
            };

        }

        developmentProgress[problem.topic].total++;

    });

    // Count total subject problems in each topic

    subjectProblems.forEach((problem) => {

        if (!subjectProgress[problem.topic]) {

            subjectProgress[problem.topic] = {
                total: 0,
                solved: 0,
            };

        }

        subjectProgress[problem.topic].total++;

    });



    // Count dsa solved problems

    dsaSolvedProblems.forEach((solvedProblem) => {

        const problem = dsaProblemMap[solvedProblem.problemId];

        if (problem) {
            dsaProgress[problem.topic].solved++;
        }

    });
    
    // Count development solved problems

    developmentSolvedProblems.forEach((solvedProblem) => {

        const problem = developmentProblemMap[solvedProblem.problemId];

        if (problem) {
            developmentProgress[problem.topic].solved++;
        }

    });

    // Count subject solved problems

    subjectSolvedProblems.forEach((solvedProblem) => {

        const problem = subjectProblemMap[solvedProblem.problemId];

        if (problem) {
            subjectProgress[problem.topic].solved++;
        }

    });

    
    
    // Calculate dsa percentage

    Object.keys(dsaProgress).forEach((topic) => {
        dsaProgress[topic].percentage = Math.round(
            (dsaProgress[topic].solved * 100) /
            dsaProgress[topic].total
        );
    });
    
    // Calculate development percentage

    Object.keys(developmentProgress).forEach((topic) => {
        developmentProgress[topic].percentage = Math.round(
            (developmentProgress[topic].solved * 100) /
            developmentProgress[topic].total
        );
    });

    // Calculate subject percentage

    Object.keys(subjectProgress).forEach((topic) => {
        subjectProgress[topic].percentage = Math.round(
            (subjectProgress[topic].solved * 100) /
            subjectProgress[topic].total
        );
    });

    // Convert dsa object into array

    const dsaSegments = Object.entries(dsaProgress).map(([topic, topicData]) => ({
        label: topic,
        completed: topicData.solved,
        total: topicData.total,
        percentage: topicData.percentage,
        color: dsaColors[topic] || "#94a3b8",
        remaining: topicData.total - topicData.solved,

    }));

    // Convert development object into array

    const developmentSegments = Object.entries(developmentProgress).map(([topic, topicData]) => ({
        label: topic,
        completed: topicData.solved,
        total: topicData.total,
        percentage: topicData.percentage,
        color: developmentColors[topic] || "#94a3b8",
        remaining: topicData.total - topicData.solved,

    }));

    // Convert subject object into array

    const subjectSegments = Object.entries(subjectProgress).map(([topic, topicData]) => ({

        label: topic,
        completed: topicData.solved,
        total: topicData.total,
        percentage: topicData.percentage,
        color: subjectColors[topic] || "#94a3b8",
        remaining: topicData.total - topicData.solved,

    }));


    // ===========================
    // Summary
    // ===========================

    const dsaData = {

        title: "DSA",

        summary: {
            completed: dsaSolvedProblems.length,
            total: dsaProblems.length,
            percentage: dsaPercentage,
            label: "Solved",
        },

        segments: dsaSegments,

    };

    const developmentData = {

        title: "Development",

        summary: {
            completed: developmentSolvedProblems.length,
            total: developmentProblems.length,
            percentage: developmentPercentage,
            label: "Solved",
        },

        segments: developmentSegments,

    };

    const subjectData = {

        title: "Subjects",

        summary: {
            completed: subjectSolvedProblems.length,
            total: subjectProblems.length,
            percentage: subjectPercentage,
            label: "Solved",
        },

        segments: subjectSegments,

    };

    const allSections = [
        dsaData,
        developmentData,
        subjectData,
    ];

    // ===========================
    // Overall
    // ===========================

    const overallCompleted = allSections.reduce(
        (sum, section) => sum + section.summary.completed,
        0
    );

    const overallTotal = allSections.reduce(
        (sum, section) => sum + section.summary.total,
        0
    );

    const overallPercentage = overallTotal === 0 ? 0
        : Math.round((overallCompleted * 100) / overallTotal
    );

    const overallData = {

        title: "Overall",

        summary: {
            completed: overallCompleted,
            total: overallTotal,
            percentage: overallPercentage,
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
                completed: developmentData.summary.completed,
                remaining:
                    developmentData.summary.total - developmentData.summary.completed,
                total: developmentData.summary.total,
                percentage: developmentData.summary.percentage,
                color: "#f97316",
            },

            {
                label: "Subjects",
                completed: subjectData.summary.completed,
                remaining:
                    subjectData.summary.total - subjectData.summary.completed,
                total: subjectData.summary.total,
                percentage: subjectData.summary.percentage,
                color: "#6366f1",
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
                    data={subjectData}
                    link="/subject"
                    buttonText="Continue Subjects"
                />

            </div>

        </AppLayout>

    );
}

export default Dashboard;