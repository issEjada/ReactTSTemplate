import React, { Suspense } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

const SearchIcon = React.lazy(() => import("../assets/svg/Search.svg?react"));
const FilterIcon = React.lazy(() => import("../assets/svg/Filters.svg?react"));
const PlusIcon = React.lazy(() => import("../assets/svg/plus.svg?react"));
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
  isLoading: boolean;
  error: string | null;
  title: string;
  searchText: string;
  setSearchText: (text: string) => void;
  openFilterModal: () => void;
  applyFilters: () => void;
  searchPlaceholder?: string;
  showStatusFilter?: boolean;
  statusFilterOptions?: { key: string; label: string }[]; // Add statusFilterOptions prop
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
  statusFilterOptions, // Destructure statusFilterOptions prop
}: DynamicTableProps<TData>) {
  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (originalRow: any, index) =>
      originalRow.id ? `${originalRow.id}-${index}` : `${index}`,
  });

  if (error) {
    return (
      <div className="w-full h-[75vh] flex items-center justify-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border rounded-lg dark:border-gray-800 ">
      <div className="flex justify-between items-center px-6 py-6">
        {showStatusFilter &&
          onFilterStatus &&
          statusFilter &&
          statusFilterOptions && (
            <div className="flex space-x-0 rounded-lg overflow-hidden border border-gray-300 ">
              {statusFilterOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => onFilterStatus(option.key)}
                  className={`text-xs w-[83px] h-10 px-3 ${
                    statusFilter === option.key
                      ? "bg-[#FAFAFA] text-black font-semibold"
                      : "hover:bg-gray-100 text-black dark:hover:bg-gray-200 "
                  } ${
                    option.key !== statusFilterOptions[0].key ? "border-l" : ""
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

        {/* Search Box aligned right */}
        <div className="flex items-center gap-3">
          <div className="relative w-[400px] h-[44px]">
            {/* Search Button (left icon) */}
            <button
              type="button"
              title="Search"
              onClick={applyFilters}
              className="absolute left-[14px] top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              <SearchIcon className="w-5 h-5" />
            </button>

            {/* Input */}
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  applyFilters();
                }
              }}
              placeholder={searchPlaceholder}
              className="w-full h-full pl-[40px] pr-[40px] py-[10px] text-gray-500 rounded-[8px] border border-[#D5D7DA] outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800"
            />

            {/* Clear ("X") Button */}
            {searchText && (
              <button
                onClick={() => setSearchText("")}
                className="absolute right-[14px] top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                &#10005;
              </button>
            )}
          </div>

          {/* Filter Button */}
          {filterComponent && (
            <button
              className="flex items-center gap-2 w-[100px] h-[40px] px-4 border border-gray-300 rounded-[8px] text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
              onClick={openFilterModal}
            >
              <Suspense>
                <FilterIcon className="w-5 h-5 text-gray-500 dark:text-white" />
              </Suspense>
              Filter
            </button>
          )}
        </div>
      </div>

      {filterComponent}

      <div
        className={`w-full ${
          totalCount === 0 ? "h-[388px] overflow-hidden" : "h-[680px]"
        } overflow-auto`}
      >
        <table className="w-full table-auto text-sm text-center ">
          <thead className="bg-gray-50 text-gray-600  dark:bg-[#121418] dark:border-gray-800 dark:text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b dark:border-gray-800"
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 h-[72px] font-medium">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="w-[1144px]">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-800"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 h-[72px] align-middle">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="h-full">
                <td colSpan={columns.length} className="h-full p-0 align-top">
                  <div className="flex items-center justify-center w-[1144px] h-[244px] border-[#E9EAEB]">
                    <div className="w-[512px] h-[196px] flex items-center justify-center pt-[24px] pb-[24px]">
                      <div className="w-[352px] h-[196px] gap-[24px]">
                        {/*Top Section*/}
                        <div className="w-[352px] h-[132px] flex flex-col items-center gap-[16px]">
                          {/* Icon */}
                          <div className="w-[48px] h-[48px] rounded-[28px] border-[8px] border-[#EFF8FF] bg-[#D1E9FF] flex items-center justify-center">
                            <Suspense>
                              <SearchIcon className="text-blue-700" />
                            </Suspense>
                          </div>
                          {/* Text */}
                          <div className="w-[352px] h-[68px] flex flex-col items-center gap-[4px]">
                            <h1 className="text-[#181D27] text-[16px] leading-[24px] font-semibold text-center h-[24px]">
                              No {title} found
                            </h1>
                            <p className="text-[#535862] text-[14px] leading-[20px] text-center h-[40px] pt-[4px]">
                              Your search “Keyword” did not match any{" "}
                              {title.toLowerCase()}. Please try again or create
                              and add a new{" "}
                              {title.includes("Rules") ? "rule" : "item"}.
                            </p>
                          </div>
                        </div>
                        {/*bottom Section*/}
                        <div className="w-[352px] flex flex-row gap-[12px] pt-[24px] ">
                          <button
                            type="button"
                            onClick={onClearSearch}
                            className="w-[170px] h-[40px] border border-[#D5D7DA] rounded-[8px] px-[16px] py-[10px] text-[#414651] text-[14px] font-semibold flex items-center justify-center  hover:bg-gray-100"
                          >
                            Clear search
                          </button>
                          <button
                            type="button"
                            className="w-[170px] h-[40px] bg-blue-700 text-white px-[16px] py-[10px] border border-blue-700 rounded-[8px] text-[14px] font-semibold flex items-center justify-center gap-[8px] hover:bg-blue-800"
                            onClick={onAddNewItem}
                          >
                            <Suspense>
                              <PlusIcon />
                            </Suspense>
                            Add New {title.includes("Rules") ? "Rule" : "Item"}
                          </button>
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
      {/* Pagination */}
      <div className="flex justify-between items-center px-4 py-3 border-t dark:border-gray-800 text-sm text-gray-600 w-[1144px] h-[64px]">
        <div className="pl-6">
          Page {currentPage} of {Math.ceil(totalCount / itemsPerPage)}
        </div>
        <div className="space-x-2 pr-6 text-gray-700">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 w-[87px] h-[36px] border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 dark:text-white"
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
            className="px-3 py-2 w-[60px] h-[36px] border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 dark:text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
