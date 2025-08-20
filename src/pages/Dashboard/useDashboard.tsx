import { useEffect, useState } from "react";
import { API } from "../../constants/ConstantKeys.constants";
import { httpClient } from "../../services/api/httpClient";

interface Statistics {
  totalRules: number;
  activeRules: number;
  inactiveRules: number;
}

export interface GetHomeInterface {
  scoringRules: Statistics;
  decisionRules: Statistics;
  events: Statistics;
}

export const homeSerevice = {
  getHomeStatistics: async (): Promise<GetHomeInterface> => {
    const response = await httpClient.get(
      `${import.meta.env.VITE_API_BASE_URL}${API.getHomeStatistics}`
    );
    const { data } = response;

    return data;
  },
};

export function useDashboard() {
  const [data, setData] = useState<GetHomeInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const fetchHomeStatistics = async () => {
    try {
      setLoading(true);
      const result = await homeSerevice.getHomeStatistics();
      setData(result);
    } catch (err) {
      console.error("Failed to fetch home statistics:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeStatistics();

    // optional: auto refresh every 5 min like react-query did
    const interval = setInterval(() => {
      fetchHomeStatistics();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch: fetchHomeStatistics };
}
