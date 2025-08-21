import { httpClient, getHeaders } from "../../services/api/httpClient";

import { API, ConstantKeys } from "../../constants/ConstantKeys.constants";
import type {
  DropDownCategory,
  GetDropDownsResponse,
} from "../../services/dropdownServices";

export interface RuleIdentifierInterface {
  eventSourceDevice: string;
  scoring_scheme?: string;
  scheme?: string;
  aspectCode: string;
  controlCode: string;
  platform: string;
}

export interface GetScoringRulesItemInterface {
  id: number;
  name: string;
  description: string;
  status: string;
  condition: string;
  riskLevel: string;
  identifier: RuleIdentifierInterface;
  creationTimestamp: string;
  lastUpdatedTimestamp: string;
}

export interface GetScoringRulesInterface {
  scoringRules: GetScoringRulesItemInterface[];
  meta?: { totalItems: number };
}

export type TTableColumns = GetScoringRulesItemInterface;

export interface GetScoringRulesListPayload {
  page: number;
  maxPageSize: number;
  filter?: string;
  status?: string;
  [key: string]: any;
}

export interface GetScoringRulesListResponse {
  status: number;
  data: {
    scoringRules: GetScoringRulesItemInterface[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  };
}

export interface DropDownsAttributes {
  key: string;
  value: string;
}

export interface DropDownsPayload {
  code: string;
  attributes?: DropDownsAttributes[];
}

export interface GetRuleByIdPayload {
  id: number;
}

export interface DeleteRuleByIdPayload {
  id: number;
}

export interface GetRuleByIdResponse {
  id: number;
  name: string;
  description: string;
  status: string;
  condition: string;
  riskLevel: string;
  identifier: RuleIdentifierInterface;
  creationTimestamp: string;
  lastUpdatedTimestamp: string;
}

export interface GetRulesParametersPayload {
  identifier: RuleIdentifierInterface;
}

export interface GetRulesParameterResponse {
  sourceParameters: SourceParameter[];
  targetParameters: TargetParameter[];
  comparisonOperators: string[];
  logicalOperators: string[];
}

interface SourceParameter {
  name: string;
  description: string;
  type: string;
  category: string;
  source: string;
  identifier: RuleIdentifierInterface;
  targetParameters: TargetParameter[];
  operators: string[];
}
interface TargetParameter {
  name: string;
  description: string;
  type: string;
  category: string;
}

export interface CreateRulesPayload {
  name: string;
  description: string;
  identifier: RuleIdentifierInterface;
  condition: string;
  riskLevel: string;
}

export interface UpdateRulesPayload {
  name: string;
  riskLevel: string;
  condition: string;
  status: string;
  description: string;
}

export const ScoringRulesServices = {
  getScoringRulesList: async (
    data: GetScoringRulesListPayload
  ): Promise<GetScoringRulesListResponse> => {
    const { page, maxPageSize, ...requestBody } = data;
    const response = await httpClient.post(
      `${import.meta.env.VITE_API_BASE_URL}${API.scoringRules}`,
      requestBody,
      {
        headers: getHeaders(),
        params: {
          page: page,
          maxPageSize: maxPageSize,
        },
      }
    );

    const {
      data: { scoringRules },
      meta,
    } = response.data;

    return {
      status: response.status,
      data: {
        scoringRules,
        meta,
      },
    };
  },

  deleteRuleById: async (id: number): Promise<void> => {
    await httpClient.delete(
      `${import.meta.env.VITE_API_BASE_URL}${API.getRulesById}/${id}`,
      { headers: getHeaders() }
    );
  },

  getHeaders() {
    const accessToken =
      sessionStorage.getItem(ConstantKeys.accessToken) ||
      localStorage.getItem(ConstantKeys.accessToken);
    return {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
  },

  getDropDownsValue(
    data: DropDownsPayload
  ): Promise<GetDropDownsResponse | DropDownCategory> {
    return httpClient
      .post(
        `${import.meta.env.VITE_API_BASE_URL}${API.getDropDownsValue}`,
        data,
        {
          headers: getHeaders(),
          params: { code: data.code },
        }
      )
      .then(
        (response) => response.data as GetDropDownsResponse | DropDownCategory
      )
      .catch((error) => {
        throw new Error(
          `${error.response?.data.message}\n${error.response?.data.descriptionEn}`
        );
      });
  },

  getRulesById(data: GetRuleByIdPayload): Promise<GetRuleByIdResponse> {
    return httpClient
      .get(
        `${import.meta.env.VITE_API_BASE_URL}${API.getRulesById}/${data.id}`,
        { headers: getHeaders() }
      )
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(
          `${error.response?.data.message}\n${error.response?.data.descriptionEn}`
        );
      });
  },

  deleteRulesById(data: DeleteRuleByIdPayload): Promise<void> {
    return httpClient
      .delete(
        `${import.meta.env.VITE_API_BASE_URL}${API.getRulesById}/${data.id}`,
        {
          headers: this.getHeaders(),
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
    data: GetRulesParametersPayload
  ): Promise<GetRulesParameterResponse> {
    return httpClient
      .post(
        `${import.meta.env.VITE_API_BASE_URL}${API.getRuleParameter}`,
        data,
        { headers: getHeaders() }
      )
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(
          `${error.response?.data.message}\n${error.response?.data.descriptionEn}`
        );
      });
  },

  createRule(data: CreateRulesPayload): Promise<void> {
    return httpClient
      .post(`${import.meta.env.VITE_API_BASE_URL}${API.getRulesById}`, data, {
        headers: getHeaders(),
      })
      .then(() => {})
      .catch((error) => {
        throw new Error(`${error.response?.data.descriptionEn}`);
      });
  },

  updateRule(data: UpdateRulesPayload, ruleId: number): Promise<void> {
    return httpClient
      .patch(
        `${import.meta.env.VITE_API_BASE_URL}${API.getRulesById}/${ruleId}`,
        data,
        { headers: getHeaders() }
      )
      .then(() => {})
      .catch((error) => {
        throw new Error(`${error.response?.data.descriptionEn}`);
      });
  },
};

export default ScoringRulesServices;
