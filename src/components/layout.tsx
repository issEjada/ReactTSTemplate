import { useState } from "react";
import SideBar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export const Layout = () => {
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const handleSidebarIconClick = () => {
    setIsClosed(!isClosed);
  };

  return (
    <div className="min-h-screen ">
      <div className="flex">
        <div>
          <div className="text-white h-screen fixed border-r border-r-[1px] border-r-[#1C1C1C1A] bg-white z-10">
            <SideBar isClosed={isClosed} />
          </div>
        </div>
        <div className={`flex-1 dark:bg-black ${isClosed ? "ml-[110px]" : "ml-64"} transition-all duration-300 overflow-auto`}>
          <Header onSidebarIconClick={handleSidebarIconClick} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
