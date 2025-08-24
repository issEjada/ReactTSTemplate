import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { DecisionRulesFilter } from "../DecisionRulesFilter/DecisionRulesFilterJsx";
import { useDecisionRulesTable } from "./useDecisionRulesTable";
import { DynamicTable } from "../../../components/DynamicTable";
import PopupLayout from "../../../components/Popup/LayoutPopup";
import RulesPopupJsx from "../../../components/Popup/RulesPopupJsx";
import FullScreenSpinner from "../../../components/FullScreenSpinner";
import type { DecisionRulesFormValues } from "../decisionRulesServices";
import { createPortal } from "react-dom";
import { TableFallback } from "../../../components/TableFallback";
import { AppRoutes } from "../../../routes/AppRoutes";
const ViewIcon = React.lazy(() => import("../../../assets/svg/View.svg?react"));
const EditIcon = React.lazy(() => import("../../../assets/svg/Edit.svg?react"));
const DeleteIcon = React.lazy(
  () => import("../../../assets/svg/Delete.svg?react")
);
const PlusIcon = React.lazy(() => import("../../../assets/svg/plus.svg?react"));
const RuleIcon = React.lazy(
  () => import("../../../assets/svg/EmptyDecisions.svg?react")
);

type DecisionRule = {
  id: number;
  name: string;
  description: string;
  status: "ENABLED" | "DISABLED";
  scheme: string;
  eventSourceDevice: string;
};

const RuleMenu = ({
  rule,
  onDelete,
}: {
  rule: DecisionRule;
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
    navigate("/decision-rules/view-rule", {
      state: { id: rule.id, action: "view" },
    });
  };

  const handleEdit = () => {
    setOpen(false);
    navigate("/decision-rules/edit-rule", {
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
            className="rule-menu-portal absolute z-[9999] w-[143px] rounded-[8px] border border-[#E9EAEB] bg-white font-medium text-[#414651] shadow-lg dark:bg-[#121418] dark:border-gray-800 dark:text-white"
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
              <ViewIcon />
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
              <EditIcon />
              <span className="text-[14px]">Edit Rule</span>
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

export const DecisionRulesTable = () => {
  const {
    data,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    handleSearchSubmit,
    // setItemsPerPage,
    filters,
    setFilters,
    loadingState,
    deleteDecisionRule,
    refetch,
    totalCount,
    error,
    handleToggleStatus, // Destructure handleToggleStatus from the hook
  } = useDecisionRulesTable();
  const [searchText, setSearchText] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "All" | "ENABLED" | "DISABLED"
  >("All");

  const onFilterStatus = (status: "All" | "ENABLED" | "DISABLED") => {
    setStatusFilter(status);

    const newFilters: DecisionRulesFormValues = {
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
    const newFilters: DecisionRulesFormValues = {
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
      await deleteDecisionRule(id);
      if (refetch) {
        await refetch();
      }
    } catch (err) {
      console.error("Error deleting rule:", err);
    }
  };

  const columns = useMemo(
    () => getColumns(handleToggleStatus, handleDeleteRule), // Pass the destructured handleToggleStatus
    [handleToggleStatus, handleDeleteRule] // Add dependencies
  );

  const navigate = useNavigate();

  const handleAddNewRule = () => {
    navigate("/decision-rules/new-rule");
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
    <div className="p-6 bg-white shadow-sm dark:bg-black">
      <div className="mb-6">
        <div className="flex items-center justify-between pt-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Decision Rules{" "}
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
        <TableFallback
          icon={<RuleIcon className="sm:w-[28px] sm:h-[28px]" />}
          title="Start adding decision rules"
          description={
            <>
              You don’t have any decision rules yet.
              <br />
              Create rules to automate your decision-making process.
            </>
          }
          buttonText="Add New Decision Rule"
          buttonIcon={<PlusIcon className="w-[20px] h-[20px]" />}
          onButtonClick={handleAddNewRule}
        />
      ) : (
        <DynamicTable<DecisionRule>
          data={data.map((item) => ({
            id: item.id,
            name: item.name ?? "",
            description: item.description ?? "",
            status: item.status as "ENABLED" | "DISABLED",
            scheme: item.identifier.scheme,
            eventSourceDevice: item.identifier.eventSourceDevice,
          }))}
          columns={columns}
          filterComponent={
            <DecisionRulesFilter
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
          title="Decision Rules"
          error={error}
          searchText={searchText}
          setSearchText={setSearchText}
          openFilterModal={openFilterModal}
          applyFilters={applyFilters}
          searchPlaceholder="Search Rule Name"
          showStatusFilter={true}
          onRowClick={(rowData) => {
            const { id } = rowData as { id: string | number };
            navigate(AppRoutes.viewDecisionRule, {
              state: { id: id.toString(), action: "view" },
            });
          }}
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
  onToggleStatus: (id: number, currentStatus: string) => void, // Update signature
  onDelete: (id: number) => void
): ColumnDef<DecisionRule>[] => [
  {
    header: "OFF/ON",
    cell: ({ row }) => {
      const status = row.original.status;

      const isActive = status === "ENABLED";
      return (
        <div className="flex justify-center">
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
    header: "Scheme",
    accessorKey: "scheme",
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
    header: "Event Source Device",
    accessorKey: "eventSourceDevice",
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
    header: "",
    accessorKey: "actions",
    cell: ({ row }) => {
      const rule = row.original;
      return <RuleMenu rule={rule} onDelete={onDelete} />;
    },
  },
];
