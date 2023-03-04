import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { AuthContext } from "../context/auth";
// import useSocket from "../hooks/use-socket";

interface Room {
  id: string;
  userIds: {
    firstName: string;
    lastName: string;
    _id: string;
    type: string;
  }[];
  lastMessage: {
    _id: string;
    message: string;
    type: string;
    postedByUser: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  // const socket = useSocket();
  const { logout, isLoggedIn, relogin } = useContext(AuthContext);

  const onLogoutHandler = () => {
    logout();
    navigate("/");
  };

  const getRecentChats = async () => {
    try {
      const response = await axios.get("http://localhost:7001/room", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(response.data);
      // setRooms(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      relogin();
    }

    (async () => {
      await getRecentChats();
      // setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <br />
      <h2>Recent Chats</h2>
      <div>
        {rooms.map((room) => (
          <div key={room.id}>
            <h3>{room.userIds[0].firstName}</h3>
            <p>{room.lastMessage.message}</p>
            <button onClick={() => navigate(`/chat/${room.id}`)}>Open Chat</button>
          </div>
        ))}
      </div>
      <br />
      <button onClick={onLogoutHandler}>Logout</button>
    </div>
  );
};

export default Dashboard;
