import { useEffect, useState } from "react";
import { CustomerClient } from "../customerProfileServices";

export const useActionAnalytics = () => {
  const [insightsData, setInsightsData] = useState<CustomerInsightsResponse>();
  const [globalFilterData, setGlobalFilterData] =
    useState<CustomerInsightsPayload>();
  const [errorValidation, setErrorValidate] = useState<string>();
  const [loadingState, setLoadingState] = useState<
    "loading" | "success" | "error"
  >("success");

  const fetchCustomerInsightsData = async () => {
    setLoadingState("loading");
    const data: CustomerInsightsPayload = {
      ...globalFilterData,
    };
    await CustomerClient.getActionsAnalyticsData(data)
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

  useEffect(() => {
    if (globalFilterData) {
      fetchCustomerInsightsData();
    }
  }, [globalFilterData]);

  return {
    insightsData,
    setGlobalFilterData,
    errorValidation,
    loadingState,
  };
};
