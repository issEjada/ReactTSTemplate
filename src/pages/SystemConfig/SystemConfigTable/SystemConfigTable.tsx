import React, { useMemo, useState } from "react";
import {
  useSystemConfigTable,
  type ConfigurationFormValues,
} from "./useSystemConfigTable";
import type { ColumnDef } from "@tanstack/react-table";
import { DynamicTable } from "../../../components/DynamicTable";
import FullScreenSpinner from "../../../components/FullScreenSpinner";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../routes/AppRoutes";

const LockIcon = React.lazy(
  () => import("../../../assets/svg/settings.svg?react")
);
const BackgroundCircle = React.lazy(
  () => import("../../../assets/svg/BackgroundCircle.svg?react")
);
const EditIcon = React.lazy(() => import("../../../assets/svg/Edit.svg?react"));

type SystemConfig = {
  configId: number;
  configName: string;
  category: string;
  configDescription: string;
  allowAddRow: boolean;
};

export const SystemConfigTable = () => {
  const {
    data,
    loadingState,
    error,
    totalCount,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    filters,
    setFilters,
  } = useSystemConfigTable();

  const [searchText, setSearchText] = useState("");

  const applyFilters = () => {
    const newFilters: ConfigurationFormValues = {
      ...filters,
      name: searchText.trim(),
    };

    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchText("");
    setFilters({});
    setCurrentPage(1);
  };

  const navigate = useNavigate();
  const handleViewSystemConfig = (data: {
    id: number;
    name: string;
    desc: string;
    allowAddRow: boolean;
  }) => {
    navigate(AppRoutes.viewSystemConfiguration, { state: data });
  };

  const columns = useMemo(() => getColumns(handleViewSystemConfig), []);

  if (loadingState === "loading") {
    return <FullScreenSpinner />;
  }

  return (
    <div className="p-6 bg-white shadow-sm dark:bg-black">
      <div className="mb-6">
        <div className="flex items-center justify-between pt-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            System Configurations
            <span className="ml-2 text-sm text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
              {totalCount} Rule
              {totalCount !== 1 && "s"}
            </span>
          </h2>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Keep track of customers and their security levels.
        </p>
      </div>

      {totalCount === 0 && !filters ? (
        <div className="w-full h-[75vh] flex flex-col items-center justify-center rounded-md border">
          {/* Wrapper for icon + background */}
          <div className="relative flex items-center justify-center mb-6 w-[80px] h-[80px]">
            {/* Background Circle positioned behind */}
            <div className="absolute z-0 w-[80px] h-[80px] flex items-center justify-center">
              <BackgroundCircle
                className="
                  absolute
                  left-1/2 top-[28%]
                  -translate-x-1/2 -translate-y-1/2
                  w-[400px] sm:w-[400px] md:w-[400px] lg:w-[400px]
                  h-[400px]
                  pointer-events-none select-none
                  z-0
                "
              />
            </div>

            {/* Lock Icon in styled border */}
            <div className="relative z-10 flex items-center justify-center bg-white border border-[#D5D7DA] rounded-[16px] gap-[8px] p-[4px]">
              <div className="flex items-center justify-center bg-white border border-black/10 rounded-[12px] sm:w-[52px] sm:h-[52px] p-[12px] shadow-[0px_1px_2px_0px_#0000001A,0px_3px_3px_0px_#00000017]">
                <LockIcon className="sm:w-[28px] sm:h-[28px]" />
              </div>
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="text-lg font-medium text-gray-900 mb-1 mt-[48px] dark:text-white">
            You don’t have any configurations yet
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            You don’t have any configurations added yet.
          </p>
        </div>
      ) : (
        <DynamicTable<SystemConfig>
          data={(data ?? []).map((item) => ({
            configId: item.id,
            configName: item.name,
            category: item.name ?? "",
            configDescription: item.description ?? "",
            allowAddRow: item.allowAddRow,
          }))}
          columns={columns}
          totalCount={totalCount}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          onClearSearch={handleClearSearch}
          title="System configurations"
          error={error}
          searchText={searchText}
          setSearchText={setSearchText}
          applyFilters={applyFilters}
          searchPlaceholder="Search"
          showStatusFilter={true}
          onFilterStatus={() => {}}
          statusFilter={"All"}
          statusFilterOptions={[]}
        />
      )}
    </div>
  );
};

const getColumns = (
  handleViewSystemConfig: (rowData: {
    id: number;
    name: string;
    desc: string;
    allowAddRow: boolean;
  }) => void
): ColumnDef<SystemConfig>[] => [
  {
    header: "Configuration Name",
    accessorKey: "configName",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-gray-900  dark:text-white">
          {String(row.original.configName ?? "")}
        </span>
        <span className="text-xs text-gray-500 dark:text-white">
          {/* {row.original.category} */} category
        </span>
      </div>
    ),
  },
  {
    header: "Description",
    accessorKey: "configDescription",
  },
  {
    header: "",
    accessorKey: "actions",
    cell: ({ row }) => {
      const rule = row.original;
      const rowData = {
        id: rule.configId,
        name: rule.configName,
        desc: rule.configDescription,
        allowAddRow: rule.allowAddRow,
      };
      return (
        <div onClick={() => handleViewSystemConfig(rowData)}>
          <EditIcon className="sm:w-[20px] sm:h-[20px] text-[#A4A7AE]" />
        </div>
      );
    },
  },
];
