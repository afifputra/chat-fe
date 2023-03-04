import { RouterProvider } from "react-router-dom";
import AuthContextProvider from "./context/auth";
import SocketContextProvider from "./context/socket";

import router from "./routes";

function App() {
  return (
    <AuthContextProvider>
      <SocketContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  );
}

export default App;
