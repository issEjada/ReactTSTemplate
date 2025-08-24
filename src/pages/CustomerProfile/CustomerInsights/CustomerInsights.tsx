import React from "react";
import ExpandableCard from "./ExpandableCard";
import type { CustomerInsightsResponse } from "../customerProfileServices";
const CustomerInsightsIcon = React.lazy(
  () => import("../../../assets/svg/ArrowUp.svg?react")
);

// const Trusted = React.lazy(
//   () => import("../../../assets/svg/TrustedIcon.svg?react")
// );

// const MostMap = React.lazy(() => import("../../../assets/svg/maps?react"));

export const CustomerInsights = (insightsData: CustomerInsightsResponse) => {
  return (
    <div className="flex flex-col gap-2">
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used Device IP"
        data={insightsData?.userInsights?.mostUsedDeviceIP}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Truted Device IP's"
        data={insightsData?.userInsights?.trustedDeviceIPs}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Average Device Space Utilization"
        data={insightsData?.userInsights?.avgDeviceSpaceUtilization}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Average Installed Apps Count"
        data={insightsData?.userInsights?.avgInstalledAppsCount}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label=" Min Installed Apps Count"
        data={insightsData?.userInsights?.minInstalledAppsCount}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Max Installed Apps Count"
        data={insightsData?.userInsights?.maxInstalledAppsCount}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used OS Type"
        data={insightsData?.userInsights?.mostUsedOSType}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Usual Device Number Of SIMCards"
        data={insightsData?.userInsights?.mostUsualDeviceNumberOfSIMCards}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used Android OS Version"
        data={insightsData?.userInsights?.mostUsedAndroidOSVersion}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used Android Serial Number"
        data={insightsData?.userInsights?.mostUsedAndroidSerialNumber}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used IOS System Version"
        data={insightsData?.userInsights?.mostUsedIOSSystemVersion}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used IOS Timezone"
        data={insightsData?.userInsights?.mostUsedIOSTimezone}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used Device City"
        data={insightsData?.userInsights?.mostUsedDeviceCityFromIP}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Trusted Device Cities"
        data={insightsData?.userInsights?.trustedDeviceCitiesFromIP}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used Device Country"
        data={insightsData?.userInsights?.mostUsedDeviceCountryFromIP}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Trusted Device Countries"
        data={insightsData?.userInsights?.trustedDeviceCountriesFromIP}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used Device Location"
        data={insightsData?.userInsights?.mostUsedDeviceLocationFromIP}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Trusted Device Locations"
        data={insightsData?.userInsights?.trustedDeviceCountriesFromIP}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used 3DS Page IP"
        data={insightsData?.userInsights?.mostUsed3DSPageIP}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Trusted 3DS Page IP's"
        data={insightsData?.userInsights?.trusted3DSPageIPs}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used 3DS Page City"
        data={insightsData?.userInsights?.mostUsed3DSPageCityFromIP}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Trusted 3DS Page Cities"
        data={insightsData?.userInsights?.trusted3DSPageCitiesFromIP}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used 3DS Page Location"
        data={insightsData?.userInsights?.mostUsed3DSPageLocationFromIP}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Trusted 3DS Page Locations"
        data={insightsData?.userInsights?.trusted3DSPageLocationsFromIP}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used 3DS Page Country"
        data={insightsData?.userInsights?.mostUsed3DSPageCountryFromIP}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Trusted 3DS Page Countries"
        data={insightsData?.userInsights?.trusted3DSPageCountriesFromIP}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used Network Carrier"
        data={insightsData?.userInsights?.mostUsedNetworkCarrier}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Trusted Network Carrier"
        data={insightsData?.userInsights?.trustedNetworkCarrier}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used WiFi SSID"
        data={insightsData?.userInsights?.mostUsedWiFiSSID}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Trusted WiFi SSID"
        data={insightsData?.userInsights?.trustedWiFiSSID}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used GMT Zone"
        data={insightsData?.userInsights?.mostUsedGMTZone}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used Network Type"
        data={insightsData?.userInsights?.mostUsedNetworkType}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used CPU Cores Number"
        data={parseInt(insightsData?.userInsights?.mostUsed3DSPageCPUCores)}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used User Plugins List"
        data={insightsData?.userInsights?.mostUsed3DSPagePlugins}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Most Used Platform"
        data={insightsData?.userInsights?.mostUsed3DSPagePlatform}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Trusted Platforms"
        data={insightsData?.userInsights?.trusted3DSPagePlatforms}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700" />}
        label="Blacklisted Devices"
        data={insightsData?.userInsights?.blacklistedDevices?.map(
          (item, index) => (
            <p key={index}>
              {item.uniqueId + ", " + item.model + ", " + item.manufacturer}
            </p>
          )
        )}
      />
    </div>
  );
};
