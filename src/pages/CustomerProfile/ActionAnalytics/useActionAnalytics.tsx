import { useEffect, useState } from "react";
import {
  CustomerClient,
  type ActionAnalyticsPayload,
  type ActionAnalyticsResponse,
} from "../customerProfileServices";

export const useActionAnalytics = (
  userMobileNumber: string,
  currentPage: number,
  itemsPerPage: number,
) => {
  const [actionAnalyticsData, setActionAnalyticsData] =
    useState<ActionAnalyticsResponse>();
  const [errorValidation, setErrorValidate] = useState<string>();
  const [loadingState, setLoadingState] = useState<
    "loading" | "success" | "error"
  >("success");

  console.log("User Mobile Number:", userMobileNumber);

  const fetchActionAnalyticsData = async () => {
    setLoadingState("loading");
    const data: ActionAnalyticsPayload = {
      userMobileNumber: userMobileNumber,
      page: currentPage,
      maxPageSize: itemsPerPage
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
    fetchActionAnalyticsData();
    console.log("currentPage", currentPage)
  }, [currentPage, userMobileNumber]);

  return {
    actionAnalyticsData,
    errorValidation,
    loadingState,
  };
};
