import React, { Suspense } from "react";
import { NavLink } from "react-router-dom";
import type { MenuItem } from "../../types/types";

interface SidebarItemProps {
  item: MenuItem;
  isClosed: boolean;
}

const loadIconComponent = (iconName: string | undefined) => {
  return React.lazy(() => import(`../../assets/svg/${iconName}.svg?react`));
};

export const SidebarItem: React.FC<SidebarItemProps> = ({ item, isClosed }) => {
  
  const IconComponent = loadIconComponent(item?.icon?.replace('.svg', ''));

  return (
    <li className="mb-1 flex flex-col justify-center">
        <NavLink
          to={item.url!}
          className={({ isActive }) =>
            `flex px-2 items-center rounded-lg border-s-transparent transition-all ease-in-out cursor-pointer relative z-10 justify-center md:justify-start   ${
              isActive
                ? "h-11 py-2 bg-blue-700 text-white font-semibold relative z-10 before:absolute before:z-20 before:bg-white before:w-2 before:h-full before:-left-8 before:top-0 before:bottom-0 before:rounded-lg "
                : "text-gray-700 h-9 "
            } ${isClosed ? "w-fit" : "w-full"}
            `
          }
        >
          <span className="m-1">
            {item.icon && 
            (
            <Suspense fallback={<span>...</span>}>
              <IconComponent className="icon" />
            </Suspense>
            )
            }
          </span>
          {!isClosed &&
          <span
            className={`overflow-hidden transition-all ease-in-out whitespace-nowrap text-sm font-readexProBold700 w-fit ml-2 font-sans hidden md:inline`}
          >
            {item.text}
          </span>
      }
        </NavLink>
    </li>
  );
};
