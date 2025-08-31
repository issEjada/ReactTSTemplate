import { useEffect, useState } from "react";
import {
  CustomerClient,
  type CustomerDeviceResponse,
  type CustomerDevicesPayload,
  type CustomerInsightsPayload,
  type CustomerInsightsResponse,
} from "./customerProfileServices";

export interface CustomerDevice {
  mobileNumber: string;
  userId: string;
  clientUserId: string;
  deviceId: string;
  manufacturer: string;
  model: string;
  osType: string;
  creationTimestamp: string;
}

const MOBILE_NUMBER_STORAGE_KEY = "customerProfileMobileNumber";

export const useCustomProfile = () => {
  const [insightsData, setInsightsData] = useState<CustomerInsightsResponse>();
  const [globalFilterData, setGlobalFilterData] =
    useState<CustomerInsightsPayload>(() => {
      const storedMobileNumber = localStorage.getItem(
        MOBILE_NUMBER_STORAGE_KEY
      );
      return storedMobileNumber ? { userMobileNumber: storedMobileNumber } : {};
    });
  const [errorValidation, setErrorValidate] = useState<string>();
  const [loadingState, setLoadingState] = useState<
    "loading" | "success" | "error"
  >("success");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [customerDevicesData, setCustomerDevicesData] =
    useState<CustomerDeviceResponse>();

  const fetchCustomerInsightsData = async () => {
    setLoadingState("loading");
    const data: CustomerInsightsPayload = {
      ...globalFilterData,
    };
    await CustomerClient.getCustomerInsightsData(data)
      .then((value) => {
        setInsightsData(value);
        setLoadingState("success");
        setErrorValidate(undefined);
      })
      .catch((error) => {
        setInsightsData(undefined);
        console.error("Error fetching data:", error.message);
        setErrorValidate(error.message);
        setLoadingState("error");
      });
  };

  const fetchCustomerDevicesData = async () => {
    setLoadingState("loading");

    if (globalFilterData) {
      globalFilterData.userId = insightsData?.userInfo.userId;
      globalFilterData.clientUserId = insightsData?.userInfo.clientUserId;
    }

    const data: CustomerDevicesPayload = {
      maxPageSize: itemsPerPage,
      page: currentPage,
      ...globalFilterData,
    };

    await CustomerClient.getCustomerDeviceData(data)
      .then((value) => {
        setCustomerDevicesData(value);
        setLoadingState("success");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoadingState("error");
        setErrorValidate(error.message);
      });
  };

  useEffect(() => {
    if (globalFilterData?.userMobileNumber) {
      localStorage.setItem(
        MOBILE_NUMBER_STORAGE_KEY,
        globalFilterData.userMobileNumber
      );
      fetchCustomerInsightsData();
    } else if (globalFilterData && !globalFilterData.userMobileNumber) {
      localStorage.removeItem(MOBILE_NUMBER_STORAGE_KEY);
      setInsightsData(undefined);
      setErrorValidate(undefined);
    }
  }, [globalFilterData]);

  useEffect(
    () => {
      fetchCustomerDevicesData();
    },
    [
    ]
  );

  return {
    insightsData,
    setGlobalFilterData,
    errorValidation,
    loadingState,
    setItemsPerPage,
    setCurrentPage,
    customerDevicesData,
  };
};
