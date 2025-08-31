import { useState, useEffect, useRef } from "react";

export const useHeader = () => {
  const [showDropdown, setShowDropdown] = useState({
    search: false,
    user: false,
  });
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (type: "search" | "user") => {
    setShowDropdown((prev) => ({
      search: type === "search" ? !prev.search : false,
      user: type === "user" ? !prev.user : false,
    }));
  };

  const closeAllDropdowns = () => {
    setShowDropdown({ search: false, user: false });
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
