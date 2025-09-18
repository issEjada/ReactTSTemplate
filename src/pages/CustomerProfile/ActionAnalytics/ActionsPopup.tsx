import React, { useEffect, Suspense } from "react";
import { createPortal } from "react-dom";
import ExpandableCard from "../CustomerInsights/ExpandableCard";
import MetricCard from "./MetricCard";
import type { FormattedAnalyticData } from "./ActionAnalytics";

const ArrowRiseIcon = React.lazy(
  () => import("../../../assets/svg/MaxAmount.svg?react")
);
const AverageAmountIcon = React.lazy(
  () => import("../../../assets/svg/AverageAmount.svg?react")
);
const MapIcon = React.lazy(
  () => import("../../../assets/svg/MostUsedTargetCountry.svg?react")
);
const TargetIcon = React.lazy(
  () => import("../../../assets/svg/Merchants.svg?react")
);
const CoinIcon = React.lazy(
  () => import("../../../assets/svg/Banks.svg?react")
);
const CountryIcon = React.lazy(
  () => import("../../../assets/svg/TrustedTargetedCountries.svg?react")
);
const CardIcon = React.lazy(
  () => import("../../../assets/svg/ClientID.svg?react")
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
const CloseIcon = React.lazy(
  () => import("../../../assets/svg/closeX.svg?react")
);

type TrustedId =
  | "averageAmount"
  | "maxAmount"
  | "mostUsedTargetCountry"
  | "mostUsedTargetMerchant"
  | "mostUsedTargetBank"
  | "trustedTargetCountries"
  | "trustedTargetMerchants"
  | "trustedTargetBanks"
  | "mostUsedMaskedCard"
  | "trustedMaskedCards";

const TRUSTED_DEF: {
  id: TrustedId;
  title: string;
  Icon: React.ReactNode;
}[] = [
  {
    id: "averageAmount",
    title: "Average Amount",
    Icon: <AverageAmountIcon className="text-blue-700" />,
  },
  {
    id: "maxAmount",
    title: "Max Amount",
    Icon: <ArrowRiseIcon className="text-blue-700" />,
  },
  {
    id: "mostUsedTargetCountry",
    title: "Most Used Target Country",
    Icon: <MapIcon className="text-blue-700" />,
  },
  {
    id: "mostUsedTargetMerchant",
    title: "Most Used Target Merchant",
    Icon: <TargetIcon className="text-blue-700" />,
  },
  {
    id: "mostUsedTargetBank",
    title: "Most Used Target Bank",
    Icon: <CoinIcon className="text-blue-700" />,
  },
  {
    id: "trustedTargetCountries",
    title: "Trusted Targeted Countries",
    Icon: <CountryIcon className="text-blue-700" />,
  },
  {
    id: "trustedTargetMerchants",
    title: "Trusted Targeted Merchants",
    Icon: <TargetIcon className="text-blue-700" />,
  },
  {
    id: "trustedTargetBanks",
    title: "Trusted Targeted Banks",
    Icon: <CoinIcon className="text-blue-700" />,
  },
  {
    id: "mostUsedMaskedCard",
    title: "Most Used Masked Card",
    Icon: <CardIcon className="text-blue-700" />,
  },
  {
    id: "trustedMaskedCards",
    title: "Trusted Masked Cards",
    Icon: <CardIcon className="text-blue-700" />,
  },
];

type MetricId =
  | "totalActions"
  | "authenticatedActions"
  | "acceptedActions"
  | "rejectedActions"
  | "mfaActions"
  | "scaActions";

const METRICS_DEF: Array<{
  id: MetricId;
  title: string;
  Icon: React.ReactNode;
}> = [
  {
    id: "totalActions",
    title: "Total Actions",
    Icon: <TotalActionIcon className="w-6 h-6 text-blue-700" />,
  },
  {
    id: "authenticatedActions",
    title: "Authenticated Actions",
    Icon: <AuthActionIcon className="w-6 h-6 text-purple-700" />,
  },
  {
    id: "acceptedActions",
    title: "Accepted Actions",
    Icon: <AcceptedIcon className="w-6 h-6 text-success-600" />,
  },
  {
    id: "rejectedActions",
    title: "Rejected Actions",
    Icon: <RejectedIcon className="w-6 h-6 text-red-600" />,
  },
  {
    id: "mfaActions",
    title: "MFA Actions",
    Icon: <MfaIcon className="w-6 h-6 text-warning-600" />,
  },
  {
    id: "scaActions",
    title: "SCA Actions",
    Icon: <ScaIcon className="w-6 h-6 text-blueLight-600" />,
  },
];

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: "actionStatistics" | "trustedIndicators";
  title?: string;
  values?: FormattedAnalyticData | null;
};

export const ActionPopup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  mode,
  title,
  values,
}) => {
  const metricRows = METRICS_DEF.map(({ id, title, Icon }) => ({
    id,
    title,
    value: values?.[id] ?? 0,
    icon: Icon,
  }));

  const trustedRows = TRUSTED_DEF.map(({ id, title, Icon }) => ({
    id,
    title,
    value: values?.[id] ?? 0,
    icon: Icon,
  }));

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center animate-fadeIn">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative z-8 w-[720px] max-w-5xl bg-white dark:bg-[#0B0E13] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl bg-black/40 backdrop-blur-[2px]">
        <div className="flex items-center justify-between px-5 py-4 border-b dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            {title ||
              (mode === "trustedIndicators"
                ? "Action Trusted Indicator"
                : "Action Statistics")}
          </h2>
          <button
            title="Close"
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center border rounded-lg dark:hover:bg-gray-800 hover:bg-gray-100"
          >
            <CloseIcon className="dark:text-white" />
          </button>
        </div>

        <div className="p-5 space-y-5 max-h-[700px] overflow-y-auto">
          <Suspense>
            {mode === "trustedIndicators" ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
                  {trustedRows.slice(0, 6).map(({ id, title, icon, value }) => (
                    <ExpandableCard
                      key={id}
                      label={title}
                      data={value}
                      icon={icon}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-3 mt-4">
                  {trustedRows.slice(6).map(({ id, title, icon, value }) => (
                    <ExpandableCard
                      key={id}
                      label={title}
                      data={value}
                      icon={icon}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                {metricRows.map((m) => (
                  <MetricCard
                    key={m.id}
                    title={m.title}
                    value={m.value}
                    icon={m.icon}
                  />
                ))}
              </>
            )}
          </Suspense>
        </div>

        <div className="px-5 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-lg border border-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
          >
            Back
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
