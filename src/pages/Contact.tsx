import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { socket } from "../utils/socket";

const Contact: React.FC = () => {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    try {
      const response = await axios.get("http://localhost:7001/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setContacts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createRoom = async (contactId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:7001/room/initiate`,
        {
          userIds: [contactId],
          type: "consumer_to_consumer",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      socket.emit("subscribe", response.data.chatRoomId, contactId);
      navigate(`/chat/${response.data.chatRoomId}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        {contacts.map((contact: any) => (
          <li key={contact._id}>
            {contact.firstName} {contact.lastName}
            <br />
            <button onClick={createRoom.bind(null, contact._id)}>Chat</button>
          </li>
        ))}
      </ul>
      <br />
      <button onClick={() => navigate("/dashboard")}>Back</button>
    </div>
  );
};

export default Contact;
