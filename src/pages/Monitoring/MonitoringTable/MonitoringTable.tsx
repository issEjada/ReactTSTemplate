import React, {
  useState,
  useMemo,
  useCallback,
  Suspense,
  useEffect,
} from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { MonitoringFilterForm } from "../MonitoringFilter/MonitoringFilterJsx";
import { useMonitoringTable } from "./useMonitoringTable";
import type { ViewSessionsFormValues } from "../MonitoringFilter/useMonitoringFilter";
import SessionActivity from "./SessionActivity";
import { useSessionActivity } from "./useSessionActivity";
import { DynamicTable } from "../../../components/DynamicTable";
import { TableFallback } from "../../../components/TableFallback";
import { AppRoutes } from "../../../routes/AppRoutes";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import MetricCard from "../../CustomerProfile/ActionAnalytics/MetricCard";
import { formatTime } from "../../../utils/helpers";

const ShieldIcon = React.lazy(
  () => import("../../../assets/svg/shieldG.svg?react")
);
const Threatblock = React.lazy(
  () => import("../../../assets/svg/Threatblock.svg?react")
);
const ActiveAlerts = React.lazy(
  () => import("../../../assets/svg/ActiveAlerts.svg?react")
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
  creationTimestamp: string;
  lastUpdatedTimestamp: string;
};

const getColumns = (): ColumnDef<Session>[] => [
  {
    header: "Session ID",
    accessorKey: "sessionId",
    meta: {
      isSorted: true,
    },
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
    meta: {
      isSorted: true,
    },
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
              ? "bg-success-50 text-success-700 dark:bg-success-700 dark:text-success-50"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          <div
            className={`rounded-full bg-black w-[6px] h-[6px] ${
              info.getValue() === "VIEWED"
                ? "bg-success-500 dark:bg-success-400"
                : "bg-gray-500"
            }`}
          ></div>
          {info.getValue() === "VIEWED" ? "Viewed" : "Not Viewed"}
        </span>
      );
    },
  },
  {
    header: "Creation Time",
    accessorKey: "creationTimestamp",
    meta: {
      isSorted: true,
    },
  },
  {
    header: "Last Updated Time",
    accessorKey: "lastUpdatedTimestamp",
    meta: {
      isSorted: true,
    },
  },
];

export const MonitoringTable = () => {
  const {
    data = [],
    loadingState,
    error,
    totalCount,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    filters,
    setFilters,
    handleSearchSubmit,
  } = useMonitoringTable();

  const { sessionActivityData, statisticsData } = useSessionActivity();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "All" | "VIEWED" | "NOT_VIEWED"
  >("All");

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (loadingState === "success" && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [loadingState, isInitialLoad]);

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
    setIsSearching(false);
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
        creationTimestamp: formatTime(item.creationTimestamp),
        lastUpdatedTimestamp: formatTime(item.lastUpdatedTimestamp),
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
    setIsSearching(true);
  };

  if (error) {
    return (
      <div className="w-full h-[75vh] flex items-center justify-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  if (loadingState === "loading" && isInitialLoad) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-3 p-6 bg-white shadow-sm dark:bg-black dark:border-gray-800 dark:text-white">
      <div className="pt-5  pb-[18px]">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] items-start sm:items-center gap-3 sm:gap-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Monitor Activity Sessions{" "}
              <span className="ml-2 text-sm text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                {totalCount} Activity Session{totalCount !== 1 && "s"}
              </span>
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Keep track of customers and their security levels.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-6 justify-around">
        <MetricCard
          title="Total Sessions"
          value={statisticsData?.totalSessions || 0}
          icon={<ShieldIcon className="text-blue-700" />}
          className="w-full sm:w-[200px]  md:w-[370px]"
        />
        <MetricCard
          title="Viewed"
          value={statisticsData?.viewedSessions || 0}
          icon={<Threatblock className="text-success-600" />}
          className="w-full  md:w-[370px]"
        />
        <MetricCard
          title="Not Viewed"
          value={statisticsData?.notViewedSessions || 0}
          icon={<ActiveAlerts className="text-warning-600" />}
          className="w-full md:w-[370px]"
        />
      </div>
      {totalCount === 0 && !isFilterActive && !isSearching ? (
        <TableFallback
          icon={
            <Suspense>
              <ShieldIcon className="sm:w-[28px] sm:h-[28px] text-gray-500" />
            </Suspense>
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
            loadingState={loadingState}
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
