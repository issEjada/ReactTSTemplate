import { useLocation, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Context";
import SideBarIcon from "../assets/svg/Sidebar.svg?react";
import SearchIcon from "../assets/svg/Search.svg?react";
import { useHeader } from "./useHeader";
interface HeaderProps {
  onSidebarIconClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarIconClick }) => {
  const { headerRef, showDropdown, toggleDropdown } = useHeader();

  const { logout } = useContext(AuthContext);
  return (
    <header className="flex items-center justify-between px-6 py-[20px] w-full border-b bg-white dark:bg-[#121418] dark:border-gray-800">
      {/* Left: Breadcrumbs */}
      {/* <div
        className={`
          absolute top-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
          shadow-lg px-7 py-7 z-10 text-sm text-gray-500 dark:text-gray-400 
          transition-all duration-300 ease-in-out overflow-hidden 
          ${showDropdown.search ? "opacity-100 w-full h-[80px] left-0" : "opacity-0 h-0 right-0"}
        `}
      >
          <div className="flex items-center mb-2">
          <SearchIcon className="text-gray-800 dark:text-gray-400 cursor-pointer " />
          <input
            type="text"
            placeholder="Search"
            className="ml-3 rounded-lg text-sm text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none w-[160px]"

            />
          </div>
      </div> */}
      <Breadcrumb onSidebarIconClick={onSidebarIconClick} />
      {/* Right: Actions */}
      <div className="flex items-start gap-5">
        {/* Search Bar */}
        <div className="relative hidden md:flex items-center">
          <SearchIcon className="absolute left-3 text-gray-800 dark:text-gray-400 cursor-pointer " />
          <input
            type="text"
            placeholder="Search"
            className="pl-8 pr-9 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none w-[160px]"
            // onClick={
            //   () => toggleDropdown("search")
            // }
            
          />
          <kbd className="absolute right-2 text-xs text-gray-400">⌘/</kbd>
        </div>

        <div className="p-1">
        <SideBarIcon
          className="text-black dark:text-white cursor-pointer"
          onClick={onSidebarIconClick}
        />
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
                  onClick={() => logout()}
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

  // Inject 'overview' if the path is root
  const fullPath = pathnames.length === 0 ? ["overview"] : pathnames;

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
      <SideBarIcon
        className="text-black dark:text-white cursor-pointer"
        onClick={onSidebarIconClick}
      />

      <Link to="/" className="text-gray-950 dark:text-gray-400 hover:underline">
        Dashboard
      </Link>
      <span>/</span>

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
