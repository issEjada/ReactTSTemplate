import { Suspense, useCallback, useState } from "react";
import { CustomerInsights } from "./CustomerInsights/CustomerInsights";
import { ActionAnalytics } from "./ActionAnalytics/ActionAnalytics";
import { CustomerDevices } from "./CustomerDevices/CustomerDevices";
import { DevicesHealthChecks } from "./DevicesHealthChecks/DevicesHealthChecks";
import React from "react";
import CustomerInformationFilter from "./CustomerProfileFilter/CustomerInformationFilter";
import { useCustomProfile } from "./useCustomProfile";
import type { CustomerInsightsPayload } from "./customerProfileServices";
import FullScreenSpinner from "../../components/FullScreenSpinner";

const UserIcon = React.lazy(
  () => import("../../../src/assets/svg/profile.svg?react")
);
const ClientIDIcon = React.lazy(
  () => import("../../../src/assets/svg/ClientID.svg?react")
);
const CustomerInsightsIcon = React.lazy(
  () => import("../../../src/assets/svg/CInsight.svg?react")
);
const ActionAnalyticsIcon = React.lazy(
  () => import("../../../src/assets/svg/AAnalytics.svg?react")
);
const CustomerDevicesIcon = React.lazy(
  () => import("../../../src/assets/svg/monitoring.svg?react")
);
const DevicesHealthChecksIcon = React.lazy(
  () => import("../../../src/assets/svg/monitoring.svg?react")
);
const SearchIcon = React.lazy(
  () => import("../../../src/assets/svg/Search.svg?react")
);
const FilterIcon = React.lazy(
  () => import("../../../src/assets/svg/Filters.svg?react")
);

