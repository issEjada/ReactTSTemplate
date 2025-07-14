import { Search, Sun, Bell, Square, History } from "lucide-react";

const Header = () => {
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
        <div className="flex items-center space-x-3">
          <Sun className="w-5 h-5  dark:text-gray-400 cursor-pointer" />
          <History className="w-5 h-5  dark:text-gray-400 cursor-pointer" />
          <Bell className="w-5 h-5  dark:text-gray-400 cursor-pointer" />
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-2">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
