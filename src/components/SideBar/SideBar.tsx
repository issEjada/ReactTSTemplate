import { SidebarItem } from "./SideBarItem";
import type { MenuItem } from "../../types/types";

export interface SidebarProps {
  items: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  return (
    <div className="h-full flex-shrink-0 bg-primary-blue text-white">
      <aside className={"md:w-[250px] w-[100px]"}>
        <nav className="w-full flex flex-col h-full">
          <header className="flex flex-col gap-5 items-start justify-between py-7 px-2">
            <div className="font-semibold text-center tracking-wide pb-1">
                <div className="md:px-4 px-0 md:text-[22px] text-[16px]">Decision Manager</div>
            </div>
            <div className="h-[1px] bg-[#D2D6DB] w-full"></div>
          </header>
          <div className="flex-1 overflow-y-auto mt-8">
            <ul>
              {items.map((item, idx) => (
                <SidebarItem key={`${item.pageTitle}-${idx}`} item={item} />
              ))}
            </ul>
          </div>
        </nav>
      </aside>
    </div>
  );
};
