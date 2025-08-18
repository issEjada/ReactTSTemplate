import React, { Suspense, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../routes/AppRoutes";
import type { ViewSessionsFormValues } from "../pages/Monitoring/MonitoringFilter/useMonitoringFilter";

const SearchIcon = React.lazy(() => import("../assets/svg/Search.svg?react"));
const FilterIcon = React.lazy(() => import("../assets/svg/Filters.svg?react"));
const PlusIcon = React.lazy(() => import("../assets/svg/plus.svg?react"));

const ArrowIcon = React.lazy(() => import("../assets/svg/ArrowUp.svg?react"));

interface DynamicTableProps<TData extends object> {
  data: TData[];
  columns: ColumnDef<TData>[];
  filterComponent?: React.ReactNode;
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  onFilterStatus?: (status: string) => void;
  statusFilter?: string;
  onClearSearch: () => void;
  onAddNewItem?: () => void;
  error: string | null;
  title: string;
  searchText: string;
  setSearchText: (text: string) => void;
  openFilterModal?: () => void;
  applyFilters: () => void;
  searchPlaceholder?: string;
  showStatusFilter?: boolean;
  statusFilterOptions?: { key: string; label: string }[];
  isMonitoringTable?: boolean;
  isAddNewItem?: boolean;
}

export function DynamicTable<TData extends object>({
  data,
  columns,
  filterComponent,
  totalCount,
  currentPage,
  itemsPerPage,
  setCurrentPage,
  onFilterStatus,
  statusFilter,
  onClearSearch,
  onAddNewItem,
  error,
  title,
  searchText,
  setSearchText,
  openFilterModal,
  applyFilters,
  searchPlaceholder = "Search",
  showStatusFilter = true,
  statusFilterOptions,
  isMonitoringTable = false,
  isAddNewItem = true,
}: DynamicTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable<TData>({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getRowId: (originalRow: ViewSessionsFormValues, index) =>
      originalRow?.id ? `${originalRow.id}-${index}` : `${index}`,
  });
  const navigate = useNavigate();

  if (error) {
    return (
      <div className="w-full h-[75vh] flex items-center justify-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  const onArrowClick = (columnId: string) => {
    const col = table.getColumn(columnId);
    if (!col) return;
    col.toggleSorting(col.getIsSorted() === "asc");
  };

  return (
    <div className="border border-[#E9EAEB] dark:border-gray-800 rounded-lg dark:bg-[#121418]">
      <div className="px-4 sm:px-6 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 flex-wrap">
        {showStatusFilter &&
          onFilterStatus &&
          statusFilter &&
          statusFilterOptions && (
            <div className="w-full sm:w-auto">
              <div className="rounded-lg overflow-hidden border border-gray-300 sm:divide-y-0 divide-y divide-gray-300 sm:flex sm:space-x-0">
                {statusFilterOptions.map((option, idx) => (
                  <button
                    key={option.key}
                    onClick={() => onFilterStatus(option.key)}
                    className={`text-xs h-9 sm:h-10 px-3 w-full sm:w-[90px] ${
                      statusFilter === option.key
                        ? "bg-[#FAFAFA] text-black"
                        : "hover:bg-gray-100 text-black dark:hover:bg-gray-800 dark:text-white"
                    } ${idx > 0 ? "sm:border-l" : ""}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto flex-wrap">
          <div className="relative flex-1 min-w-[180px] sm:min-w-[240px] md:min-w-[400px] max-w-full h-10">
            <button
              type="button"
              title="Search"
              onClick={applyFilters}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              <Suspense>
                <SearchIcon className="w-5 h-5" />
              </Suspense>
            </button>

            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") applyFilters();
              }}
              placeholder={searchPlaceholder}
              className="w-full h-full pl-10 pr-9 text-[13px] sm:text-[14px] text-gray-700 rounded-[8px] border border-[#D5D7DA] outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-gray-300 dark:bg-gray-800 dark:text-white"
            />

            {searchText && (
              <button
                onClick={() => onClearSearch()}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                aria-label="Clear search"
              >
                &#10005;
              </button>
            )}
          </div>

          {filterComponent && (
            <button
              className="shrink-0 flex items-center justify-center gap-2 h-10 px-3 border border-gray-300 rounded-[8px] text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
              onClick={openFilterModal}
            >
              <Suspense>
                <FilterIcon className="w-5 h-5 text-gray-500 dark:text-white" />
              </Suspense>
              <span className="hidden sm:inline">Filter</span>
            </button>
          )}
        </div>
      </div>

      {filterComponent}

      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full table-auto text-sm text-center">
          {table.getRowModel().rows.length > 0 ?
          (
          <thead className="bg-gray-50 text-gray-600 dark:bg-[#121418] dark:border-gray-800 dark:text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b dark:border-gray-800"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 h-[56px] sm:h-[72px] font-medium text-left whitespace-nowrap"
                  >
                    <div className="flex items-center justify-start gap-2">
                      <span>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </span>
                      {(header.id === "deviceId" ||
                        header.id === "sessionId" ||
                        header.id === "name" ||
                        header.id === "id") && (
                        <button onClick={() => onArrowClick(header.column.id)}>
                          <ArrowIcon
                            className={`stroke-gray-600 dark:stroke-white   ${
                              header.column.getIsSorted() === "asc"
                                ? "transform rotate-180 transition-transform"
                                : header.column.getIsSorted() === "desc" &&
                                  "transform rotate-0 transition-transform"
                            }
                              `}
                          />
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          ) : (
            <div className="border-t border-gray-200 dark:border-gray-800 h-[1px] w-full"></div>
          )
          }

          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  {...(isMonitoringTable && {
                    onClick: () => {
                      const { id } = row.original as { id: string | number };
                      navigate(AppRoutes.monitoringView, {
                        state: { id: id.toString() },
                      });
                    },
                  })}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-800 cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 h-[56px] sm:h-[72px] align-middle text-left whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-0">
                  <div className="min-w-[900px] h-[220px] sm:h-[244px] flex items-center justify-center border-[#E9EAEB]">
                    <div className="w-[512px] h-[196px] flex items-center justify-center pt-6 pb-6">
                      <div className="w-[352px] h-[196px] gap-6">
                        <div className="w-[352px] h-[132px] flex flex-col items-center gap-4">
                          <div className="w-12 h-12 rounded-[28px] border-[8px] border-[#EFF8FF] bg-[#D1E9FF] flex items-center justify-center  dark:border-gray-700 ">
                            <Suspense>
                              <SearchIcon className="text-blue-700" />
                            </Suspense>
                          </div>
                          <div className="w-[352px] h-[68px] flex flex-col items-center gap-1">
                            <h1 className="text-[#181D27] text-[16px] leading-[24px] font-semibold text-center h-[24px] dark:text-white">
                              No {title} found
                            </h1>
                            <p className="text-[#535862] text-[14px] leading-[20px] text-center h-[40px] pt-1">
                              Your search “Keyword” did not match any{" "}
                              {title.toLowerCase()}. Please try again or create
                              and add a new{" "}
                              {title.includes("Rules") ? "rule" : "item"}.
                            </p>
                          </div>
                        </div>
                        <div className="w-[352px] flex flex-row gap-3 pt-6">
                          <button
                            type="button"
                            onClick={onClearSearch}
                            className={`${
                              isAddNewItem ? "w-[170px]" : "w-full"
                            } h-10 border border-[#D5D7DA] rounded-[8px] px-4 text-[#414651] text-[14px] font-semibold flex items-center justify-center hover:bg-gray-100 dark:text-white dark:hover:text-black`}
                          >
                            Clear search
                          </button>
                          {isAddNewItem && (
                            <button
                              type="button"
                              onClick={onAddNewItem}
                              className="w-[170px] h-10 bg-blue-700 text-white px-4 border border-blue-700 rounded-[8px] text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-blue-800"
                            >
                              <Suspense>
                                <PlusIcon />
                              </Suspense>
                              Add New{" "}
                              {title.includes("Rules") ? "Rule" : "Item"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex-col sm:flex-row flex justify-between items-center px-4 sm:px-6 py-3 border-t dark:border-gray-800 text-sm text-black dark:text-white gap-3 sm:gap-0">
        <div className="text-center sm:text-left">
          Page {currentPage} of {Math.ceil(totalCount / itemsPerPage)}
        </div>
        <div className="flex w-full sm:w-auto gap-2 sm:space-x-2 text-gray-700">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 w-full sm:w-[87px] h-[36px] border border-gray-300 rounded-lg hover:bg-gray-100 text-black dark:text-white dark:hover:bg-gray-800"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((p) =>
                p < Math.ceil(totalCount / itemsPerPage) ? p + 1 : p
              )
            }
            disabled={currentPage === Math.ceil(totalCount / itemsPerPage)}
            className="px-3 py-2 w-full sm:w-[60px] h-[36px] border border-gray-300 rounded-lg hover:bg-gray-100 text-black dark:text-white dark:hover:bg-gray-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
