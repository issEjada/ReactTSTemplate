import { useState } from "react";
import SideBar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export const Layout = () => {
  const [isClosed] = useState<boolean>(false);
  //container
  return (
    <div className="min-h-screen">
      <div className="flex">
        <div>
          <div className="text-white h-screen border-r border-r-[1px] border-r-[#1C1C1C1A]">
            <SideBar isClosed={isClosed} />
          </div>
        </div>
        <div className="flex-1 p-4 w-full">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
