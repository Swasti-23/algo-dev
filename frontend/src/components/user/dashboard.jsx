import { useContext } from "react";
import authContext from "../../context/auth/authContext"


const Dashboard = () => {
  const { user } = useContext(authContext);
  return (

    <>
    <h1>Hey, {user.username}</h1>
    </>
  );
};

export default Dashboard;
