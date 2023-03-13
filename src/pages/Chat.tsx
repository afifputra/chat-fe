import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { socket } from "../utils/socket";

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const chatRef = useRef<HTMLInputElement>(null);
  const [oldMessages, setOldMessages] = useState<any[]>([]);

  const leaveRoom = () => {
    socket.emit("unsubscribe", roomId);
    navigate("/dashboard");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      navigate("/");
    }

    (async () => {
      try {
        const response = await axios.get(`http://localhost:7001/room/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOldMessages(response.data.conversation);
      } catch (error) {
        console.log(error);
      }
    })();

    socket.on("newMessage", (data: any) => {
      renderMessage(data);
    });
  }, [navigate]);

  const renderMessage = (data: { message: string; postedByUser: any }) => {
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `
      <div class="message__user">${data.postedByUser.firstName}</div>
      <div class="message__text">${data.message}</div>
    `;
    document.getElementById("chat")!.appendChild(div);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = chatRef.current!.value;

    if (!message) {
      return alert("Please enter your message");
    }

    try {
      const response = await axios.post(
        `http://localhost:7001/room/${roomId}/message`,
        {
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        chatRef.current!.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id="chat">
        {oldMessages.map((message, index) => (
          <div className="message" key={index}>
            <div className="message__user">{message.postedByUser.firstName}</div>
            <div className="message__text">{message.message}</div>
          </div>
        ))}
      </div>
      <form onSubmit={onSubmitHandler}>
        <input type="text" name="message" ref={chatRef} />
        <button type="submit">Send</button>
      </form>
      <button onClick={leaveRoom}>Leave Room</button>
    </>
  );
};

export default Chat;
