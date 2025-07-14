import { Search, Sun, Bell, Square, History } from "lucide-react";
import { useHeader } from "./useHeader";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { headerRef, showDropdown, toggleDropdown } =
    useHeader();

    const {logout} = useContext(AuthContext);

  return (
    <header className="flex items-center justify-between px-6 py-4 w-full border-b bg-white dark:bg-[#121418] dark:border-gray-800">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <Square className="w-4 h-4" />
        <span className="text-gray-700 dark:text-gray-400">Dashboards</span>
        <span>/</span>
        <span className="text-gray-400 dark:text-white">Overview</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-10 py-1.5 rounded-md bg-gray-100 dark:bg-gray-900 text-sm text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none"
          />
          <kbd className="absolute right-2 text-xs text-gray-400">⌘/</kbd>
        </div>

        {/* Icons */}
        <div ref={headerRef} className="relative flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <Sun className="w-5 h-5  dark:text-gray-400 cursor-pointer"  onClick={() => toggleDropdown("sun")}/>
            {showDropdown.sun && (
              <div className="absolute top-[34px] right-20 mt-2 mr-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 px-2 w-52 z-10 text-sm text-gray-500 dark:text-gray-400">
                Those are my sun settings
              </div>
            )}
            <History className="w-5 h-5  dark:text-gray-400 cursor-pointer"  onClick={() => toggleDropdown("history")}/>
            {showDropdown.history && (
              <div className="absolute top-[34px] right-12 mt-2 mr-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 px-2 w-52 z-10 text-sm text-gray-500 dark:text-gray-400">
                Those are my history settings
              </div>
            )}
            <Bell className="w-5 h-5  dark:text-gray-400 cursor-pointer"  onClick={() => toggleDropdown("bell")}/>
            {showDropdown.bell && (
              <div className="absolute top-[34px] right-4 mt-2 mr-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 px-2 w-52 z-10 text-sm text-gray-500 dark:text-gray-400">
                Those are my notifications
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => toggleDropdown("user")}>
            <img
              src="https://i.pravatar.cc/40"
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
            <div className="text-sm">
              <div className="font-medium text-gray-800 dark:text-white">
                Ahmed Abdullah
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">
                a.abdullah@company.com
              </div>
            </div>
            {showDropdown.user && (
            <div className="absolute top-[34px] right-[-20px] mt-2 mr-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 px-2 w-52 z-10">
              <div className="flex flex-row items-center flex-start gap-3 overflow-hidden">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="Avatar"
                  className="w-6 h-6 rounded-full"
                />
                <div className="text-sm">
                  <div className="font-sm text-gray-800 dark:text-white">
                    Ahmed Abdullah
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">
                    a.abdullah@company.comsdfsdfdsfsds
                  </div>
                </div>
              </div>
              <button onClick={logout} className="text-sm text-gray-500 dark:text-gray-400 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1 border border-gray-200 dark:border-gray-700 mt-2 text-left">
                Logout
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
