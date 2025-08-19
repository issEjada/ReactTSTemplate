import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DynamicTable } from "../../../components/DynamicTable";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import EventsFilter from "../EventsFilter/EventsFilterJsx";
import useEventsTable from "./useEventsTable";
import { TableFallback } from "../../../components/TableFallback";

const ViewIcon = React.lazy(() => import("../../../assets/svg/View.svg?react"));
const Update = React.lazy(() => import("../../../assets/svg/update.svg?react"));
const PlusIcon = React.lazy(() => import("../../../assets/svg/plus.svg?react"));

const MobileIcon = React.lazy(
  () => import("../../../assets/svg/mobile.svg?react")
);
const DesktopIcon = React.lazy(
  () => import("../../../assets/svg/Desktop.svg?react")
);
const WebIcon = React.lazy(() => import("../../../assets/svg/web.svg?react"));

const EventIcon = React.lazy(
  () => import("../../../assets/svg/events.svg?react")
);

type EventRow = {
  id: number;
  code: string;
  name: string;
  description: string;
  status: string;
  scheme: string;
  eventSourceDevice: string;
  createdAt: string; // ISO string
};

/* ─────────────────────────────
   Device pill (20×20, 8px radius)
   ───────────────────────────── */
const DevicePill: React.FC<{ device: string }> = ({ device }) => {
  // Normalize to 3 buckets based on the device label
  const key = /web/i.test(device)
    ? "3DS_MICROSITE_SDK_MD"
    : /desk/i.test(device)
    ? "WEB_SDK_MD"
    : "MOBILE_SDK_MD";

  return (
    <span className="inline-flex items-center gap-[10px]">
      <span className="w-[40px] h-[40px] rounded-[8px] flex items-center justify-center border border-[#E9EAEB] dark:border-gray-700">
        {key === "MOBILE_SDK_MD" && (
          <MobileIcon className="w-[20px] h-[20px]" />
        )}
        {key === "WEB_SDK_MD" && <DesktopIcon className="w-[20px] h-[20px]" />}
        {key === "3DS_MICROSITE_SDK_MD" && (
          <WebIcon className="w-[20px] h-[20px]" />
        )}
      </span>
      <span className="text-[14px] leading-[20px] dark:text-white">
        {device}
      </span>
    </span>
  );
};

const EventMenu = ({ row }: { row: EventRow }) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!buttonRef.current) return;
    if (
      !buttonRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest(".event-menu-portal")
    ) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const toggleMenu = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.right - 143 + window.scrollX,
      });
    }
    setOpen((prev) => !prev);
  };

  const handleView = () => {
    setOpen(false);
    navigate("/events/view-event", {
      state: { action: "view", id: row.id, event: row },
    });
  };

  const handleUpdateEvent = () => {
    setOpen(false);
    navigate("/events/new-event", {
      state: { action: "edit", id: row.id, event: row },
    });
  };

  return (
    <>
      <button
        ref={buttonRef}
        className="h-[30px] w-[30px] flex items-center justify-center rounded hover:bg-gray-200 focus:outline-none"
        onClick={toggleMenu}
        aria-label="More options"
      >
        <span className="flex flex-col justify-center items-center gap-[3px]">
          <span className="block w-[5px] h-[5px] rounded-full bg-gray-400" />
          <span className="block w-[5px] h-[5px] rounded-full bg-gray-400" />
          <span className="block w-[5px] h-[5px] rounded-full bg-gray-400" />
        </span>
      </button>

      {open &&
        createPortal(
          <div
            className="event-menu-portal absolute z-[9999] w-[151px] h-[82px] rounded-[8px] border border-[#E9EAEB] bg-white font-medium text-[#414651] shadow-lg dark:bg-[#121418] dark:border-gray-800 dark:text-white"
            style={{ top: coords.top, left: coords.left }}
          >
            <button
              type="button"
              className="w-[151px] h-[40px] flex items-center gap-[12px] px-4 py-2 hover:bg-gray-100 cursor-pointer text-left dark:hover:bg-gray-800 rounded-t-[8px]"
              onClick={handleView}
            >
              <ViewIcon />
              <span className="text-[14px] whitespace-nowrap">
                View Details
              </span>
            </button>
            <div className="border-t border-gray-200" />
            <button
              type="button"
              className="w-[151px] h-[40px] flex items-center px-[16px] py-[10px] gap-[12px] hover:bg-gray-100 cursor-pointer text-left dark:hover:bg-gray-800 rounded-b-[8px]"
              onClick={handleUpdateEvent}
            >
              <Update />
              <span className="text-[14px]">Update Event</span>
            </button>
          </div>,
          document.body
        )}
    </>
  );
};

