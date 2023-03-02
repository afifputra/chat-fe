import { RouterProvider } from "react-router-dom";
import AuthContextProvider from "./context/auth";

import router from "./routes";

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
  );
}

export default App;
