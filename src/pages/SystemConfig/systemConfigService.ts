import { httpClient, getHeaders } from "../../services/api/httpClient";
import { API } from "../../constants/ConstantKeys.constants";
import type { PaginationMeta } from "../../types/types";

export interface GetConfigurationDataPayload {
  maxPageSize?: number;
  page: number;
  name?: string;
}

export interface UpdateConfigurationPayload {
  description: string;
  properties?: {
    action: string;
    values: Record<string, string | number | undefined>[];
  };
}

export interface GetConfigurationItem {
  id: number;
  name: string;
  description: string;
  allowAddRow: boolean;
}

export interface ConfigurationData {
  systemConfigurations: GetConfigurationItem[];
}

export interface GetConfigurationResponse {
  data: ConfigurationData;
  meta: PaginationMeta;
}

export interface GetConfigurationByIdResponse {
  id: number;
  name: string;
  description: string;
  properties: Properties;
  creationTimestamp: string;
  lastUpdatedTimestamp: string;
}

export interface Properties {
  attributes: Attribute[];
  values: Value[];
  meta: PaginationMeta;
}

export interface Attribute {
  key: string;
  name: string;
  editable: boolean;
  hasLov: boolean;
  mandatory: boolean;
}

export interface Value {
  id?: string;
  [key: string]: string | number | undefined;
}

export const SystemConfigServices = {
  getConfigurationList: async (
    data: GetConfigurationDataPayload
  ): Promise<GetConfigurationResponse> => {
    const { page, maxPageSize, ...requestBody } = data;
    return httpClient
      .post(
        `${import.meta.env.VITE_API_BASE_URL}${API.systemConfiguration}`,
        requestBody,
        {
          headers: getHeaders(),
          params: { page: page, maxPageSize: maxPageSize },
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
  },

  getConfigurationById(
    configurationId: string,
    data: GetConfigurationDataPayload
  ): Promise<GetConfigurationByIdResponse> {
    const { page, maxPageSize } = data;
    return httpClient
      .get(
        `${import.meta.env.VITE_API_BASE_URL}${
          API.systemConfigurationById
        }/${configurationId}`,
        {
          headers: getHeaders(),
          params: { page: page, maxPageSize: maxPageSize },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data.descriptionEn +
          "\n" +
          error.response?.data.descriptionEn;
        throw new Error(errorMessage);
      });
  },

  async updateConfiguration(
    configurationId: string,
    payload: UpdateConfigurationPayload
  ): Promise<void> {
    try {
      const response = await httpClient.patch(
        `${import.meta.env.VITE_API_BASE_URL}${
          API.systemConfigurationById
        }/${configurationId}`,
        payload,
        {
          headers: getHeaders(),
          validateStatus: (status) => status === 204 || status === 200,
        }
      );

      // No content expected - just verify successful status
      if (response.status !== 204 && response.status !== 200) {
        const errorMessage = `Unexpected status code: ${response.status}`;
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.descriptionEn ||
        error.descriptionEn ||
        "Failed to update configuration";
      throw new Error(errorMessage);
    }
  },
};

export default SystemConfigServices;
