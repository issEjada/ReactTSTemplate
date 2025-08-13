import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { ScoringRulesFilterForm } from "../ScoringRulesFilter/ScoringRulesFilterJsx";
import { useScoringRulesTable } from "./useScoringRulesTable";
import type { ViewRulesFormValues } from "../ScoringRulesFilter/useScoringRulesFilter";
import { DynamicTable } from "../../../components/DynamicTable";
import PopupLayout from "../../../components/Popup/LayoutPopup";
import RulesPopupJsx from "../../../components/Popup/RulesPopupJsx";
import FullScreenSpinner from "../../../components/FullScreenSpinner";

const ViewIcon = React.lazy(() => import("../../../assets/svg/View.svg?react"));
const EditIcon = React.lazy(() => import("../../../assets/svg/Edit.svg?react"));
const DeleteIcon = React.lazy(
  () => import("../../../assets/svg/Delete.svg?react")
);
const PlusIcon = React.lazy(() => import("../../../assets/svg/plus.svg?react"));
const LockIcon = React.lazy(
  () => import("../../../assets/svg/LockIcon.svg?react")
);
const BackgroundCircle = React.lazy(
  () => import("../../../assets/svg/BackgroundCircle.svg?react")
);

type Rule = {
  id: number;
  name: string;
  description: string;
  status: "ENABLED" | "DISABLED";
  riskLevel: "Low" | "Medium" | "High";
};

