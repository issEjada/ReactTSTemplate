import { useEffect, useState } from "react";
import { CustomerClient, type CustomerInsightsPayload, type CustomerInsightsResponse } from "./customerProfileServices";


export const useCustomProfile = () => {
  const [insightsData, setInsightsData] = useState<CustomerInsightsResponse>();
  const [globalFilterData, setGlobalFilterData] = useState<CustomerInsightsPayload>();
  
  const fetchCustomerInsightsData = async () => {
    
    
    const data: CustomerInsightsPayload = {
      ...globalFilterData,
    };
    await CustomerClient.getCustomerInsightsData(data)
      .then((value) => {
        setInsightsData(value);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
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
  }

};
