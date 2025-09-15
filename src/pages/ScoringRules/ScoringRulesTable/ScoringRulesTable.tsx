import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
  Suspense,
} from "react";
import { useNavigate } from "react-router-dom";
import { ScoringRulesFilterForm } from "../ScoringRulesFilter/ScoringRulesFilterJsx";
import { useScoringRulesTable } from "./useScoringRulesTable";
import type { ViewScoringRulesFormValues } from "../scoringRulesServices";
import {
  DynamicTable,
  type CustomColumnDef,
} from "../../../components/DynamicTable";
import PopupLayout from "../../../components/Popup/PopupLayout";
import RulesPopupJsx from "../../../components/Popup/DynamicPopupJsx";
import { createPortal } from "react-dom";
import { TableFallback } from "../../../components/TableFallback";
import { AppRoutes } from "../../../routes/AppRoutes";
import Spinner from "../../../components/Spinner";

const ViewIcon = React.lazy(() => import("../../../assets/svg/View.svg?react"));
const EditIcon = React.lazy(() => import("../../../assets/svg/Edit.svg?react"));
const DeleteIcon = React.lazy(
  () => import("../../../assets/svg/Delete.svg?react")
);
const PlusIcon = React.lazy(() => import("../../../assets/svg/plus.svg?react"));

const LockIcon = React.lazy(
  () => import("../../../assets/svg/LockIcon.svg?react")
);

