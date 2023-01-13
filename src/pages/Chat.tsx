import { useEffect } from "react";
import { useNavigate } from "react-router";

const Chat: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <h1>Chat</h1>
    </>
  );
};

export default Chat;
