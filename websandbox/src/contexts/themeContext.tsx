import { useEffect, createContext, useContext, useState, ReactNode } from "react";

interface ThemeContextType {
  darkTheme: boolean;
  turnDarkThemeOn: () => void;
  turnLightThemeOn: () => void;
  toggleTheme: () => void;
}

const themeContext = createContext<ThemeContextType | null>(null);

function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [darkTheme, setDarkTheme] = useState<boolean>(() =>
    Boolean(localStorage.getItem("darkTheme"))
  );

  const turnLightThemeOn = () => {
    localStorage.removeItem("darkTheme");
    setDarkTheme(false);
  };
  const turnDarkThemeOn = () => {
    localStorage.setItem("darkTheme", "true");
    setDarkTheme(true);
  };
  const toggleTheme = () => {
    if (darkTheme) {
      turnLightThemeOn();
      return;
    }
    turnDarkThemeOn();
  };

  const context = {
    darkTheme,
    turnLightThemeOn,
    turnDarkThemeOn,
    toggleTheme,
  };

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (darkTheme) {
      htmlElement?.classList.add("dark");
      return;
    }
    htmlElement?.classList.remove("dark");
  }, [darkTheme]);

  return <themeContext.Provider value={context}>{children}</themeContext.Provider>;
}

function useThemeContext() {
  return useContext(themeContext);
}

export { themeContext, ThemeContextProvider };

export default useThemeContext;
