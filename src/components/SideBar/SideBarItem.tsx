import React from "react";
import { NavLink } from "react-router-dom";
// import { TablerIcon } from "../TablerIcon";
import type { MenuItem } from "../../types/types";

interface SidebarItemProps {
  item: MenuItem;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ item }) => {

  return (
    <li className="mb-2 flex flex-col mx-3 justify-center">
      <NavLink
        to={item.url!}
        className={({ isActive }) =>
          `flex px-2 items-center rounded-lg border-s-transparent transition-all ease-in-out cursor-pointer relative z-10 justify-center md:justify-start   ${
            isActive
              ? "py-2 bg-[#CFCFCF] text-white font-semibold relative z-10 before:absolute before:z-20 before:bg-white before:w-2 before:h-full before:-left-8 before:top-0 before:bottom-0 before:rounded-lg"
              : ""
          }`
        }
      >
        <span className="m-1">
          {/* {item.icon && <TablerIcon iconName={item.icon} />} */}
        </span>
        <span
          className={`overflow-hidden transition-all ease-in-out whitespace-nowrap text-sm font-readexProBold700 w-fit ml-2 font-bold font-sans hidden md:inline`}
        >
          {item.text}
        </span>
      </NavLink>
    </li>
  );
};