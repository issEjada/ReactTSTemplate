import React, { useState } from "react";

export const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleDarkMode = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    if (newIsDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300
        ${isDarkMode ? "bg-green-400" : "bg-gray-300"}`}
      aria-label="Toggle Dark Mode"
    >
      <div
        className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 transform
          ${isDarkMode ? "translate-x-6" : "translate-x-0"}`}
      />
    </button>
  );
};

export interface ThemeWrapperProps {
  children: React.ReactNode;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  return (
    <div className="bg-white  dark:bg-gray-800  transition-colors duration-300">
      {children}
    </div>
  );
};
