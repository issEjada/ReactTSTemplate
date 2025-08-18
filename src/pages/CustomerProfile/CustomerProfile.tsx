import { useState } from "react";
import { CustomerInsights } from "./CustomerInsights/CustomerInsights";
import { ActionAnalytics } from "./ActionAnalytics/ActionAnalytics";
import { CustomerDevices } from "./CustomerDevices/CustomerDevices";
import { DevicesHealthChecks } from "./DevicesHealthChecks/DevicesHealthChecks";

export const CustomerProfile = () => {
  const [currentSection, setCurrentSection] = useState<string>("customerInsights");
  return (
    <div className="flex flex-col gap-2 w-full pt-6 pb-4 ps-6 pe-4">
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
              <div>Some Icon</div>
              <div className="flex flex-col">
                <span>Mobile Number</span>
                <span>+96572738859</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-blueGray-50 rounded-lg w-full border border-blueGray-200 p-4">
          <div className="w-full flex">
            <div className="flex w-[25%] bg-white h-[40px] px-4 py-[10px] gap-2" onClick={() => setCurrentSection("customerInsights")}>
              <div>Some Icon</div>
              <div>Some Text</div>
            </div>
            <div className="flex w-[25%] bg-white h-[40px] px-4 py-[10px] gap-2" onClick={() => setCurrentSection("actionAnalytics")}>
              <div>Some Icon</div>
              <div>Some Text</div>
            </div>
            <div className="flex w-[25%] bg-white h-[40px] px-4 py-[10px] gap-2" onClick={() => setCurrentSection("customerDevices")}>
              <div>Some Icon</div>
              <div>Some Text</div>
            </div>
            <div className="flex w-[25%] bg-white h-[40px] px-4 py-[10px] gap-2" onClick={() => setCurrentSection("devicesHealthChecks")}>
              <div>Some Icon</div>
              <div>Some Text</div>
            </div>
          </div>
          {
            currentSection === "customerInsights" && (
              <CustomerInsights />
            )
          }
          {
            currentSection === "actionAnalytics" && (
              <ActionAnalytics />
            )
          }
          {
            currentSection === "customerDevices" && (
              <CustomerDevices />
            )
          }
          {
            currentSection === "devicesHealthChecks" && (
              <DevicesHealthChecks />
            )
          }
        </div>
      </div>
    </div>
  );
};
