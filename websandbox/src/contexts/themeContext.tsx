import { createContext, useContext, useState, ReactNode } from "react";

interface ThemeContextType {
  darkTheme: false;
  setDarkTheme: (theme: boolean) => void;
}

const themeContext = createContext<ThemeContextType | null>(null);

export function ThemeContextProvide({ children }: { children: ReactNode }) {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  const themeContext = {
    darkTheme: darkTheme,
    setDarkTheme: (t: boolean) => {
      setDarkTheme(t);
      return;
    },
  };
  return <themeContext.Provider value={themeContext}>{children}</themeContext.Provider>;
}

export default function useThemeContext() {
  return useContext(themeContext);
}
