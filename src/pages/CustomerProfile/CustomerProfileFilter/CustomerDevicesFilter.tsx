import React from "react";
import ToolTipQuestionMark from "../../../assets/svg/ToolTipQuestionMark.svg";
import FilterLayout from "../../../components/Filter/FilterLayout";
import DropdownMenu from "../../../components/DropDown";
import { Controller, useForm } from "react-hook-form";
 
export type CustomerFilterFormValues = {
  deviceID?: string;
  manufacturer?: string;
  model?: string;
  oSType?: string;
  dateFrom?: string;
  dateTo?: string;
};
 
interface CustomerFilterFormProps {
  isOpen: boolean;
  closeDrawer: () => void;
  handleSearchSubmit: (searchData: CustomerFilterFormValues) => void;
  filterData?: CustomerFilterFormValues;
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
  const { control, reset, getValues } = useForm<CustomerFilterFormValues>({
    defaultValues: {
      deviceID: filterData?.deviceID ?? "",
      manufacturer: filterData?.manufacturer ?? "",
      model: filterData?.model ?? "",
      oSType: filterData?.oSType ?? "",
      dateFrom: filterData?.dateFrom ?? "",
      dateTo: filterData?.dateTo ?? "",
    },
  });
 
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = getValues();
    const cleaned: CustomerFilterFormValues = {
      deviceID: v.deviceID?.trim() ? v.deviceID.trim() : undefined,
      manufacturer: v.manufacturer?.trim() ? v.manufacturer.trim() : undefined,
      model: v.model?.trim() ? v.model.trim() : undefined,
      oSType: v.oSType || undefined,
      dateFrom: v.dateFrom || undefined,
      dateTo: v.dateTo || undefined,
    };
    handleSearchSubmit(cleaned);
    closeDrawer();
  };
 
  const handleClear = () => {
    reset({
      deviceID: "",
      manufacturer: "",
      model: "",
      oSType: "",
      dateFrom: "",
      dateTo: "",
    });
    handleSearchSubmit({});
  };
 
  return (
    <FilterLayout title="Filter Customer Devices" isOpen={isOpen} onClose={closeDrawer}>
      <form className="flex flex-col justify-between h-[672px]" onSubmit={onFormSubmit}>
        {/* Device ID */}
        <div className="relative flex flex-col mt-6">
          <label className="text-sm font-medium dark:text-white">
            Device ID
          </label>
          <Controller
            control={control}
            name="deviceID"
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
 
        {/* Manufacturer */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Manufacturer</label>
          <Controller
            control={control}
            name="manufacturer"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter Manufacturer"
                className="w-full h-[44px] mt-1 p-2 rounded-md text-sm border border-gray-300 dark:bg-[#121418] dark:border-gray-800 dark:text-white"
              />
            )}
          />
        </div>
 
        {/* Model */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Model</label>
          <Controller
            control={control}
            name="model"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Type Model"
                className="w-full h-[44px] mt-1 p-2 rounded-md text-sm border border-gray-300 dark:bg-[#121418] dark:border-gray-800 dark:text-white"
              />
            )}
          />
        </div>
 
        {/* OS Type */}
        <DropdownMenu<CustomerFilterFormValues>
          control={control}
          name="oSType"
          label="OS Type"
          options={OS_TYPES}
          placeholder="Choose OS"
          className="w-full"
        />
 
        {/* Dates */}
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
 
        {/* Actions */}
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