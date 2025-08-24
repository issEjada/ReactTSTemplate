import { httpClient, getHeaders } from "../../services/api/httpClient";
import { API } from "../../constants/ConstantKeys.constants";

export interface PaginationMeta {
  totalPages: number;
  totalItems: number;
}

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

export interface ActionAnalyticsPayload {
  userId?: string;
  clientUserId?: string;
  userMobileNumber?: string;
  maxPageSize?: number;
  page?: number;
}

interface ActionsStatistics {
  numberOfTotalActions: number;
  numberOfAcceptedActions: number;
  numberOfRejectedActions: number;
  numberOfMFAActions: number;
  numberOfSCAActions: number;
  numberOfAuthenticatedActions: number;
}

interface ActionsTrustedIndicators {
  avgAmount: string;
  maxAmount: string;
  mostUsedTargetCountry: string[];
  trustedTargetCountries: string[];
  mostUsedTargetMerchant: string[];
  trustedTargetMerchants: string[];
  mostUsedCreditorAgentIdentifier: string[];
  trustedCreditorAgentIdentifiers: string[];
  mostUsedTargetBank: string[];
  trustedTargetBanks: string[];
  mostUsedMaskedCard: string[];
  trustedMaskedCards: string[];
}
export interface UserEvent {
  eventName: string;
  actionsStatistics: ActionsStatistics;
  actionsTrustedIndicators: ActionsTrustedIndicators;
}

export interface ActionAnalyticsResponse {
  userInfo: {
    userId: string;
    clientUserId: string;
    mobileNumber: string;
  };
  actionsAnalytics: {
    numberOfTotalActions: number;
    numberOfAcceptedActions: number;
    numberOfRejectedActions: number;
    numberOfMFAActions: number;
    numberOfSCAActions: number;
    numberOfAuthenticatedActions: number;
    userEvents: UserEvent[];
    meta: PaginationMeta;
  };
}

export interface CustomerDevicesPayload {
  maxPageSize?: number;
  page: number;
  userMobileNumber?: string;
  userId?: string;
  clientUserId?: string;
  deviceUniqueId?: string;
  deviceManufacturer?: string;
  deviceModel?: string;
  osType?: string;
  from?: string;
  to?: string;
}

export interface SDKCustomerDeviceInfo {
  sdkId: string;
  userMobileNumber: string;
  userId: string;
  clientUserId: string;
  deviceUniqueId: string;
  deviceManufacturer: string;
  deviceModel: string;
  osType: string;
  creationTime: string;
}

export interface CustomerDeviceResponse {
  data: {
    userSdkRecords: SDKCustomerDeviceInfo[];
  };
  meta: PaginationMeta;
}

export interface DevicesHealthChecksResponse {
  deviceId: string;
  manufacturer: string;
  model: string;
  appInstallationId: string;
  checkTimestamp: string;
  negativeHealthCheck: string;
}

export interface DevicesHealthChecksPayload {
  maxPageSize: number;
  page: number;
  fromTimestamp?: string;
  toTimestamp?: string;
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

  static getActionsAnalyticsData(
    data: ActionAnalyticsPayload
  ): Promise<ActionAnalyticsResponse> {
    return httpClient
      .get(`${import.meta.env.VITE_API_BASE_URL}${API.actionAnalytics}`, {
        headers: getHeaders(),
        params: {
          userMobileNumber: data.userMobileNumber,
          userId: data.userId,
          clientUserId: data.clientUserId,
          maxPageSize: data.maxPageSize,
          page: data.page,
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

  static getCustomerDeviceData(
    data: CustomerDevicesPayload
  ): Promise<CustomerDeviceResponse> {
    const { page, maxPageSize, userMobileNumber, ...requestBody } = data;
    return httpClient
      .post(
        `${import.meta.env.VITE_API_SDK_URL}${API.customerDevices}`,
        requestBody,
        {
          headers: getHeaders(),
          params: {
            userMobileNumber: userMobileNumber,
            maxPageSize: maxPageSize,
            page: page,
          },
        }
      )
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

  static getDevicesHealthChecksData(
    data: DevicesHealthChecksPayload
  ): Promise<DevicesHealthChecksResponse[]> {
    const { page, maxPageSize, ...requestBody } = data;
    return httpClient
      .get(`${import.meta.env.VITE_API_SDK_URL}${API.healthCheck}`, {
        headers: getHeaders(),
        params: {
          maxPageSize: maxPageSize,
          page: page,
          ...requestBody,
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
