import React from "react";
import ExpandableCard from "./ExpandableCard";
import type { CustomerInsightsResponse } from "../customerProfileServices";
const CustomerInsightsIcon = React.lazy(
  () => import("../../../assets/svg/ArrowUp.svg?react")
);

export const CustomerInsights = (insightsData: CustomerInsightsResponse) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full gap-3">
        <div className="flex gap-4 bg-white rounded-lg h-[72px] border border-blueGray-100 p-4 w-[50%]">
          <div>Some Icon</div>
          <div className="flex flex-col">
            <span>Mobile Number</span>
            <span>+96572738859</span>
          </div>
        </div>
        <div className="flex gap-4 bg-white rounded-lg h-[72px] border border-blueGray-100 p-4 w-[50%]">
          <div>Some Icon</div>
          <div className="flex flex-col">
            <span>Mobile Number</span>
            <span>+96572738859</span>
          </div>
        </div>
      </div>
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Truted Device IP's"
        data={insightsData?.userInsights?.trustedDeviceIPs}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used Device IP"
        data={insightsData?.userInsights?.mostUsedDeviceIP}
      />
    </div>
  );
};
