import { createContext, useContext } from "react";

interface AuthContextType {
  isLoggedIn: Boolean;
}

const defaultContext = {
  isLoggedIn: false,
};

const authContext = createContext<AuthContextType>(defaultContext);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const context: AuthContextType = {
    isLoggedIn: localStorage.getItem("logged In") ? true : false,
  };
  return (
    <authContext.Provider value={context}>{children}</authContext.Provider>
  );
}

function useAuthContext() {
  return useContext(authContext);
}

export { AuthContextProvider, authContext };

export default useAuthContext;
