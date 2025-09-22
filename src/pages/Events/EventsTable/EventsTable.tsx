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
import { AppRoutes } from "../../../routes/AppRoutes";
import type { EventFormValues } from "../eventsServices";
import PopupLayout from "../../../components/Popup/PopupLayout";
import DynamicPopupJsx from "../../../components/Popup/DynamicPopupJsx";
import Spinner from "../../../components/Spinner";
import { formatTime } from "../../../utils/helpers";

const ViewIcon = React.lazy(() => import("../../../assets/svg/View.svg?react"));
const UpdateIcon = React.lazy(
  () => import("../../../assets/svg/update.svg?react")
);
const PlusIcon = React.lazy(() => import("../../../assets/svg/plus.svg?react"));

const MobileIcon = React.lazy(
  () => import("../../../assets/svg/mobile.svg?react")
);
const DesktopIcon = React.lazy(
  () => import("../../../assets/svg/Desktop.svg?react")
);
const AnyDeviceIcon = React.lazy(
  () => import("../../../assets/svg/any-device.svg?react")
);

const EventIcon = React.lazy(
  () => import("../../../assets/svg/events.svg?react")
);

type EventRow = {
  id: number;
  code: string;
  name: string;
  description: string;
  status: string;
  scheme: string | undefined;
  eventSourceDevice: string | undefined;
  creationTimestamp: string;
  lastUpdatedTimestamp: string;
};

const iconClasses = "w-[20px] h-[20px] text-blue-700 dark:text-blue-600";

const deviceIcons: Record<string, React.ReactNode> = {
  Mobile: <MobileIcon className={iconClasses} />,
  "3DS Authentication Page": <DesktopIcon className={iconClasses} />,
  "Any Managed Device": <AnyDeviceIcon className={iconClasses} />,
};

const DevicePill = ({ device }: { device: string }) => {
  if (!device) return null;

  return (
    <span className="w-full inline-flex items-center gap-[10px]">
      <span className="w-[40px] h-[40px] rounded-[8px] flex items-center justify-center border border-gray-200 dark:border-gray-700">
        {/* ✅ Render from map, fallback to AnyDeviceIcon */}
        {deviceIcons[device] || <AnyDeviceIcon className={iconClasses} />}
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
    navigate(AppRoutes.editEvents, {
      state: { action: "edit", id: row.id, event: row },
    });
  };

  return (
    <>
      <button
        ref={buttonRef}
        className="h-[30px] w-[30px] flex items-center justify-center rounded hover:bg-gray-200 focus:outline-none"
        onClick={(e) => {
          e.stopPropagation();
          toggleMenu();
        }}
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
            className="event-menu-portal absolute z-[9999] w-[151px] h-[82px] rounded-[8px] border border-gray-200 bg-white font-medium text-gray-700 shadow-lg dark:bg-darkTheme dark:border-gray-800 dark:text-white"
            style={{ top: coords.top, left: coords.left }}
          >
            <button
              type="button"
              className="w-[151px] h-[40px] flex items-center gap-[12px] px-4 py-2 hover:bg-gray-100 cursor-pointer text-left dark:hover:bg-gray-800 rounded-t-[8px]"
              onClick={(e) => {
                e.stopPropagation();
                handleView();
              }}
            >
              <ViewIcon className="text-gray-700 dark:text-white w-4 h-4" />
              <span className="text-[14px] whitespace-nowrap">
                View Details
              </span>
            </button>
            <div className="border-t border-gray-200" />
            <button
              type="button"
              className="w-[151px] h-[40px] flex items-center px-[16px] py-[10px] gap-[12px] hover:bg-gray-100 cursor-pointer text-left dark:hover:bg-gray-800 rounded-b-[8px]"
              onClick={(e) => {
                e.stopPropagation();
                handleUpdateEvent();
              }}
            >
              <UpdateIcon className="text-gray-700 dark:text-white w-4 h-4" />
              <span className="text-[14px]">Update Event</span>
            </button>
          </div>,
          document.body
        )}
    </>
  );
};

