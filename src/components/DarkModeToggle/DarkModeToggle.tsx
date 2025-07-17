import React, { useContext } from "react";
import { ThemeContext } from "../../context/Context";

export const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleDarkMode}
      className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-300
        ${isDarkMode ? "bg-blue-400" : "bg-gray-300"}`}
      aria-label="Toggle Dark Mode"
    >
      <div
        className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 transform
          ${isDarkMode ? "translate-x-4" : "translate-x-0"}`}
      />
    </button>
  );
};
