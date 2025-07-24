import { useLocation, Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/Context";
import { useHeader } from "./useHeader";
import LogoutPopupJsx from "./Popup/LogoutPopupJsx";
import PopupLayout from "./Popup/LayoutPopup";
import FullScreenSpinner from "./FullScreenSpinner";
import { ConstantKeys } from "../constants/ConstantKeys.constants";

const SideBarIcon = React.lazy(() => import("../assets/svg/Sidebar.svg?react"));
const SearchIcon = React.lazy(() => import("../assets/svg/Search.svg?react"));
const SettingsIcon = React.lazy(
  () => import("../assets/svg/settings.svg?react")
);
const ProfileIcon = React.lazy(() => import("../assets/svg/profile.svg?react"));
const LogoutIcon = React.lazy(() => import("../assets/svg/logout.svg?react"));
interface HeaderProps {
  onSidebarIconClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarIconClick }) => {
  const { logout } = useContext(AuthContext);
  const { headerRef, showDropdown, toggleDropdown } = useHeader();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsPopupOpen(false);
    setIsLoading(true);
    setTimeout(() => {
      logout();
      setIsLoading(false);
      sessionStorage.removeItem(ConstantKeys.accessToken);
      localStorage.removeItem(ConstantKeys.accessToken);
      sessionStorage.removeItem(ConstantKeys.rememberMe);
      localStorage.removeItem(ConstantKeys.rememberMe);
      setIsAuthenticated(false);
    }, 1000);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 w-full border-b bg-white dark:bg-[#121418] dark:border-gray-800">
      {isLoading && <FullScreenSpinner />}
      {/* Left: Breadcrumbs */}
      <Breadcrumb onSidebarIconClick={onSidebarIconClick} />

      {/* Right: Actions */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative hidden md:flex items-center">
          <SearchIcon className="absolute left-3 text-black/20 dark:text-gray-400 cursor-pointer " />
          <input
            type="text"
            placeholder="Search"
            className="w-40 pl-10 py-1 rounded-md bg-black/5 dark:bg-gray-800 text-sm text-gray-800 dark:text-white placeholder:text-black/20 focus:outline-none"
          />
          <kbd className="absolute right-2 text-xs text-black/20">⌘/</kbd>
        </div>

        {/* Icons */}
        <div ref={headerRef} className="relative flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <SideBarIcon
              className="text-black dark:text-white cursor-pointer"
              onClick={onSidebarIconClick}
            />
            {/* {showDropdown.sidebar && (
              <div className="absolute top-[34px] right-20 mt-2 mr-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 px-2 w-52 z-10 text-sm text-gray-500 dark:text-gray-400">
                Show / Hide Sidebar
              </div>
            )} */}
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
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <button className="w-full flex items-center gap-2 text-sm text-gray-700 dark:text-gray-100 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1 dark:border-gray-400 text-left">
                      <ProfileIcon className="w-5 h-5 text-gray-700 dark:text-gray-400" />
                      View Profile
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="w-full flex items-center gap-2 text-sm text-gray-700 dark:text-gray-100 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1 dark:border-gray-400 text-left">
                      <SettingsIcon className="w-5 h-5 text-gray-700 dark:text-gray-400" />
                      Settings
                    </button>
                  </div>
                </div>

                <div className="h-[3px] bg-gray-200 w-full mb-3 mt-2"></div>

                <div className="flex items-center space-x-2">
                  <button
                    // onClick={() => logout()}
                    onClick={() => setIsPopupOpen(true)}
                    className="w-full flex items-center gap-2 text-sm text-gray-700 dark:text-gray-100 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1 dark:border-gray-400  text-left"
                  >
                    <LogoutIcon className="w-5 h-5 text-gray-700 dark:text-gray-400" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <PopupLayout isOpen={isPopupOpen}>
            <LogoutPopupJsx
              onCancel={() => setIsPopupOpen(false)}
              onConfirm={handleLogout}
            />
          </PopupLayout>
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

  // Inject 'overview' if the path is root
  const fullPath = pathnames.length === 0 ? ["overview"] : pathnames;

  return (
    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
      <SideBarIcon
        className="text-black dark:text-white cursor-pointer"
        onClick={onSidebarIconClick}
      />

      <Link
        to="/"
        className="text-gray-950 dark:text-gray-400 hover:underline "
      >
        Dashboard
      </Link>
      <span className="text-[#1C1C1C33]">/</span>

      {fullPath.map((name, index) => {
        const routeTo = `/${fullPath.slice(0, index + 1).join("/")}`;
        const isLast = index === fullPath.length - 1;

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
    </div>
  );
};
