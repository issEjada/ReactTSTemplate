import { useState, useEffect } from "react";
import {
  ScoringRulesServices,
  type GetScoringRulesItemInterface,
  type GetScoringRulesListResponse,
  type UpdateRulesPayload,
} from "../scoringRulesServices";
import type { ViewRulesFormValues } from "../ScoringRulesFilter/useScoringRulesFilter";
import { cleanObject } from "../../../utils/helpers";
import { LoadingState } from "../../../types/types";

export const useScoringRulesTable = () => {
  const [data, setData] = useState<GetScoringRulesItemInterface[]>([]);
  const [loadingState, setloadingState] = useState<LoadingState>();
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<ViewRulesFormValues | undefined>(
    undefined
  );

  const handleSearchSubmit = (searchData: ViewRulesFormValues) => {
    const filteredData = cleanObject(searchData);
    setFilters(filteredData as ViewRulesFormValues);
    setCurrentPage(1);
  };

  const fetchData = async () => {
    setloadingState(LoadingState.Loading);
    setError(null);

    await ScoringRulesServices.getScoringRulesList({
      page: currentPage,
      maxPageSize: itemsPerPage,
      ...filters,
    })
      .then((result: GetScoringRulesListResponse) => {
        setData(result.data.scoringRules || []);
        setTotalCount(result.data.meta?.totalItems || 0);
      })
      .catch((err) => {
        console.error("Failed to fetch scoring rules:", err);
        setError(err);
        setloadingState(LoadingState.Error);
      })
      .finally(() => {
        setloadingState(LoadingState.Success);
      });
  };

  const deleteRule = (id: number) => {
    setloadingState(LoadingState.Loading);
    ScoringRulesServices.deleteRuleById(id)
      .then(() => {
        fetchData();
        setloadingState(LoadingState.Success);
      })
      .catch((err) => {
        console.error("Delete error:", err);
        setloadingState(LoadingState.Error);
      });
  };

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    setloadingState(LoadingState.Loading);
    const newStatus = currentStatus === "ENABLED" ? "DISABLED" : "ENABLED";
    const payload: UpdateRulesPayload = {
      status: newStatus,
    };

    try {
      await ScoringRulesServices.updateRule(payload, id);
      fetchData();
      setloadingState(LoadingState.Success);
    } catch (err) {
      console.error("Failed to update rule status:", err);
      setError("Failed to update rule status.");
      setloadingState(LoadingState.Error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, filters]);

  return {
    data,
    loadingState,
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
    handleSearchSubmit,
    handleToggleStatus,
  };
};
