import { SideBarItemsGroup } from "./SideBarItem";
import { AppRoutes } from "../../routes/AppRoutes";
import TablerIcon from "../../assets/svg/darkMode.svg?react";
import HealthIcon from "../../assets/svg/systemHealthStatusNormal.svg?react";
import { DarkModeToggle } from "../DarkModeToggle/DarkModeToggle";
import LogoWithText from "../../assets/svg/logo_with_text.svg?react";

export const SideBar: React.FC<{ isClosed: boolean }> = ({ isClosed }) => {
  console.log("isClosed", isClosed);

  return (
    <>
      <div
        className={
          `h-screen px-4 py-4 gap-2 flex flex-col justify-between` +
          (isClosed ? " w-36 items-center" : " w-64")
        }
      >
        <div className="flex flex-col gap-2">
          <div>
            <header className="flex flex-col items-start justify-between">
              <LogoWithText className="text-black dark:text-white" />
              <div className="h-[1px] bg-[#D2D6DB] w-full mb-3 mt-2"></div>
            </header>
          </div>
          <div className="pb-3">
            <SideBarItemsGroup
              isClosed={isClosed}
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
            {!isClosed && (
              <span className="text-gray-950 dark:text-gray-600 text-sm py-1 px-3 h-7">
                Developer
              </span>
            )}
            <SideBarItemsGroup
              isClosed={isClosed}
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
            {!isClosed && (
              <span className="text-gray-950 dark:text-gray-600 text-sm py-1 px-3 h-7">
                Account
              </span>
            )}
            <SideBarItemsGroup
              isClosed={isClosed}
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
            {
              <div
                className={`flex px-2 rounded-lg border-s-transparent transition-all ease-in-out cursor-pointer relative z-10 items-center text-gray-700 h-9${
                  isClosed ? " justify-center" : ""
                }`}
              >
                <span className="m-1">
                  <TablerIcon className="text-gray-900 dark:text-gray-500" />
                </span>
                {!isClosed && (
                  <>
                    <span
                      className={`overflow-hidden transition-all ease-in-out whitespace-nowrap text-sm font-readexProBold700 w-fit ml-2 font-sans hidden md:inline dark:text-white`}
                    >
                      Dark Mode
                    </span>
                    <div className=" ml-auto">
                      <DarkModeToggle />
                    </div>
                  </>
                )}
              </div>
            }
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="h-[1px] bg-[#D2D6DB] w-full mb-3 mt-2"></div>
          <div
            className={`flex flex-row justify-between items-start text-white px-3 py-2 rounded-[8px] border border-[#414651] bg-[linear-gradient(45deg,_#101828_0%,_#535862_100%)] shadow-[0px_1px_2px_0px_#0A0D120D]`}
          >
            <div className={`flex gap-1 flex-col`}>
              <span className="text-gray-200  text-[10px] leading-[14px] tracking-[0]">
                System Health Status:
              </span>
              <span className="font-bold text-[12px] leading-[18px] tracking-[0]">
                Normal
              </span>
            </div>
            {!isClosed && <HealthIcon className="w-6 h-6 text-green-500" />}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
