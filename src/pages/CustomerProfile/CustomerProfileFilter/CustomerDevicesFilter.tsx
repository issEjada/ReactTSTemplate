import React from "react";
import ToolTipQuestionMark from "../../../assets/svg/ToolTipQuestionMark.svg";
import FilterLayout from "../../../components/Filter/FilterLayout";
import DropdownMenu from "../../../components/DropDown";
import { Controller, useForm } from "react-hook-form";
import type { CustomerDevicesFilterData } from "../CustomerDevices/useCustomerDevices";
 
interface CustomerFilterFormProps {
  isOpen: boolean;
  closeDrawer: () => void;
  handleSearchSubmit: (searchData: CustomerDevicesFilterData) => void;
  filterData?: CustomerDevicesFilterData;
}
 
const OS_TYPES = [
  { key: "IOS", node: "iOS" },
  { key: "ANDROID", node: "Android" },
  { key: "WINDOWS", node: "Windows" },
  { key: "MACOS", node: "macOS" },
  { key: "LINUX", node: "Linux" },
  { key: "OTHER", node: "Other" },
];
 
const CustomerDevicesFilter: React.FC<CustomerFilterFormProps> = ({
  isOpen,
  closeDrawer,
  handleSearchSubmit,
  filterData,
}) => {
  const { control, reset, getValues } = useForm<CustomerDevicesFilterData>({
    defaultValues: {
      deviceUniqueId: filterData?.deviceUniqueId ?? "",
      deviceManufacturer: filterData?.deviceManufacturer ?? "",
      deviceModel: filterData?.deviceModel ?? "",
      osType: filterData?.osType ?? "",
      dateFrom: filterData?.dateFrom ?? "",
      dateTo: filterData?.dateTo ?? "",
    },
  });
 
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = getValues();
    const cleaned: CustomerDevicesFilterData = {
      deviceUniqueId: v.deviceUniqueId?.trim() ? v.deviceUniqueId.trim() : undefined,
      deviceManufacturer: v.deviceManufacturer?.trim() ? v.deviceManufacturer.trim() : undefined,
      deviceModel: v.deviceModel?.trim() ? v.deviceModel.trim() : undefined,
      osType: v.osType || undefined,
      dateFrom: v.dateFrom || undefined,
      dateTo: v.dateTo || undefined,
    };
    handleSearchSubmit(cleaned);
    closeDrawer();
  };
 
  const handleClear = () => {
    reset();
    handleSearchSubmit({});
  };
 
  return (
    <FilterLayout title="Filter Customer Devices" isOpen={isOpen} onClose={closeDrawer}>
      <form className="flex flex-col justify-between h-[672px]" onSubmit={onFormSubmit}>
        <div className="relative flex flex-col mt-6">
          <label className="text-sm font-medium dark:text-white">
            Device ID
          </label>
          <Controller
            control={control}
            name="deviceUniqueId"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter Device ID"
                className="w-[95%] h-[44px] mt-1 p-2 border border-gray-300 rounded-md text-sm dark:bg-[#121418] dark:border-gray-800"
              />
            )}
          />
 
          <div className="absolute top-[40px] left-[calc(95%-32px)] group">
            <img
              src={ToolTipQuestionMark}
              className="w-4 h-4 cursor-pointer"
              alt="Tooltip"
            />
            <div className="absolute right-full w-32 bg-gray-800 text-white text-xs rounded p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                Enter Device ID.
            </div>
          </div>
        </div>
 
        <div className="flex flex-col">
          <label className="text-sm font-medium">deviceManufacturer</label>
          <Controller
            control={control}
            name="deviceManufacturer"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter deviceManufacturer"
                className="w-full h-[44px] mt-1 p-2 rounded-md text-sm border border-gray-300 dark:bg-[#121418] dark:border-gray-800 dark:text-white"
              />
            )}
          />
        </div>
 
        <div className="flex flex-col">
          <label className="text-sm font-medium">deviceModel</label>
          <Controller
            control={control}
            name="deviceModel"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Type deviceModel"
                className="w-full h-[44px] mt-1 p-2 rounded-md text-sm border border-gray-300 dark:bg-[#121418] dark:border-gray-800 dark:text-white"
              />
            )}
          />
        </div>
 
        <DropdownMenu<CustomerDevicesFilterData>
          control={control}
          name="osType"
          label="OS Type"
          options={OS_TYPES}
          placeholder="Choose OS"
          className="w-full"
        />
 
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="text-sm font-medium">Date From</label>
            <Controller
              control={control}
              name="dateFrom"
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="w-full h-[44px] mt-1 p-2 rounded-md text-sm border border-gray-300 text-gray-900 dark:bg-[#121418] dark:border-gray-800 dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
                />
              )}
            />
          </div>
          <div className="w-1/2">
            <label className="text-sm font-medium">Date To</label>
            <Controller
              control={control}
              name="dateTo"
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="w-full h-[44px] mt-1 p-2 rounded-md text-sm border border-gray-300 text-gray-900 dark:bg-[#121418] dark:border-gray-800 dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
                />
              )}
            />
          </div>
        </div>
 
        <div className="flex justify-end gap-2 mb-8">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white text-sm px-4 py-2 rounded-md"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="text-sm text-gray-700 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2 hover:bg-gray-100 dark:hover:bg-white dark:hover:text-black"
          >
            Clear
          </button>
        </div>
      </form>
    </FilterLayout>
  );
};
 
export default CustomerDevicesFilter;