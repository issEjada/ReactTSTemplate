import { useState } from "react";
import { CustomerInsights } from "./CustomerInsights/CustomerInsights";
import { ActionAnalytics } from "./ActionAnalytics/ActionAnalytics";
import { CustomerDevices } from "./CustomerDevices/CustomerDevices";
import { DevicesHealthChecks } from "./DevicesHealthChecks/DevicesHealthChecks";
import { ActionIndicator } from "../../components/Popup/MetricsPopUp/ActionsIndicator";
import React from "react";

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

export const CustomerProfile = () => {
  const [open, setOpen] = useState(true);

  const [currentSection, setCurrentSection] =
    useState<string>("customerInsights");
  return (
    <div className="flex flex-col gap-2 w-full pt-6 pb-4 ps-6 pe-4">
      <ActionIndicator isOpen={open} onClose={()=>setOpen(false)}/>
      <div className="flex justify-between">
        <span>Customer Information</span>
        <div className="flex justify-between w-[512px] h-[44px]">
          Search & Filter Divs
        </div>
      </div>
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
                  +96572738859
                </span>
              </div>
            </div>
            <div className="flex align-start gap-4 p-4 w-[272px] h-[72px] bg-white rounded-lg border border-blueGray-100">
              <div className="flex justify-center items-center w-[28px] h-[28px] rounded-full bg-blueLight-100 border border-blueLight-50 border-4">
                <UserIcon className="text-blue-700" />
              </div>
              <div className="flex flex-col">
                <span className="font-inter font-medium text-sm leading-5 tracking-normal text-blueGray-700">
                  Mobile Number
                </span>
                <span className="font-inter font-normal text-sm leading-5 tracking-normal text-blueGray-600">
                  +96572738859
                </span>
              </div>
            </div>
            <div className="flex align-start gap-4 p-4 w-[272px] h-[72px] bg-white rounded-lg border border-blueGray-100">
              <div className="flex justify-center items-center w-[28px] h-[28px] rounded-full bg-blueLight-100 border border-blueLight-50 border-4">
                <ClientIDIcon className="text-blue-700" />
              </div>
              <div className="flex flex-col">
                <span className="font-inter font-medium text-sm leading-5 tracking-normal text-blueGray-700">
                  Mobile Number
                </span>
                <span className="font-inter font-normal text-sm leading-5 tracking-normal text-blueGray-600">
                  +96572738859
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-blueGray-50 rounded-lg w-full border border-blueGray-200 p-4">
          <div className="w-full flex rounded-lg overflow-hidden border border-blueGray-300">
            <div
              className="flex w-[25%] bg-white h-[40px] px-4 py-[10px] gap-2 items-center border-r border-gray-300 rounded-l-lg"
              onClick={() => setCurrentSection("customerInsights")}
            >
              <CustomerInsightsIcon className="text-gray-500"/>
              <div>Customer Insights</div>
            </div>
            <div
              className="flex w-[25%] bg-white h-[40px] px-4 py-[10px] gap-2 items-center border-r border-gray-300 "
              onClick={() => setCurrentSection("actionAnalytics")}
            >
              <ActionAnalyticsIcon className="text-gray-500"/>
              <div>Action Analytics</div>
            </div>
            <div
              className="flex w-[25%] bg-white h-[40px] px-4 py-[10px] gap-2 items-center border-r border-gray-300 "
              onClick={() => setCurrentSection("customerDevices")}
            >
              <CustomerDevicesIcon className="text-gray-500"/>
              <div>Customer Devices</div>
            </div>
            <div
              className="flex w-[25%] bg-white h-[40px] px-4 py-[10px] gap-2 items-center "
              onClick={() => setCurrentSection("devicesHealthChecks")}
            >
              <DevicesHealthChecksIcon className="text-gray-500"/>
              <div>Devices Health Checks</div>
            </div>
          </div>
          {currentSection === "customerInsights" && <CustomerInsights />}
          {currentSection === "actionAnalytics" && <ActionAnalytics />}
          {currentSection === "customerDevices" && <CustomerDevices />}
          {currentSection === "devicesHealthChecks" && <DevicesHealthChecks />}
        </div>
      </div>
    </div>
  );
};
