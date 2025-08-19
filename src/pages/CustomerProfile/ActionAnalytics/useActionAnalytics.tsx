import { useEffect, useState } from "react";
import { CustomerClient, type ActionAnalyticsPayload, type ActionAnalyticsResponse } from "../customerProfileServices";

export const useActionAnalytics = () => {
  const [actionAnalyticsData, setActionAnalyticsData] = useState<ActionAnalyticsResponse>();
  const [globalFilterData, setGlobalFilterData] =
    useState<ActionAnalyticsPayload>();
  const [errorValidation, setErrorValidate] = useState<string>();
  const [loadingState, setLoadingState] = useState<
    "loading" | "success" | "error"
  >("success");

  const fetchActionAnalyticsData = async () => {
    setLoadingState("loading");
    const data: ActionAnalyticsPayload = {
      ...globalFilterData,
    };
    await CustomerClient.getActionsAnalyticsData(data)
      .then((value) => {
        setActionAnalyticsData(value);
        setLoadingState("success");
        setErrorValidate(undefined);
      })
      .catch((error) => {
        setActionAnalyticsData(undefined);
        console.error("Error fetching data:", error.message);
        setErrorValidate(error.message);
        setLoadingState("error");
      });
  };

  useEffect(() => {
    if (globalFilterData) {
      fetchActionAnalyticsData();
    }
  }, [globalFilterData]);

  return {
    actionAnalyticsData,
    setGlobalFilterData,
    errorValidation,
    loadingState,
  };
};
