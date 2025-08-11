import { useState, useEffect } from "react";
import type {
  GetSessionsInterface,
  GetSessionItemInterface,
} from "../monitoringServices";
import { monitoringService } from "../monitoringServices";
import type { ViewSessionsFormValues } from "../MonitoringFilter/useMonitoringFilter";

// 🟨 Format for table
const formatTableData = (
  data: GetSessionsInterface
): GetSessionItemInterface[] => {
  return data.sessions?.map((item) => ({
    ...item,
    id: item.id,
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
  const [filters, setFilters] = useState<ViewSessionsFormValues | undefined>(undefined);

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

const handleSearchSubmit = (searchData: ViewSessionsFormValues) => {
    const filteredData = Object.entries(searchData).reduce(
      (acc, [key, value]) => {
        if (typeof value === "string" && value.trim() !== "") {
          (acc as any)[key] = value;
          setCurrentPage(1);
        } else if (typeof value === "number" && value !== 0) {
          (acc as any)[key] = value;
          setCurrentPage(1);
        } else if (typeof value === "object" && value !== null) {
          const filteredIdentifier = Object.entries(value).reduce(
            (idAcc, [idKey, idValue]) => {
              if (typeof idValue === "string" && idValue.trim() !== "") {
                (idAcc as any)[idKey] = idValue;
              }
              return idAcc;
            },
            {}
          );
 
          if (Object.keys(filteredIdentifier).length > 0) {
            (acc as any)[key] = filteredIdentifier;
            setCurrentPage(1);
          }
        }
        return acc;
      },
      {} as GetSessionItemInterface[]
    );
    setData(filteredData);
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
    handleSearchSubmit
  };
};
