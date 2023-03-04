import { createContext, useState } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext({
  socket: {} as Socket,
  connect: () => {},
  disconnect: () => {},
  identity: (userId: string) => {},
  joinRoom: (roomId: string) => {},
});

const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>({} as Socket);

  const connect = () => {
    const socket = io("http://localhost:7001");

    setSocket(socket);

    socket.on("connect", () => {
      console.log("connected");
    });
  };

  const disconnect = () => {
    socket.disconnect();
  };

  const identity = (userId: string) => {
    socket.emit("identity", { userId });
  };

  const joinRoom = (roomId: string) => {
    socket.emit("subscribe", roomId);
  };

  return <SocketContext.Provider value={{ socket, connect, disconnect, identity, joinRoom }}>{children}</SocketContext.Provider>;
};

export default SocketContextProvider;
