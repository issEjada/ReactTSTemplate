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
const USER_ID_STORAGE_KEY = "customerProfileUserId";
const CLIENT_USER_ID_STORAGE_KEY = "customerProfileClientUserId";

export const useCustomProfile = () => {
  const [insightsData, setInsightsData] = useState<CustomerInsightsResponse>();
  const [globalFilterData, setGlobalFilterData] =
    useState<CustomerInsightsPayload>(() => {
      const storedMobileNumber = localStorage.getItem(
        MOBILE_NUMBER_STORAGE_KEY
      );
      const storedUserId =
        localStorage.getItem(USER_ID_STORAGE_KEY) ?? undefined;
      const storedClientUserId =
        localStorage.getItem(CLIENT_USER_ID_STORAGE_KEY) ?? undefined;

      return storedMobileNumber
        ? {
            userMobileNumber: storedMobileNumber,
            userId: storedUserId,
            clientUserId: storedClientUserId,
          }
        : ({} as CustomerInsightsPayload);
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
    const hasFilters =
      globalFilterData?.userMobileNumber ||
      globalFilterData?.userId ||
      globalFilterData?.clientUserId;

    if (globalFilterData?.userMobileNumber) {
      localStorage.setItem(
        MOBILE_NUMBER_STORAGE_KEY,
        globalFilterData.userMobileNumber
      );
    } else {
      localStorage.removeItem(MOBILE_NUMBER_STORAGE_KEY);
    }

    if (globalFilterData?.userId) {
      localStorage.setItem(USER_ID_STORAGE_KEY, globalFilterData.userId);
    } else {
      localStorage.removeItem(USER_ID_STORAGE_KEY);
    }

    if (globalFilterData?.clientUserId) {
      localStorage.setItem(
        CLIENT_USER_ID_STORAGE_KEY,
        globalFilterData.clientUserId
      );
    } else {
      localStorage.removeItem(CLIENT_USER_ID_STORAGE_KEY);
    }

    if (hasFilters) {
      fetchCustomerInsightsData();
    } else {
      setInsightsData(undefined);
      setErrorValidate(undefined);
    }
  }, [globalFilterData]);

  useEffect(() => {
    fetchCustomerDevicesData();
  }, []);

  return {
    insightsData,
    setGlobalFilterData,
    errorValidation,
    loadingState,
    setItemsPerPage,
    setCurrentPage,
    customerDevicesData,
    globalFilterData,
  };
};