const getColumns = (): ColumnDef<EventRow>[] => [
  { header: "Code", accessorKey: "code" },
  {
    header: "Event Name",
    accessorKey: "name",
    cell: (info) => (
      <div className="flex flex-col">
        <span className="font-medium dark:text-white">
          {String(info.getValue() ?? "")}
        </span>
      </div>
    ),
  },
  { header: "Description", accessorKey: "description" },
  { header: "Scheme", accessorKey: "scheme" },

  {
    header: "Device",
    accessorKey: "eventSourceDevice",
    cell: (info) => <DevicePill device={String(info.getValue() ?? "")} />,
  },

  {
    header: "Creation Time",
    accessorKey: "createdAt",
    cell: (info) => {
      const value = String(info.getValue() ?? "");
      const d = new Date(value);
      const date = isNaN(d.getTime()) ? "-" : d.toLocaleDateString("en-GB");
      const tRaw = isNaN(d.getTime())
        ? "-"
        : d.toLocaleTimeString("en-US", {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
      const time =
        tRaw !== "-" && tRaw.includes(":")
          ? `${tRaw.split(":")[0]}:${tRaw.split(":")[1]}:00 ${
              tRaw.split(" ")[1]
            }`
          : "-";
      return (
        <div className="flex flex-col">
          <span className="text-xs font-medium dark:text-white">{date}</span>
          <span className="text-xs font-medium dark:text-white">{time}</span>
        </div>
      );
    },
  },
  {
    header: "",
    id: "actions",
    cell: ({ row }) => <EventMenu row={row.original} />,
  },
];

export const EventsTable = () => {
  const {
    data,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    handleSearchSubmit,
    // setItemsPerPage,
    filters,
    totalCount,
  } = useEventsTable();

  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [deviceFilter, setDeviceFilter] = useState<
    "All" | "Mobile" | "Desktop" | "Web"
  >("All");

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const columns = useMemo(() => getColumns(), []);

  const openFilterModal = useCallback(() => setIsFilterOpen(true), []);
  const closeFilterModal = useCallback(() => setIsFilterOpen(false), []);

  const applyFilters = () => {
    setCurrentPage(1);
  };

  const isFilterActive = useMemo(
    () => Object.keys(filters ?? {}).length > 0 || searchText.trim() !== "",
    [filters, searchText]
  );

  const handleClearSearch = () => {
    setSearchText("");
    setDeviceFilter("All");
    setCurrentPage(1);
  };

  const handleAddNewEvent = () => {
    navigate("/events/new-event", { state: { action: "add" } });
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white shadow-sm dark:bg-[#000000] dark:border-gray-800 dark:text-white">
      <div className="pt-5 px-6 pb-[18px]">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] items-start sm:items-center gap-3 sm:gap-0">
          <div>
            <h2 className="text-lg text-gray-900 dark:text-white">
              Events Management{" "}
              <span className="ml-2 text-blue-700 bg-blue-50 px-[8px] py-[2px] rounded-full text-[12px]">
                {totalCount} Event{totalCount !== 1 && "s"}
              </span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Keep track of customers and their security levels.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddNewEvent}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 h-[40px] rounded-[8px] text-sm font-semibold flex items-center gap-2"
            >
              <PlusIcon className="w-[20px] h-[20px]" />
              <span className="text-[14px]">Add New Event</span>
            </button>
          </div>
        </div>
      </div>
      {totalCount === 0 && !isFilterActive ? (
        <TableFallback
          icon={<EventIcon className="sm:w-[28px] sm:h-[28px]" />}
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
        <DynamicTable<EventRow>
          data={data.map((item) => ({
            id: item.id,
            name: item.name ?? "",
            description: item.description ?? "",
            status: item.status as "ENABLED" | "DISABLED",
            code: item.code,
            scheme: item.identifier.scheme,
            eventSourceDevice: item.identifier.eventSourceDevice,
            createdAt: item.creationTimestamp,
          }))}
          columns={columns}
          filterComponent={
            <EventsFilter
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
          onFilterStatus={(v) =>
            setDeviceFilter(v as "All" | "Mobile" | "Desktop" | "Web")
          }
          statusFilter={deviceFilter}
          statusFilterOptions={[
            { key: "All", label: "View all" },
            { key: "Mobile", label: "Mobile" },
            { key: "Desktop", label: "Desktop" },
            { key: "Web", label: "Web" },
          ]}
          onClearSearch={handleClearSearch}
          onAddNewItem={handleAddNewEvent}
          error={null}
          title="Events Management"
          searchText={searchText}
          setSearchText={setSearchText}
          openFilterModal={openFilterModal}
          applyFilters={applyFilters}
          searchPlaceholder="Search"
          showStatusFilter={true}
        />
      )}
    </div>
  );
};

export default EventsTable;
