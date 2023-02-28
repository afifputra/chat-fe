import { createContext, useState } from "react";
import openSocket, { Socket } from "socket.io-client";

export const SocketContext = createContext({
  socket: {} as Socket,
  connect: () => {},
  disconnect: (roomId: string) => {},
  identity: (userId: string) => {},
  joinRoom: (roomId: string) => {},
});

const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>({} as Socket);

  const connect = () => {
    const socket = openSocket("http://localhost:7001");
    setSocket(socket);
  };

  const disconnect = (roomId: string) => {
    socket.emit("unsubscribe", roomId);
    socket.disconnect();
  };

  const identity = (userId: string) => {
    socket.on("connect", () => {
      console.log("connected");

      socket.emit("identity", { userId });
    });
  };

  const joinRoom = (roomId: string) => {
    socket.emit("subscribe", roomId);
  };

  return <SocketContext.Provider value={{ socket, connect, disconnect, identity, joinRoom }}>{children}</SocketContext.Provider>;
};

export default SocketContextProvider;
