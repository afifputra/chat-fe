import { io } from "socket.io-client";

export const socket = io("http://localhost:7001");

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
