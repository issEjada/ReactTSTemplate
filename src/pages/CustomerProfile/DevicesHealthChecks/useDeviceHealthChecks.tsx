import { useEffect, useState } from "react";
import {
  CustomerClient,
  type DevicesHealthChecksResponse,
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

  const MOBILE_NUMBER_STORAGE_KEY = localStorage.getItem(
    "customerProfileMobileNumber"
  );
  const USER_ID_STORAGE_KEY = localStorage.getItem("customerProfileUserId");
  console.log(USER_ID_STORAGE_KEY);

  const fetchDevicesHealthChecksData = async () => {
    setLoadingState("loading");

    const data = {
      maxPageSize: 10,
      page: currentPage,
      mobileNumber: MOBILE_NUMBER_STORAGE_KEY,
      userId: USER_ID_STORAGE_KEY,
      fromTimestamp: new Date(
        (
          devicesHealthChecksFilterData.fromTimestamp ||
          new Date().toISOString()
        ).slice(0, 16) + ":00.000Z"
      ).toISOString(),
      toTimestamp: new Date(
        (
          devicesHealthChecksFilterData.toTimestamp || new Date().toISOString()
        ).slice(0, 16) + ":00.000Z"
      ).toISOString(),
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