const getColumns = (
  onToggleStatus: (id: number, currentStatus: string) => void
): ColumnDef<EventRow>[] => [
  {
    header: "OFF/ON",
    cell: ({ row }) => {
      const status = row.original.status;

      const isActive = status === "ENABLED";
      return (
        <div className="flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleStatus(row.original.id, status);
            }}
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
    header: "Code",
    accessorKey: "code",
    meta: {
      isSorted: true,
    },
  },
  {
    header: "Event Name",
    accessorKey: "name",
    meta: {
      isSorted: true,
    },
    cell: (info) => (
      <div className="flex flex-col">
        <span className="font-medium dark:text-white">
          {String(info.getValue() ?? "")}
        </span>
      </div>
    ),
  },
  { header: "Description", accessorKey: "description" },
  { header: "Scheme", accessorKey: "scheme.value" },

  {
    header: "Device",
    accessorKey: "eventSourceDevice.value",
    cell: (info) => <DevicePill device={String(info.getValue() ?? "")} />,
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
    filters,
    setFilters,
    totalCount,
    loadingState,
    isPopupOpen,
    setIsPopupOpen,
    popupType,
    popupMessage,
    handleToggleStatus,
    setItemsPerPage,
  } = useEventsTable();

  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const columns = useMemo(
    () => getColumns(handleToggleStatus), // Pass the destructured handleToggleStatus
    [handleToggleStatus] // Add dependencies
  );

  const openFilterModal = useCallback(() => setIsFilterOpen(true), []);
  const closeFilterModal = useCallback(() => setIsFilterOpen(false), []);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (loadingState === "success" && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [loadingState, isInitialLoad]);

  const applyFilters = () => {
    const newFilters: EventFormValues = {
      ...filters,
      name: searchText.trim(),
    };
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const isFilterActive = useMemo(
    () => Object.keys(filters ?? {}).length > 0 || searchText.trim() !== "",
    [filters, searchText]
  );

  const handleClearSearch = () => {
    setSearchText("");
    setFilters({});
    setCurrentPage(1);
    setIsSearching(true);
  };

  const handleAddNewEvent = () => {
    navigate(AppRoutes.addEvents);
  };

  const handleDeviceFilter = (device: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      identifier: {
        ...prevFilters?.identifier,
        eventSourceDevice: device === "ALL" ? undefined : device,
      },
    }));
    setCurrentPage(1);
    setIsSearching(false);
  };

  const getDeviceFilterValue = useMemo(() => {
    if (filters?.identifier?.eventSourceDevice) {
      return filters.identifier.eventSourceDevice;
    }
    return "ALL";
  }, [filters]);

  if (loadingState === "loading" && isInitialLoad) {
    return <Spinner />;
  }
  return (
    <div className="p-6 bg-white shadow-sm dark:bg-black">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-5">
          {/* Left side: Title + description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              Events Management{" "}
              <span className="ml-2 text-sm text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                {totalCount} Event{totalCount !== 1 && "s"}
              </span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Keep track of customers and their security levels.
            </p>
          </div>

          {/* Right side: Button */}
          {(totalCount !== 0 || !isFilterActive || isSearching) && (
            <button
              onClick={handleAddNewEvent}
              className="bg-blue-700 hover:bg-blue-800 text-white rounded-[8px] text-sm font-medium w-[155px] h-10 flex items-center justify-center gap-2 self-start sm:self-auto"
            >
              <PlusIcon className="w-[20px] h-[20px] text-white" />
              Add New Event
            </button>
          )}
        </div>
      </div>

      {totalCount === 0 && !isFilterActive && !isSearching ? (
        <TableFallback
          icon={<EventIcon className="sm:w-[28px] sm:h-[28px] text-gray-500" />}
          title="Start adding Events"
          description={
            <>
              You don’t have any Events yet.
              <br />
              Start monitoring by adding new events now"
            </>
          }
          buttonText="Add New Event"
          buttonIcon={<PlusIcon className="w-[20px] h-[20px] text-white" />}
          onButtonClick={handleAddNewEvent}
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
            creationTimestamp: formatTime(item.creationTimestamp),
            lastUpdatedTimestamp: formatTime(item.lastUpdatedTimestamp),
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
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
          onFilterStatus={handleDeviceFilter}
          statusFilter={getDeviceFilterValue}
          statusFilterOptions={[
            { key: "ALL", label: "View all" },
            { key: "MOBILE_SDK_MD", label: "Mobile" },
            { key: "3DS_MICROSITE_SDK_MD", label: "3DS Authentication Page" },
            { key: "ANY_SDK_MD", label: "Any Managed Device" },
          ]}
          onRowClick={(rowData) => {
            const { id } = rowData as { id: string | number };
            navigate(AppRoutes.viewEvents, {
              state: { id: id.toString(), action: "view" },
            });
          }}
          onClearSearch={handleClearSearch}
          onAddNewItem={handleAddNewEvent}
          error={null}
          title="Events Management"
          searchText={searchText}
          setSearchText={setSearchText}
          openFilterModal={openFilterModal}
          applyFilters={applyFilters}
          searchPlaceholder="Search Event Name"
          showStatusFilter={true}
          loadingState={loadingState}
        />
      )}

      <PopupLayout isOpen={isPopupOpen} className="w-[30%]">
        <DynamicPopupJsx
          title="Event"
          isError={popupType === "errorModal"}
          errorMessage={popupMessage}
          onCancel={() => {
            setIsPopupOpen(false);
          }}
        />
      </PopupLayout>
    </div>
  );
};

export default EventsTable;