type Rule = {
  id: number;
  name: string;
  description: string;
  status: "ENABLED" | "DISABLED";
  riskLevel: "Low" | "Medium" | "High";
  aspectCode: string;
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
        top: rect.bottom + window.scrollY,
        left: rect.right - 143 + window.scrollX,
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
    setIsDeletePopupOpen(true);
    setRuleToDeleteId(rule.id);
  };

  const handleConfirmDelete = () => {
    if (ruleToDeleteId !== null) {
      onDelete(ruleToDeleteId);
      setIsDeletePopupOpen(false);
      setRuleToDeleteId(null);
    }
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
            className="rule-menu-portal absolute z-[9999] w-[143px] rounded-[8px] border border-gray-200 bg-white font-medium text-gray-700 shadow-lg dark:bg-darkTheme dark:border-gray-800 dark:text-white"
            style={{
              top: coords.top,
              left: coords.left,
            }}
          >
            <button
              type="button"
              className="w-full h-[40px] flex items-center gap-[12px] px-4 py-2 hover:bg-gray-100 cursor-pointer text-left dark:hover:bg-gray-800"
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
              className="w-full h-[40px] flex items-center px-[16px] py-[10px] gap-[12px] hover:bg-gray-100 cursor-pointer text-left dark:hover:bg-gray-800"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
            >
              <EditIcon className="text-gray-700 dark:text-white w-4 h-4" />
              <span className="text-[14px] whitespace-nowrap">Edit Rule</span>
            </button>
            <div className="border-t border-gray-200" />
            <button
              type="button"
              className="w-full h-[40px] flex items-center px-[16px] py-[10px] gap-[12px] hover:bg-gray-100 cursor-pointer text-left dark:hover:bg-gray-800"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              <DeleteIcon className="text-gray-700 dark:text-white w-4 h-4" />
              <span className="text-[14px]">Delete</span>
            </button>
          </div>,
          document.body
        )}

      <div className="cursor-auto" onClick={(e) => e.stopPropagation()}>
        <PopupLayout
          isOpen={isDeletePopupOpen}
          className="md:w-[30%] lg:w-[28%] w-[90%]"
        >
          <RulesPopupJsx
            title="Scoring Rule"
            isDeleting={true}
            onConfirm={handleConfirmDelete}
            onCancel={() => setIsDeletePopupOpen(false)}
          />
        </PopupLayout>
      </div>
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
    handleToggleStatus,
  } = useScoringRulesTable();
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "All" | "ENABLED" | "DISABLED"
  >("All");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (loadingState === "success" && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [loadingState, isInitialLoad]);

  const onFilterStatus = (status: "All" | "ENABLED" | "DISABLED") => {
    setStatusFilter(status);

    const newFilters: ViewScoringRulesFormValues = {
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
    const newFilters: ViewScoringRulesFormValues = {
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
    () => getColumns(handleToggleStatus, handleDeleteRule),
    [handleToggleStatus, handleDeleteRule]
  );

  const navigate = useNavigate();

  const handleClearSearch = () => {
    setSearchText("");
    setFilters({});
    setStatusFilter("All");
    setCurrentPage(1);
    setIsSearching(true);
  };

  const isFilterActive = useMemo(
    () => Object.keys(filters ?? {}).length > 0 || searchText.trim() !== "",
    [filters, searchText]
  );

  if (loadingState === "loading" && isInitialLoad) {
    return <Spinner />;
  }
  const handleAddNewRule = () => {
    navigate("/scoring-rules/new-rule");
  };

  return (
    <div
      className={`py-6 pe-6 bg-white ${
        fromDashboard ? "xl:w-[62%] pt-0" : "shadow-sm ps-6"
      } dark:bg-black w-full`}
    >
      {" "}
      <div className="mb-6 ps-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-5">
          {/* Left side: Title + description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              Scoring Rules{" "}
              <span className="ml-2 text-sm text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                {totalCount} Rule{totalCount !== 1 && "s"}
              </span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Keep track of customers and their security levels.
            </p>
          </div>

          {/* Right side: Button */}
          {(totalCount !== 0 || !isFilterActive || isSearching) &&
            (fromDashboard ? (
              <button
                onClick={handleAddNewRule}
                className="h-10 w-10 rounded-xl ml-auto bg-gray-100  shadow-sm hover:bg-gray-150 flex items-center justify-center dark:bg-darkTheme dark:border-gray-800"
                aria-label="Add New Rule"
              >
                <PlusIcon className="w-[20px] h-[20px] text-blue-700 dark:text-gray-100" />
              </button>
            ) : (
              <button
                onClick={handleAddNewRule}
                className="bg-blue-700 hover:bg-blue-800 text-white rounded-[8px] text-sm font-medium w-[155px] h-10 flex items-center justify-center gap-2 self-start sm:self-auto"
              >
                <Suspense>
                  <PlusIcon className="w-[20px] h-[20px] text-white" />
                </Suspense>
                Add New Rule
              </button>
            ))}
        </div>
      </div>
      {totalCount === 0 && !isFilterActive && !isSearching ? (
        <TableFallback
          minimal={fromDashboard}
          icon={<LockIcon className="sm:w-[28px] sm:h-[28px] text-gray-500" />}
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
          data={(fromDashboard ? data.slice(0, 5) : data).map((item) => ({
            id: item.id,
            name: item.name ?? "",
            description: item.description ?? "",
            status: item.status as "ENABLED" | "DISABLED",
            riskLevel: item.riskLevel as "Low" | "Medium" | "High",
            aspectCode: item.identifier.aspectCode ?? "",
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
          loadingState={loadingState}
          error={error}
          searchText={!fromDashboard ? searchText : ""}
          setSearchText={!fromDashboard ? setSearchText : () => {}}
          openFilterModal={!fromDashboard ? openFilterModal : () => {}}
          applyFilters={!fromDashboard ? applyFilters : () => {}}
          searchPlaceholder="Search Rule Name"
          showStatusFilter={!fromDashboard}
          onRowClick={(rowData) => {
            const { id } = rowData as { id: string | number };
            navigate(AppRoutes.viewScoringRule, {
              state: { id: id.toString(), action: "view" },
            });
          }}
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
  onToggleStatus: (id: number, currentStatus: string) => void,
  onDelete: (id: number) => void
): CustomColumnDef<Rule>[] => [
  {
    header: "OFF/ON",
    cell: ({ row }) => {
      const status = row.original.status;

      const isActive = status === "ENABLED";
      return (
        <div className="flex justify-content flex-start">
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
    header: "ID",
    accessorKey: "id",
    meta: {
      isSorted: true,
    },
  },
  {
    header: "Rule Name",
    accessorKey: "name",
    meta: {
      isSorted: true,
    },
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-gray-900  dark:text-white">
          {String(row.original.name ?? "")}
        </span>
        <span className="text-xs text-gray-500 dark:text-white">
          {Array.isArray(row.original.aspectCode) &&
          row.original.aspectCode.length > 0
            ? row.original.aspectCode
                .map((item: { value: string }) => item.value)
                .join(", ")
            : ""}
        </span>
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
            ? "bg-success-50 text-success-700 dark:bg-success-700 dark:text-success-50"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        <div
          className={`rounded-full bg-black w-[6px] h-[6px] ${
            info.getValue() === "ENABLED" ? "bg-success-500 dark:bg-success-400" : "bg-gray-500"
          }`}
        ></div>
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
        Low: "text-gray-700 bg-gray-100",
        Moderate: "text-warning-700 bg-warning-50",
        Medium: "text-warning-700 bg-warning-50",
        High: "text-red-700 bg-red-50",
        Extreme: "text-red-700 bg-red-50",
      };
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
