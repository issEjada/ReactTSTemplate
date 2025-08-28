import { useEffect, useState } from "react";
import {
  monitoringService,
  type GetStatisticsResponse,
} from "../monitoringServices";

export const useSessionActivity = () => {
  const [statisticsData, setStatisticsData] = useState<GetStatisticsResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await monitoringService.getStatistics();
      setStatisticsData(result);
    } catch (err: unknown) {
      console.error("Failed to fetch sessions:", err);
      setError("Error loading sessions data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    sessionActivityData: statisticsData?.sessionsByMonth,
    statisticsData,
    isLoading,
    error,
  };
};
