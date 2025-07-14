import { useState, useEffect, useRef } from "react";

export const useHeader = () => {
  const [showDropdown, setShowDropdown] = useState({
    sun: false,
    history: false,
    bell: false,
    user: false,
  });
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (type: "sun" | "history" | "bell" | "user") => {
    console.log("toggleDropdown", type);
    setShowDropdown((prev) => ({
      sun: type === "sun" ? !prev.sun : false,
      history: type === "history" ? !prev.history : false,
      bell: type === "bell" ? !prev.bell : false,
      user: type === "user" ? !prev.user : false,
    }));
  };

  const closeAllDropdowns = () => {
    setShowDropdown({ sun: false, history: false, bell: false, user: false });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      headerRef.current &&
      !headerRef.current.contains(event.target as Node)
    ) {
      closeAllDropdowns();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    headerRef,
    showDropdown,
    toggleDropdown,
    closeAllDropdowns,
  };
};
