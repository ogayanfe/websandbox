import { createContext, useContext } from "react";
import { AuthTokenType, getAuthTokens, login, logout, CredentialsType } from "../utils/authutils";

interface AuthContextType {
  login: (credentials: CredentialsType) => Promise<Boolean>;
  logout: () => void;
  tokens: () => AuthTokenType | null;
  authenticated: () => Boolean;
}

const authContext = createContext<AuthContextType | null>(null);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const context: AuthContextType = {
    tokens: getAuthTokens,
    login: login,
    authenticated: () => getAuthTokens() !== null,
    logout: logout,
  };
  return <authContext.Provider value={context}>{children}</authContext.Provider>;
}

function useAuthContext() {
  return useContext(authContext);
}

export { AuthContextProvider, authContext };

export default useAuthContext;
