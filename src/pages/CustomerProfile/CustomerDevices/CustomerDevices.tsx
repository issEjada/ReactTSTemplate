import React, { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DynamicTable } from "../../../components/DynamicTable";
import CustomerDevicesFilter from "../CustomerProfileFilter/CustomerDevicesFilter";
import { useCustomerDevices } from "./useCustomerDevices";
import type { SDKCustomerDeviceInfo } from "../customerProfileServices";
import FullScreenSpinner from "../../../components/FullScreenSpinner";

export const CustomerDevices: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    setCustomerDevicesFilterData,
    customerDevicesData,
    currentPage,
    setCurrentPage,
    loadingState,
    errorValidation,
  } = useCustomerDevices();

  console.log("customer devices data", customerDevicesData);

  const columns = useMemo<ColumnDef<SDKCustomerDeviceInfo>[]>(
    () => [
      { header: "Mobile #", accessorKey: "userMobileNumber" },
      { header: "User ID", accessorKey: "userId" },
      { header: "Client ID", accessorKey: "clientUserId" },
      { header: "Device ID", accessorKey: "deviceUniqueId" },
      { header: "Manufacturers", accessorKey: "deviceManufacturer" },
      { header: "Model", accessorKey: "deviceModel" },
      { header: "OS Systems", accessorKey: "osType" },
      { header: "Reg. Date", accessorKey: "creationTime" },
    ],
    []
  );

  const applyFilters = () => {
    const searchData = {
      deviceUniqueId: searchText.trim() || undefined,
    };
    setCustomerDevicesFilterData(searchData);
    setSearchText("");
  };

  if (loadingState === "loading") {
    return <FullScreenSpinner />;
  }

  if (errorValidation) {
    return <span className="text-red-500">{errorValidation}</span>;
  }

  return (
    <div className="px-5 pb-5 overflow-x-auto">
      <DynamicTable<SDKCustomerDeviceInfo>
        title="Customer Devices"
        headerLeft={
          <h2 className="text-[#181D27] dark:text-white text-[18px] font-semibold">
            Customer Devices
          </h2>
        }
        data={customerDevicesData?.data.userSdkRecords || []}
        columns={columns}
        totalCount={customerDevicesData?.meta.totalItems || 0}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchText={searchText}
        setSearchText={setSearchText}
        onClearSearch={() => {
          setSearchText("");
          setCustomerDevicesFilterData({});
          setCurrentPage(1);
        }}
        filterComponent={
          <CustomerDevicesFilter
            isOpen={isFilterOpen}
            closeDrawer={() => setIsFilterOpen(false)}
            handleSearchSubmit={(data) => {
              setCurrentPage(1);
              console.log("Filter Data: My filter", data);
              setIsFilterOpen(false);
              setCustomerDevicesFilterData(data);
            }}
          />
        }
        openFilterModal={() => setIsFilterOpen(true)}
        applyFilters={applyFilters}
        showStatusFilter={false}
        error={null}
        minimal={false}
        itemsPerPage={10}
      />
    </div>
  );
};
