import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Chat from "../pages/Chat";
import Contact from "../pages/Contact";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/chat/:roomId", element: <Chat /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/contact", element: <Contact /> },
]);

export default router;
