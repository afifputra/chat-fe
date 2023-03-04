import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket>({} as Socket);

  useEffect(() => {
    const socket = io("http://localhost:7001");

    setSocket(socket);

    socket.on("connect", () => {
      console.log("connected");
    });
  }, []);

  return socket;
};

export default useSocket;
