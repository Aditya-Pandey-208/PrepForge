import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import DSA from "./pages/dsa/DSA";
import Development from "./pages/development/Development";
import Subject from "./pages/subject/Subject";
import Register from "./pages/register/Register";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Dashboard />} />
      <Route
          path="/login"
          element={
                  <Login />
          }
      />

      <Route
          path="/register"
          element={
                  <Register />
          }
      />

      <Route
          path="/dsa"
          element={
              <ProtectedRoute>
                  <DSA />
              </ProtectedRoute>
          }
      />

      <Route
          path="/development"
          element={
              <ProtectedRoute>
                  <Development />
              </ProtectedRoute>
          }
      />

      <Route
          path="/subject"
          element={
              <ProtectedRoute>
                  <Subject />
              </ProtectedRoute>
          }
      />
      
    </Routes>
  );
}

export default App;