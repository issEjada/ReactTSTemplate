import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  monitoringService,
  type GetSessionResponse,
} from "../monitoringServices";
import type { ViewSessionsFormValues } from "../MonitoringFilter/useMonitoringFilter";

export function useMonitoringView() {
  const [data, setData] = useState<GetSessionResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [filters, setFilters] = useState<ViewSessionsFormValues | undefined>(
    undefined
  );

  const location = useLocation();
  const { id } = location.state || {
    id: undefined,
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await monitoringService.getSessionsItem({
        id: id,
        page: currentPage,
        maxPageSize: itemsPerPage,
        ...filters,
      });
      setData(result);
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

  return {
    data,
    isLoading,
    error,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    filters,
    setFilters,
    refetch: fetchData,
  };
}
