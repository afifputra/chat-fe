import { createContext } from "react";

export const AuthContext = createContext({
  token: "",
  expires: 0,
  login: (token: string) => {},
  logout: () => {},
});

const AuthContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const login = (token: string) => {
    localStorage.setItem("token", token);
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        token: localStorage.getItem("token") || "",
        expires: 0,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
