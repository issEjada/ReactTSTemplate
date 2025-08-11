import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { MonitoringFilterForm } from "../MonitoringFilter/MonitoringFilterJsx";
import { useMonitoringTable } from "./useMonitoringTable";
import type { ViewSessionsFormValues } from "../MonitoringFilter/useMonitoringFilter";
import FullScreenSpinner from "../../../components/FullScreenSpinner";
import HomeWidgetGroup from "../../../components/HomeWidget";
import NoSessions from "./NoSessions";
import SessionActivity from "./SessionActivity";
import { AppRoutes } from "../../../routes/AppRoutes";
import { useSessionActivity } from "./useSessionActivity";
import { DynamicTable } from "../../../components/DynamicTable";

export type Session = {
  id: number;
  sessionId: string;
  deviceId: string;
  channel: string;
  industry: string;
  ip: string;
  country: string;
  city: string;
  status: "VIEWED" | "NOT_VIEWED";
  date: string;
};

const getColumns = (): ColumnDef<Session>[] => [
  {
    header: "Session ID",
    accessorKey: "sessionId",
    cell: (info) => (
      <div className="flex items-center w-[95px] h-[40px] overflow-hidden">
        <span className="font-medium text-gray-900 dark:text-white dark:hover:text-black">
          {String(info.getValue())}
        </span>
      </div>
    ),
  },
  {
    header: "Device ID",
    accessorKey: "deviceId",
    cell: (info) => (
      <div className="flex flex-col w-[95px] h-[40px] overflow-hidden">
        <span className="font-medium text-gray-900 h-[20px] overflow-hidden dark:text-white dark:hover:text-black ">
          {String(info.getValue())}
        </span>
        <span className="text-xs text-gray-500 h-[20px] overflow-hidden dark:hover:text-gray-900">
          category
        </span>
      </div>
    ),
  },
  {
    header: "Channel",
    accessorKey: "channel",
    cell: (info) => (
      <div className="flex items-center w-[95px] h-[40px] overflow-hidden">
        <span className="font-medium text-gray-900 dark:text-white dark:hover:text-black">
          {String(info.getValue())}
        </span>
      </div>
    ),
  },
  {
    header: "Industry",
    accessorKey: "industry",
    cell: (info) => (
      <div className="flex items-center w-[95px] h-[40px] overflow-hidden">
        <span className="font-medium text-gray-900 dark:text-white dark:hover:text-black">
          {String(info.getValue())}
        </span>
      </div>
    ),
  },
  {
    header: "IP",
    accessorKey: "ip",
    cell: (info) => {
      const value = String(info.getValue());
      return (
        <span className="flex items-center w-[95px] h-[40px] text-xs font-medium px-2 py-1 whitespace-nowrap text-gray-700 dark:text-white dark:hover:text-black overflow-hidden">
          {value}
        </span>
      );
    },
  },
  {
    header: "Country",
    accessorKey: "country",
    cell: (info) => {
      const value = String(info.getValue());
      // Capitalize first letter, rest lowercase
      const display =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      return (
        <span className="flex items-center w-[95px] h-[40px] text-xs font-medium px-2 py-1 whitespace-nowrap text-gray-700 dark:text-white dark:hover:text-black overflow-hidden">
          {display}
        </span>
      );
    },
  },
  {
    header: "City",
    accessorKey: "city",
    cell: (info) => {
      const value = String(info.getValue());
      // Capitalize first letter, rest lowercase
      const display =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      return (
        <span className="text-xs font-medium px-2 py-1 whitespace-nowrap text-gray-700 dark:text-white">
          {display}
        </span>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (info) => {
      return (
        <span
          className={`flex items-center h-[22px] w-fit text-xs font-medium ps-2 pe-2 py-[2px] gap-2 rounded-full whitespace-nowrap overflow-hidden ${
            info.getValue() === "VIEWED"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <div
            className={`rounded-full bg-black w-[6px] h-[6px] ${
              info.getValue() === "VIEWED" ? "bg-green-500" : "bg-gray-500"
            }`}
          ></div>
          {info.getValue() === "VIEWED" ? "Viewed" : "Not Viewed"}
        </span>
      );
    },
  },
  {
    header: "Date & Time",
    accessorKey: "date",
    cell: (info) => {
      const value = String(info.getValue());
      // Capitalize first letter, rest lowercase
      const date = new Date(value);
      const formattedDate = date.toLocaleDateString("en-GB"); // '02/07/2025'

      // Format time as HH:MM:SS AM/PM
      const formattedTime = date.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }); // '03:24:06 AM'

      // If you want to trim seconds to always show `00` as in your example
      const trimmedTime = `${formattedTime.split(":")[0]}:${
        formattedTime.split(":")[1]
      }:00 ${formattedTime.split(" ")[1]}`;
      return (
        <div className="flex flex-col w-[95px] h-[40px] overflow-hidden">
          <span className="text-xs font-medium px-2 whitespace-nowrap text-gray-700 dark:text-white dark:hover:text-black">
            {formattedDate}
          </span>
          <span className="text-xs font-medium px-2 whitespace-nowrap text-gray-700 dark:text-white dark:hover:text-black">
            {trimmedTime}
          </span>
        </div>
      );
    },
  },
];

export const MonitoringTable = () => {
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
    handleSearchSubmit,
  } = useMonitoringTable();

  const { sessionActivityData } = useSessionActivity();

  const [searchText, setSearchText] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "All" | "VIEWED" | "NOT_VIEWED"
  >("All");

  // When user clicks a status button, update statusFilter with backend values
  const onFilterStatus = (status: "All" | "VIEWED" | "NOT_VIEWED") => {
    setStatusFilter(status);

    const newFilters: ViewSessionsFormValues = {
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
    const newFilters: ViewSessionsFormValues = {
      ...filters,
      sessionId: searchText.trim(),
    };

    if (statusFilter !== "All") {
      newFilters.status = statusFilter;
    }

    setFilters(newFilters);
    setCurrentPage(1);
  };

  const columns = useMemo(() => getColumns(), []);

  const sessionsData: Session[] = useMemo(
    () =>
      data.map((item) => ({
        id: item.id,
        sessionId: item.sessionId,
        deviceId: item.deviceId,
        channel: item.channel,
        industry: item.industry,
        ip: item.ip,
        country: item.country,
        city: item.city,
        status: item.status,
        date: item.lastUpdatedTimestamp,
      })),
    [data]
  );

  console.log("Sessions Data:", sessionsData);

  const table = useReactTable<Session>({
    data: sessionsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id.toString(),
  });

  const navigate = useNavigate();

  const handleAddNewSession = () => {
    // To be changed
    navigate(AppRoutes.monitoringView);
  };

  const isFilterActive = useMemo(
    () => Object.keys(filters ?? {}).length > 0 || searchText.trim() !== "",
    [filters, searchText]
  );

  const handleClearSearch = () => {
    setSearchText("");
    setFilters(undefined); // Changed from {} to undefined to match type
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

  console.log("Monitoring Table Data:", table);

  return (
    <div className="flex flex-col gap-6 p-6 bg-white shadow-sm dark:bg-[#121418] dark:border-gray-800 dark:text-white">
      <div className="pt-5 px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Monitor Activity Sessions{" "}
            <span className="ml-2 text-sm text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
              {totalCount} Active Session{totalCount !== 1 && "s"}
            </span>
          </h2>

          {totalCount !== 0 && (
            <button
              onClick={handleAddNewSession}
              className="w-[179px] h-[40px] bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium"
            >
              + Add New Session
            </button>
          )}
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Keep track of customers and their security levels.
        </p>
      </div>
      {/* Add Cards Here */}
      {totalCount === 0 && !isFilterActive ? (
        <NoSessions />
      ) : (
        <>
          <HomeWidgetGroup />
          <DynamicTable<Session>
            data={sessionsData}
            columns={columns}
            filterComponent={
              <MonitoringFilterForm
                isOpen={isFilterOpen}
                closeDrawer={closeFilterModal}
                filterData={filters}
                handleSearchSubmit={handleSearchSubmit}
              />
            }
            totalCount={totalCount}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            onFilterStatus={onFilterStatus as (status: string) => void}
            statusFilter={statusFilter}
            onClearSearch={handleClearSearch}
            onAddNewItem={() => {}}
            isLoading={isLoading}
            error={error}
            title="Monitor Activity Sessions"
            description="Keep track of customers and their security levels."
            searchText={searchText}
            setSearchText={setSearchText}
            openFilterModal={openFilterModal}
            applyFilters={applyFilters}
            emptyStateMessage="Start adding new sessions"
            emptyStateDescription="You don’t have any sessions yet.Start monitoring by adding new sessions now."
            searchPlaceholder="Search"
            showStatusFilter={true}
            filters={filters ?? {}}
            statusFilterOptions={[
              { key: "All", label: "View All" },
              { key: "VIEWED", label: "Viewed" },
              { key: "NOT_VIEWED", label: "Not Viewed" },
            ]}
          />

          <SessionActivity data={sessionActivityData} />
        </>
      )}
    </div>
  );
};
