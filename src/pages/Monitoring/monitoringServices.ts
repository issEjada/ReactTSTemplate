import { httpClient, getHeaders } from "../../services/api/httpClient";
import { API } from "../../constants/ConstantKeys.constants";

export interface GetSessionItemInterface {
  id: number;
  sessionId: string;
  deviceId: string;
  channel: string;
  industry: string;
  ip: string;
  country: string;
  city: string;
  status: "VIEWED" | "NOT_VIEWED";
  creationTimestamp: string;
  lastUpdatedTimestamp: string;
}

export interface GetSessionsInterface {
  sessions: GetSessionItemInterface[];
  meta?: { totalItems: number };
}

export interface GetSessionInterface {
  sessionId: string;
  customerIdentity: string;
  channel: string;
  platform: string;
  ipAddresses: string[];
  locations: string[];
  deviceId: string;
  isIncognito: boolean;
  activeXEnabled: boolean;
  riskScore: string;
  lastEvent: {
    eventCode: string;
    eventName: string;
    transactionId: string;
    transactionAmount: string;
    maskedCard: string;
    phoneNumber: string;
    timestamp: string;
  };
  transactionSummary: {
    total: number;
    currency: string;
  };
  userAgent: string;
  timezone: string[];
  updatedAt: string;
}

export type TTableColumns = GetSessionItemInterface;

export interface GetSessionsListPayload {
  page: number;
  maxPageSize: number;
  filter?: string;
  status?: string;
  [key: string]: string | number | undefined;
}

export interface GetSessionPayload {
  page: number;
  maxPageSize: number;
  id: string;
}

export interface GetSessionsListResponse {
  status: number;
  data: {
    sessions: GetSessionItemInterface[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  };
}

export interface EventItem {
  eventCode: string;
  eventName: string;
  transactionId: string;
  transactionAmount: number;
  transactionCurrency: string;
  maskedCard: string;
  phoneNumber: string;
  riskScore: number;
  eventTimestamp: string;
  ip: string;
  country: string;
  city: string;
}

export interface PaginationMeta {
  totalPages: number;
  totalItems: number;
}

export interface EventsData {
  data: EventItem[];
  meta: PaginationMeta;
}

export interface GetStatisticsResponse{
  totalSessions: number,
  viewedSessions: number,
  notViewedSessions: number,
  viewedPercentage: number,
  notViewedPercentage: number
}

export interface GetSessionResponse {
  id: number;
  sessionId: string;
  deviceId: string;
  globalId: string;
  channel: string;
  ip: string[];
  isp: string[];
  country: string[];
  city: string[];
  coordinates: string[];
  locationGeohash: string[];
  userPlugins: string[];
  webGLVendor: string;
  webGLRenderer: string;
  webGLFingerprint: string;
  userPlatform: string;
  screenDimensions: string;
  screenColorDepth: string;
  canvasFingerprint: string;
  cpuCores: number;
  customerSessionId: string;
  identitySession: string;
  userAgent: string;
  userTimezone: string[];
  incognitoModeEnabled: string;
  activeXEnabled: string;
  transactionSum: number;
  currencies: string[];
  events: EventsData;
  lastUpdatedTimestamp: string;
  customerIdentity: string;
}

export const monitoringService = {
  getSessionsList: async (
    data: GetSessionsListPayload
  ): Promise<GetSessionsListResponse> => {
    const { page, maxPageSize, ...requestBody } = data;
    const response = await httpClient.post(
      `${import.meta.env.VITE_API_BASE_URL}${API.monitoring}`,
      requestBody,
      {
        headers: getHeaders(),
        params: {
          page: page,
          maxPageSize: maxPageSize,
        },
      }
    );

    return {
      status: response.status,
      data: {
        sessions: response.data.data,
        meta: response.data.meta,
      },
    };
  },

  getSessionsItem: async (
    data: GetSessionPayload
  ): Promise<GetSessionResponse> => {
    const { id, page, maxPageSize } = data;
    const response = await httpClient.get(
      `${import.meta.env.VITE_API_BASE_URL}${API.viewMonitoring}/${id}`,
      {
        headers: getHeaders(),
        params: {
          page: page,
          maxPageSize: maxPageSize,
        },
      }
    );

    return response.data;
  },

  getStatistics: async (): Promise<GetStatisticsResponse> => {
    const response = await httpClient.get(
      `${import.meta.env.VITE_API_BASE_URL}${API.statistics}`,
      {
        headers: getHeaders(),
      }
    );

    return response.data;
  },
};
