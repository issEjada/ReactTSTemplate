import React, {
  useState,
  useMemo,
  useEffect,
  Suspense,
  useRef,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { RulesFilterForm } from "../RulesFilter/RulesFilterJsx";
import { useScoringRulesTable } from "./useRulesTable";
import type { ViewRulesFormValues } from "../RulesFilter/useRulesFilter";
import FullScreenSpinner from "../../../components/FullScreenSpinner";

const SearchIcon = React.lazy(
  () => import("../../../assets/svg/Search.svg?react")
);
const FilterIcon = React.lazy(
  () => import("../../../assets/svg/Filters.svg?react")
);
const ViewIcon = React.lazy(() => import("../../../assets/svg/View.svg?react"));

const EditIcon = React.lazy(() => import("../../../assets/svg/Edit.svg?react"));

const DeleteIcon = React.lazy(
  () => import("../../../assets/svg/Delete.svg?react")
);

const PlusIcon = React.lazy(() => import("../../../assets/svg/plus.svg?react"));

type Rule = {
  id: number;
  name: string;
  description: string;
  status: "ENABLED" | "DISABLED";
  riskLevel: "Low" | "Medium" | "High";
};

const getColumns = (
  onToggleStatus: (id: number) => void,
  onDelete: (id: number) => void
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
        <span className="font-medium text-gray-900  dark:text-white">
          {String(info.getValue())}
        </span>
        <span className="text-xs text-gray-500 dark:text-white">category</span>
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
          className={`text-xs font-medium px-2 py-1  whitespace-nowrap ${
            colorMap[display] || "text-gray-700"
          }`}
        >
          {display}
        </span>
      );
    },
  },
  {
    header: "",
    accessorKey: "actions",
    cell: ({ row }) => {
      const rule = row.original;
      return <RuleMenu rule={rule} onDelete={onDelete} />;
    },
  },
];