export const CustomerProfile = () => {
  const [currentSection, setCurrentSection] =
    useState<string>("customerInsights");
  const [searchText, setSearchText] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);


  const {insightsData, setGlobalFilterData, errorValidation, loadingState} = useCustomProfile();

  const applyFilters = () => {
    const searchData = {
      userMobileNumber: searchText.trim() || undefined,
    };
    setGlobalFilterData(searchData);
    setSearchText(""); 
  };

  const onClearSearch = () => {
    setSearchText("");
  };

  const handleSearchSubmit = (searchData: CustomerInsightsPayload) => {
    setGlobalFilterData(searchData);
  }

  const openFilterModal = useCallback(() => setIsFilterOpen(true), []);
  const closeFilterModal = useCallback(() => setIsFilterOpen(false), []);

  if (loadingState === "loading") {
    return <FullScreenSpinner />;
  }

  return (
    <div className="flex flex-col gap-2 w-full pt-6 pb-4 ps-6 pe-4">
      <div className="flex justify-between items-center flex-wrap">
        <span className="font-inter font-medium text-[18px] leading-[28px] tracking-normal text-gray-900">Customer Information</span>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto flex-wrap">
          <div className="relative flex-1 min-w-[180px] sm:min-w-[240px] md:min-w-[400px] max-w-full h-10">
            <button
              type="button"
              title="Search"
              onClick={applyFilters}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              <Suspense>
                <SearchIcon className="w-5 h-5" />
              </Suspense>
            </button>

            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") applyFilters();
              }}
              placeholder={"Search"}
              className="w-full h-full pl-10 pr-9 text-[13px] sm:text-[14px] text-gray-700 rounded-[8px] border border-[#D5D7DA] outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-gray-300 dark:bg-gray-800 dark:text-white"
            />

            {searchText && (
              <button
                onClick={() => onClearSearch()}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                aria-label="Clear search"
              >
                &#10005;
              </button>
            )}
          </div>
          <CustomerInformationFilter
            isOpen={isFilterOpen}
            closeDrawer={closeFilterModal}
            filterData={{ userMobileNumber: "", userId: "", clientUserId: "" }}
            handleSearchSubmit={(searchData)=> {
              handleSearchSubmit(searchData);
              closeFilterModal();
            }}
          />
          <button
            className="shrink-0 flex items-center justify-center gap-2 h-10 px-3 border border-gray-300 rounded-[8px] text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
            onClick={openFilterModal}
          >
            <Suspense>
              <FilterIcon className="w-5 h-5 text-gray-500 dark:text-white" />
            </Suspense>
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>
      {errorValidation && (
        <div className="text-red-600 px-20 pt-2">{errorValidation}</div>
      )}
      {insightsData && (
      <div className="flex justify-between gap-4 w-full py-4">
        <div className="flex flex-col justify-start gap-2 bg-blueGray-50 rounded-lg w-[304px] border border-blueGray-200 p-4">
          <span>Customer Information</span>
          <div className="flex flex-col gap-3">
            <div className="flex align-start gap-4 p-4 w-[272px] h-[72px] bg-white rounded-lg border border-blueGray-100">
              <div className="flex justify-center items-center w-[28px] h-[28px] rounded-full bg-blueLight-100 border border-blueLight-50 border-4">
                <UserIcon className="text-blue-700" />
              </div>
              <div className="flex flex-col">
                <span className="font-inter font-medium text-sm leading-5 tracking-normal text-blueGray-700">
                  Mobile Number
                </span>
                <span className="font-inter font-normal text-sm leading-5 tracking-normal text-blueGray-600">
                  {insightsData.userInfo.userMobileNumber || "N/A"}
                </span>
              </div>
            </div>
            <div className="flex align-start gap-4 p-4 w-[272px] h-[72px] bg-white rounded-lg border border-blueGray-100">
              <div className="flex justify-center items-center w-[28px] h-[28px] rounded-full bg-blueLight-100 border border-blueLight-50 border-4">
                <UserIcon className="text-blue-700" />
              </div>
              <div className="flex flex-col">
                <span className="font-inter font-medium text-sm leading-5 tracking-normal text-blueGray-700">
                  User ID
                </span>
                <span className="font-inter font-normal text-sm leading-5 tracking-normal text-blueGray-600">
                  {insightsData.userInfo.userId || "N/A"}
                </span>
              </div>
            </div>
            <div className="flex align-start gap-4 p-4 w-[272px] h-[72px] bg-white rounded-lg border border-blueGray-100">
              <div className="flex justify-center items-center w-[28px] h-[28px] rounded-full bg-blueLight-100 border border-blueLight-50 border-4">
                <ClientIDIcon className="text-blue-700" />
              </div>
              <div className="flex flex-col">
                <span className="font-inter font-medium text-sm leading-5 tracking-normal text-blueGray-700">
                  Client ID
                </span>
                <span className="font-inter font-normal text-sm leading-5 tracking-normal text-blueGray-600">
                  {insightsData.userInfo.clientUserId || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-blueGray-50 rounded-lg w-full border border-blueGray-200 p-4">
          <div className="w-full flex rounded-lg overflow-hidden border border-blueGray-300 shadow-[0px_1px_2px_0px_#0A0D120D]">
            <div
              className={`flex w-[25%] bg-white h-[40px] px-4 py-[10px] gap-2 items-center border-r border-gray-300 rounded-l-lg ${
                currentSection === "customerInsights" && "bg-blueGray-100"
              }`}
              onClick={() => setCurrentSection("customerInsights")}
            >
              <CustomerInsightsIcon className="text-gray-500" />
              <div
                className={`font-bold text-[14px] leading-[20px] tracking-normal ${
                  currentSection === "customerInsights"
                    ? "text-blueGray-700"
                    : "text-gray-700 "
                }`}
              >
                Customer Insights
              </div>
            </div>
            <div
              className={`flex w-[25%] bg-white h-[40px] px-4 py-[10px] gap-2 items-center border-r border-gray-300 ${
                currentSection === "actionAnalytics" && "bg-blueGray-100"
              }`}
              onClick={() => setCurrentSection("actionAnalytics")}
            >
              <ActionAnalyticsIcon className="text-gray-500" />
              <div
                className={`font-bold text-[14px] leading-[20px] tracking-normal ${
                  currentSection === "actionAnalytics"
                    ? "text-blueGray-700"
                    : "text-gray-700 "
                }`}
              >
                Action Analytics
              </div>
            </div>
            <div
              className={`flex w-[25%] bg-white h-[40px] px-4 py-[10px] gap-2 items-center border-r border-gray-300 ${
                currentSection === "customerDevices" && "bg-blueGray-100"
              }`}
              onClick={() => setCurrentSection("customerDevices")}
            >
              <CustomerDevicesIcon className="text-gray-500" />
              <div
                className={`font-bold text-[14px] leading-[20px] tracking-normal ${
                  currentSection === "customerDevices"
                    ? "text-blueGray-700"
                    : "text-gray-700 "
                }`}
              >
                Customer Devices
              </div>
            </div>
            <div
              className={`flex w-[25%] bg-white h-[40px] px-4 py-[10px] gap-2 items-center border-r border-gray-300 rounded-r-lg ${
                currentSection === "devicesHealthChecks" && "bg-blueGray-100"
              }`}
              onClick={() => setCurrentSection("devicesHealthChecks")}
            >
              <DevicesHealthChecksIcon className="text-gray-500" />
              <div
                className={`font-bold text-[14px] leading-[20px] tracking-normal ${
                  currentSection === "devicesHealthChecks"
                    ? "text-blueGray-700"
                    : "text-gray-700 "
                }`}
              >
                Devices Health Checks
              </div>
            </div>
          </div>
          {currentSection === "customerInsights" && <CustomerInsights {...insightsData} />}
          {currentSection === "actionAnalytics" && <ActionAnalytics />}
          {currentSection === "customerDevices" && <CustomerDevices />}
          {currentSection === "devicesHealthChecks" && <DevicesHealthChecks />}
        </div>
      </div>
      )}
    </div>
  );
};
