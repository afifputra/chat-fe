import { createContext } from "react";
import openSocket, { Socket } from "socket.io-client";

export const SocketContext = createContext({
  socket: {} as Socket,
  connect: () => {},
  disconnect: () => {},
  identity: () => {},
  on: (event: string, callback: (data: any) => void) => {},
  emit: (event: string, data: any) => {},
});

const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socket = openSocket("http://localhost:7001");

  const connect = () => {
    socket.connect();
  };

  const disconnect = () => {
    socket.disconnect();
  };

  const identity = () => {
    socket.emit("identity");
  };

  const on = (event: string, callback: (data: any) => void) => {
    socket.on(event, callback);
  };

  const emit = (event: string, data: any) => {
    socket.emit(event, data);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        connect,
        disconnect,
        identity,
        on,
        emit,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
