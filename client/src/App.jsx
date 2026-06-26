import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import DSA from "./pages/dsa/DSA";
import Development from "./pages/development/Development";
import Subjects from "./pages/subjects/Subjects";
import Register from "./pages/register/Register";

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