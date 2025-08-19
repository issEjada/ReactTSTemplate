import { httpClient, getHeaders } from "../../services/api/httpClient";
import { API } from "../../constants/ConstantKeys.constants";

export interface CustomerInsightsPayload {
  userId?: string;
  clientUserId?: string;
  userMobileNumber?: string;
}

interface BlacklistedDevice {
  uniqueId: string;
  model: string;
  manufacturer: string;
}

export interface CustomerInsightsResponse {
  userInfo: {
    userId: string;
    clientUserId: string;
    mobileNumber: string;
  };
  userInsights: {
    avgDeviceSpaceUtilization: number;
    avgInstalledAppsCount: number;
    minInstalledAppsCount: number;
    maxInstalledAppsCount: number;
    mostUsedOSType: string[];
    mostUsedAndroidOSVersion: string[];
    mostUsedAndroidSerialNumber: string[];
    mostUsedIOSSystemVersion: string[];
    mostUsedIOSTimezone: string[];
    mostUsualDeviceNumberOfSIMCards: number[];
    mostUsedDeviceIP: string[];
    trustedDeviceIPs: string[];
    mostUsedDeviceCityFromIP: string[];
    trustedDeviceCitiesFromIP: string[];
    mostUsedDeviceCountryFromIP: string[];
    trustedDeviceCountriesFromIP: string[];
    mostUsedDeviceLocationFromIP: string[];
    trustedDeviceLocationsFromIP: string[];
    mostUsedDeviceGPSLocation: string[];
    trustedDeviceGPSLocations: string[];
    mostUsedDeviceCityFromGPS: string[];
    mostUsedDeviceCountryFromGPS: string[];
    mostUsed3DSPageIP: string[];
    trusted3DSPageIPs: string[];
    mostUsed3DSPageCityFromIP: string[];
    trusted3DSPageCitiesFromIP: string[];
    mostUsed3DSPageCountryFromIP: string[];
    trusted3DSPageCountriesFromIP: string[];
    mostUsed3DSPageLocationFromIP: string[];
    trusted3DSPageLocationsFromIP: string[];
    mostUsedNetworkCarrier: string[];
    trustedNetworkCarrier: string[];
    mostUsedWiFiSSID: string[];
    trustedWiFiSSID: string[];
    blacklistedDevices: BlacklistedDevice[];
    mostUsedGMTZone: string[];
    mostUsedNetworkType: string[];
    mostUsed3DSPagePlatform: string[];
    trusted3DSPagePlatforms: string[];
    mostUsed3DSPageCPUCores: string;
    mostUsed3DSPagePlugins: string[];
    mostUsedMaskedCard: string[];
    trustedMaskedCards: string[];
  };
}

export class CustomerClient {
  static getCustomerInsightsData(
    data: CustomerInsightsPayload
  ): Promise<CustomerInsightsResponse> {
    console.log("user Mobile", data.userMobileNumber);
    return httpClient
      .get(`${import.meta.env.VITE_API_BASE_URL}${API.customerInsights}`, {
        headers: getHeaders(),
        params: {
          userMobileNumber: data.userMobileNumber,
          userId: data.userId,
          clientUserId: data.clientUserId,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(
          error.response?.data.message +
            "\n" +
            error.response?.data.descriptionEn
        );
      });
  }

}
