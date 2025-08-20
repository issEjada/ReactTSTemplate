import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { ActionStatistics } from "./ActionStatistics";
import MetricCard from "./MetricCard";
import { DynamicTable } from "../../../components/DynamicTable";
import { useActionAnalytics } from "./useActionAnalytics";
import FullScreenSpinner from "../../../components/FullScreenSpinner";

const StatisticsIcon = React.lazy(
  () => import("../../../assets/svg/CInsight.svg?react")
);
const IndicatorsIcon = React.lazy(
  () => import("../../../assets/svg/analytics.svg?react")
);
const TotalActionIcon = React.lazy(
  () => import("../../../assets/svg/TAction.svg?react")
);
const AuthActionIcon = React.lazy(
  () => import("../../../assets/svg/shieldG.svg?react")
);
const AcceptedIcon = React.lazy(
  () => import("../../../assets/svg/Check.svg?react")
);
const RejectedIcon = React.lazy(
  () => import("../../../assets/svg/ActiveAlerts.svg?react")
);
const MfaIcon = React.lazy(() => import("../../../assets/svg/MFA.svg?react"));
const ScaIcon = React.lazy(
  () => import("../../../assets/svg/LockIcon.svg?react")
);

export interface FormattedAnalyticData {
  id: number;
  eventName: string;
  totalActions: number;
  acceptedActions: number;
  rejectedActions: number;
  mfaActions: number;
  scaActions: number;
  authenticatedActions: number;
  averageAmount: number;
  maxAmount: number;
  mostUsedTargetCountry: string[];
  trustedTargetCountries: string[];
  mostUsedTargetMerchant: string[];
  trustedTargetMerchants: string[];
  mostUsedCreditorAgentIdentifier: string[];
  trustedCreditorAgentIdentifiers: string[];
  mostUsedTargetBank: string[];
  trustedTargetBanks: string[];
  mostUsedMaskedCard: string[];
  trustedMaskedCards: string[];
}

function RowMenu({
  onStatistics,
  onTrustedIndicators,
}: {
  onStatistics: () => void;
  onTrustedIndicators: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const top = rect.bottom + window.scrollY + 8;
    const left = rect.right + window.scrollX - 237;
    setCoords({ top, left });
    setOpen((v) => !v);
  };

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (buttonRef.current && buttonRef.current.contains(e.target as Node))
        return;
      const menu = document.querySelector(".row-menu-portal");
      if (menu && menu.contains(e.target as Node)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 focus-visible:outline-none dark:hover:bg-gray-800"
        onClick={toggleMenu}
        aria-label="More options"
      >
        <span className="flex flex-col items-center gap-[3px]">
          <span className="block w-1 h-1 rounded-full bg-gray-500" />
          <span className="block w-1 h-1 rounded-full bg-gray-500" />
          <span className="block w-1 h-1 rounded-full bg-gray-500" />
        </span>
      </button>

      {open &&
        createPortal(
          <div
            className="row-menu-portal absolute z-[9999] w-[237px] rounded-lg border border-gray-200 bg-white shadow-lg text-gray-700 dark:bg-[#121418] dark:border-gray-800 dark:text-white"
            style={{ top: coords.top, left: coords.left }}
          >
            <button
              type="button"
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 text-left dark:hover:bg-gray-800"
              onClick={() => {
                onStatistics();
                setOpen(false);
              }}
            >
              <StatisticsIcon className="w-4 h-4" />
              <span className="text-sm whitespace-nowrap">
                Actions Statistics
              </span>
            </button>
            <div className="border-t border-gray-200 dark:border-gray-700" />
            <button
              type="button"
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 text-left dark:hover:bg-gray-800"
              onClick={() => {
                onTrustedIndicators();
                setOpen(false);
              }}
            >
              <IndicatorsIcon className="w-4 h-4" />
              <span className="text-sm whitespace-nowrap">
                Actions Trusted Indicators
              </span>
            </button>
          </div>,
          document.body
        )}
    </>
  );
}

type ActionAnalyticsProps = {
  userMobileNumber: string;
};

