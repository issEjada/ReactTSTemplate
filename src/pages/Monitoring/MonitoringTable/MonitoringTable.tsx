import React, { useState, useMemo, useCallback } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { MonitoringFilterForm } from "../MonitoringFilter/MonitoringFilterJsx";
import { useMonitoringTable } from "./useMonitoringTable";
import type { ViewSessionsFormValues } from "../MonitoringFilter/useMonitoringFilter";
import FullScreenSpinner from "../../../components/FullScreenSpinner";
import SessionActivity from "./SessionActivity";
import { useSessionActivity } from "./useSessionActivity";
import { DynamicTable } from "../../../components/DynamicTable";
import { TableFallback } from "../../../components/TableFallback";
import { AppRoutes } from "../../../routes/AppRoutes";
import { useNavigate } from "react-router-dom";

const ShieldIcon = React.lazy(
  () => import("../../../assets/svg/shieldG.svg?react")
);

export type Session = {
  id: number;
  sessionId: string;
  deviceId: string;
  channel: string;
  customerIdentity: string;
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
        <span className="font-medium text-gray-900 dark:text-white ">
          {String(info.getValue() ?? "")}
        </span>
      </div>
    ),
  },
  {
    header: "Device ID",
    accessorKey: "deviceId",
    cell: (info) => (
      <div className="flex flex-col w-[95px] h-[40px] overflow-hidden">
        <span className="font-medium text-gray-900 h-[20px] overflow-hidden dark:text-white  ">
          {String(info.getValue() ?? "")}
        </span>
        <span className="text-xs text-gray-500 h-[20px] overflow-hidden">
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
        <span className="font-medium text-gray-900 dark:text-white ">
          {String(info.getValue() ?? "")}
        </span>
      </div>
    ),
  },
  {
    header: "Customer Identity",
    accessorKey: "customerIdentity",
    cell: (info) => (
      <div className="flex items-center w-[95px] h-[40px] overflow-hidden">
        <span className="font-medium text-gray-900 dark:text-white ">
          {String(info.getValue() ?? "")}
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
        <span className="flex items-center w-[95px] h-[40px] text-xs font-medium px-2 py-1 whitespace-nowrap text-gray-700 dark:text-white  overflow-hidden">
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
      const display =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      return (
        <span className="flex items-center w-[95px] h-[40px] text-xs font-medium px-2 py-1 whitespace-nowrap text-gray-700 dark:text-white  overflow-hidden">
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
          <span className="text-xs font-medium px-2 whitespace-nowrap text-gray-700 dark:text-white ">
            {formattedDate}
          </span>
          <span className="text-xs font-medium px-2 whitespace-nowrap text-gray-700 dark:text-white ">
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
    filters,
    setFilters,
    handleSearchSubmit,
  } = useMonitoringTable();

  const { sessionActivityData } = useSessionActivity();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "All" | "VIEWED" | "NOT_VIEWED"
  >("All");

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
        customerIdentity: item.customerIdentity,
        ip: item.ip,
        country: item.country,
        city: item.city,
        status: item.status,
        date: item.lastUpdatedTimestamp,
      })),
    [data]
  );


  const isFilterActive = useMemo(
    () => Object.keys(filters ?? {}).length > 0 || searchText.trim() !== "",
    [filters, searchText]
  );

  const handleClearSearch = () => {
    setSearchText("");
    setFilters(undefined);
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
    <div className="flex flex-col gap-6 p-6 bg-white shadow-sm dark:bg-black dark:border-gray-800 dark:text-white">
      <div className="pt-5 px-6 pb-[18px]">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] items-start sm:items-center gap-3 sm:gap-0">
          <div>
            <h2 className="text-lg text-gray-900 dark:text-white">
              Monitor Activity Sessions{" "}
              <span className="ml-2 text-blue-700 bg-blue-50 px-[8px] py-[2px] rounded-full text-[12px]">
                {totalCount} Active Session{totalCount !== 1 && "s"}
              </span>
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Keep track of customers and their security levels.
            </p>
          </div>
        </div>
      </div>
      {totalCount === 0 && !isFilterActive ? (
        <TableFallback
          icon={
            <ShieldIcon className="sm:w-[28px] sm:h-[28px] text-gray-500" />
          }
          title="Start adding decision rules"
          description={
            <>
              You don’t have any sessions yet.
              <br />
              Start monitoring by adding new sessions now"
            </>
          }
        />
      ) : (
        <>
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
            error={error}
            title="Monitor Activity Sessions"
            searchText={searchText}
            setSearchText={setSearchText}
            openFilterModal={openFilterModal}
            applyFilters={applyFilters}
            searchPlaceholder="Search Session ID"
            showStatusFilter={true}
            onRowClick={(rowData) => {
              const { id } = rowData as { id: string | number };
              navigate(AppRoutes.monitoringView, {
                state: { id: id.toString(), action: "view" },
              });
            }}
            statusFilterOptions={[
              { key: "All", label: "View All" },
              { key: "VIEWED", label: "Viewed" },
              { key: "NOT_VIEWED", label: "Not Viewed" },
            ]}
          />

          <SessionActivity
            data={(sessionActivityData ?? []).map((item) => ({
              Month: item.month ?? "",
              Viewed: item.viewedSessions ?? 0,
              NotViewed: item.notViewedSessions ?? 0,
            }))}
          />
        </>
      )}
    </div>
  );
};
