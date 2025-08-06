import { httpClient, getHeaders } from "../../services/api/httpClient";
import { API } from "../../constants/ConstantKeys.constants";
 
export interface GetSessionItemInterface {
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
 
export type TTableColumns = GetSessionItemInterface;
 
export interface GetSessionsListPayload {
  page: number;
  maxPageSize: number;
  filter?: string;
  status?: string;
  [key: string]: string | number | undefined;
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
        sessions : response.data.data,
        meta : response.data.meta ,
      },
    };
  },
 
};