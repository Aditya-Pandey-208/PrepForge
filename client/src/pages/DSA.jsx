import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/DSA.css";

function DSA() {

  const dsaData = {
    Arrays: [
      {
        title: "Two Sum",
        link: "https://dummy-link.com",
      },
      {
        title: "Best Time to Buy and Sell Stock",
        link: "https://dummy-link.com",
      },
      {
        title: "Contains Duplicate",
        link: "https://dummy-link.com",
      },
      {
        title: "Product of Array Except Self",
        link: "https://dummy-link.com",
      },
    ],

    Strings: [
      {
        title: "Valid Anagram",
        link: "https://dummy-link.com",
      },
      {
        title: "Longest Common Prefix",
        link: "https://dummy-link.com",
      },
      {
        title: "Valid Palindrome",
        link: "https://dummy-link.com",
      },
      {
        title: "Group Anagrams",
        link: "https://dummy-link.com",
      },
    ],

    "Linked List": [
      {
        title: "Reverse Linked List",
        link: "https://dummy-link.com",
      },
      {
        title: "Middle of Linked List",
        link: "https://dummy-link.com",
      },
      {
        title: "Linked List Cycle",
        link: "https://dummy-link.com",
      },
      {
        title: "Merge Two Sorted Lists",
        link: "https://dummy-link.com",
      },
    ],

    Trees: [
      {
        title: "Inorder Traversal",
        link: "https://dummy-link.com",
      },
      {
        title: "Maximum Depth of Binary Tree",
        link: "https://dummy-link.com",
      },
      {
        title: "Same Tree",
        link: "https://dummy-link.com",
      },
      {
        title: "Diameter of Binary Tree",
        link: "https://dummy-link.com",
      },
    ],

    Graphs: [
      {
        title: "Number of Islands",
        link: "https://dummy-link.com",
      },
      {
        title: "Clone Graph",
        link: "https://dummy-link.com",
      },
      {
        title: "Course Schedule",
        link: "https://dummy-link.com",
      },
      {
        title: "Pacific Atlantic Water Flow",
        link: "https://dummy-link.com",
      },
    ],

    DP: [
      {
        title: "Climbing Stairs",
        link: "https://dummy-link.com",
      },
      {
        title: "House Robber",
        link: "https://dummy-link.com",
      },
      {
        title: "Coin Change",
        link: "https://dummy-link.com",
      },
      {
        title: "Longest Increasing Subsequence",
        link: "https://dummy-link.com",
      },
    ],
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

      {Object.entries(dsaData).map(([category, questions]) => (
        <section
          key={category}
          className="topic-card"
        >
          <h2>{category}</h2>

          {questions.map((question) => (
            <div
              key={question.title}
              className="question-row"
            >
              <input type="checkbox" />

              <a
                href={question.link}
                target="_blank"
                rel="noreferrer"
              >
                {question.title}
              </a>
            </div>
          ))}
        </section>
      ))}

    </div>
  );
}

export default DSA;