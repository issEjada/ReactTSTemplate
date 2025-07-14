import React, { useState } from "react";
import SideBar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const [isClosed] = useState<boolean>(false);
  return (
    <div className="container min-h-screen">
      <div className="flex">
        <div className="w-[256px]">
          <div className="text-white h-screen border-r border-r-[1px] border-r-[#1C1C1C1A]">
            <SideBar isClosed={isClosed} />
          </div>
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        {/* <div>{children}</div> */}
      </div>
    </div>
  );
};
