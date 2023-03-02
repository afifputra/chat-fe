import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

import { AuthContext } from "../context/auth";

interface Room {
  _id: string;
  userIds: {
    firstName: string;
    lastName: string;
    _id: string;
    type: string;
  }[];
  chatMessages: {
    _id: string;
    message: string;
  };
  createdAt: string;
  updatedAt: string;
}

const Dashboard: React.FC = () => {
  const { logout, isLoggedIn, relogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      relogin();
    }
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <br />
      <button onClick={onLogoutHandler}>Logout</button>
    </div>
  );
};

export default Dashboard;
