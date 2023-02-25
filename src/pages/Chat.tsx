import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import openSocket, { Socket } from "socket.io-client";

const ROOM_ID = "63c0c80a47d345069686dc3e";

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const chatRef = useRef<HTMLInputElement>(null);
  const [socket, setSocket] = useState<Socket>({} as Socket);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      navigate("/");
    }

    const socket = openSocket("http://localhost:7001");

    setSocket(socket);

    socket.on("connect", () => {
      console.log("connected");

      socket.emit("identity", { userId });

      socket.emit("subscribe", ROOM_ID);

      socket.on("newMessage", (data: any) => {
        renderMessage(data);
      });
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
        `http://localhost:7001/room/${ROOM_ID}/message`,
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
      <div id="chat"></div>
      <form onSubmit={onSubmitHandler}>
        <input type="text" name="message" ref={chatRef} />
        <button type="submit">Send</button>
      </form>
      <button onClick={() => socket.disconnect()}>Disconnect</button>
    </>
  );
};

export default Chat;
