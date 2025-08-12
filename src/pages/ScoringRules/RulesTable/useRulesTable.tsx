import { useState, useEffect } from "react";
import {
  ScoringRulesServices,
  type GetScoringRulesItemInterface,
  type GetScoringRulesListResponse,
} from "../rulesServices";
import type { ViewRulesFormValues } from "../RulesFilter/useRulesFilter";
import { cleanObject } from "../../../utils/helpers";

export const useScoringRulesTable = () => {
  const [data, setData] = useState<GetScoringRulesItemInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
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
        setError("Error:");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteRule = (id: number) => {
    ScoringRulesServices.deleteRuleById(id)
      .then(() => {
        fetchData();
      })
      .catch((err) => {
        console.error("Delete error:", err);
      });
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
    handleSearchSubmit,
  };
};
