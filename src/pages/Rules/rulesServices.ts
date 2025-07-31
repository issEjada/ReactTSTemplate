import { httpClient, getHeaders } from "../../services/api/httpClient";
import { API } from "../../constants/ConstantKeys.constants";
// import { formatTime } from "../../helpers";

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

// 🟦 Internal API helpers

// 🟩 API Methods
export const scoringRulesService = {
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
};
