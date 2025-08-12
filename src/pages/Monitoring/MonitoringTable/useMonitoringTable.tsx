import { useState, useEffect } from "react";
import type { GetSessionItemInterface } from "../monitoringServices";
import { monitoringService } from "../monitoringServices";
import type { ViewSessionsFormValues } from "../MonitoringFilter/useMonitoringFilter";
import { cleanObject } from "../../../utils/helpers";

export const useMonitoringTable = () => {
  const [data, setData] = useState<GetSessionItemInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [filters, setFilters] = useState<ViewSessionsFormValues | undefined>(
    undefined
  );

  const fetchData = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
    handleSearchSubmit,
  };
};
