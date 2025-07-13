import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useState } from "react";

export default function LayoutWithSideBar() {

  const [isClosed] = useState<boolean>(false);

  return (
    <div className="flex">
      <div className="text-white h-screen border-r border-r-[1px] border-r-[#1C1C1C1A]">
        <SideBar isClosed={isClosed} />
      </div>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}