const RuleMenu = ({
  rule,
  onDelete,
}: {
  rule: Rule;
  onDelete: (id: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [ruleToDeleteId, setRuleToDeleteId] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    },
    [dropdownRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleView = () => {
    setOpen(false);
    navigate("/scoring-rules/view", {
      state: {
        id: rule.id,
        action: "view",
      },
    });
  };

  const handleEdit = () => {
    setOpen(false);
    navigate("/scoring-rules/edit", {
      state: {
        id: rule.id,
        action: "edit",
      },
    });
  };

  const handleDelete = () => {
    setOpen(false);
    setRuleToDeleteId(rule.id);
    setIsDeletePopupOpen(true);
  };

  const handleConfirmDelete = () => {
    if (ruleToDeleteId !== null) {
      onDelete(ruleToDeleteId);
      setIsDeletePopupOpen(false);
      setRuleToDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeletePopupOpen(false);
    setRuleToDeleteId(null);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative inline-flex items-center justify-center "
    >
      <button
        className="h-[30px] w-[30px] flex items-center justify-center rounded hover:bg-gray-200 focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-label="More options"
      >
        <span className="flex flex-col justify-center items-center gap-[3px]">
          <span className="block w-[5px] h-[5px] rounded-full bg-gray-400" />
          <span className="block w-[5px] h-[5px] rounded-full bg-gray-400" />
          <span className="block w-[5px] h-[5px] rounded-full bg-gray-400" />
        </span>
      </button>

      {open && (
        <div className="absolute right-1 top-full ml-2 z-20 w-[143px] rounded-[8px] border border-[#E9EAEB] bg-white font-medium text-[#414651] shadow-lg dark:bg-[#121418] dark:border-gray-800 dark:text-white">
          <button
            type="button"
            className="w-full h-[40px] flex items-center gap-[12px] px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
            onClick={handleView}
          >
            <div className="w-[16px] h-[16px] flex items-center justify-center">
              <ViewIcon />
            </div>
            <span className="text-[14px] whitespace-nowrap">View Details</span>
          </button>
          <div className="border-t border-gray-200" />
          <button
            type="button"
            className="w-full h-[40px] flex items-center px-[16px] py-[10px] gap-[12px] hover:bg-gray-100 cursor-pointer text-left"
            onClick={handleEdit}
          >
            <EditIcon />
            <span className="text-[14px]">Edit Rule</span>
          </button>
          <div className="border-t border-gray-200" />
          <button
            type="button"
            className="w-full h-[40px] flex items-center px-[16px] py-[10px] gap-[12px] hover:bg-gray-100 cursor-pointer text-left"
            onClick={handleDelete}
          >
            <DeleteIcon />
            <span className="text-[14px]">Delete</span>
          </button>
        </div>
      )}

      {isDeletePopupOpen && (
        <PopupLayout
          isOpen={isDeletePopupOpen}
          className="md:w-[30%] lg:w-[35%] w-[90%]"
        >
          <RulesPopupJsx
            isDeleting={true}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        </PopupLayout>
      )}
    </div>
  );
};

export const ScoringRulesTable = () => {
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
    refetch,
    handleSearchSubmit,
    deleteRule,
  } = useScoringRulesTable();
  const [searchText, setSearchText] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "All" | "ENABLED" | "DISABLED"
  >("All");

  const onFilterStatus = (status: "All" | "ENABLED" | "DISABLED") => {
    setStatusFilter(status);

    const newFilters: ViewRulesFormValues = {
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
    const newFilters: ViewRulesFormValues = {
      ...filters,
      name: searchText.trim(),
    };

    if (statusFilter !== "All") {
      newFilters.status = statusFilter;
    } else {
      delete newFilters.status;
    }

    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleToggleStatus = async () => {
    await refetch();
  };

  const handleDeleteRule = async (id: number) => {
    try {
      await deleteRule(id);
      await refetch();
    } catch (err) {
      console.error("Error deleting rule:", err);
    }
  };

  const columns = useMemo(
    () => getColumns(handleToggleStatus, handleDeleteRule),
    []
  );

  const navigate = useNavigate();

  const handleAddNewRule = () => {
    navigate("/scoring-rules/add");
  };

  const handleClearSearch = () => {
    setSearchText("");
    setFilters({});
    setStatusFilter("All");
    setCurrentPage(1);
  };

  const isFilterActive = useMemo(
    () => Object.keys(filters ?? {}).length > 0 || searchText.trim() !== "",
    [filters, searchText]
  );

  if (loadingState === "loading") {
    return <FullScreenSpinner />;
  }

  return (
    <div className="p-6 bg-white shadow-sm dark:bg-[#121418] dark:border-gray-800">
      <div className="mb-6">
        <div className="flex items-center justify-between pt-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Scoring Rules{" "}
            <span className="ml-2 text-sm text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
              {totalCount} Rule
              {totalCount !== 1 && "s"}
            </span>
          </h2>

          {totalCount !== 0 && (
            <button
              onClick={handleAddNewRule}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-[8px] text-sm font-medium w-[155px] h-10 flex items-center justify-center gap-2"
            >
              <PlusIcon className="w-[20px] h-[20px]" />
              Add New Rule
            </button>
          )}
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Keep track of customers and their security levels.
        </p>
      </div>

      {totalCount === 0 && !isFilterActive ? (
        <div className="w-full h-[75vh] flex flex-col items-center justify-center rounded-md border">
          {/* Wrapper for icon + background */}
          <div className="relative flex items-center justify-center mb-6 w-[80px] h-[80px]">
            {/* Background Circle positioned behind */}
            <div className="absolute z-0 w-[80px] h-[80px] flex items-center justify-center">
              <BackgroundCircle
                className="
            absolute
            left-1/2 top-[28%]
            -translate-x-1/2 -translate-y-1/2
            w-[400px] sm:w-[400px] md:w-[400px] lg:w-[400px]
            h-[400px]
            pointer-events-none select-none
            z-0
          "
              />
            </div>

            {/* Lock Icon in styled border */}
            <div className="relative z-10 flex items-center justify-center bg-white border border-[#D5D7DA] rounded-[16px] gap-[8px] p-[4px]">
              <div className="flex items-center justify-center bg-white border border-black/10 rounded-[12px] sm:w-[52px] sm:h-[52px] p-[12px] shadow-[0px_1px_2px_0px_#0000001A,0px_3px_3px_0px_#00000017]">
                <LockIcon className="sm:w-[28px] sm:h-[28px]" />
              </div>
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="text-lg font-medium text-gray-900 mb-1 mt-[48px]">
            Start adding new rules
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            You don’t have any rule yet. Start securing by adding new rules now.
          </p>

          {/* Add Button */}
          <button
            onClick={handleAddNewRule}
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-[8px] text-sm font-medium w-[352px] h-10 flex items-center justify-center gap-2"
          >
            <PlusIcon className="w-[20px] h-[20px]" />
            Add New Rule
          </button>
        </div>
      ) : (
        <DynamicTable<Rule>
          data={data.map((item) => ({
            id: item.id,
            name: item.name ?? "",
            description: item.description ?? "",
            status: item.status as "ENABLED" | "DISABLED",
            riskLevel: item.riskLevel as "Low" | "Medium" | "High",
          }))}
          columns={columns}
          filterComponent={
            <ScoringRulesFilterForm
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
          onAddNewItem={handleAddNewRule}
          title="Scoring Rules"
          error={error}
          searchText={searchText}
          setSearchText={setSearchText}
          openFilterModal={openFilterModal}
          applyFilters={applyFilters}
          searchPlaceholder="Search rules"
          showStatusFilter={true}
          statusFilterOptions={[
            { key: "All", label: "View All" },
            { key: "ENABLED", label: "Active" },
            { key: "DISABLED", label: "Inactive" },
          ]}
        />
      )}
    </div>
  );
};

const getColumns = (
  onToggleStatus: (id: number) => void,
  onDelete: (id: number) => void
): ColumnDef<Rule>[] => [
  {
    header: "OFF/ON",
    cell: ({ row }) => {
      const status = row.original.status;

      const isActive = status === "ENABLED";
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
    accessorKey: "name",
    cell: (info) => (
      <div className="flex flex-col">
        <span className="font-medium text-gray-900  dark:text-white">
          {String(info.getValue())}
        </span>
        <span className="text-xs text-gray-500 dark:text-white">category</span>
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
          info.getValue() === "ENABLED"
            ? "bg-green-100 text-green-700"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {info.getValue() === "ENABLED" ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    header: "Risk Level",
    accessorKey: "riskLevel",
    cell: (info) => {
      const value = String(info.getValue());
      const colorMap: Record<string, string> = {
        Low: "text-gray-700",
        Medium: "text-warning-700",
        High: "text-red-700",
      };
      // Capitalize first letter, rest lowercase
      const display =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      return (
        <span
          className={`text-xs font-medium px-2 py-1  whitespace-nowrap ${
            colorMap[display] || "text-gray-700"
          }`}
        >
          {display}
        </span>
      );
    },
  },
  {
    header: "",
    accessorKey: "actions",
    cell: ({ row }) => {
      const rule = row.original;
      return <RuleMenu rule={rule} onDelete={onDelete} />;
    },
  },
];
