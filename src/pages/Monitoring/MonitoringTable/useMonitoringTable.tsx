import { useState, useEffect } from "react";
import type { GetSessionItemInterface } from "../monitoringServices";
import { monitoringService } from "../monitoringServices";
import type { ViewSessionsFormValues } from "../MonitoringFilter/useMonitoringFilter";
import { cleanObject } from "../../../utils/helpers";
import { LoadingState } from "../../../types/types";

export const useMonitoringTable = () => {
  const [data, setData] = useState<GetSessionItemInterface[]>([]);
  const [loadingState, setloadingState] = useState<LoadingState>();
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [filters, setFilters] = useState<ViewSessionsFormValues | undefined>(
    undefined
  );

  const fetchData = async () => {
    setloadingState(LoadingState.Loading);
    setError(null);
    try {
      const result = await monitoringService.getSessionsList({
        page: currentPage,
        maxPageSize: itemsPerPage,
        ...filters,
      });
      setData(result.data.sessions || []);
      setTotalCount(result.data.meta?.totalItems || 0);
    } catch (err: unknown) {
      console.error("Failed to fetch sessions:", err);
      setError("Error loading sessions data");
      setloadingState(LoadingState.Error);
    } finally {
      setloadingState(LoadingState.Success);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, filters]);

  const handleSearchSubmit = (searchData: ViewSessionsFormValues) => {
    const filteredData = cleanObject(searchData);
    setFilters(filteredData as ViewSessionsFormValues);
    setCurrentPage(1);
  };

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
    handleSearchSubmit,
  };
};
