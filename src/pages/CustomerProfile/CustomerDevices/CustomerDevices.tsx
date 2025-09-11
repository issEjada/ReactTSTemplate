import React, { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import CustomerDevicesFilter from "../CustomerProfileFilter/CustomerDevicesFilter";
import { useCustomerDevices } from "./useCustomerDevices";
import type { SDKCustomerDeviceInfo } from "../customerProfileServices";
import { DynamicTable } from "../../../components/DynamicTable";
import Spinner from "../../../components/Spinner";

export type CustomerDevicesProps = {
  userInfo: {
    userId?: string;
    clientUserId?: string;
    userMobileNumber?: string;
  };
};

export const CustomerDevices: React.FC<CustomerDevicesProps> = ({
  userInfo,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    setCustomerDevicesFilterData,
    customerDevicesData,
    currentPage,
    setCurrentPage,
    loadingState,
    errorValidation,
  } = useCustomerDevices({ userInfo });

  const columns = useMemo<ColumnDef<SDKCustomerDeviceInfo>[]>(
    () => [
      {
        header: "Mobile #",
        accessorKey: "userMobileNumber",
        meta: {
          isSorted: true,
        },
      },
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
    return (
      <Spinner
        mode="overlay"
        size="sm"
        overlayClassName="h-full w-full bg-transparent"
      />
    );
  }

  if (errorValidation) {
    return <span className="text-red-500">{errorValidation}</span>;
  }

  return (
    <div className="px-5 pb-5 overflow-x-auto">
      <DynamicTable<SDKCustomerDeviceInfo>
        title="Customer Devices"
        isCustomerProfile={true}
        headerLeft={
          <h2 className="text-gray-900 dark:text-white text-[18px] font-semibold">
            Customer Devices
          </h2>
        }
        data={customerDevicesData?.data.userSdkRecords || []}
        loadingState={loadingState}
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
