import React, { useContext } from "react";
import { SideBarItemsGroup } from "./SideBarItem";
import { AppRoutes } from "../../routes/AppRoutes";
import { DarkModeToggle } from "../DarkModeToggle/DarkModeToggle";
import { ThemeContext } from "../../context/Context";

const LogoWithTextIcon = React.lazy(
  () => import("../../assets/svg/logo_with_text.svg?react")
);
const TablerIconMoon = React.lazy(
  () => import("../../assets/svg/darkMode.svg?react")
);
const TablerIconSun = React.lazy(
  () => import("../../assets/svg/Sun.svg?react")
);

export const SideBar: React.FC<{ isClosed: boolean }> = ({ isClosed }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <div
        className={`h-screen flex flex-col justify-between gap-2 transition-all duration-300 ease-in-out dark:bg-[#121418] dark:border-gray-800 py-[20px] ${
          isClosed ? " w-[110px] ps-[33px] pe-[34px]" : " w-64 px-4"
        }`}
      >
        <div className={`flex flex-col gap-2`}>
          {/* Logo Section */}

          <div
            className={`flex flex-col justify-between gap-2 overflow-hidden pt-[8px] pb-[6px]`}
          >
            <LogoWithTextIcon
              className={`text-black dark:text-white flex self-baseline transition-all duration-300 ${
                isClosed && "w-[140px]"
              }`}
            />
          </div>
          <div
            className={`h-[1px] bg-[#D2D6DB] mb-3 transition-all duration-300  ${
              isClosed ? " -mx-8" : " -mx-4"
            }`}
          ></div>
          <div className="pb-3">
            <SideBarItemsGroup
              items={[
                {
                  pageTitle: "Dashboard",
                  text: "Dashboard",
                  icon: "dashboard",
                  url: AppRoutes.home,
                },
              ]}
            />
          </div>
          <div className="pb-3">
            <span
              className={`block text-gray-950 dark:text-gray-600 text-sm py-1 px-3 h-7 transition-all duration-300 mb-1 ${
                isClosed ? " translate-x-[-50%]" : " translate-x-0"
              }`}
            >
              Developer
            </span>
            <SideBarItemsGroup
              items={[
                {
                  pageTitle: "Rules",
                  text: "Rules",
                  icon: "rules",
                  url: AppRoutes.rules,
                },
                {
                  pageTitle: "Events",
                  text: "Events",
                  icon: "events",
                  url: AppRoutes.events,
                },
                {
                  pageTitle: "System Configuration",
                  text: "System Configuration",
                  icon: "systemConfiguration",
                  url: AppRoutes.systemConfiguration,
                },
                {
                  pageTitle: "Monitoring",
                  text: "Monitoring",
                  icon: "monitoring",
                  url: AppRoutes.monitoring,
                },
              ]}
            />
          </div>
          <div className="pb-3">
            <span
              className={`block text-gray-950 dark:text-gray-600 text-sm py-1 px-3 h-7 transition-all duration-300 mb-1 ${
                isClosed ? " translate-x-[-40%]" : " translate-x-0"
              }`}
            >
              Account
            </span>
            <SideBarItemsGroup
              items={[
                {
                  pageTitle: "My Account",
                  text: "My Account",
                  icon: "myAccount",
                  url: AppRoutes.myAccount,
                },
                {
                  pageTitle: "About Us",
                  text: "About Us",
                  icon: "aboutUs",
                  url: AppRoutes.aboutUs,
                },
                {
                  pageTitle: "Support",
                  text: "Support",
                  icon: "support",
                  url: AppRoutes.support,
                },
              ]}
            />

            <div
              // className={`flex rounded-lg border-s-transparent transition-all ease-in-out cursor-pointer relative z-10 items-center text-gray-700 h-9 overflow-hidden ${isClosed? " justify-center": " justify-between "}`}
              className={`flex rounded-lg border-s-transparent transition-all ease-in-out cursor-pointer relative z-10 text-gray-700 overflow-hidden justify-between duration-700 mt-1 px-2 ${
                isClosed
                  ? " translate-x-[-10%] h-20"
                  : " items-center translate-x-0 h-9"
              }`}
            >
              <div
                className={`flex duration-700 transition-all ${
                  isClosed ? "ms-[5px] mt-1 " : "ms-[1px] items-center "
                }`}
              >
                <span className="m-1">
                  {isDarkMode ? (
                    <TablerIconSun className="text-gray-900 dark:text-gray-500" />
                  ) : (
                    <TablerIconMoon className="text-gray-900 dark:text-gray-500" />
                  )}
                </span>

                <span
                  className={`overflow-hidden transition-all ease-in-out whitespace-nowrap text-sm font-readexProBold700 w-fit ml-[5px] font-sans hidden md:inline dark:text-white ${
                    isClosed ? "opacity-0 w-0 h-0" : ""
                  }`}
                >
                  Dark Mode
                </span>
              </div>
              <div
                className={`transition-transform duration-300 ease-in-out transform ${
                  isClosed
                    ? "translate-x-[-108px] translate-y-[44px]"
                    : "translate-x-0 translate-y-0"
                }`}
              >
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
