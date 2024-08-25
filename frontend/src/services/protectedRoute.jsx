import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import authContext from "../context/auth/authContext.jsx";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, loading } = useContext(authContext);

  useEffect(() => {
    // If loading is true, we don't want to navigate yet
    if (!loading && user.username === "none") {
      navigate("/login");
    }
  }, [user, navigate, loading]);



  
  return children;
};

export default ProtectedRoute;
