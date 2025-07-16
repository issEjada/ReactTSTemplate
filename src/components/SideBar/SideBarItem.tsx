import React, { Suspense } from "react";
import { NavLink } from "react-router-dom";
import type { MenuItem } from "../../types/types";

interface SidebarItemProps {
  item: MenuItem;
}

const loadIconComponent = (iconName: string | undefined) => {
  return React.lazy(() => import(`../../assets/svg/${iconName}.svg?react`));
};

export const SidebarItem: React.FC<SidebarItemProps> = ({ item }) => {
  const IconComponent = loadIconComponent(item?.icon?.replace(".svg", ""));

  return (
    <li className="mb-1 flex flex-col justify-center">
      <NavLink
        to={item.url!}
        className={({ isActive }) =>
          `flex px-2 items-center rounded-lg border-s-transparent transition-all ease-in-out cursor-pointer relative z-10 justify-center md:justify-start   ${
            isActive
              ? "h-11 py-2 bg-blue-700 dark:bg-gray-800 text-white font-semibold relative z-10 before:absolute before:z-20 before:bg-white before:w-2 before:h-full before:-left-8 before:top-0 before:bottom-0 before:rounded-lg "
              : "text-gray-700 h-9 dark:text-gray-500"
          } w-full
            `
        }
      >
        <span className="m-1">
          {item.icon && (
            <Suspense fallback={<span className="backdrop-blur-md w-4 h-4 block bg-gray-200 dark:bg-gray-600 rounded-sm"></span>}>
              <IconComponent className="icon" />
            </Suspense>
          )}
        </span>
        
          <span
            className={`overflow-hidden transition-all ease-in-out whitespace-nowrap text-sm font-readexProBold700 w-fit ml-2 font-sans hidden md:inline dark:text-white`}
          >
            {item.text}
          </span>
        
      </NavLink>
    </li>
  );
};

export interface SidebarProps {
  items: MenuItem[];
}

export const SideBarItemsGroup: React.FC<SidebarProps> = ({
  items,
}) => {
  return (
    <div className="bg-primary-blue text-white w-full ">
      <aside>
        <nav className="w-full flex flex-col h-full">
          <div className="flex-1 overflow-y-auto ">
            <ul className={`flex flex-col`}>
              {items.map((item, idx) => (
                <SidebarItem
                  key={`${item.pageTitle}-${idx}`}
                  item={item}
                />
              ))}
            </ul>
          </div>
        </nav>
      </aside>
    </div>
  );
};
