import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { DynamicTable } from "../../../components/DynamicTable";

const ViewIcon = React.lazy(() => import("../../../assets/svg/View.svg?react"));
const EditIcon = React.lazy(() => import("../../../assets/svg/Edit.svg?react"));
const DeleteIcon = React.lazy(
  () => import("../../../assets/svg/Delete.svg?react")
);

type DeviceRow = {
  id: number;
  mobile: string;
  userId: string;
  clientId: string;
  deviceId: string;
  manufacture: string;
  model: string;
  os: string;
  regDate: string;
};

const DeviceMenu = ({ row }: { row: DeviceRow }) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!buttonRef.current) return;
    if (
      !buttonRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest(".device-menu-portal")
    ) {
      setOpen(false);
    }
  }, []);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleClickOutside, handleEscape]);

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
    navigate("/devices/view", { state: { id: row.id } });
  };

  const handleEdit = () => {
    setOpen(false);
    navigate("/devices/edit", { state: { id: row.id } });
  };

  const handleDelete = () => {
    setOpen(false);
    alert(`Delete device ${row.id}`);
  };

  return (
    <>
      <button
        ref={buttonRef}
        className="h-[30px] w-[30px] flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-white"
        onClick={toggleMenu}
        aria-label="More options"
      >
        <span className="flex flex-col justify-center items-center gap-[3px]">
          <span className="block w-[5px] h-[5px] rounded-full bg-gray-400 dark:bg-gray-500" />
          <span className="block w-[5px] h-[5px] rounded-full bg-gray-400 dark:bg-gray-500" />
          <span className="block w-[5px] h-[5px] rounded-full bg-gray-400 dark:bg-gray-500" />
        </span>
      </button>

      {open &&
        createPortal(
          <div
            className="device-menu-portal absolute z-[9999] w-[143px] rounded-[8px] border border-[#E9EAEB] bg-white font-medium text-[#414651] shadow-lg dark:bg-[#121418] dark:border-gray-800 dark:text-white"
            style={{ top: coords.top, left: coords.left }}
          >
            <button
              type="button"
              className="w-full h-[40px] flex items-center gap-[12px] px-4 py-2 hover:bg-gray-100 cursor-pointer text-left dark:hover:bg-gray-800"
              onClick={handleView}
            >
              <ViewIcon />
              <span className="text-[14px] whitespace-nowrap">
                View Details
              </span>
            </button>
            <div className="border-t border-gray-200 dark:border-gray-800" />
            <button
              type="button"
              className="w-full h-[40px] flex items-center px-[16px] py-[10px] gap-[12px] hover:bg-gray-100 cursor-pointer text-left dark:hover:bg-gray-800"
              onClick={handleEdit}
            >
              <EditIcon className="h-4 w-4" />
              <span className="text-[14px]">Edit Device</span>
            </button>
            <div className="border-t border-gray-200 dark:border-gray-800" />
            <button
              type="button"
              className="w-full h-[40px] flex items-center px-[16px] py-[10px] gap-[12px] hover:bg-gray-100 cursor-pointer text-left dark:hover:bg-gray-800"
              onClick={handleDelete}
            >
              <DeleteIcon />
              <span className="text-[14px]">Delete</span>
            </button>
          </div>,
          document.body
        )}
    </>
  );
};

export const CustomerDevices: React.FC = () => {
  const rows = useMemo<DeviceRow[]>(
    () => [
      {
        id: 1,
        mobile: "+9653333",
        userId: "4234",
        clientId: "6023",
        deviceId: "3013",
        manufacture: "Apple",
        model: "iPhone 14",
        os: "18.1.0",
        regDate: "22-08-2025",
      },
      {
        id: 2,
        mobile: "+9653333",
        userId: "4234",
        clientId: "6023",
        deviceId: "2000",
        manufacture: "Apple",
        model: "iPhone 14",
        os: "18.1.0",
        regDate: "22-08-2025",
      },
    ],
    []
  );

  const columns = useMemo<ColumnDef<DeviceRow>[]>(
    () => [
      { header: "Mobile #", accessorKey: "mobile" },
      { header: "User ID", accessorKey: "userId" },
      { header: "Client ID", accessorKey: "clientId" },
      { header: "Device ID", accessorKey: "deviceId" },
      { header: "Manufacture", accessorKey: "manufacture" },
      { header: "Model", accessorKey: "model" },
      { header: "OS Systems", accessorKey: "os" },
      { header: "Reg. Date", accessorKey: "regDate" },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => <DeviceMenu row={row.original} />,
        enableSorting: false,
        size: 48,
      },
    ],
    []
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="px-5 pb-5 overflow-x-auto w-[792px]">
      <DynamicTable<DeviceRow>
        title="Customer Devices"
        headerLeft={
          <h2 className="text-[#181D27] dark:text-white text-[18px] font-semibold">
            Customer Devices
          </h2>
        }
        data={rows}
        columns={columns}
        totalCount={rows.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchText={searchText}
        setSearchText={setSearchText}
        onClearSearch={() => setSearchText("")}
        filterComponent={<div />}
        openFilterModal={() => setIsFilterOpen(true)}
        applyFilters={() => {
          setIsFilterOpen(false);
        }}
        showStatusFilter={false}
        error={null}
        minimal={false}
        itemsPerPage={5}
      />
    </div>
  );
};
