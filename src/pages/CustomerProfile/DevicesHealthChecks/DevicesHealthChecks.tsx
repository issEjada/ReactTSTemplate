import React, { useMemo, useState, useRef, useEffect } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { CustomerProfileTable } from "../CustomerProfileTable";
import { useDevicesHealthChecks } from "./useDeviceHealthChecks";
import FullScreenSpinner from "../../../components/FullScreenSpinner";
import type { DevicesHealthChecksResponse } from "../customerProfileServices";

export type DateTimeRange = {
  fromTimestamp: string;
  toTimestamp: string;
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
        className="h-10 px-3 rounded-lg border border-[#E9EAEB] bg-white text-sm text-[#414651] flex items-center gap-2 hover:bg-gray-50 dark:border-gray-800 dark:bg-[#0F141A] dark:text-white"
      >
        Date
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-1 bg-white dark:bg-black rounded-lg shadow-lg border border-gray-200 p-4 z-10 w-[200px]">
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
                className=" w-full h-[44px] mt-1 p-2 rounded-md text-sm
                    border border-gray-300 text-gray-900
                    dark:bg-[#121418] dark:border-gray-800 dark:text-white
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
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
                className={` w-full h-[44px] mt-1 p-2 rounded-md text-sm
                    border border-gray-300 text-gray-900
                    dark:bg-[#121418] dark:border-gray-800 dark:text-white
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    [color-scheme:light] dark:[color-scheme:dark] ${
                      isValidRange() ? "border-gray-300" : "border-red-500"
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

  const columns = useMemo<ColumnDef<DevicesHealthChecksResponse>[]>(
    () => [
      { header: "Device ID", accessorKey: "deviceId" },
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
    return <FullScreenSpinner />;
  }

  if (errorValidation) {
    return <span className="text-red-500">{errorValidation}</span>;
  }

  return (
    <div className="px-5 overflow-x-auto">
      <CustomerProfileTable<DevicesHealthChecksResponse>
        title="Devices Health Check"
        headerLeft={
          <h2 className="text-[#181D27] dark:text-white text-[18px] font-semibold">
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
        data={devicesHealthChecksData || []}
        columns={columns}
        totalCount={devicesHealthChecksData?.length || 0}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchText={searchText}
        setSearchText={setSearchText}
        onClearSearch={() => setSearchText("")}
        openFilterModal={() => {}}
        applyFilters={() => {}}
        showStatusFilter={false}
        error={null}
        itemsPerPage={5}
      />
    </div>
  );
};

export default DevicesHealthChecks;
