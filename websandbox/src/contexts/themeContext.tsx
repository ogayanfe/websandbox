import { createContext, useContext, useState, ReactNode } from "react";

interface ThemeContextType {
  darkTheme: boolean;
  turnDarkThemeOn: () => void;
  turnLightThemeOn: () => void;
}

const themeContext = createContext<ThemeContextType | null>(null);

function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [darkTheme, setDarkTheme] = useState(false);
  const context = {
    darkTheme,
    turnDarkThemeOn: () => {
      setDarkTheme(true);
    },
    turnLightThemeOn: () => {
      setDarkTheme(false);
    },
  };
  return <themeContext.Provider value={context}>{children}</themeContext.Provider>;
}

function useThemeContext() {
  return useContext(themeContext);
}

export { themeContext, ThemeContextProvider };

export default useThemeContext;
