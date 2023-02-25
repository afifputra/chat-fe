import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
            <span>
              {user.firstName} {user.lastName}
            </span>
            <Link to={`/chat/${user._id}`}>Chat</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
