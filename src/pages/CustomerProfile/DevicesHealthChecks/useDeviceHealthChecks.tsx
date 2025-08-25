import { useEffect, useState } from "react";
import {
  CustomerClient,
  type DevicesHealthChecksResponse
} from "../customerProfileServices";

export interface DevicesHealthChecksFilterData {
  deviceId?: string;
  fromTimestamp?: string;
  toTimestamp?: string;
}

export const useDevicesHealthChecks = () => {
  const [devicesHealthChecksData, setDevicesHealthChecksData] =
    useState<DevicesHealthChecksResponse>(); 
  const [devicesHealthChecksFilterData, setDevicesHealthChecksFilterData] =
    useState<DevicesHealthChecksFilterData>({
      fromTimestamp: new Date().toISOString(),
      toTimestamp: new Date().toISOString(),
    });
  const [errorValidation, setErrorValidate] = useState<string>();
  const [loadingState, setLoadingState] = useState<
    "loading" | "success" | "error"
  >("success");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchDevicesHealthChecksData = async () => {
    
    setLoadingState("loading");

    const data = {
      maxPageSize: 10,
      page: currentPage,
      fromTimestamp: new Date(devicesHealthChecksFilterData.fromTimestamp || Date.now()).toISOString(),
      toTimestamp: new Date(devicesHealthChecksFilterData.toTimestamp || Date.now()).toISOString(),
    };

    await CustomerClient.getDevicesHealthChecksData(data)
      .then((value) => {
        setDevicesHealthChecksData(value);
        setLoadingState("success");
        setErrorValidate(undefined);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoadingState("error");
        setErrorValidate(error.message);
      });
  };

  useEffect(() => {
    fetchDevicesHealthChecksData();
  }, [currentPage, devicesHealthChecksFilterData]);

  return {
    devicesHealthChecksData,
    devicesHealthChecksFilterData,
    setDevicesHealthChecksFilterData,
    errorValidation,
    loadingState,
    currentPage,
    setCurrentPage,
  };
};
