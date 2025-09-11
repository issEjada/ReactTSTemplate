import React from "react";
import ExpandableCard from "./ExpandableCard";
import type { CustomerInsightsResponse } from "../customerProfileServices";

const NavigatorIcon = React.lazy(
  () => import("../../../assets/svg/Navigator.svg?react")
);

const CustomerInsightsIcon = React.lazy(
  () => import("../../../assets/svg/ArrowUp.svg?react")
);

const TrustedIcon = React.lazy(
  () => import("../../../assets/svg/TrustedIcon.svg?react")
);

const AnalyticsIcon = React.lazy(
  () => import("../../../assets/svg/AAnalytics.svg?react")
);

const RulesIcon = React.lazy(
  () => import("../../../assets/svg/rules.svg?react")
);

const MostMapIcon = React.lazy(
  () => import("../../../assets/svg/MostUsedTargetCountry.svg?react")
);

export const CustomerInsights = (insightsData: CustomerInsightsResponse) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-[12px]">
        <ExpandableCard
          icon={<AnalyticsIcon className="text-blue-700 w-[9.33px]" />}
          label="Average Device Space Utilization"
          data={insightsData?.userInsights?.avgDeviceSpaceUtilization}
        />
        <ExpandableCard
          icon={<AnalyticsIcon className="text-blue-700 w-[9.33px]" />}
          label="Average Installed Apps Count"
          data={insightsData?.userInsights?.avgInstalledAppsCount}
        />
      </div>
      <ExpandableCard
        icon={
          <CustomerInsightsIcon className="text-blue-700 w-[9.33px] rotate-180" />
        }
        label=" Min Installed Apps Count"
        data={insightsData?.userInsights?.minInstalledAppsCount}
      />
      <ExpandableCard
        icon={<CustomerInsightsIcon className="text-blue-700 w-[9.33px]" />}
        label="Max Installed Apps Count"
        data={insightsData?.userInsights?.maxInstalledAppsCount}
      />
      <ExpandableCard
        icon={<NavigatorIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Used OS Type"
        data={insightsData?.userInsights?.mostUsedOSType}
      />
      <ExpandableCard
        icon={<NavigatorIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Usual Device Number Of SIMCards"
        data={insightsData?.userInsights?.mostUsualDeviceNumberOfSIMCards}
      />
      <ExpandableCard
        icon={<NavigatorIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Used Android OS Version"
        data={insightsData?.userInsights?.mostUsedAndroidOSVersion}
      />
      <ExpandableCard
        icon={<NavigatorIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Used Android Serial Number"
        data={insightsData?.userInsights?.mostUsedAndroidSerialNumber}
      />
      <ExpandableCard
        icon={<NavigatorIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Used IOS System Version"
        data={insightsData?.userInsights?.mostUsedIOSSystemVersion}
      />
      <ExpandableCard
        icon={<NavigatorIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Used IOS Timezone"
        data={insightsData?.userInsights?.mostUsedIOSTimezone}
      />
      <ExpandableCard
        icon={<NavigatorIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Used Device IP"
        data={insightsData?.userInsights?.mostUsedDeviceIP}
      />
      <ExpandableCard
        icon={<TrustedIcon className="text-blue-700 w-[9.33px]" />}
        label="Trusted Device IPs"
        data={insightsData?.userInsights?.trustedDeviceIPs}
      />
      <ExpandableCard
        icon={<MostMapIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Used Device City"
        data={insightsData?.userInsights?.mostUsedDeviceCityFromIP}
      />
      <ExpandableCard
        icon={<TrustedIcon className="text-blue-700 w-[9.33px]" />}
        label="Trusted Device Cities"
        data={insightsData?.userInsights?.trustedDeviceCitiesFromIP}
      />
      <ExpandableCard
        icon={<MostMapIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Used Device Country"
        data={insightsData?.userInsights?.mostUsedDeviceCountryFromIP}
      />
      <ExpandableCard
        icon={<TrustedIcon className="text-blue-700 w-[9.33px]" />}
        label="Trusted Device Countries"
        data={insightsData?.userInsights?.trustedDeviceCountriesFromIP}
      />
      <ExpandableCard
        icon={<MostMapIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Used Device Location"
        data={insightsData?.userInsights?.mostUsedDeviceLocationFromIP}
      />
      <ExpandableCard
        icon={<TrustedIcon className="text-blue-700 w-[9.33px]" />}
        label="Trusted Device Locations"
        data={insightsData?.userInsights?.trustedDeviceCountriesFromIP}
      />
      <ExpandableCard
        icon={<NavigatorIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Used 3DS Page IP"
        data={insightsData?.userInsights?.mostUsed3DSPageIP}
      />
      <ExpandableCard
        icon={<TrustedIcon className="text-blue-700 w-[9.33px]" />}
        label="Trusted 3DS Page IPs"
        data={insightsData?.userInsights?.trusted3DSPageIPs}
      />
      <ExpandableCard
        icon={<MostMapIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Used 3DS Page City"
        data={insightsData?.userInsights?.mostUsed3DSPageCityFromIP}
      />
      <ExpandableCard
        icon={<TrustedIcon className="text-blue-700 w-[9.33px]" />}
        label="Trusted 3DS Page Cities"
        data={insightsData?.userInsights?.trusted3DSPageCitiesFromIP}
      />
      <ExpandableCard
        icon={<NavigatorIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Used 3DS Page Location"
        data={insightsData?.userInsights?.mostUsed3DSPageLocationFromIP}
      />
      <ExpandableCard
        icon={<TrustedIcon className="text-blue-700 w-[9.33px]" />}
        label="Trusted 3DS Page Locations"
        data={insightsData?.userInsights?.trusted3DSPageLocationsFromIP}
      />
      <ExpandableCard
        icon={<NavigatorIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Used 3DS Page Country"
        data={insightsData?.userInsights?.mostUsed3DSPageCountryFromIP}
      />
      <ExpandableCard
        icon={<TrustedIcon className="text-blue-700 w-[9.33px]" />}
        label="Trusted 3DS Page Countries"
        data={insightsData?.userInsights?.trusted3DSPageCountriesFromIP}
      />
      <ExpandableCard
        icon={<NavigatorIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Used Network Carrier"
        data={insightsData?.userInsights?.mostUsedNetworkCarrier}
      />
      <ExpandableCard
        icon={<TrustedIcon className="text-blue-700 w-[9.33px]" />}
        label="Trusted Network Carrier"
        data={insightsData?.userInsights?.trustedNetworkCarrier}
      />
      <ExpandableCard
        icon={<NavigatorIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Used WiFi SSID"
        data={insightsData?.userInsights?.mostUsedWiFiSSID}
      />
      <ExpandableCard
        icon={<TrustedIcon className="text-blue-700 w-[9.33px]" />}
        label="Trusted WiFi SSID"
        data={insightsData?.userInsights?.trustedWiFiSSID}
      />
      <ExpandableCard
        icon={<NavigatorIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Used GMT Zone"
        data={insightsData?.userInsights?.mostUsedGMTZone}
      />
      <ExpandableCard
        icon={<NavigatorIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Used Network Type"
        data={insightsData?.userInsights?.mostUsedNetworkType}
      />
      <ExpandableCard
        icon={<NavigatorIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Used CPU Cores Number"
        data={parseInt(insightsData?.userInsights?.mostUsed3DSPageCPUCores)}
      />
      <ExpandableCard
        icon={<NavigatorIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Used User Plugins List"
        data={insightsData?.userInsights?.mostUsed3DSPagePlugins}
      />
      <ExpandableCard
        icon={<NavigatorIcon className="text-blue-700 w-[9.33px]" />}
        label="Most Used Platform"
        data={insightsData?.userInsights?.mostUsed3DSPagePlatform}
      />
      <ExpandableCard
        icon={<TrustedIcon className="text-blue-700 w-[9.33px]" />}
        label="Trusted Platforms"
        data={insightsData?.userInsights?.trusted3DSPagePlatforms}
      />
      <ExpandableCard
        icon={<RulesIcon className="text-blue-700 w-[9.33px]" />}
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
