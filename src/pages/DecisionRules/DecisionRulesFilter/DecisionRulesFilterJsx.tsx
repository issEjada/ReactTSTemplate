import React from "react";
import FilterLayout from "../../../components/Filter/FilterLayout";
import DropdownMenu from "../../../components/DropDown";
import ToolTipQuestionMark from "../../../assets/svg/ToolTipQuestionMark.svg";
import { Controller } from "react-hook-form";
import { useDecisionRulesFilter } from "./useDecisionRulesFilter";
import type { DecisionRulesFormValues } from "../decisionRulesServices";

interface DecisionFilterFormProps {
  isOpen: boolean;
  closeDrawer: () => void;
  handleSearchSubmit: (searchData: DecisionRulesFormValues) => void;
  filterData: DecisionRulesFormValues | undefined;
}
export const DecisionRulesFilter = ({
  isOpen,
  closeDrawer,
  handleSearchSubmit,
  filterData,
}: DecisionFilterFormProps) => {
  const {
    onSubmit,
    handleClear,
    control,
    schemeValues,
    statusValues,
    eventSourceDeviceValues,
    decisionValues,
    eventNameValues,
  } = useDecisionRulesFilter(closeDrawer, filterData, handleSearchSubmit);

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
        className="flex flex-col justify-between h-full"
        onSubmit={onFormSubmit}
      >
        <div className="relative flex flex-col mt-6">
          <label className="text-sm font-medium dark:text-gray-600">
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
                className="w-[95%] h-[44px] mt-1 p-2 border border-gray-300 rounded-md text-sm dark:bg-[#121418] dark:border-gray-800"
              />
            )}
          />
        </div>

        <div className="flex gap-2">
          <div>
            <label className="text-sm font-medium">Criteria Name</label>
            <Controller
              control={control}
              name="criteriaName"
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Type Description"
                  className="w-[95%] h-[44px] mt-1 p-2 border border-gray-300 rounded-md text-sm dark:bg-[#121418] dark:border-gray-800"
                />
              )}
            />
          </div>

          <DropdownMenu<DecisionRulesFormValues>
            control={control}
            name="status"
            label="Status"
            options={statusValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-[47%]"
          />
        </div>

        <DropdownMenu<DecisionRulesFormValues>
          control={control}
          name="identifier.eventSourceDevice"
          label="Event Source Device"
          options={eventSourceDeviceValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-[95%]"
        />

        <DropdownMenu<DecisionRulesFormValues>
          control={control}
          name="identifier.scheme"
          label="Scheme"
          options={schemeValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-[95%]"
        />

        <DropdownMenu<DecisionRulesFormValues>
          control={control}
          name="eventName"
          label="Event Name"
          options={eventNameValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-[95%]"
        />

        <DropdownMenu<DecisionRulesFormValues>
          control={control}
          name="decision"
          label="Decision"
          options={decisionValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-[95%]"
        />

        <div className="flex gap-4 mb-4">
          <div className="w-[47%]">
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
          <div className="w-[45.5%]">
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

        <div className="flex justify-end gap-2 mb-8 w-[95%]">
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
