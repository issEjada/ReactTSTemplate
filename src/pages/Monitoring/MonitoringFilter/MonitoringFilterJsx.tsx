import React from "react";
import FilterLayout from "../../../components/Filter/FilterLayout";
import DropdownMenu from "../../../components/DropDown";
import ToolTipQuestionMark from "../../../assets/svg/ToolTipQuestionMark.svg";
import { Controller } from "react-hook-form";
import {
  useMonitoringFilter,
  type ViewSessionsFormValues,
} from "./useMonitoringFilter";

export interface SessionsFilterProps {
  isOpen: boolean;
  closeDrawer: () => void;
  handleSearchSubmit: (searchData: ViewSessionsFormValues) => void;
  filterData: ViewSessionsFormValues | undefined;
}

export const MonitoringFilterForm = ({
  isOpen,
  closeDrawer,
  filterData,
  handleSearchSubmit,
}: SessionsFilterProps) => {
  const {
    onSubmit,
    handleClear,
    control,
    channelValues,
    eventSourceDeviceValues,
    schemeValues,
    eventNameValues,
    countryValues,
    cityValues,
    statusValues,
  } = useMonitoringFilter(closeDrawer, filterData, handleSearchSubmit);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
    closeDrawer();
  };

  return (
    <FilterLayout
      title="Filter Monitoring Sessions"
      isOpen={isOpen}
      onClose={closeDrawer}
    >
      <form
        className="flex flex-col justify-between gap-3"
        onSubmit={onFormSubmit}
      >
        <div className="relative flex flex-col mt-6 gap-[6px]">
          <label className="text-sm font-medium">Session ID</label>
          <Controller
            control={control}
            name="sessionId"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter Session ID"
                className="w-full h-[44px] p-2 border border-gray-300 rounded-md text-sm dark:bg-[#121418] dark:border-gray-800 px-[14px]"
              />
            )}
          />

          <div className="absolute top-[40px] left-[calc(100%-32px)] group">
            <img
              src={ToolTipQuestionMark}
              className="w-4 h-4 cursor-pointer"
              alt="Tooltip"
            />
            <div className="absolute right-full w-32 bg-gray-800 text-white text-xs rounded p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 ">
              Enter Session ID.
            </div>
          </div>
        </div>

        <div className="relative flex flex-col gap-[6px]">
          <label className="text-sm font-medium">Device ID</label>
          <Controller
            control={control}
            name="deviceId"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter Device ID"
                className="w-full h-[44px] p-2 border border-gray-300 rounded-md text-sm dark:bg-[#121418] dark:border-gray-800 px-[14px] "
              />
            )}
          />
        </div>

        <DropdownMenu<ViewSessionsFormValues>
          control={control}
          name="channel"
          label="Channel"
          options={channelValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-full mt-1 rounded-md text-sm"
        />

        <div className="relative flex flex-col gap-[6px]">
          <label className="text-sm font-medium">Identity</label>
          <Controller
            control={control}
            name="customerIdentity"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter Customer Identity"
                className="w-full h-[44px] p-2 border border-gray-300 rounded-md text-sm dark:bg-[#121418] dark:border-gray-800 px-[14px]"
              />
            )}
          />
        </div>

        <DropdownMenu<ViewSessionsFormValues>
          control={control}
          name="eventSourceDevice"
          label="Event Source Device"
          options={eventSourceDeviceValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-full"
        />

        <DropdownMenu<ViewSessionsFormValues>
          control={control}
          name="scheme"
          label="Scheme"
          options={schemeValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-full"
        />

        <DropdownMenu<ViewSessionsFormValues>
          control={control}
          name="eventName"
          label="Event Name"
          options={eventNameValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-full"
        />

        <DropdownMenu<ViewSessionsFormValues>
          control={control}
          name="country"
          label="Country"
          options={countryValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-full"
        />

        <DropdownMenu<ViewSessionsFormValues>
          control={control}
          name="city"
          label="City"
          options={cityValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-full"
        />

        <DropdownMenu<ViewSessionsFormValues>
          control={control}
          name="status"
          label="Status"
          options={statusValues.map((item) => ({
            key: item.key.toUpperCase().replace(/\s+/g, "_"),
            node: item.valueEn,
          }))}
          className="w-full"
        />

        <div className="relative flex flex-col gap-[6px]">
          <label className="text-sm font-medium">IP Address</label>
          <Controller
            control={control}
            name="ip"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter IP Address"
                className="w-full h-[44px] p-2 border border-gray-300 rounded-md text-sm dark:bg-[#121418] dark:border-gray-800 px-[14px]"
              />
            )}
          />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-[49.4%]">
            <label className="text-sm font-medium">Date From</label>
            <Controller
              control={control}
              name="fromDate"
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="
                    w-full h-[44px] mt-1 p-2 rounded-md text-sm
                    border border-gray-300 text-gray-900
                    dark:bg-[#121418] dark:border-gray-800 dark:text-white
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    [color-scheme:light] dark:[color-scheme:dark]:border-gray-800
                  "
                />
              )}
            />
          </div>
          <div className="w-[49.4%]">
            <label className="text-sm font-medium">Date To</label>
            <Controller
              control={control}
              name="toDate"
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="
                    w-full h-[44px] mt-1 p-2 rounded-md text-sm
                    border border-gray-300 text-gray-900
                    dark:bg-[#121418] dark:border-gray-800 dark:text-white
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    [color-scheme:light] dark:[color-scheme:dark]:border-gray-800
                  "
                />
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 w-full">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-primary-700 text-white text-sm px-4 py-2 rounded-md"
          >
            Apply Filters
          </button>
          <button
            type="button"
            className="text-sm text-gray-700 hover:underline hover:bg-gray-100 dark:text-white dark:hover:bg-white dark:hover:text-black border border-gray-200 rounded-md px-4 py-2"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
    </FilterLayout>
  );
};
