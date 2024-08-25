import Navbar from "./components/user/Navbar";
import Footer from "./components/user/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/common/login";
import Register from "./components/common/register";
import Dashboard from "./components/user/dashboard";
import Problems from "./components/user/problems";
import ProblemDetails from "./components/user/problemDetails";
import AuthState from "./context/auth/authState";
import Compiler from "./components/user/compiler";
import ScrollUp from "./services/scrollUp";
import ProtectedRoute from "./services/protectedRoute.jsx";

function App() {
  return (
    <AuthState>
      <Router>
        <ScrollUp />
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Dashboard />}></Route>
          <Route
            path="/problems"
            element={
              <ProtectedRoute>
                <Problems />
              </ProtectedRoute>
            }
          />
          <Route
            path="/problems/:id"
            element={
              <ProtectedRoute>
                <ProblemDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/problems/:id/run"
            element={
              <ProtectedRoute>
                <Compiler />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </AuthState>
  );
}

export default App;
