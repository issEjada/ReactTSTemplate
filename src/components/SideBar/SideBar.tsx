import { SideBarItemsGroup } from "./SideBarItem";
import { AppRoutes } from "../../routes/AppRoutes";
import TablerIcon from "../../assets/svg/darkMode.svg?react";
import HealthIcon from "../../assets/svg/systemHealthStatusNormal.svg?react";
import { DarkModeToggle } from "../DarkModeToggle/DarkModeToggle";
import LogoWithTextIcon from "../../assets/svg/logo_with_text.svg?react";

export const SideBar: React.FC<{ isClosed: boolean }> = ({ isClosed }) => {
  return (
    <>
      <div
        className={`h-screen flex flex-col justify-between gap-2 transition-all duration-300 ease-in-out dark:bg-[#121418] dark:border-gray-800 ${
          isClosed ? " w-[110px] ps-[33px] pe-[34px] py-[35px]" : " w-64 px-4 py-4"
        }`}
      >
        <div className={`flex flex-col gap-2`}>
          {/* Logo Section */}

          <div className={`flex flex-col justify-between gap-2 overflow-hidden ${isClosed ? " ps-1" : ""}`}>
            <LogoWithTextIcon
              className={`text-black dark:text-white flex self-baseline transition-all duration-300 ${
                isClosed && "w-[130px]"
              }`}
            />
            <div className="h-[1px] bg-[#D2D6DB] w-full mb-3 mt-2"></div>
          </div>

          <div className="pb-3">
            <SideBarItemsGroup
              items={[
                {
                  pageTitle: "Dashboard",
                  text: "Dashboard",
                  icon: "dashboard",
                  url: AppRoutes.home,
                },
                {
                  pageTitle: "Organizations",
                  text: "Organizations",
                  icon: "organizations",
                  url: AppRoutes.organizations,
                },
                {
                  pageTitle: "Users",
                  text: "Users",
                  icon: "users",
                  url: AppRoutes.users,
                },
              ]}
            />
          </div>
          <div className="pb-3">
            <span
              className={`block text-gray-950 dark:text-gray-600 text-sm py-1 px-3 h-7 transition-all duration-300 ${
                isClosed ? ' translate-x-[-50%]' : ' translate-x-0'
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
          <div>
            <span
              className={`block text-gray-950 dark:text-gray-600 text-sm py-1 px-3 h-7 transition-all duration-300 ${
                isClosed ? ' translate-x-[-40%]' : ' translate-x-0'
              }`}
            >
              Account
            </span>
            <SideBarItemsGroup
              items={[
                {
                  pageTitle: "Analytics",
                  text: "Analytics",
                  icon: "analytics",
                  url: AppRoutes.analytics,
                },
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
              className={`flex rounded-lg border-s-transparent transition-all ease-in-out cursor-pointer relative z-10 items-center text-gray-700 h-9 overflow-hidden justify-between duration-300 ${isClosed? ' translate-x-[-10%]' : ' translate-x-0'}`}
            >
              <div
                className={`flex items-center duration-300 transition-all ${
                  isClosed ? "opacity-0 w-0 h-0" : "px-2"
                }`}
              >
                <span className="m-1">
                  <TablerIcon className="text-gray-900 dark:text-gray-500" />
                </span>

                <span
                  className={`overflow-hidden transition-all ease-in-out whitespace-nowrap text-sm font-readexProBold700 w-fit ml-2 font-sans hidden md:inline dark:text-white`}
                >
                  Dark Mode
                </span>
              </div>
              <div>
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="h-[1px] bg-[#D2D6DB] w-full mb-3 mt-2"></div>
          <div
            className={`flex flex-row justify-between items-start text-white px-3 py-2 rounded-[8px] border border-[#414651] bg-[linear-gradient(45deg,_#101828_0%,_#535862_100%)] shadow-[0px_1px_2px_0px_#0A0D120D] transition-all duration-500`}
          >
            <div
              className={`flex gap-1 flex-col overflow-hidden transition-all duration-[3s] ${
                isClosed ? "h-0 w-0 opacity-0" : ""
              }`}
            >
              <span className="text-gray-200  text-[10px] leading-[14px] tracking-[0]">
                System Health Status:
              </span>
              <span className="font-bold text-[12px] leading-[18px] tracking-[0]">
                Normal
              </span>
            </div>

            <HealthIcon className="w-6 h-6 text-green-500" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
