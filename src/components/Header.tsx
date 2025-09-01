import React, { useContext, useState, Suspense } from "react";
import { useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/Context";
import { useHeader } from "./useHeader";
import LogoutPopupJsx from "./Popup/LogoutPopupJsx";
import PopupLayout from "./Popup/LayoutPopup";
import FullScreenSpinner from "./FullScreenSpinner";
import { ConstantKeys } from "../constants/ConstantKeys.constants";

import { ThemeContext } from "../context/Context";
import { ThemeModeIcon } from "../context/ThemeProvider";

const SideBarIcon = React.lazy(
  () => import(`/src/assets/svg/Sidebar.svg?react`)
);
const SearchIcon = React.lazy(() => import(`/src/assets/svg/Search.svg?react`));
const SettingsIcon = React.lazy(
  () => import(`/src/assets/svg/settings.svg?react`)
);
const ProfileIcon = React.lazy(
  () => import(`/src/assets/svg/profile.svg?react`)
);
const LogoutIcon = React.lazy(() => import(`/src/assets/svg/logout.svg?react`));
interface HeaderProps {
  onSidebarIconClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarIconClick }) => {
  const { logout } = useContext(AuthContext);
  const { headerRef, showDropdown, toggleDropdown } = useHeader();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setIsAuthenticated] = useState(false);
  const [dontShowLogoutPopup, setDontShowLogoutPopup] = useState(() => {
    return localStorage.getItem("dontShowLogoutPopup") === "true";
  });
  const { toggleDarkMode } = useContext(ThemeContext);

  const handleSetDontShowLogoutPopup = (value: boolean) => {
    setDontShowLogoutPopup(value);
    localStorage.setItem("dontShowLogoutPopup", String(value));
  };

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
      localStorage.removeItem("customerProfileMobileNumber");
      setIsAuthenticated(false);
    }, 1000);
  };

  const handleOpenPopup = () => {
    if (!dontShowLogoutPopup) {
      setIsPopupOpen(true);
    } else {
      handleLogout();
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-[20px] w-full border-b bg-white dark:bg-darkTheme dark:border-gray-800">
      {isLoading && <FullScreenSpinner />}
      {/* Left: Breadcrumbs */}
      <Breadcrumb onSidebarIconClick={onSidebarIconClick} />
      {/* Right: Actions */}
      <div className="flex items-start gap-5">
        {/* Search Bar */}
        <div className="relative hidden md:flex items-center">
          <Suspense fallback={<FullScreenSpinner />}>
            <SearchIcon className="absolute left-3 text-black/20 dark:text-gray-400 cursor-pointer " />
          </Suspense>
          <input
            type="text"
            placeholder="Search"
            className="pl-8 pr-9 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none w-[160px]"
          />
          <kbd className="absolute right-2 text-xs text-black/20 dark:text-white">
            ⌘/
          </kbd>
        </div>

        <div className="p-1 cursor-pointer" onClick={toggleDarkMode}>
          <ThemeModeIcon className="text-black dark:text-white" />
        </div>
        {/* Icons */}
        <div ref={headerRef} className="relative flex items-center space-x-4">
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
              <div className="font-medium text-gray-800 dark:text-white text-[12px]">
                Ahmed Abdullah
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-[10px] leading-[18px] w-[123px] overflow-hidden">
                a.abdullah@company.com
              </div>
            </div>
            {showDropdown.user && (
              <div className="absolute top-[34px] right-[-20px] mt-2 mr-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 px-2 w-52 z-10">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <button className="w-full flex items-center gap-2 text-sm text-gray-700 dark:text-gray-100 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1 dark:border-gray-400 text-left">
                      <Suspense fallback={<FullScreenSpinner />}>
                        <ProfileIcon className="w-5 h-5 text-gray-700 dark:text-gray-400" />
                      </Suspense>
                      View Profile
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="w-full flex items-center gap-2 text-sm text-gray-700 dark:text-gray-100 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1 dark:border-gray-400 text-left">
                      <Suspense fallback={<FullScreenSpinner />}>
                        <SettingsIcon className="w-5 h-5 text-gray-700 dark:text-gray-400" />
                      </Suspense>
                      Settings
                    </button>
                  </div>
                </div>

                <div className="h-[3px] bg-gray-200 w-full mb-3 mt-2"></div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleOpenPopup}
                    className="w-full flex items-center gap-2 text-sm text-gray-700 dark:text-gray-100 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1 dark:border-gray-400  text-left"
                  >
                    <Suspense fallback={<FullScreenSpinner />}>
                      <LogoutIcon className="w-5 h-5 text-gray-700 dark:text-gray-400" />
                    </Suspense>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {isPopupOpen && (
          <div>
            <PopupLayout
              isOpen={isPopupOpen}
              className="md:w-[38%] lg:w-[35%] w-[90%]"
            >
              <LogoutPopupJsx
                onCancel={() => setIsPopupOpen(false)}
                onConfirm={handleLogout}
                dontShowPreference={dontShowLogoutPopup}
                onSetDontShowPreference={handleSetDontShowLogoutPopup}
              />
            </PopupLayout>
          </div>
        )}
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

  const fullPath = pathnames.length === 0 ? ["overview"] : pathnames;

  const customBreadcrumbLabels: Record<string, string> = {
    monitoring: "Monitor Activity Sessions",
    "decision-rules": "Decision Rules",
    "scoring-rules": "Scoring Rules",
    "new-rule": "New Rule",
    "view-rule": "View Rule",
    "edit-rule": "Edit Rule",
    "system-configuration": "System Configuration",
    "view-configuration": "View Configuration",
    "my-account": "My Account",
    "about-us": "About Us",
    support: "Support",
    "customer-profile": "Customer Profile",
    events: "Events",
    "new-event": "New Event",
    "view-event": "View Event",
    "edit-event": "Edit Event",
  };

  return (
    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
      <Suspense fallback={<FullScreenSpinner />}>
        <SideBarIcon
          className="text-black dark:text-white cursor-pointer"
          onClick={onSidebarIconClick}
        />
      </Suspense>

      <Link
        to="/"
        className="text-gray-950/40 dark:text-gray-400 hover:underline"
      >
        Dashboard
      </Link>
      <span className="text-gray-950/20 dark:text-gray-700">/</span>

      {fullPath.map((name, index) => {
        const routeTo = `/${fullPath.slice(0, index + 1).join("/")}`;
        const isLast = index === fullPath.length - 1;
        const label =
          customBreadcrumbLabels[name.toLowerCase()] ||
          decodeURIComponent(name);

        return (
          <span key={name} className="flex items-center space-x-4">
            {isLast ? (
              <span className="text-black dark:text-white font-normal capitalize">
                {label}
              </span>
            ) : (
              <>
                <Link
                  to={routeTo}
                  className="text-gray-950/40 dark:text-gray-400 hover:underline capitalize"
                >
                  {label}
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
