import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        {contacts.map((contact: any) => (
          <>
            <li key={contact._id}>
              {contact.firstName} {contact.lastName}
            </li>
            <button onClick={() => navigate(`/chat/${contact._id}`)}>Chat</button>
          </>
        ))}
      </ul>
      <br />
      <button onClick={() => navigate("/dashboard")}>Back</button>
    </div>
  );
};

export default Contact;
