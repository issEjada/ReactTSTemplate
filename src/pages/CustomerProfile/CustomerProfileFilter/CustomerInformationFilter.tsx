import React from "react";
const ToolTipQuestionMark = React.lazy(() => import("../../../assets/svg/toolTipQuestionMark.svg?react"));
import FilterLayout from "../../../components/Filter/FilterLayout";
import { Controller, useForm } from "react-hook-form";
 
export type CustomerFilterFormValues = {
  mobileNumber?: string;
  userID?: string;
  clientId?: string;
};
 
interface CustomerFilterFormProps {
  isOpen: boolean;
  closeDrawer: () => void;
  handleSearchSubmit: (searchData: CustomerFilterFormValues) => void;
  filterData?: CustomerFilterFormValues;
}
 
 
 
const CustomerInformationFilter: React.FC<CustomerFilterFormProps> = ({
  isOpen,
  closeDrawer,
  handleSearchSubmit,
  filterData,
}) => {
  const { control, reset, getValues } = useForm<CustomerFilterFormValues>({
    defaultValues: {
      mobileNumber: filterData?.mobileNumber ?? "",
      userID: filterData?.userID ?? "",
      clientId: filterData?.clientId ?? "",
    },
  });
 
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = getValues();
    const cleaned: CustomerFilterFormValues = {
      mobileNumber: v.mobileNumber?.trim() ? v.mobileNumber.trim() : undefined,
      userID: v.userID?.trim() ? v.userID.trim() : undefined,
      clientId: v.clientId || undefined,
    };
    handleSearchSubmit(cleaned);
    closeDrawer();
  };
 
  const handleClear = () => {
    reset({ mobileNumber: "", userID: "", clientId: "" });
    handleSearchSubmit({});
  };
 
  return (
    <FilterLayout title="Filter Customer Information" isOpen={isOpen} onClose={closeDrawer}>
      <form className="flex flex-col justify-between h-[520px]" onSubmit={onFormSubmit}>
        <div className="relative flex flex-col mt-6">
          <label className="text-sm font-medium">Mobile Number</label>
          <Controller
            control={control}
            name="mobileNumber"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter Mobile Number"
                className="w-full h-[44px] mt-1 p-2 rounded-md text-sm border border-gray-300 dark:bg-[#121418] dark:border-gray-800 dark:text-white"
              />
            )}
          />
          <div className="absolute top-[40px] right-2 group">
            <ToolTipQuestionMark className="w-4 h-4 cursor-pointer" />
            <div className="absolute right-0 mt-1 w-40 bg-gray-800 text-white text-xs rounded p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              Enter the customer’s mobile number.
            </div>
          </div>
        </div>
 
        {/* User ID */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">User ID</label>
          <Controller
            control={control}
            name="userID"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Type User ID"
                className="w-full h-[44px] mt-1 p-2 rounded-md text-sm border border-gray-300 dark:bg-[#121418] dark:border-gray-800 dark:text-white"
              />
            )}
          />
        </div>
 
        {/* Client ID Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Client ID</label>
          <Controller
            control={control}
            name="clientId"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Type Client ID"
                className="w-full h-[44px] mt-1 p-2 rounded-md text-sm border border-gray-300 dark:bg-[#121418] dark:border-gray-800 dark:text-white"
              />
            )}
          />
        </div>
 
        {/* Actions */}
        <div className="flex justify-end gap-2 mb-2">
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
 
export default CustomerInformationFilter;