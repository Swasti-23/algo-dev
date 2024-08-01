import Navbar from "./components/user/Navbar";
import Footer from "./components/user/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/common/login";
import Register from "./components/common/register";
import Dashboard from "./components/user/dashboard";
import Problems from "./components/user/problems";
import ProblemDetail from "./components/user/problemDetails";
import AuthState from "./context/auth/authState";

function App() {
  return (
    <AuthState>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/problems" element={<Problems />}></Route>
          <Route path="/problems/:id" element={<ProblemDetail />}></Route>
        </Routes>
        <Footer />
      </Router>
    </AuthState>
  );
}

export default App;
