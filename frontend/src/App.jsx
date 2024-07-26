import Navbar from "./components/user/Navbar"
import Footer from "./components/user/Footer"
import { Fragment } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/common/login";
import Register from "./components/common/register";


function App() {

  return (
      <Router>
        <Navbar/>
          <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
          </Routes>
        <Footer/>
      </Router>
  )
}

export default App
