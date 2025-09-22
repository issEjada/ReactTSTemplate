import React, { useEffect, useMemo, useState } from "react";
import {
  useSystemConfigTable,
  type ConfigurationFormValues,
} from "./useSystemConfigTable";
import type { ColumnDef } from "@tanstack/react-table";
import { DynamicTable } from "../../../components/DynamicTable";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../routes/AppRoutes";
import Spinner from "../../../components/Spinner";
import { TableFallback } from "../../../components/TableFallback";

const SettingsIcon = React.lazy(
  () => import("../../../assets/svg/settings.svg?react")
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
    setItemsPerPage,
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
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (loadingState === "success" && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [loadingState, isInitialLoad]);

  if (loadingState === "loading" && isInitialLoad) {
    return <Spinner />;
  }

  return (
    <div className="p-6 bg-white shadow-sm dark:bg-black">
      <div className="mb-6">
        <div className="flex items-center justify-between pt-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            System Configurations
            <span className="ml-2 text-sm text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
              {totalCount} System Configuration
              {totalCount !== 1 && "s"}
            </span>
          </h2>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Keep track of customers and their security levels.
        </p>
      </div>

      {totalCount == 0 && !filters ? (
        <TableFallback
          icon={
            <SettingsIcon className="sm:w-[28px] sm:h-[28px] text-gray-500" />
          }
          title="You don’t have any configurations yet"
          description={<>Start configuring your system now.</>}
        />
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
          setItemsPerPage={setItemsPerPage}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          onClearSearch={handleClearSearch}
          title="System configurations"
          loadingState={loadingState}
          error={error}
          searchText={searchText}
          setSearchText={setSearchText}
          applyFilters={applyFilters}
          searchPlaceholder="Search"
          showStatusFilter={true}
          statusFilter={"All"}
          statusFilterOptions={[]}
          onRowClick={(rowData) => {
            const data = {
              id: rowData.configId,
              name: rowData.configName,
              desc: rowData.configDescription,
              allowAddRow: rowData.allowAddRow,
            };
            handleViewSystemConfig(data);
          }}
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
    meta: {
      isSorted: true,
    },
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-gray-900  dark:text-white">
          {String(row.original.configName ?? "")}
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
          <EditIcon className="sm:w-[20px] sm:h-[20px] text-gray-400" />
        </div>
      );
    },
  },
];
