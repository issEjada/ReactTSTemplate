import React, { useMemo, useState, useRef, useEffect, Suspense } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useDevicesHealthChecks } from "./useDeviceHealthChecks";
import { DynamicTable } from "../../../components/DynamicTable";
import Spinner from "../../../components/Spinner";

const DateIcon = React.lazy(() => import("../../../assets/svg/Date.svg?react"));

export type DateTimeRange = {
  fromTimestamp: string;
  toTimestamp: string;
};

export type FlattenedHealthResponse = {
  uniqueId: string;
  manufacturer: string;
  model: string;
  appInstallationId: string;
  checkTimestamp: string;
  negativeHealthCheck: string;
};

const HealthCheckDateButton: React.FC<{
  onApply: (date: DateTimeRange) => void;
}> = ({ onApply }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const [dateTimeRange, setDateTimeRange] = useState<DateTimeRange>({
    fromTimestamp: "",
    toTimestamp: "",
  });

  const handleDateTimeChange =
    (field: "fromTimestamp" | "toTimestamp") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDateTimeRange((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const isValidRange = () => {
    if (!dateTimeRange.fromTimestamp || !dateTimeRange.toTimestamp) return true;
    return (
      new Date(dateTimeRange.toTimestamp) >
      new Date(dateTimeRange.fromTimestamp)
    );
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm text-gray-700 flex items-center gap-2 hover:bg-gray-100  dark:hover:bg-gray-800 dark:bg-[#0F141A] dark:text-white"
      >
        Date
        <Suspense
          fallback={
            <div className="w-[20px] h-[20px] bg-gray-300 rounded-full" />
          }
        >
          <DateIcon className="w-[20px] h-[20px]" />
        </Suspense>
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-1 bg-white dark:bg-black rounded-lg shadow-lg border border-gray-200 p-4 z-8 w-[250px]">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                From
              </label>
              <input
                type="datetime-local"
                value={dateTimeRange.fromTimestamp}
                onChange={handleDateTimeChange("fromTimestamp")}
                title="Select start date and time"
                className="w-full h-[44px] mt-2 px-[14px] py-[10px] rounded-md text-base text-gray-500 mb-2
                           border border-gray-300 uppercase
                           dark:bg-darkTheme dark:border-gray-800 dark:text-white
                           dark:placeholder:text-gray-500
                           [color-scheme:light] dark:[color-scheme:dark]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                To
              </label>
              <input
                type="datetime-local"
                value={dateTimeRange.toTimestamp}
                onChange={handleDateTimeChange("toTimestamp")}
                min={dateTimeRange.fromTimestamp}
                title="Select end date and time"
                className={` w-full h-[44px] mt-2 px-[14px] py-[10px] rounded-md text-base text-gray-500 mb-2
                           border border-gray-300 uppercase
                           dark:bg-darkTheme dark:border-gray-800 dark:text-white
                           dark:placeholder:text-gray-500
                           [color-scheme:light] dark:[color-scheme:dark] ${
                             isValidRange()
                               ? "border-gray-300"
                               : "border-red-500"
                           }`}
              />
              {!isValidRange() && (
                <p className="mt-1 text-sm text-red-600">
                  End date must be after start date
                </p>
              )}
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="button"
                className="px-4 py-2 border text-black dark:text-white rounded-lg hover:bg-gray-200 disabled:opacity-50 dark-bg-black w-[80px] dark:hover:text-black"
                disabled={!isValidRange()}
                onClick={() => {
                  onApply(dateTimeRange);
                  setOpen(false);
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const DevicesHealthChecks: React.FC = () => {
  const {
    devicesHealthChecksData,
    setDevicesHealthChecksFilterData,
    errorValidation,
    loadingState,
    currentPage,
    setCurrentPage,
  } = useDevicesHealthChecks();

  const flattened: FlattenedHealthResponse[] =
    devicesHealthChecksData?.data.healthCheckRecords.map((record) => ({
      uniqueId: record.deviceInfo.deviceId.uniqueId,
      manufacturer: record.deviceInfo.deviceId.manufacturer,
      model: record.deviceInfo.deviceId.model,
      appInstallationId: record.deviceInfo.appInstallationId,
      checkTimestamp: record.checkTimestamp,
      negativeHealthCheck: record.negativeHealthCheck,
    })) || [];

  const columns = useMemo<ColumnDef<FlattenedHealthResponse>[]>(
    () => [
      { header: "Device ID", accessorKey: "uniqueId" },
      { header: "Manufacturers", accessorKey: "manufacturer" },
      { header: "Model", accessorKey: "model" },
      { header: "App Installation ID", accessorKey: "appInstallationId" },
      { header: "Check Timestamp", accessorKey: "checkTimestamp" },
      { header: "Negative Health Check", accessorKey: "negativeHealthCheck" },
    ],
    []
  );

  const [searchText, setSearchText] = useState("");

  const applyDateFilter = (date: DateTimeRange) => {
    const searchData = {
      deviceId: searchText.trim() || undefined,
      fromTimestamp: date.fromTimestamp,
      toTimestamp: date.toTimestamp,
    };
    setDevicesHealthChecksFilterData(searchData);
    setSearchText("");
  };

  if (loadingState === "loading") {
    return <Spinner />;
  }

  return (
    <div className="px-5 overflow-x-auto">
      <DynamicTable<FlattenedHealthResponse>
        title="Devices Health Check"
        isCustomerProfile={true}
        headerLeft={
          <h2 className="text-gray-900 dark:text-white text-[18px] font-semibold">
            Devices Health Check
          </h2>
        }
        headerRightExtra={
          <HealthCheckDateButton
            onApply={(date) => {
              applyDateFilter(date);
            }}
          />
        }
        minimalWithPagination={false}
        data={flattened || []}
        columns={columns}
        totalCount={devicesHealthChecksData?.meta.totalItems || 0}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchText={searchText}
        setSearchText={setSearchText}
        onClearSearch={() => setSearchText("")}
        openFilterModal={() => {}}
        applyFilters={() => {}}
        showStatusFilter={false}
        error={errorValidation || ""}
        itemsPerPage={5}
      />
    </div>
  );
};

export default DevicesHealthChecks;
