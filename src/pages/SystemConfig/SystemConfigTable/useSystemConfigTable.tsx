import { useEffect, useState } from "react";
import { LoadingState } from "../../../types/types";
import {
  SystemConfigServices,
  type GetConfigurationItem,
  type GetConfigurationResponse,
} from "../systemConfigService";

export interface ConfigurationFormValues {
  name?: string;
}

export const useSystemConfigTable = () => {
  const [data, setData] = useState<GetConfigurationItem[]>([]);
  const [loadingState, setloadingState] = useState<LoadingState>();
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<ConfigurationFormValues | undefined>(
    undefined
  );

  const fetchData = async () => {
    setloadingState(LoadingState.Loading);
    setError(null);

    await SystemConfigServices.getConfigurationList({
      page: currentPage,
      maxPageSize: itemsPerPage,
      ...filters,
    })
      .then((result: GetConfigurationResponse) => {
        setData((result.data?.systemConfigurations || []));
        setTotalCount(result.meta ? result.meta.totalItems || 0 : 0);
      })
      .catch((err) => {
        console.error("Failed to fetch system Configuration:", err);
        setError(err);
        setloadingState(LoadingState.Error);
      })
      .finally(() => {
        setloadingState(LoadingState.Success);
      });
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
  };
};
