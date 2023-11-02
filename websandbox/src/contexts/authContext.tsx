import { createContext, useContext } from "react";
import { isLoggedIn, login, logout } from "../utils/authutils";

interface AuthContextType {
  isLoggedIn: () => Boolean;
  login: () => void;
  logout: () => void;
}

const defaultContext = {
  isLoggedIn: isLoggedIn,
  login: login,
  logout: logout,
};

const authContext = createContext<AuthContextType>(defaultContext);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const context: AuthContextType = {
    isLoggedIn: isLoggedIn,
    login: login,
    logout: logout,
  };
  return <authContext.Provider value={context}>{children}</authContext.Provider>;
}

function useAuthContext() {
  return useContext(authContext);
}

export { AuthContextProvider, authContext };

export default useAuthContext;
