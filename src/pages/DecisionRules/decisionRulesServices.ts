import { httpClient, getHeaders } from "../../services/api/httpClient";

import { API } from "../../constants/ConstantKeys.constants";
import type {
  DropDownCategory,
  GetDropDownsResponse,
} from "../../services/dropdownServices";
import type { GetRulesParameterResponse } from "../ScoringRules/scoringRulesServices";

export interface DecisionRulesFormValues {
  id?: string;
  name?: string;
  description?: string;
  identifier?: DecisionRulesIdentifier;
  eventName?: string;
  criteriaName?: string;
  condition?: string;
  decision?: string;
  status?: string;
  fromCreationTimestamp?: string;
  toCreationTimestamp?: string;
}

export interface DecisionRulesIdentifier {
  eventSourceDevice: string;
  scheme: string;
}

export interface GetDecisionDataPayload {
  maxPageSize?: number;
  page: number;
  name?: string;
  description?: string;
  identifier?: DecisionRulesIdentifier;
  eventName?: string;
  criteriaName?: string;
  decision?: string;
  status?: string;
  fromCreationTimestamp?: string;
  toCreationTimestamp?: string;
}
export interface GetDecisionRuleByIdPayload {
  id: number;
}

export interface CreateDecisionPayload {
  name: string;
  identifier: DecisionRulesIdentifier;
  eventCode: string;
  criteriaName: string;
  condition: string;
  decision: string;
  description: string;
}

export interface UpdateDecisionPayload {
  name?: string;
  description?: string;
  eventCode?: string;
  criteriaName?: string;
  condition?: string;
  decision?: string;
  status?: string;
}

export interface GetDecisionParametersPayload {
  identifier: DecisionRulesIdentifier;
}

export interface GetEventDropDownsPayload {
  identifier: DecisionRulesIdentifier;
  status: string | null;
}

export interface GetDecisionRulesItem {
  id: number;
  name: string;
  description: string;
  status: string;
  identifier: DecisionRulesIdentifier;
  decision: string;
  creationTimestamp: string;
  lastUpdatedTimestamp: string;
}

export interface DecisionData {
  decisionRules: GetDecisionRulesItem[];
}
export interface GetDecisionRulesResponse {
  data: DecisionData;
  meta: {
    totalPages: number;
    totalItems: number;
  };
}

export interface GetDecisionRuleByIdResponse {
  id: number;
  name: string;
  description: string;
  identifier: DecisionRulesIdentifier;
  eventName: string;
  criteriaName: string;
  condition: string;
  decision: string;
  status: string;
  creationTimestamp: string;
  lastUpdatedTimestamp: string;
}

export interface DeleteRuleByIdPayload {
  id: number;
}

export const DecisionRulesServices = {
  getDecisionData: async (
    data: GetDecisionDataPayload
  ): Promise<GetDecisionRulesResponse> => {
    const { page, maxPageSize, ...requestBody } = data;
    return httpClient
      .post(
        `${import.meta.env.VITE_API_BASE_URL}${API.decisionRules}`,
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

  getDecisionRulesById(
    data: GetDecisionRuleByIdPayload
  ): Promise<GetDecisionRuleByIdResponse> {
    return httpClient
      .get(
        `${import.meta.env.VITE_API_BASE_URL}${API.getDecisionRuleById}/${
          data.id
        }`,
        {
          headers: getHeaders(),
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

  deleteDecisionRules(data: DeleteRuleByIdPayload): Promise<void> {
    return httpClient
      .delete(
        `${import.meta.env.VITE_API_BASE_URL}${API.getDecisionRuleById}/${
          data.id
        }`,
        {
          headers: getHeaders(),
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

  createDecisionRule(data: CreateDecisionPayload): Promise<void> {
    return httpClient
      .post(
        `${import.meta.env.VITE_API_BASE_URL}${API.getDecisionRuleById}`,
        data,
        {
          headers: getHeaders(),
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

  updateDecisionRule(
    data: UpdateDecisionPayload,
    ruleId: number
  ): Promise<void> {
    return httpClient
      .patch(
        `${import.meta.env.VITE_API_BASE_URL}${
          API.getDecisionRuleById
        }/${ruleId}`,
        data,
        {
          headers: getHeaders(),
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

  getRulesParameters(
    data: GetDecisionParametersPayload
  ): Promise<GetRulesParameterResponse> {
    return httpClient
      .post(
        `${import.meta.env.VITE_API_BASE_URL}${API.getDecisionParameter}`,
        data,
        {
          headers: getHeaders(),
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

  getEventDropDownsValue(
    data: GetEventDropDownsPayload
  ): Promise<GetDropDownsResponse | DropDownCategory> {
    return httpClient
      .post(
        `${import.meta.env.VITE_API_BASE_URL}${API.getEventDropDownsValues}`,
        data,
        {
          headers: getHeaders(),
        }
      )
      .then(
        (response) => response.data as GetDropDownsResponse | DropDownCategory
      )
      .catch((error) => {
        throw new Error(
          error.response?.data.message +
            "\n" +
            error.response?.data.descriptionEn
        );
      });
  },
};
