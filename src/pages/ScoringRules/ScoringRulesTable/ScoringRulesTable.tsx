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
import { createPortal } from "react-dom";
import { TableFallback } from "../../../components/TableFallback";

const ViewIcon = React.lazy(() => import("../../../assets/svg/View.svg?react"));
const EditIcon = React.lazy(() => import("../../../assets/svg/Edit.svg?react"));
const DeleteIcon = React.lazy(
  () => import("../../../assets/svg/Delete.svg?react")
);
const PlusIcon = React.lazy(() => import("../../../assets/svg/plus.svg?react"));
const PlusIconBlue = React.lazy(() => import("../../../assets/svg/PlusIconBlue.svg?react"));

const LockIcon = React.lazy(
  () => import("../../../assets/svg/LockIcon.svg?react")
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
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [ruleToDeleteId, setRuleToDeleteId] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!buttonRef.current) return;
    if (
      !buttonRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest(".rule-menu-portal")
    ) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const toggleMenu = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY, // below button
        left: rect.right - 143 + window.scrollX, // align right
      });
    }
    setOpen((prev) => !prev);
  };

  const handleView = () => {
    setOpen(false);
    navigate("/scoring-rules/view-rule", {
      state: { id: rule.id, action: "view" },
    });
  };

  const handleEdit = () => {
    setOpen(false);
    navigate("/scoring-rules/edit-rule", {
      state: { id: rule.id, action: "edit" },
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
            className="rule-menu-portal absolute z-[9999] w-[143px] rounded-[8px] border border-[#E9EAEB] bg-white font-medium text-[#414651] shadow-lg dark:bg-[#121418] dark:border-gray-800 dark:text-white"
            style={{
              top: coords.top,
              left: coords.left,
            }}
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
            <div className="border-t border-gray-200" />
            <button
              type="button"
              className="w-full h-[40px] flex items-center px-[16px] py-[10px] gap-[12px] hover:bg-gray-100 cursor-pointer text-left dark:hover:bg-gray-800"
              onClick={handleEdit}
            >
              <EditIcon className="h-4 w-4" />
              <span className="text-[14px]">Edit Rule</span>
            </button>
            <div className="border-t border-gray-200" />
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
    </>
  );
};

export const ScoringRulesTable: React.FC<{ fromDashboard?: boolean }> = ({
  fromDashboard = false,
}) => {
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
    handleToggleStatus, // Destructure handleToggleStatus from the hook
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

  const handleDeleteRule = async (id: number) => {
    try {
      await deleteRule(id);
      await refetch();
    } catch (err) {
      console.error("Error deleting rule:", err);
    }
  };

  const columns = useMemo(
    () => getColumns(handleToggleStatus, handleDeleteRule), // Pass the destructured handleToggleStatus
    [handleToggleStatus, handleDeleteRule]
  );

  const navigate = useNavigate();



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
  const handleAddNewRule = () => {
    navigate("/scoring-rules/new-rule");
  };
  return (
    <div
      className={`p-6 bg-white shadow-sm dark:bg-black ${
        fromDashboard ? "w-[700px]" : "w-full"
      }`}
    >
      {" "}
      <div className="mb-6 ">
        <div className="flex items-center justify-between pt-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Scoring Rules{" "}
            <span className="ml-2 text-sm text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
              {totalCount} Rule
              {totalCount !== 1 && "s"}
            </span>
          </h2>

          {totalCount !== 0 && !fromDashboard && (
            <div className="ml-auto">
              <button
                onClick={handleAddNewRule}
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-[8px] text-sm font-medium w-[155px] h-10 flex items-center justify-center gap-2 "
              >
                <PlusIcon className="w-[20px] h-[20px]" />
                Add New Rule
              </button>
            </div>
          )}

          <div>
            {fromDashboard && (
              <button
                onClick={handleAddNewRule}
                className="h-10 w-10 rounded-xl ml-auto bg-white border border-gray-200 shadow-sm hover:bg-gray-50 flex items-center justify-center dark:bg-[#121418] dark:border-gray-800"
                aria-label="Add New Rule"
              >
                <PlusIconBlue className="w-[20px] h-[20px]" />
              </button>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Keep track of customers and their security levels.
        </p>
      </div>
      {totalCount === 0 && !isFilterActive ? (
        <TableFallback
          icon={<LockIcon className="sm:w-[28px] sm:h-[28px]" />}
          title="Start adding scoring rules"
          description={
            <>
              You don’t have any scoring rules yet.
              <br />
              Start securing by adding new rules now.
            </>
          }
          buttonText="Add New Scoring Rule"
          buttonIcon={<PlusIcon className="w-[20px] h-[20px]" />}
          onButtonClick={handleAddNewRule}
        />
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
          onFilterStatus={
            !fromDashboard ? (onFilterStatus as (s: string) => void) : undefined
          }
          statusFilter={!fromDashboard ? statusFilter : undefined}
          onClearSearch={handleClearSearch}
          onAddNewItem={handleAddNewRule}
          title="Scoring Rules"
          error={error}
          searchText={!fromDashboard ? searchText : ""}
          setSearchText={!fromDashboard ? setSearchText : () => {}}
          openFilterModal={!fromDashboard ? openFilterModal : () => {}}
          applyFilters={!fromDashboard ? applyFilters : () => {}}
          searchPlaceholder="Search Rule Name"
          showStatusFilter={!fromDashboard}
          statusFilterOptions={
            !fromDashboard
              ? [
                  { key: "All", label: "View All" },
                  { key: "ENABLED", label: "Active" },
                  { key: "DISABLED", label: "Inactive" },
                ]
              : undefined
          }
          minimal={fromDashboard}
        />
      )}
    </div>
  );
};

const getColumns = (
  onToggleStatus: (id: number, currentStatus: string) => void, // Update signature
  onDelete: (id: number) => void
): ColumnDef<Rule>[] => [
  {
    header: "OFF/ON",
    cell: ({ row }) => {
      const status = row.original.status;

      const isActive = status === "ENABLED";
      return (
        <div className="flex justify-content flex-start">
          <button
            onClick={() => onToggleStatus(row.original.id, status)} // Pass current status
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
          {String(info.getValue() ?? "")}
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
        className={`flex items-center h-[22px] w-fit text-xs font-medium ps-2 pe-2 py-[2px] gap-2 rounded-full whitespace-nowrap overflow-hidden ${
          info.getValue() === "ENABLED"
            ? "bg-green-100 text-green-700"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        <div
          className={`rounded-full bg-black w-[6px] h-[6px] ${
            info.getValue() === "ENABLED" ? "bg-green-500" : "bg-gray-500"
          }`}
        ></div>
        {info.getValue() === "ENABLED" ? "Active" : "Not Active"}
      </span>
    ),
  },
  {
    header: "Risk Level",
    accessorKey: "riskLevel",
    cell: (info) => {
      const value = String(info.getValue());
      const colorMap: Record<string, string> = {
        Low: "text-gray-700 bg-gray-100",
        Moderate: "text-warning-700 bg-warning-50",
        Medium: "text-warning-700 bg-warning-50",
        High: "text-red-700 bg-red-50",
        Extreme: "text-red-700 bg-red-50",
      };
      // Capitalize first letter, rest lowercase
      const display =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      return (
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${
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
