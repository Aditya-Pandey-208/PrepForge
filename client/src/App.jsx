import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import DSA from "./pages/DSA";
import Development from "./pages/Development";
import Subjects from "./pages/Subjects";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dsa" element={<DSA />} />
      <Route path="/development" element={<Development />} />
      <Route path="/subjects" element={<Subjects />} />
    </Routes>
  );
}

export default App;