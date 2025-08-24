import { useEffect, useState } from "react";
import { monitoringService, type GetStatisticsResponse } from "../monitoringServices";

const data = [
  { Month: "January", Viewed: -400, NotViewed: -400 },
  { Month: "February", Viewed: 1000, NotViewed: -100 },
  { Month: "March", Viewed: 600, NotViewed: -300 },
  { Month: "April", Viewed: 380, NotViewed: -150 },
  { Month: "May", Viewed: 200, NotViewed: 100 },
  { Month: "June", Viewed: 0, NotViewed: -200 },
  { Month: "July", Viewed: 600, NotViewed: 250 },
];

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
    sessionActivityData : data,
    statisticsData,
    isLoading,
    error
  }

}