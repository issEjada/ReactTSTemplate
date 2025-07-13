import { SidebarItem } from "./SideBarItem";
import type { MenuItem } from "../../types/types";

export interface SidebarProps {
  items: MenuItem[];
  isClosed: boolean;
}

export const SideBarItemsGroup: React.FC<SidebarProps> = ({ items, isClosed }) => {
  return (
    <div className="bg-primary-blue text-white w-full">
      <aside>
        <nav className="w-full flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            <ul className={`flex flex-col  ${isClosed ? "items-center" : ""}`}>
              {items.map((item, idx) => (
                <SidebarItem key={`${item.pageTitle}-${idx}`} item={item} isClosed={isClosed} />
              ))}
            </ul>
          </div>
        </nav>
      </aside>
    </div>
  );
};
