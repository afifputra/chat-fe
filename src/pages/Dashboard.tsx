import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  __v: number;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const joinRoom = async (otherUserId: string) => {
    try {
      const response = await axios.post(
        "http://localhost:7001/room/initiate", // initiate a new room
        {
          userIds: [otherUserId],
          type: "consumer_to_consumer",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { chatRoomId } = await response.data;

      navigate(`/chat/${chatRoomId}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:7001/users");
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <br />
      <ul>
        {users.map((user: User) => (
          <li key={user._id}>
            <span
              style={{
                marginRight: "10px",
              }}
            >
              {user.firstName} {user.lastName}
            </span>
            <button onClick={joinRoom.bind(null, user._id)}>Chat</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
