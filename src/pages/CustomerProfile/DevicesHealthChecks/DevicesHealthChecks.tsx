import React, { useMemo, useState, useRef, useEffect } from "react";
import type { ColumnDef } from "@tanstack/react-table";
 
import { DynamicTable } from "../../../components/DynamicTable";
 
type DeviceRow = {
  id: number;
  deviceId: string;
  manufacture: string;
  model: string;
  appInstallId: string;
  checkTimestamp: string;
  negativeHealth: string;
};
 
const HealthCheckDateButton: React.FC<{
  onApply: () => void;
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
 
  
  const [dateTimeRange, setDateTimeRange] = useState<{ from: string; to: string }>({
  from: "", to: ""
  });
 
  const handleDateTimeChange = (field: "from" | "to") => (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTimeRange((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };
 
  const isValidRange = () => {
    if (!dateTimeRange.from || !dateTimeRange.to) return true;
    return new Date(dateTimeRange.to) > new Date(dateTimeRange.from);
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
                    value={dateTimeRange.from}
                    onChange={handleDateTimeChange("from")}
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
                    value={dateTimeRange.to}
                    onChange={handleDateTimeChange("to")}
                    min={dateTimeRange.from}
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
                      onApply();
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
  const rows = useMemo<DeviceRow[]>(
    () => [
      { id: 1, deviceId: "eriu3948394", manufacture: "Apple", model: "iPhone 14", appInstallId: "3013", checkTimestamp: "18.1.0", negativeHealth: "Developer Mode" },
      { id: 2, deviceId: "eriu3948394", manufacture: "Apple", model: "iPhone 14", appInstallId: "2000", checkTimestamp: "18.1.0", negativeHealth: "Developer Mode" },
      { id: 3, deviceId: "eriu3948394", manufacture: "Apple", model: "iPhone 14", appInstallId: "5400", checkTimestamp: "18.1.0", negativeHealth: "Developer Mode" },
      { id: 4, deviceId: "eriu3948394", manufacture: "Apple", model: "iPhone 14", appInstallId: "2200", checkTimestamp: "18.1.0", negativeHealth: "Developer Mode" },
      { id: 5, deviceId: "eriu3948394", manufacture: "Apple", model: "iPhone 14", appInstallId: "500", checkTimestamp: "18.1.0", negativeHealth: "Developer Mode" },
    ],
    []
  );
 
  const columns = useMemo<ColumnDef<DeviceRow>[]>(
    () => [
      { header: "Device ID", accessorKey: "deviceId" },
      { header: "Manufacturers", accessorKey: "manufacture" },
      { header: "Model", accessorKey: "model" },
      { header: "App Installation ID", accessorKey: "appInstallId" },
      { header: "Check Timestamp", accessorKey: "checkTimestamp" },
      { header: "Negative Health Check", accessorKey: "negativeHealth" },
    ],
    []
  );
 
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
 
  const applyDateFilter = () => {
    
  };
 
  return (
    <div className="px-5 overflow-x-auto w-[792px]">
      <DynamicTable<DeviceRow>
        title="Devices Health Check"
        headerLeft={
          <h2 className="text-[#181D27] dark:text-white text-[18px] font-semibold">
            Devices Health Check
          </h2>
        }
        headerRightExtra={
          <HealthCheckDateButton
            onApply={applyDateFilter}
          />
        }
        minimalWithPagination={false}
        data={rows}
        columns={columns}
        totalCount={rows.length}
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