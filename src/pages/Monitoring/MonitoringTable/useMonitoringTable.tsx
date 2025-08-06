import { useState, useEffect } from "react";
import type {
  GetSessionsInterface,
  GetSessionItemInterface,
} from "../monitoringServices";
import { monitoringService } from "../monitoringServices";
import type { ViewRulesFormValues } from "../MonitoringFilter/useMonitoringFilter";

// 🟨 Format for table
const formatTableData = (
  data: GetSessionsInterface
): GetSessionItemInterface[] => {
  return data.sessions?.map((item) => ({
    ...item,
    sessionId: item.sessionId,
    deviceId: item.deviceId,
    channel: item.channel,
    industry: item.industry,
    ip: item.ip,
    country: item.country,
    city: item.city,
    status: item.status,
    creationTimestamp: item.creationTimestamp,
    lastUpdatedTimestamp: item.lastUpdatedTimestamp,
  }));
};

export const useMonitoringTable = () => {
  const [data, setData] = useState<GetSessionItemInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [filters, setFilters] = useState<ViewRulesFormValues | undefined>(undefined);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await monitoringService.getSessionsList({
        page: currentPage,
        maxPageSize: itemsPerPage,
        ...filters,
      });
      setData(formatTableData(result.data));
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

  console.log("Monitoring Data:", data);

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
  };
};
