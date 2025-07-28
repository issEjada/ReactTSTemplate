import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import Filter from "../../components/Filter/Filter";

const SearchIcon = React.lazy(
  () => import("../../assets/svg/Search.svg?react")
);

const FilterIcon = React.lazy(
  () => import("../../assets/svg/Filters.svg?react")
);

type Rule = {
  id: string;
  ruleName: string;
  description: string;
  status: "Active" | "Inactive";
  risk: "Low" | "Medium" | "High";
};

const dataSample: Rule[] = [
  {
    id: "PH01",
    ruleName: "Admin Privilege Access",
    description: "Detects excessive admin access by low-risk users.",
    status: "Active",
    risk: "High",
  },
  {
    id: "PH02",
    ruleName: "Suspicious Login",
    description: "Flags multiple login attempts from different countries.",
    status: "Inactive",
    risk: "Medium",
  },
  {
    id: "PH03",
    ruleName: "Data Exfiltration",
    description: "Monitors unusual outbound data spikes.",
    status: "Active",
    risk: "High",
  },
  {
    id: "PH04",
    ruleName: "Phishing Email",
    description: "Identifies inbound messages matching phishing patterns.",
    status: "Active",
    risk: "Low",
  },
  {
    id: "PH05",
    ruleName: "Unusual Working Hours",
    description: "Tracks user activity outside normal working hours.",
    status: "Inactive",
    risk: "Medium",
  },
];

const getColumns = (
  onToggleStatus: (id: string) => void
): ColumnDef<Rule>[] => [
  {
    header: "OFF/ON",
    cell: ({ row }) => {
      const status = row.original.status;
      const isActive = status === "Active";
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
    accessorKey: "ruleName",
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
          info.getValue() === "Active"
            ? "bg-green-100 text-green-700"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {String(info.getValue())}
      </span>
    ),
  },
  {
    header: "Risk Level",
    accessorKey: "risk",
    cell: (info) => {
      const colorMap: Record<string, string> = {
        Low: "text-gray-700",
        Medium: "text-warning-700",
        High: "text-red-700",
      };
      return (
        <span
          className={`text-xs font-medium px-2 py-1  whitespace-nowrap ${
            colorMap[info.getValue() as keyof typeof colorMap]
          }`}
        >
          {String(info.getValue())}
        </span>
      );
    },
  },
];

export const RulesTable = () => {
  const [data, setData] = useState<Rule[]>(dataSample);
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");

  const handleToggleStatus = (id: string) => {
    setData((prevData) =>
      prevData.map((rule) =>
        rule.id === id
          ? {
              ...rule,
              status: rule.status === "Active" ? "Inactive" : "Active",
            }
          : rule
      )
    );
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const openFilterModal = () => setIsFilterOpen(true);
  const closeFilterModal = () => setIsFilterOpen(false);

  const filteredData =
    statusFilter === "All"
      ? data
      : data.filter((rule) => rule.status === statusFilter);

  const table = useReactTable({
    data: filteredData,
    columns: getColumns(handleToggleStatus),
    getCoreRowModel: getCoreRowModel(),
  });

  const handleAddNewRule = () => {
    alert("Add new rule clicked");
  };

  const onFilterStatus: (status: "All" | "Active" | "Inactive") => void = (
    status
  ) => {
    setStatusFilter(status);
  };

  return (
    <div className="p-6 bg-white shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 pt-5">
          Scoring Rules
          <span className="ml-2 text-sm text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
            {filteredData.length} Rule{filteredData.length !== 1 && "s"}
          </span>
        </h2>
        <p className="text-sm text-gray-500">
          Keep track of customers and their security levels.
        </p>
      </div>

      {filteredData.length === 0 ? (
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
            <div className="flex space-x-0 ">
              <button
                onClick={() => onFilterStatus("All")}
                className="text-black border border-gray-300 hover:bg-gray-100 px-3 w-[83px] h-10 rounded-l-lg text-xs"
              >
                View All
              </button>
              <button
                onClick={() => onFilterStatus("Active")}
                className="text-black border border-gray-300 hover:bg-gray-100 px-3 w-[83px] h-10 rounded-none text-xs"
              >
                Active
              </button>
              <button
                onClick={() => onFilterStatus("Inactive")}
                className="text-black border border-gray-300 hover:bg-gray-100 px-3 w-[83px] h-10 rounded-r-lg text-xs"
              >
                Inactive
              </button>
            </div>

            {/* Search Box aligned right */}
            <div className="flex items-center gap-3">
              <div className="relative w-[400px] h-[44px]">
                <SearchIcon className="absolute left-[14px] top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-full pl-[40px] pr-[14px] py-[10px] text-gray-500 rounded-[8px] border border-[#D5D7DA] outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Filter Button */}
              <button
                className="flex items-center gap-2 w-[100px] h-[40px] px-4 border border-gray-300 rounded-[8px] text-sm text-gray-700 hover:bg-gray-100"
                onClick={openFilterModal}
              >
                <FilterIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                Filter
              </button>
            </div>
          </div>
          <Filter isOpen={isFilterOpen} onClose={closeFilterModal} />
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
          <div className="flex justify-between items-center px-4 py-3 border-t text-sm text-gray-600 w-[1144px] h-[64px]">
            <div className="pl-6">Page 1 of 10</div>
            <div className="space-x-2 pr-6 text-gray-700">
              <button className="px-3 py-2 w-[87px] h-[36px] border border-gray-300 rounded-lg hover:bg-gray-100">
                Previous
              </button>

              <button className="px-3 py-2 w-[60px] h-[36px] border border-gray-300 rounded-lg hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
