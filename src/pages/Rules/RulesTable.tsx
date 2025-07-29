import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import Filter from "../../components/Filter/Filter";
import useScoringRules from "./RuleServices";

const SearchIcon = React.lazy(
  () => import("../../assets/svg/Search.svg?react")
);

const FilterIcon = React.lazy(
  () => import("../../assets/svg/Filters.svg?react")
);

type Rule = {
  id: string;
  name: string;
  description: string;
  status: "ENABLED" | "DISABLED";
  riskLevel: "Low" | "Medium" | "High";
};

const getColumns = (
  onToggleStatus: (id: string) => void
): ColumnDef<Rule>[] => [
  {
    header: "OFF/ON",
    cell: ({ row }) => {
      const status = row.original.status;

      const isActive = status === "ENABLED";
      return (
        <div className="flex justify-center">
          <button
            onClick={() => onToggleStatus(row.original.id)}
            className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-300
            ${isActive ? "bg-green-600" : "bg-gray-300"}`}
            aria-label="Toggle Rule Status"
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 transform
            ${isActive ? "translate-x-4" : "translate-x-0"}`}
            />
          </button>
        </div>
      );
    },
  },
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Rule Name",
    accessorKey: "name",
    cell: (info) => (
      <div className="flex flex-col">
        <span className="font-medium text-gray-900">
          {String(info.getValue())}
        </span>
        <span className="text-xs text-gray-500">category</span>
      </div>
    ),
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (info) => (
      <span
        className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${
          info.getValue() === "ENABLED"
            ? "bg-green-100 text-green-700"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {info.getValue() === "ENABLED" ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    header: "Risk Level",
    accessorKey: "riskLevel",
    cell: (info) => {
      const value = String(info.getValue());
      const colorMap: Record<string, string> = {
        Low: "text-gray-700",
        Medium: "text-warning-700",
        High: "text-red-700",
      };
      // Capitalize first letter, rest lowercase
      const display =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      return (
        <span
          className={`text-xs font-medium px-2 py-1 whitespace-nowrap ${
            colorMap[display] || "text-gray-700"
          }`}
        >
          {display}
        </span>
      );
    },
  },
];

export const RulesTable = () => {
  const {
    data = [],
    isLoading,
    error,
    totalCount,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    filters,
    setFilters,
    refetch,
  } = useScoringRules();

  const [searchText, setSearchText] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "All" | "ENABLED" | "DISABLED"
  >("All");

  // When user clicks a status button, update statusFilter with backend values
  const onFilterStatus = (status: "All" | "ENABLED" | "DISABLED") => {
    setStatusFilter(status);

    const newFilters: Record<string, string> = {};

    // Only add status filter if not "All"
    if (status !== "All") {
      newFilters.status = status;
    }

    // Also include search text if any
    if (searchText.trim() !== "") {
      newFilters.filter = searchText.trim();
    }

    setFilters(newFilters);
    setCurrentPage(1);
  };

  const openFilterModal = () => setIsFilterOpen(true);
  const closeFilterModal = () => setIsFilterOpen(false);

  const applyFilters = () => {
    const newFilters: Record<string, string> = {};

    if (statusFilter !== "All") {
      newFilters.status = statusFilter;
    }

    if (searchText.trim() !== "") {
      newFilters.filter = searchText.trim();
    }

    setFilters(newFilters);
    setCurrentPage(1);
  };

  // On toggling status switch, we can optionally call API to update status
  // but for now just refetch list to reflect changes or simulate local update
  const handleToggleStatus = async () => {
    // Here you'd call an API to update status,
    // after success, refetch data to reflect new status
    // For now, just refetch to reload data
    await refetch();
  };

  const columns = useMemo(() => getColumns(handleToggleStatus), []);

  // Map or cast data to Rule[]
  const rulesData: Rule[] = useMemo(
    () =>
      data.map((item) => ({
        id: String(item.id), // Ensure id is string as per Rule type
        name: item.name ?? "",
        description: item.description ?? "",
        status: item.status as "ENABLED" | "DISABLED", // Cast to specific status types
        riskLevel: item.riskLevel as "Low" | "Medium" | "High", // Cast to specific riskLevel types
      })),
    [data]
  );

  const table = useReactTable<Rule>({
    data: rulesData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const navigate = useNavigate();

  const handleAddNewRule = () => {
    navigate("/rules/add");
  };

  return (
    <div className="p-6 bg-white shadow-sm">
      <div className="mb-6">
        <div className="flex items-center justify-between pt-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Scoring Rules
            <span className="ml-2 text-sm text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
              {totalCount} Rule{totalCount !== 1 && "s"}
            </span>
          </h2>

          {totalCount !== 0 && (
            <button
              onClick={handleAddNewRule}
              className="w-[155px] h-[40px] bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium"
            >
              + Add New Rule
            </button>
          )}
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Keep track of customers and their security levels.
        </p>
      </div>

      {isLoading ? (
        <div className="w-full h-[75vh] flex items-center justify-center text-gray-500 text-lg">
          Loading...
        </div>
      ) : error ? (
        <div className="w-full h-[75vh] flex items-center justify-center text-red-500 text-lg">
          {error}
        </div>
      ) : totalCount === 0 ? (
        <div className="w-full h-[75vh] flex flex-col items-center justify-center bg-gray-50 rounded-md border border-dashed">
          <div className="bg-white shadow-md rounded-full p-4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-7a2 2 0 00-2-2h-1V7a5 5 0 00-10 0v3H6a2 2 0 00-2 2v7a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            Start adding new rules
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            You don’t have any rule yet. Start securing by adding new rules now.
          </p>
          <button
            onClick={handleAddNewRule}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium"
          >
            + Add New Rule
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-lg ">
          <div className="flex justify-between items-center px-6 py-6">
            <div className="flex space-x-0 rounded-lg overflow-hidden border border-gray-300">
              <button
                onClick={() => onFilterStatus("All")}
                className={`text-xs w-[83px] h-10 px-3 ${
                  statusFilter === "All"
                    ? "font-semibold"
                    : "hover:bg-gray-100 text-black"
                }`}
              >
                View All
              </button>
              <button
                onClick={() => onFilterStatus("ENABLED")}
                className={`text-xs w-[83px] h-10 px-3 border-l ${
                  statusFilter === "ENABLED"
                    ? "font-semibold"
                    : "hover:bg-gray-100 text-black"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => onFilterStatus("DISABLED")}
                className={`text-xs w-[83px] h-10 px-3 border-l ${
                  statusFilter === "DISABLED"
                    ? "font-semibold"
                    : "hover:bg-gray-100 text-black"
                }`}
              >
                Inactive
              </button>
            </div>

            {/* Search Box aligned right */}
            <div className="flex items-center gap-3">
              <div className="relative w-[400px] h-[44px]">
                <Suspense>
                  <SearchIcon className="absolute left-[14px] top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5 pointer-events-none" />
                </Suspense>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      applyFilters();
                    }
                  }}
                  placeholder="Search"
                  className="w-full h-full pl-[40px] pr-[14px] py-[10px] text-gray-500 rounded-[8px] border border-[#D5D7DA] outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Filter Button */}
              <button
                className="flex items-center gap-2 w-[100px] h-[40px] px-4 border border-gray-300 rounded-[8px] text-sm text-gray-700 hover:bg-gray-100"
                onClick={openFilterModal}
              >
                <Suspense>
                  <FilterIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </Suspense>
                Filter
              </button>
            </div>
          </div>

          <Filter
            isOpen={isFilterOpen}
            onClose={closeFilterModal}
            onApply={(newFilters: Record<string, string>) => {
              const updatedFilters = { ...newFilters };
              if (statusFilter !== "All") {
                updatedFilters.status = statusFilter;
              }
              if (searchText.trim() !== "") {
                updatedFilters.filter = searchText.trim();
              }
              setFilters(updatedFilters);
              setCurrentPage(1);
            }}
          />

          <table className="min-w-full text-sm text-center">
            <thead className="bg-gray-50 text-gray-600 ">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b">
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
            <tbody className="w-[1144px] h-[548px]">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 h-[72px] align-middle">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center px-4 py-3 border-t text-sm text-gray-600 w-[1144px] h-[64px]">
            <div className="pl-6">
              Page {currentPage} of {Math.ceil(totalCount / itemsPerPage)}
            </div>
            <div className="space-x-2 pr-6 text-gray-700">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 w-[87px] h-[36px] border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
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
                className="px-3 py-2 w-[60px] h-[36px] border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
