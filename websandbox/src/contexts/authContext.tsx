import { createContext, useContext, useState } from "react";
import { getAuthTokens, login, logout } from "../utils/authutils";
import { UserType } from "../types/utils/authUtils";
import { AuthContextDataType } from "../types/contexts";

const authContext = createContext<AuthContextDataType | null>(null);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const context: AuthContextDataType = {
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