export const ActionAnalytics: React.FC<ActionAnalyticsProps> = ({
  userMobileNumber,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popUpType, setPopUpType] = useState<
    "actionStatistics" | "trustedIndicators" | null
  >(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [popUpData, setPopUpData] = useState<FormattedAnalyticData>();

  const { actionAnalyticsData, errorValidation, loadingState } =
    useActionAnalytics(userMobileNumber, currentPage);

  console.log("Action Analytics Data:", actionAnalyticsData);

  const columns: ColumnDef<FormattedAnalyticData>[] = [
    {
      accessorKey: "eventName",
      header: "Event Name",
      cell: (i) => i.getValue(),
    },
    {
      accessorKey: "totalActions",
      header: "Total Actions",
      cell: (i) => i.getValue() as number,
    },
    {
      accessorKey: "acceptedActions",
      header: "Accepted Actions",
      cell: (i) => i.getValue() as number,
    },
    {
      accessorKey: "averageAmount",
      header: "Average Amount",
      cell: (i) => i.getValue() as number,
    },
    {
      id: "menu",
      header: "",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex justify-end pr-3">
          <RowMenu
            onStatistics={() => {
              console.log("Actions Statistics for row:", row.original);
              setIsOpen(true);
              setPopUpType("actionStatistics");
              setPopUpData(row.original);
            }}
            onTrustedIndicators={() => {
              console.log("Actions Trusted Indicators for row:", row.original);
              setIsOpen(true);
              setPopUpType("trustedIndicators");
            }}
          />
        </div>
      ),
    },
  ];

  const formattedAnalyticData: FormattedAnalyticData[] =
    actionAnalyticsData?.actionsAnalytics.userEvents?.map((event, index) => ({
      id: index + 1,
      eventName: event.eventName,

      // ---- Actions Statistics ----
      totalActions: event.actionsStatistics.numberOfTotalActions,
      acceptedActions: event.actionsStatistics.numberOfAcceptedActions,
      rejectedActions: event.actionsStatistics.numberOfRejectedActions,
      mfaActions: event.actionsStatistics.numberOfMFAActions,
      scaActions: event.actionsStatistics.numberOfSCAActions,
      authenticatedActions:
        event.actionsStatistics.numberOfAuthenticatedActions,

      // ---- Trusted Indicators ----
      averageAmount: parseFloat(
        event.actionsTrustedIndicators.avgAmount ?? "0"
      ),
      maxAmount: parseFloat(event.actionsTrustedIndicators.maxAmount ?? "0"),
      mostUsedTargetCountry:
        event.actionsTrustedIndicators.mostUsedTargetCountry,
      trustedTargetCountries:
        event.actionsTrustedIndicators.trustedTargetCountries,
      mostUsedTargetMerchant:
        event.actionsTrustedIndicators.mostUsedTargetMerchant,
      trustedTargetMerchants:
        event.actionsTrustedIndicators.trustedTargetMerchants,
      mostUsedCreditorAgentIdentifier:
        event.actionsTrustedIndicators.mostUsedCreditorAgentIdentifier,
      trustedCreditorAgentIdentifiers:
        event.actionsTrustedIndicators.trustedCreditorAgentIdentifiers,
      mostUsedTargetBank: event.actionsTrustedIndicators.mostUsedTargetBank,
      trustedTargetBanks: event.actionsTrustedIndicators.trustedTargetBanks,
      mostUsedMaskedCard: event.actionsTrustedIndicators.mostUsedMaskedCard,
      trustedMaskedCards: event.actionsTrustedIndicators.trustedMaskedCards,
    })) ?? [];

  if (loadingState === "loading") {
    return <FullScreenSpinner />;
  }

  if (errorValidation) {
    return <span className="text-red-500">{errorValidation}</span>;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* KPI Cards */}
      <div className="flex flex-col md:flex-row gap-4">
        <MetricCard
          title="Total Actions"
          value={
            actionAnalyticsData?.actionsAnalytics.numberOfTotalActions || 0
          }
          icon={<TotalActionIcon />}
          className="w-full md:w-[370px]"
        />
        <MetricCard
          title="Accepted Actions"
          value={
            actionAnalyticsData?.actionsAnalytics.numberOfAcceptedActions || 0
          }
          icon={<AcceptedIcon />}
          className="w-full md:w-[370px]"
        />
        <MetricCard
          title="MFA Actions"
          value={actionAnalyticsData?.actionsAnalytics.numberOfMFAActions || 0}
          icon={<MfaIcon />}
          className="w-full md:w-[370px]"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <MetricCard
          title="Authenticated Actions"
          value={
            actionAnalyticsData?.actionsAnalytics
              .numberOfAuthenticatedActions || 0
          }
          icon={<AuthActionIcon />}
          className="w-full md:w-[370px]"
        />
        <MetricCard
          title="Rejected Actions"
          value={
            actionAnalyticsData?.actionsAnalytics.numberOfRejectedActions || 0
          }
          icon={<RejectedIcon />}
          className="w-full md:w-[370px]"
        />
        <MetricCard
          title="SCA Actions"
          value={actionAnalyticsData?.actionsAnalytics.numberOfSCAActions || 0}
          icon={<ScaIcon />}
          className="w-full md:w-[370px]"
        />
      </div>

      {isOpen && popUpType === "actionStatistics" && (
        <ActionStatistics isOpen={isOpen} onClose={() => setIsOpen(false)} values={popUpData}/>
      )}

      {/* Card (header + table) */}
      <div className="rounded-[12px] border border-gray-200 bg-white overflow-hidden dark:border-blueGray-800 dark:bg-gray-900">
        <div className="px-5 py-4">
          <h2 className="text-gray-900 dark:text-white text-[18px] font-semibold">
            User Actions Tables
          </h2>
        </div>

        <div className="px-5 pb-5 overflow-x-auto">
          <div className="overflow-x-auto">
            <DynamicTable<FormattedAnalyticData>
              title="User Actions Table"
              data={formattedAnalyticData}
              columns={columns}
              totalCount={formattedAnalyticData?.length || 0}
              currentPage={currentPage}
              itemsPerPage={10}
              setCurrentPage={setCurrentPage}
              searchText={searchText}
              setSearchText={setSearchText}
              onClearSearch={() => setSearchText("")}
              openFilterModal={() => {}}
              applyFilters={() => {}}
              showStatusFilter={false}
              filterComponent={null}
              error={null}
              minimalWithPagination={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
