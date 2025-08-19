import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useCustomProfile = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = searchParams.get("activeCustomerTab");
    return savedTab !== null ? parseInt(savedTab, 10) : 0;
  });
  const [totalListSize, setTotalListSize] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCustomerDevice, SetFilterCustomerDevice] = useState<string[]>(
    []
  );
  const [popupType, setPopupType] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [errorValidation, setErrorValidate] = useState<string>();
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isGlobalFilterOpen, setIsGlobalFilterOpen] = useState<boolean>(false);

  const tabs = [
    "Customer Insights",
    "Actions Analytics",
    "Customer Devices",
    "Health Check",
  ];

  const handleOpenDrawer = () => {
    setIsFilterOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsFilterOpen(false);
  };

  const handleOpenGlobalDrawer = () => {
    setIsGlobalFilterOpen(true);
  };

  const handleCloseGlobalDrawer = () => {
    setIsGlobalFilterOpen(false);
  };


  const handleSearchSubmit = (searchData: CustomerProfileFormValues) => {
    const sanitizedPhone: string | undefined = searchData.userMobileNumber
      ? searchData.userMobileNumber.replace(/\D/g, "")
      : undefined;

    const globalFilter: Record<string, string> = {};

    if (sanitizedPhone) {
      globalFilter.userMobileNumber = "+" + sanitizedPhone;
    }

    if (searchData.userId) {
      globalFilter.userId = searchData.userId;
    }

    if (searchData.clientUserId) {
      globalFilter.clientUserId = searchData.clientUserId;
    }

    if (Object.keys(globalFilter).length === 0) {
      setErrorValidate(
        "Please enter at least one valid field (Phone Number, User ID, or Client User ID)"
      );
      setActiveTab(0);
      setInsightsData(undefined);
      setAnalyticsData(undefined);
      setAnalyticTableData([]);
      setCustomDeviceTableData([]);
      setHealthCheckTableData([]);
      setGlobalFilterData(undefined);
      return;
    }

    // Set the global filter and reset data
    setGlobalFilterData(globalFilter);
    setErrorValidate(undefined);
    setActiveTab(0);
    setInsightsData(undefined);
    setAnalyticsData(undefined);
    setAnalyticTableData([]);
    setCustomDeviceTableData([]);
    setHealthCheckTableData([]);
  };

  const onClear = () => {
    setActiveTab(0);
    setPhoneNumber("");
    setGlobalFilterData(undefined);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev.toString());
      next.delete("globalFilterData");
      next.delete("activeCustomerTab");
      return next;
    });
    setErrorValidate(undefined);
    setInsightsData(undefined);
    setAnalyticsData(undefined);
    setAnalyticTableData([]);
    setHealthCheckTableData([]);
  };

  const handleFilterDeviceSubmit = (searchData: CustomerDeviceFormValues) => {
    // Reset to first page when applying new filters
    setCurrentPage(1);
    // Convert form data to API filter format
    const filters: Partial<CustomerDevicesPayload> = {
      userMobileNumber: insightsData?.userInfo.mobileNumber,
      userId: insightsData?.userInfo.userId,
      clientUserId: insightsData?.userInfo.clientUserId,
      deviceUniqueId: searchData.deviceUniqueId,
      deviceManufacturer: searchData.deviceManufacturer,
      deviceModel: searchData.deviceModel,
      osType: searchData.osType,
      from: searchData.from,
      to: searchData.to,
    };
    console.log("Applying device filters:", filters);
    setCustomerDeviceFilters(filters);
  };

  const handleHealthCheckFilter = () => {
    if (healthCheckDateRange) {
      console.log("Filtering with date range:", healthCheckDateRange);
      fetchHealthCheckData();
    } else {
      console.log("No date range selected");
    }
  };

  const unBlockFpt = (fptRef: string) => {
    setloadingState(LoadingState.Loading);
    const data: unBlockFptPayload = {
      fptRef: fptRef,
      action: "Unblock",
    };
    CustomerClient.unBlockfpt(data)
      .then(() => {
        setloadingState(LoadingState.Success);
        setPopupType("successModal");
        setIsPopupOpen(true);
        setPopupMessage("The device  have been successfully Blocked.");
        fetchCustomerDevicesData();
      })
      .catch((error) => {
        setPopupType("errorModal");
        setPopupMessage(error);
        setIsPopupOpen(true);
      });
  };

  useEffect(() => {
    fetchCustomerDevicesData();
  }, [customerDeviceFilters]);

  useEffect(() => {
    if (globalFilterData) {
      fetchCustomerInsightsData();
    }
  }, [globalFilterData]);

  useEffect(() => {
    const storedGlobalFilterData = searchParams.get("globalFilterData");
    if (storedGlobalFilterData) {
      try {
        setGlobalFilterData(JSON.parse(storedGlobalFilterData));
      } catch (error) {
        console.error("Error parsing globalFilterData from URL:", error);
      }
    }
  }, []);

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set("activeCustomerTab", activeTab.toString());
      if (globalFilterData) {
        prev.set("globalFilterData", JSON.stringify(globalFilterData));
      }
      return prev;
    });
    if (activeTab === 1 && globalFilterData) {
      fetchAnalyticsData();
    }
  }, [activeTab, setSearchParams, globalFilterData]);

  const content = [
    <CustomerInsights insightsData={insightsData} />,
    <ActionAnalytics
      currentPage={currentPage}
      formattedTableData={analyticTableData}
      isPopupOpen={isPopupOpen}
      itemsPerPage={itemsPerPage}
      popupType={popupType}
      setCurrentPage={setCurrentPage}
      setIsPopupOpen={setIsPopupOpen}
      setItemsPerPage={setItemsPerPage}
      setPopupType={setPopupType}
      totalListSize={totalListSize}
      analyticData={analyticData}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
    />,
    <CustomerDevices
      currentPage={currentPage}
      formattedTableData={customDeviceTableData}
      itemsPerPage={itemsPerPage}
      setCurrentPage={setCurrentPage}
      setIsPopupOpen={setIsPopupOpen}
      setItemsPerPage={setItemsPerPage}
      totalListSize={totalListSize}
      SetFilterCustomerDevice={SetFilterCustomerDevice}
      handleFilterDeviceSubmit={handleFilterDeviceSubmit}
      filterCustomerDevice={filterCustomerDevice}
      isPopupOpen={isPopupOpen}
      popupMessage={popupMessage}
      popupType={popupType}
      unBlockFpt={unBlockFpt}
      filterDropdowns={
        fptStatusData?.map((item) => {
          return {
            id: item.key,
            label: item.valueEn,
          };
        }) ?? []
      }
      handleOpenDrawer={handleOpenDrawer}
      handleCloseDrawer={handleCloseDrawer}
      isFilterOpen={isFilterOpen}
      filterData={customerDeviceFilters}
    />,
    <HealthCheck
      currentPage={currentPage}
      formattedTableData={healthCheckTableData}
      itemsPerPage={itemsPerPage}
      setCurrentPage={setCurrentPage}
      setItemsPerPage={setItemsPerPage}
      totalListSize={totalListSize}
      handleHealthCheckFilter={handleHealthCheckFilter}
      healthCheckDateRange={healthCheckDateRange}
      setHealthCheckDateRange={setHealthCheckDateRange}
    />,
  ];

  useEffect(() => {
    const { userMobileNumber, userId, clientUserId } = globalFilterData ?? {};
    const hasValidFilter = !!(userMobileNumber || userId || clientUserId);
    if (!hasValidFilter) {
      setloadingState(LoadingState.Success);
      return;
    }

    switch (activeTab) {
      case 0:
        setCurrentPage(1);
        setItemsPerPage(10);
        setTotalListSize(0);
        fetchCustomerInsightsData();
        break;

      case 1:
        setCurrentPage(1);
        setItemsPerPage(10);
        setTotalListSize(0);
        fetchAnalyticsData();
        break;

      case 2:
        setCurrentPage(1);
        setItemsPerPage(10);
        setTotalListSize(0);
        fetchFptStatus();
        fetchCustomerDevicesData();
        break;

      case 3:
        setCurrentPage(1);
        setItemsPerPage(10);
        setTotalListSize(0);
        fetchHealthCheckData();
        break;

      default:
        setCurrentPage(1);
        setItemsPerPage(10);
        setTotalListSize(0);
        fetchCustomerInsightsData();
        break;
    }
  }, [activeTab]);
  return {
    activeTab,
    setActiveTab,
    tabs,
    content,
    loadingState,
    phoneNumber,
    setPhoneNumber,
    handleSearchSubmit,
    insightsData,
    totalListSize,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    analyticTableData,
    popupType,
    setPopupType,
    isPopupOpen,
    setIsPopupOpen,
    selectedItem,
    setSelectedItem,
    errorValidation,
    setErrorValidate,
    isFilterOpen,
    handleOpenDrawer,
    handleCloseDrawer,
    onClear,
    handleOpenGlobalDrawer,
    handleCloseGlobalDrawer,
    isGlobalFilterOpen,
    globalFilterData,
  };
};
