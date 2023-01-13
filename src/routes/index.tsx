import { createBrowserRouter } from "react-router-dom";
import LoginPages from "../pages/Login";
import Chat from "../pages/Chat";

const router = createBrowserRouter([
  { path: "/", element: <LoginPages /> },
  { path: "/chat", element: <Chat /> },
]);

export default router;
