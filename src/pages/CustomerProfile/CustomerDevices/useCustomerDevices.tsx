import { useEffect, useState } from "react";
import {
  CustomerClient,
  type CustomerDeviceResponse
} from "../customerProfileServices";

export interface CustomerDevicesFilterData {
  sdkId?: string;
  userMobileNumber?: string;
  userId?: string;
  clientUserId?: string;
  deviceUniqueId?: string;
  deviceManufacturer?: string;
  deviceModel?: string;
  osType?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const useCustomerDevices = () => {
  const [customerDevicesData, setCustomerDevicesData] =
    useState<CustomerDeviceResponse>(); 
  const [customerDevicesFilterData, setCustomerDevicesFilterData] =
    useState<CustomerDevicesFilterData>();
  const [errorValidation, setErrorValidate] = useState<string>();
  const [loadingState, setLoadingState] = useState<
    "loading" | "success" | "error"
  >("success");

  const fetchCustomerDevicesData = async () => {
    
    setLoadingState("loading");

    const data = {
      maxPageSize: 10,
      page: 1,
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
    fetchCustomerDevicesData();
  }, []);

  return {
    customerDevicesData,
    customerDevicesFilterData,
    setCustomerDevicesFilterData,
    errorValidation,
    loadingState,
  };
};
