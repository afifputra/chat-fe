import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext({
  token: "",
  userId: "",
  isLoggedIn: false,
  login: (token: string, userId: string) => {},
  logout: () => {},
  relogin: () => {},
});

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = (token: string, userId: string) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setToken("");
    setUserId("");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  const relogin = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      login(token, userId);
    }

    return;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        isLoggedIn,
        login,
        logout,
        relogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
