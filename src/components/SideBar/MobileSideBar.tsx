import React, { Suspense } from "react";
import { SideBarItemsGroup } from "./SideBarItem";
import { AppRoutes } from "../../routes/AppRoutes";
import { DarkModeToggle } from "../DarkModeToggle/DarkModeToggle";
import { ThemeModeIcon } from "../../context/ThemeProvider";
import Spinner from "../Spinner";
const AnotherLogoWithTextIcon = React.lazy(
  () => import("../../assets/svg/logo_with_text_copy.svg?react")
);
const FiltersIcon = React.lazy(
  () => import("../../assets/svg/Filters.svg?react")
);

export const MobileSideBar: React.FC<{
  isClosed: boolean;
  setIsClosed: (value: boolean) => void;
}> = ({ isClosed, setIsClosed }) => {
  return (
    <>
      <div
        className={`block md:hidden absolute bg-white z-20 h-screen flex flex-col justify-between gap-2 transition-all duration-300 ease-in-out dark:bg-darkTheme dark:border-gray-800 py-[20px] ${
          isClosed ? "w-0 overflow-hidden" : " w-full sm:w-64 px-4"
        }`}
      >
        <div className={`flex flex-col gap-2`}>
          {/* Logo Section */}
          <div
            className={`flex justify-between items-center gap-2 overflow-hidden pt-[8px] pb-[6px]`}
          >
            <AnotherLogoWithTextIcon
              className={`text-black dark:text-white flex self-baseline transition-all duration-300`}
            />
            <Suspense>
              <FiltersIcon
                className="text-gray-700 dark:text-white"
                onClick={() => setIsClosed(true)}
              />
            </Suspense>
          </div>
          <div
            className={`h-[1px] bg-gray-950/10 mb-3 transition-all duration-300 dark:bg-gray-800 ${
              isClosed ? " -mx-8" : " -mx-4"
            }`}
          ></div>
          <div className="pb-3">
            <SideBarItemsGroup
              setIsClosed={setIsClosed}
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
              className={`block text-gray-950/40 dark:text-gray-600 text-sm py-1 px-3 h-7 transition-all duration-300 mb-1 ${
                isClosed ? " translate-x-[-50%]" : " translate-x-0"
              }`}
            >
              Developer
            </span>
            <SideBarItemsGroup
              setIsClosed={setIsClosed}
              items={[
                {
                  pageTitle: "Scoring Rules",
                  text: "Scoring Rules",
                  icon: "rules",
                  url: AppRoutes.scoringRules,
                },
                {
                  pageTitle: "Decision Rules",
                  text: "Decision Rules",
                  icon: "rules",
                  url: AppRoutes.decisionRules,
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
                  icon: "settings",
                  url: AppRoutes.systemConfiguration,
                },
                {
                  pageTitle: "Customer Profile",
                  text: "Customer Profile",
                  icon: "settings",
                  url: AppRoutes.customerProfile,
                },
                {
                  pageTitle: "Monitoring",
                  text: "Monitoring",
                  icon: "monitoring",
                  url: AppRoutes.monitoring,
                },
                {
                  pageTitle: "Geo Location",
                  text: "Geo Location",
                  icon: "MostUsedTargetCountry",
                  url: AppRoutes.geoLocation,
                },
              ]}
            />
          </div>
          <div className="pb-3">
            <span
              className={`block text-gray-950/40 dark:text-gray-600 text-sm py-1 px-3 h-7 transition-all duration-300 mb-1 ${
                isClosed ? " translate-x-[-40%]" : " translate-x-0"
              }`}
            >
              Account
            </span>
            <SideBarItemsGroup
              setIsClosed={setIsClosed}
              items={[
                {
                  pageTitle: "About Us",
                  text: "About Us",
                  icon: "AlertIcon",
                  url: AppRoutes.aboutUs,
                  class: "rotate-180 w-[16.5px]",
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
              className={`flex rounded-lg border-s-transparent transition-all ease-in-out cursor-pointer relative z-8 text-gray-700 overflow-hidden justify-between duration-700 mt-1 px-2 ${
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
                  <ThemeModeIcon className="text-gray-900 dark:text-gray-500" />
                </span>

                <span
                  className={`overflow-hidden transition-all ease-in-out whitespace-nowrap text-sm font-readexProBold700 w-fit ml-[5px] font-sans inline dark:text-white ${
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

export default MobileSideBar;