const RuleMenu = ({
  rule,
  onDelete,
}: {
  rule: Rule;
  onDelete: (id: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    },
    [dropdownRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleView = () => {
    console.log("View rule:", rule);
    setOpen(false);
    navigate("/rules/view", {
      state: {
        id: rule.id,
        action: "view",
      },
    });
  };

  const handleEdit = () => {
    console.log("Edit rule:", rule);
    setOpen(false);
    navigate("/rules/edit", {
      state: {
        id: rule.id,
        action: "edit",
      },
    });
  };

  const handleDelete = () => {
    setOpen(false);
    onDelete(rule.id);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative inline-flex items-center justify-center "
    >
      <button
        className="h-[30px] w-[30px] flex items-center justify-center rounded hover:bg-gray-200 focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-label="More options"
      >
        <span className="flex flex-col justify-center items-center gap-[3px]">
          <span className="block w-[5px] h-[5px] rounded-full bg-gray-400" />
          <span className="block w-[5px] h-[5px] rounded-full bg-gray-400" />
          <span className="block w-[5px] h-[5px] rounded-full bg-gray-400" />
        </span>
      </button>

      {open && (
        <div className="absolute right-1 top-full ml-2 z-20 w-[143px] rounded-[8px] border border-[#E9EAEB] bg-white font-medium text-[#414651] shadow-lg dark:bg-[#121418] dark:border-gray-800 dark:text-white">
          <button
            type="button"
            className="w-full h-[40px] flex items-center gap-[12px] px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
            onClick={handleView}
          >
            <div className="w-[16px] h-[16px] flex items-center justify-center">
              <ViewIcon />
            </div>
            <span className="text-[14px] whitespace-nowrap">View Details</span>
          </button>
          <div className="border-t border-gray-200" />
          <button
            type="button"
            className="w-full h-[40px] flex items-center px-[16px] py-[10px] gap-[12px] hover:bg-gray-100 cursor-pointer text-left"
            onClick={handleEdit}
          >
            <EditIcon />
            <span className="text-[14px]">Edit Rule</span>
          </button>
          <div className="border-t border-gray-200" />
          <button
            type="button"
            className="w-full h-[40px] flex items-center px-[16px] py-[10px] gap-[12px] hover:bg-gray-100 cursor-pointer text-left"
            onClick={handleDelete}
          >
            <DeleteIcon />
            <span className="text-[14px]">Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

export const RulesTable = () => {
  const {
    data = [],
    isLoading,
    error,
    totalCount,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    // setItemsPerPage,
    filters,
    setFilters,
    refetch,
    handleSearchSubmit,
    deleteRule,
  } = useScoringRulesTable();

  const [searchText, setSearchText] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "All" | "ENABLED" | "DISABLED"
  >("All");

  // When user clicks a status button, update statusFilter with backend values
  const onFilterStatus = (status: "All" | "ENABLED" | "DISABLED") => {
    setStatusFilter(status);

    const newFilters: ViewRulesFormValues = {
      ...filters,
    };

    if (status !== "All") {
      newFilters.status = status;
    } else {
      delete newFilters.status;
    }

    setFilters(newFilters);
    setCurrentPage(1);
  };

  const openFilterModal = useCallback(() => setIsFilterOpen(true), []);
  const closeFilterModal = useCallback(() => setIsFilterOpen(false), []);

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

  const handleDeleteRule = async (id: number) => {
    try {
      await deleteRule(id);
      await refetch(); // refresh table
    } catch (err) {
      console.error("Error deleting rule:", err);
    }
  };

  const columns = useMemo(
    () => getColumns(handleToggleStatus, handleDeleteRule),
    []
  );

  const rulesData: Rule[] = useMemo(
    () =>
      data.map((item) => ({
        id: item.id,
        name: item.name ?? "",
        description: item.description ?? "",
        status: item.status as "ENABLED" | "DISABLED",
        riskLevel: item.riskLevel as "Low" | "Medium" | "High",
      })),
    [data]
  );

  const table = useReactTable<Rule>({
    data: rulesData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
  });

  const navigate = useNavigate();

  const handleAddNewRule = () => {
    navigate("/rules/add");
  };

  const isFilterActive = useMemo(
    () => Object.keys(filters ?? {}).length > 0 || searchText.trim() !== "",
    [filters, searchText]
  );

  const handleClearSearch = () => {
    setSearchText("");
    setFilters({});
    setStatusFilter("All");
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="w-full h-[75vh] flex items-center justify-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  return (
    <div className="p-6 bg-white shadow-sm dark:bg-[#121418] dark:border-gray-800">
      <div className="mb-6">
        <div className="flex items-center justify-between pt-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Scoring Rules{" "}
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

      {totalCount === 0 && !isFilterActive ? (
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
        <div className="overflow-x-auto border rounded-lg dark:border-gray-800 ">
          <div className="flex justify-between items-center px-6 py-6">
            <div className="flex space-x-0 rounded-lg overflow-hidden border border-gray-300 ">
              <button
                onClick={() => onFilterStatus("All")}
                className={`text-xs w-[83px] h-10 px-3 ${
                  statusFilter === "All"
                    ? "bg-blue-500 text-white font-semibold"
                    : "hover:bg-gray-100 text-black dark:hover:bg-gray-200 "
                }`}
              >
                View All
              </button>
              <button
                onClick={() => onFilterStatus("ENABLED")}
                className={`text-xs w-[83px] h-10 px-3 border-l ${
                  statusFilter === "ENABLED"
                    ? "bg-blue-500 text-white font-semibold"
                    : "hover:bg-gray-100 text-black dark:text-white dark:hover:bg-gray-800"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => onFilterStatus("DISABLED")}
                className={`text-xs w-[83px] h-10 px-3 border-l ${
                  statusFilter === "DISABLED"
                    ? "bg-blue-500 text-white font-semibold"
                    : "hover:bg-gray-100 text-black dark:text-white dark:hover:bg-gray-800"
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
                className="flex items-center gap-2 w-[100px] h-[40px] px-4 border border-gray-300 rounded-[8px] text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                onClick={openFilterModal}
              >
                <Suspense>
                  <FilterIcon className="w-5 h-5 text-gray-500 dark:text-white" />
                </Suspense>
                Filter
              </button>
            </div>
          </div>

          <RulesFilterForm
            isOpen={isFilterOpen}
            closeDrawer={closeFilterModal}
            filterData={filters as any}
            handleSearchSubmit={handleSearchSubmit}
          />

          <div
            className={`w-full ${
              totalCount === 0 ? "h-[388px] overflow-hidden" : "h-[680px]"
            } overflow-auto`}
          >
            <table className="w-full table-auto h-full text-sm text-center ">
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
              <tbody className="w-[1144px] h-[548px]">
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-t hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-800"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 h-[72px] align-middle"
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
                  <tr className="h-full">
                    <td
                      colSpan={columns.length}
                      className="h-full p-0 align-top"
                    >
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
                                  No Scoring Rules found
                                </h1>
                                <p className="text-[#535862] text-[14px] leading-[20px] text-center h-[40px] pt-[4px]">
                                  Your search “Keyword” did not match any rules.
                                  Please try again or create and add a new rule.
                                </p>
                              </div>
                            </div>
                            {/*bottom Section*/}
                            <div className="w-[352px] flex flex-row gap-[12px] pt-[24px] ">
                              <button
                                type="button"
                                onClick={handleClearSearch}
                                className="w-[170px] h-[40px] border border-[#D5D7DA] rounded-[8px] px-[16px] py-[10px] text-[#414651] text-[14px] font-semibold flex items-center justify-center  hover:bg-gray-100"
                              >
                                Clear search
                              </button>
                              <button
                                type="button"
                                className="w-[170px] h-[40px] bg-blue-600 text-white px-[16px] py-[10px] border border-blue-600 rounded-[8px] text-[14px] font-semibold flex items-center justify-center gap-[8px] hover:bg-blue-700"
                              >
                                <Suspense>
                                  <PlusIcon />
                                </Suspense>
                                Add New Rule
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
      )}
    </div>
  );
};
