import { useEffect, useState } from "react";
import SecureStorage from "react-secure-storage";
import { httpClient } from "../../services/api/httpClient";
import { API, ConstantKeys } from "../../constants/ConstantKeys.constants";
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
const getHeaders = () => {
  const secureToken = SecureStorage.getItem(ConstantKeys.accessToken);
  const localToken = localStorage.getItem(ConstantKeys.accessToken);
  const token =
    typeof secureToken === "string" && secureToken
      ? secureToken
      : typeof localToken === "string" && localToken
      ? localToken
      : "";
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

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

// 🟨 Format for table
const formatTableData = (
  data: GetScoringRulesInterface
): GetScoringRulesItemInterface[] => {
  return data.scoringRules?.map((item) => ({
    ...item, // Include all properties from the original item
    id: item.id,
    name: item.name,
    description: item.description,
    status: item.status,
    riskLevel: item.riskLevel,
    identifier: item.identifier, // Ensure identifier is included
    creationTimestamp: item.creationTimestamp,
    lastUpdatedTimestamp: item.lastUpdatedTimestamp,
  }));
};

// 🟪 React Hook
const useScoringRules = () => {
  const [data, setData] = useState<GetScoringRulesItemInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<Record<string, string>>({}); // Change any to string

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await scoringRulesService.getScoringRulesList({
        page: currentPage,
        maxPageSize: itemsPerPage,
        ...filters, // Pass all filters directly
      });
      setData(formatTableData(result.data));
      setTotalCount(result.data.meta?.totalItems || 0);
    } catch (err: unknown) {
      // Change any to unknown
      console.error("Failed to fetch scoring rules:", err);
      setError("Error loading rules");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRule = async (id: number) => {
    try {
      await scoringRulesService.deleteRuleById(id);
      fetchData(); // Refresh list after deletion
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, filters]);

  return {
    data,
    isLoading,
    error,
    totalCount,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    filters,
    setFilters,
    refetch: fetchData,
    deleteRule,
  };
};

export default useScoringRules;
