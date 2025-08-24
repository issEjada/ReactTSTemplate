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

export const useCustomProfile = () => {
  const [insightsData, setInsightsData] = useState<CustomerInsightsResponse>();
  const [globalFilterData, setGlobalFilterData] =
    useState<CustomerInsightsPayload>();
  const [errorValidation, setErrorValidate] = useState<string>();
  const [loadingState, setLoadingState] = useState<
    "loading" | "success" | "error"
  >("success");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
    const [customerDevicesData, setCustomerDevicesData] = useState<
    CustomerDeviceResponse
  >();

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
      // ...customerDeviceFilters,
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
    if (globalFilterData) {
      fetchCustomerInsightsData();
    }
  }, [globalFilterData]);

    useEffect(() => {
    fetchCustomerDevicesData();
  }, [
    // customerDeviceFilters
  ]);

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
