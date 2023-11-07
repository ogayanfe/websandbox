import { createContext, useContext, useState } from "react";
import {
  AuthTokenType,
  getAuthTokens,
  login,
  logout,
  CredentialsType,
  UserType,
} from "../utils/authutils";

interface AuthContextType {
  login: (credentials: CredentialsType) => Promise<Boolean>;
  logout: () => void;
  tokens: () => AuthTokenType | null;
  authenticated: () => Boolean;
  user: UserType | null;
  updateUserInfo: (user: UserType) => void;
}

const authContext = createContext<AuthContextType | null>(null);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const context: AuthContextType = {
    tokens: getAuthTokens,
    login: login,
    authenticated: () => getAuthTokens() !== null,
    logout: logout,
    user: user,
    updateUserInfo: (u) => {
      setUser(u);
    },
  };
  return <authContext.Provider value={context}>{children}</authContext.Provider>;
}

function useAuthContext() {
  return useContext(authContext);
}

export { AuthContextProvider, authContext };

export default useAuthContext;
