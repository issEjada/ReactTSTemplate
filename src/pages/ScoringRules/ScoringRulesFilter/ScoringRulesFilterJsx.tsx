import React from "react";
import FilterLayout from "../../../components/Filter/FilterLayout";
import DropdownMenu from "../../../components/DropDown";

import { Controller } from "react-hook-form";
import {
  useScoringRulesFilter,
  type ViewRulesFormValues,
} from "./useScoringRulesFilter";

const ToolTipQuestionMark = React.lazy(
  () => import("../../../assets/svg/toolTipQuestionMark.svg?react")
);

export interface RulesFilterProps {
  isOpen: boolean;
  closeDrawer: () => void;
  handleSearchSubmit: (searchData: ViewRulesFormValues) => void;
  filterData: ViewRulesFormValues | undefined;
}

export const ScoringRulesFilterForm = ({
  isOpen,
  closeDrawer,
  filterData,
  handleSearchSubmit,
}: RulesFilterProps) => {
  const {
    onSubmit,
    handleClear,
    control,
    asapectValues,
    controlValues,
    platfromValues,
    riskLevelValues,
    schemeValues,
    statusValues,
    eventSourceDeviceValues,
  } = useScoringRulesFilter(closeDrawer, filterData, handleSearchSubmit);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
    closeDrawer();
  };

  return (
    <FilterLayout
      title="Filter Scoring Rules"
      isOpen={isOpen}
      onClose={closeDrawer}
    >
      <form
        className="flex flex-col justify-between h-[950px]"
        onSubmit={onFormSubmit}
      >
        <div className="relative flex flex-col mt-6">
          <label className="text-sm font-medium dark:text-white">
            Rule Name
          </label>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter Rule Name"
                className="w-[100%] h-[44px] mt-1 p-2 border border-gray-300 rounded-md text-sm dark:bg-[#121418] dark:border-gray-800"
              />
            )}
          />

          <div className="absolute top-[40px] left-[calc(100%-32px)] group">
            <ToolTipQuestionMark className="w-4 h-4 cursor-pointer" />
            <div className="absolute right-full w-32 bg-gray-800 text-white text-xs rounded p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              Enter Rule Name.
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Type Description"
                className="w-[100%] h-[44px] mt-1 p-2 border border-gray-300 rounded-md text-sm dark:bg-[#121418] dark:border-gray-800"
              />
            )}
          />
        </div>

        <DropdownMenu<ViewRulesFormValues>
          control={control}
          name="status"
          label="Status"
          options={statusValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-[100%]"
        />

        <DropdownMenu<ViewRulesFormValues>
          control={control}
          name="riskLevel"
          label="Risk Level"
          options={riskLevelValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-[100%]"
        />

        <DropdownMenu<ViewRulesFormValues>
          control={control}
          name="identifier.eventSourceDevice"
          label="Event Source Device"
          options={eventSourceDeviceValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-[100%]"
        />

        <DropdownMenu<ViewRulesFormValues>
          control={control}
          name="identifier.scheme"
          label="Scheme"
          options={schemeValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-[100%]"
        />

        <DropdownMenu<ViewRulesFormValues>
          control={control}
          name="identifier.aspectCode"
          label="Aspect"
          options={asapectValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-[100%]"
        />

        <DropdownMenu<ViewRulesFormValues>
          control={control}
          name="identifier.controlCode"
          label="Control"
          options={controlValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-[100%]"
        />

        <DropdownMenu<ViewRulesFormValues>
          control={control}
          name="identifier.platform"
          label="Platform"
          options={platfromValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-[100%]"
        />

        <div className="flex gap-4 mb-4">
          <div className="w-[50%]">
            <label className="text-sm font-medium">Date From</label>
            <Controller
              control={control}
              name="fromCreationTimestamp"
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
          <div className="w-[50%]">
            <label className="text-sm font-medium">Date To</label>
            <Controller
              control={control}
              name="toCreationTimestamp"
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

        <div className="flex justify-end gap-2 mb-8 w-[100%]">
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
