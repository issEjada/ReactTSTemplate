import { useLocation, Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext, AuthContext } from "../context/Context";
import SunIcon from "../assets/svg/Sun.svg?react";
import ClockIcon from "../assets/svg/ClockCounterClockwise.svg?react";
import SideBarIcon from "../assets/svg/Sidebar.svg?react";
import SearchIcon from "../assets/svg/Search.svg?react";
import BellIcon from "../assets/svg/Bell.svg?react";
import { useHeader } from "./useHeader";
import MoonIcon from "../assets/svg/darkMode.svg?react";
interface HeaderProps {
  onSidebarIconClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarIconClick }) => {
  const { headerRef, showDropdown, toggleDropdown } = useHeader();
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  const { logout } = useContext(AuthContext);
  return (
    <header className="flex items-center justify-between px-6 py-4 w-full border-b bg-white dark:bg-[#121418] dark:border-gray-800">
      {/* Left: Breadcrumbs */}
      <Breadcrumb onSidebarIconClick={onSidebarIconClick} />

      {/* Right: Actions */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative hidden md:flex items-center">
          <SearchIcon className="absolute left-3 text-gray-800 dark:text-gray-400 cursor-pointer " />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-10 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none"
          />
          <kbd className="absolute right-2 text-xs text-gray-400">⌘/</kbd>
        </div>

        {/* Icons */}
        <div ref={headerRef} className="relative flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            {isDarkMode ? (
              <MoonIcon
                className="dark:text-gray-400 cursor-pointer"
                onClick={toggleDarkMode}
              />
            ) : (
              <SunIcon
                className="w-5 h-5  dark:text-gray-400 cursor-pointer"
                onClick={toggleDarkMode}
              />
            )}
            {showDropdown.sun && (
              <div className="absolute top-[34px] right-20 mt-2 mr-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 px-2 w-52 z-10 text-sm text-gray-500 dark:text-gray-400">
                Those are my sun settings
              </div>
            )}
            <ClockIcon
              className="w-5 h-5  dark:text-gray-400 cursor-pointer"
              onClick={() => toggleDropdown("history")}
            />
            {showDropdown.history && (
              <div className="absolute top-[34px] right-12 mt-2 mr-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 px-2 w-52 z-10 text-sm text-gray-500 dark:text-gray-400">
                Those are my history settings
              </div>
            )}
            <BellIcon
              className="w-5 h-5  dark:text-gray-400 cursor-pointer"
              onClick={() => toggleDropdown("bell")}
            />
            {showDropdown.bell && (
              <div className="absolute top-[34px] right-4 mt-2 mr-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 px-2 w-52 z-10 text-sm text-gray-500 dark:text-gray-400">
                Those are my notifications
              </div>
            )}
          </div>

          {/* Profile */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => toggleDropdown("user")}
          >
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
                <button
                  onClick={logout}
                  className="text-sm text-gray-500 dark:text-gray-400 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1 border border-gray-200 dark:border-gray-700 mt-2 text-left"
                >
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

interface BreadcrumbProps {
  onSidebarIconClick: () => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  onSidebarIconClick,
}) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
      <SideBarIcon
        className="text-black dark:text-white cursor-pointer"
        onClick={onSidebarIconClick}
      />
      {pathnames.length === 0 ? (
        <span className="text-gray-500 dark:text-gray-400">
          Dashboard / <span className="dark:text-white">Overview</span>
        </span>
      ) : (
        <>
          <Link
            to="/"
            className="text-gray-950 dark:text-gray-400 hover:underline"
          >
            Home
          </Link>
          <span>/</span>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return (
              <span key={name} className="flex items-center space-x-2">
                {isLast ? (
                  <span className="text-black dark:text-white capitalize">
                    {decodeURIComponent(name)}
                  </span>
                ) : (
                  <>
                    <Link
                      to={routeTo}
                      className="text-gray-950 dark:text-gray-400 hover:underline capitalize"
                    >
                      {decodeURIComponent(name)}
                    </Link>
                    <span>/</span>
                  </>
                )}
              </span>
            );
          })}
        </>
      )}
    </div>
  );
};
