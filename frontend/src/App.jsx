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

function App() {
  return (
    <AuthState>
      <Router>
      <ScrollUp/>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/problems" element={<Problems />}></Route>
          <Route path="/problems/:id" element={<ProblemDetails />}></Route>
          <Route path="/problems/:id/run" element={<Compiler />}></Route>
        </Routes>
        <Footer />
      </Router>
    </AuthState>
  );
}

export default App;
