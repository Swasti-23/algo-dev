import { useContext } from "react";
import authContext from "../../context/auth/authContext";
import '../stylesheets/dashboard.css';

const Dashboard = () => {
  const { user } = useContext(authContext);
  const isLoggedIn = user.username !== "none";

  return (
    <div className="container">
      <h1 className="heading">{isLoggedIn ? `Hey, ${user.username}` : "WE ARE CODECLASH"}</h1>
    </div>
  );
};

export default Dashboard;
