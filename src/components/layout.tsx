import { useState} from "react";
import SideBar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { MobileSideBar } from "./SideBar/MobileSideBar";

export const Layout = () => {
  const [isClosed, setIsClosed] = useState<boolean>(window.innerWidth < 768 ? true : false);

  const handleSidebarIconClick = () => {
    setIsClosed(!isClosed);
  };

  return (
    <div className="min-h-screen ">
      <div className="flex">
        <div>
          <div className={`transition-all duration-300 ease-in-out text-white h-screen fixed border-r border-r-[1px] border-r-gray-950/10 dark:border-gray-800 bg-white z-10
          ${!isClosed ? "w-full sm:w-[unset]" : "w-0"}
          `
          }>
            <SideBar isClosed={isClosed} />
            <MobileSideBar isClosed={isClosed} setIsClosed={setIsClosed}/>
          </div>
        </div>
        <div
          className={`flex-1 dark:bg-black ${
            isClosed ? "md:ml-[110px]" : "md:ml-64"
          } transition-all duration-300 overflow-auto`}
        >
          <Header onSidebarIconClick={handleSidebarIconClick} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
