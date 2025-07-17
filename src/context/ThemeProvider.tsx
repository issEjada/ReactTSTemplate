import React, { useState } from "react";
import { ThemeContext } from "./Context";
import FullScreenSpinner from "../components/FullScreenSpinner";

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleDarkMode = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newIsDarkMode = !isDarkMode;
      setIsDarkMode(newIsDarkMode);
      if (newIsDarkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {isLoading && <FullScreenSpinner />}
      {children}
    </ThemeContext.Provider>
  );
};
