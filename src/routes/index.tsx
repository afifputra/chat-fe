import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Chat from "../pages/Chat";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/chat/:roomId", element: <Chat /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <Dashboard /> },
]);

export default router;
