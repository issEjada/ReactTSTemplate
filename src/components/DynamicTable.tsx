import React, { Suspense, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import Spinner from "./Spinner";
import type { LoadingState } from "../types/types";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../routes/AppRoutes";

const SearchIcon = React.lazy(() => import("../assets/svg/Search.svg?react"));
const FilterIcon = React.lazy(() => import("../assets/svg/Filters.svg?react"));
const PlusIcon = React.lazy(() => import("../assets/svg/plus.svg?react"));
const ArrowIcon = React.lazy(() => import("../assets/svg/ArrowUp.svg?react"));

type CustomColumnMeta = {
  isSorted?: boolean;
};
export type CustomColumnDef<TData extends object> = ColumnDef<TData, any> & {
  meta?: CustomColumnMeta;
};
interface DynamicTableProps<TData extends object> {
  data: TData[];
  columns: CustomColumnDef<TData>[];
  filterComponent?: React.ReactNode;
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  onFilterStatus?: (status: string) => void;
  statusFilter?: string;
  onClearSearch?: () => void;
  onAddNewItem?: () => void;
  error: string | null;
  title: string;
  searchText?: string;
  setSearchText?: (text: string) => void;
  openFilterModal?: () => void;
  applyFilters?: () => void;
  searchPlaceholder?: string;
  showStatusFilter?: boolean;
  statusFilterOptions?: { key: string; label: string }[];
  isMonitoringTable?: boolean;
  onRowClick?: (rowData: TData) => void;
  minimal?: boolean;
  minimalWithPagination?: boolean;
  loadingState?: LoadingState;
  headerRightExtra?: React.ReactNode;
  headerLeft?: React.ReactNode;
  isCustomerProfile?: boolean;
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
  onRowClick,
  minimal = false,
  minimalWithPagination = false,
  headerLeft = false,
  headerRightExtra = false,
  isCustomerProfile = false,
  loadingState,
}: DynamicTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [submittedText, setSubmittedText] = useState<string>("");
  const navigate = useNavigate();

  const table = useReactTable<TData>({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getRowId: (originalRow: any, index) =>
      originalRow?.id ? `${originalRow.id}-${index}` : `${index}`,
  });

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
    <div
      className={`relative border border-gray-200 ${
        isCustomerProfile
          ? "dark:border-gray-800 rounded-lg bg-white dark:bg-darkTheme"
          : "bg-white dark:border-gray-800 rounded-lg dark:bg-darkTheme"
      }`}
    >
      {!(minimal || minimalWithPagination) && (
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="min-w-[120px] flex items-center gap-3">
              {headerLeft}
              {showStatusFilter &&
                onFilterStatus &&
                statusFilter &&
                statusFilterOptions && (
                  <div className="inline-flex rounded-lg overflow-hidden border border-gray-300">
                    {statusFilterOptions.map((option, idx) => (
                      <button
                        key={option.key}
                        onClick={() => onFilterStatus(option.key)}
                        className={`text-xs h-9 sm:h-10 px-3 w-[90px] min-w-fit ${
                          statusFilter === option.key
                            ? "bg-gray-50 text-black"
                            : "hover:bg-gray-100 text-black dark:hover:bg-gray-800 dark:text-white"
                        } ${idx > 0 ? "border-l" : ""}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto flex-wrap">
              {applyFilters && (
                <div className="relative flex-1 min-w-[180px] sm:min-w-[240px] md:min-w-[400px] max-w-full h-10">
                  <button
                    type="button"
                    title="Search"
                    onClick={() => {
                      applyFilters();
                      setSubmittedText(searchText || "");
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                  >
                    <Suspense>
                      <SearchIcon className="w-5 h-5" />
                    </Suspense>
                  </button>

                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText?.(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && applyFilters) {
                        applyFilters();
                        setSubmittedText(searchText || "");
                      }
                    }}
                    placeholder={searchPlaceholder}
                    className="w-full h-full pl-10 pr-9 text-[13px] sm:text-[14px] text-gray-700 rounded-[8px] border border-gray-300 outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-gray-300 dark:bg-gray-800 dark:text-white"
                  />

                  {searchText && onClearSearch && (
                    <button
                      onClick={() => {
                        if (onClearSearch) {
                          onClearSearch();
                        }
                        setSubmittedText("");
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                      aria-label="Clear search"
                    >
                      &#10005;
                    </button>
                  )}
                </div>
              )}

              {filterComponent && openFilterModal && (
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

              {headerRightExtra && (
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto flex-wrap">
                  {headerRightExtra}
                </div>
              )}
            </div>
          </div>

          <div className="w-full sm:w-auto"></div>
        </div>
      )}

      {!minimal && filterComponent}

      <div className="overflow-x-auto relative">
        {loadingState === "loading" && (
          <Spinner
            mode="overlay"
            overlayClassName="h-full w-full bg-transparent"
            size="md"
          />
        )}
        <table
          className={`w-full table-auto text-sm text-center ${
            isCustomerProfile
              ? ""
              : minimal
              ? "min-w-[710px] h-[435px]"
              : "min-w-[900px]"
          }`}
        >
          {table.getRowModel().rows.length > 0 ? (
            <thead
              className={`${
                isCustomerProfile
                  ? "bg-white dark:bg-darkTheme dark:border-gray-800 dark:text-white"
                  : "bg-gray-25 text-gray-600 dark:bg-darkTheme dark:border-gray-800 dark:text-white"
              }`}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b dark:border-gray-800"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 h-[56px] sm:h-[72px] font-medium text-left whitespace-nowrap rounded-lg"
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
                        {(header.column.columnDef as CustomColumnDef<TData>)
                          .meta?.isSorted && (
                          <button
                            title="Sort"
                            onClick={() => onArrowClick(header.column.id)}
                          >
                            <Suspense>
                              <ArrowIcon
                                className={`stroke-gray-600 dark:stroke-white ${
                                  header.column.getIsSorted() === "asc"
                                    ? "transform rotate-180 transition-transform"
                                    : header.column.getIsSorted() === "desc"
                                    ? "transform rotate-0 transition-transform"
                                    : ""
                                }`}
                              />
                            </Suspense>
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
          ) : (
            <div className="border-t border-gray-200 dark:border-gray-800 h-[1px] w-full" />
          )}

          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  {...(isCustomerProfile && isMonitoringTable
                    ? {
                        onClick: () => {
                          const { id } = row.original as {
                            id: string | number;
                          };
                          navigate(AppRoutes.monitoringView, {
                            state: { id: id.toString() },
                          });
                        },
                      }
                    : onRowClick && {
                        onClick: () => onRowClick(row.original),
                      })}
                  className={`border-t dark:border-gray-800 ${
                    isCustomerProfile || onRowClick
                      ? "hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                      : ""
                  }`}
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
                  <div className="h-[220px] sm:h-[244px] flex items-center justify-center border-gray-200">
                    <div className="w-[512px] h-[196px] flex items-center justify-center pt-6 pb-6">
                      <div className="w-[352px] h-[196px] gap-6">
                        <div className="w-[352px] h-[132px] flex flex-col items-center gap-4">
                          <div className="w-12 h-12 rounded-[28px] border-[8px] border-blue-50 bg-blue-100 flex items-center justify-center dark:border-gray-700">
                            <Suspense>
                              <SearchIcon className="text-blue-700" />
                            </Suspense>
                          </div>
                          <div className="w-[352px] h-[68px] flex flex-col items-center gap-1">
                            <h1 className="text-gray-900 text-[16px] leading-[24px] font-semibold text-center h-[24px] dark:text-white">
                              No {title} found
                            </h1>
                            {isCustomerProfile ? (
                              <>
                                <p className="text-gray-600 text-[14px] leading-[20px] text-center h-[40px] pt-1">
                                  Your search "{submittedText}" did not match
                                  any {title.toLowerCase()}. Please try again.
                                </p>
                                <div className="w-[352px] flex flex-row gap-3 pt-6 justify-center">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (onClearSearch) {
                                        onClearSearch();
                                      }
                                      setSubmittedText("");
                                    }}
                                    disabled={!searchText && totalCount === 0}
                                    className={`w-[170px] h-10 border border-gray-300 rounded-[8px] px-4 text-gray-700 text-[14px] font-semibold flex items-center justify-center hover:bg-gray-100 dark:text-white dark:hover:text-black ${
                                      !searchText && totalCount === 0
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }`}
                                  >
                                    Clear search
                                  </button>
                                </div>
                              </>
                            ) : (
                              <>
                                <p className="text-gray-600 text-[14px] leading-[20px] text-center h-[40px] pt-1">
                                  Your search "{submittedText}" did not match
                                  any {title.toLowerCase()}. Please try again or
                                  create and add a new{" "}
                                  {title.includes("Rules") ? "rule" : "item"}.
                                </p>
                                <div className="w-[352px] flex flex-row gap-3 pt-6">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (onClearSearch) {
                                        onClearSearch();
                                      }
                                      setSubmittedText("");
                                    }}
                                    className={`${
                                      onAddNewItem ? "w-[170px]" : "w-full"
                                    } h-10 border border-gray-300 rounded-[8px] px-4 text-gray-700 text-[14px] font-semibold flex items-center justify-center hover:bg-gray-100 dark:text-white dark:hover:text-black`}
                                  >
                                    Clear search
                                  </button>
                                  {onAddNewItem && (
                                    <button
                                      type="button"
                                      onClick={onAddNewItem}
                                      className="w-[170px] h-10 bg-blue-700 text-white px-4 border border-blue-700 rounded-[8px] text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-blue-800"
                                    >
                                      <Suspense>
                                        <PlusIcon className="text-white" />
                                      </Suspense>
                                      Add New{" "}
                                      {title.includes("Rules")
                                        ? "Rule"
                                        : "Item"}
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
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

      {!minimal && (
        <div className="flex-col sm:flex-row flex justify-between items-center px-4 sm:px-6 py-3 border-t dark:border-gray-800 text-sm text-black dark:text-white gap-3 sm:gap-0">
          <div className="text-center sm:text-left">
            Page {totalCount === 0 ? 0 : currentPage} of{" "}
            {totalCount === 0 ? 0 : Math.ceil(totalCount / itemsPerPage)}
          </div>

          {table.getRowModel().rows.length > 0 && (
            <div className="flex w-full sm:w-auto gap-2 sm:space-x-2 text-gray-700">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 w-full sm:w-[87px] h-[36px] border border-gray-300 rounded-lg ${
                  currentPage === 1
                    ? "dark:text-white cursor-not-allowed opacity-50"
                    : "hover:bg-gray-100 text-black dark:text-white dark:hover:bg-gray-800"
                }`}
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
                className={`px-3 py-2 w-full sm:w-[60px] h-[36px] border border-gray-300 rounded-lg ${
                  currentPage === Math.ceil(totalCount / itemsPerPage)
                    ? "dark:text-white cursor-not-allowed opacity-50"
                    : "hover:bg-gray-100 text-black dark:text-white dark:hover:bg-gray-800"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
