import React, { useEffect, Suspense } from "react";
import { createPortal } from "react-dom";
import ExpandableCard from "../CustomerInsights/ExpandableCard";

const ArrowRiseIcon = React.lazy(
  () => import("../../../assets/svg/MaxAmount.svg?react")
);
const AverageAmountIcon = React.lazy(
  () => import("../../../assets/svg/AverageAmount.svg?react")
);
const ArrowDownIcon = React.lazy(
  () => import("../../../assets/svg/MinAmount.svg?react")
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
const CloseIcon = React.lazy(
  () => import("../../../assets/svg/closeX.svg?react")
);

const CardIcon = React.lazy(
  () => import("../../../assets/svg/ClientID.svg?react")
);

const staticInsights = {
  AverageAmount: ["450.5"],
  MAXAmount: ["1200"],
  MINAmount: ["50"],
  MostUsedTargetCountry: ["US"],
  MostUsedTargetedMerchant: ["Amazon"],
  MostUsedTargetBank: ["Bank A"],
  TrustedTargetedCountries: ["US", "UK", "DE"],
  TrustedTargetedMerchants: ["Amazon", "eBay", "Spotify"],
  TrustedTargetedBanks: ["Bank A", "Bank B"],
  MostUsedMaskedCard: ["1", "2", "3"],
  TrustedMaskedCards: ["1", "2", "3"],
};

type TrustedId =
  | "AverageAmount"
  | "MAXAmount"
  | "MINAmount"
  | "MostUsedTargetCountry"
  | "MostUsedTargetedMerchant"
  | "MostUsedTargetBank"
  | "TrustedTargetedCountries"
  | "TrustedTargetedMerchants"
  | "TrustedTargetedBanks"
  | "MostUsedMaskedCard"
  | "TrustedMaskedCards";

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
};

const TRUSTED_DEF: {
  id: TrustedId;
  title: string;
  Icon: React.ComponentType;
}[] = [
  { id: "AverageAmount", title: "Average Amount", Icon: AverageAmountIcon },
  { id: "MAXAmount", title: "Max Amount", Icon: ArrowRiseIcon },
  { id: "MINAmount", title: "Min Amount", Icon: ArrowDownIcon },
  {
    id: "MostUsedTargetCountry",
    title: "Most Used Target Countries",
    Icon: MapIcon,
  },
  {
    id: "MostUsedTargetedMerchant",
    title: "Most Used Target Merchants",
    Icon: TargetIcon,
  },
  { id: "MostUsedTargetBank", title: "Most Used Target Banks", Icon: CoinIcon },
  {
    id: "TrustedTargetedCountries",
    title: "Trusted Targeted Countries",
    Icon: CountryIcon,
  },
  {
    id: "TrustedTargetedMerchants",
    title: "Trusted Targeted Merchants",
    Icon: TargetIcon,
  },
  {
    id: "TrustedTargetedBanks",
    title: "Trusted Targeted Banks",
    Icon: CoinIcon,
  },
  {
    id: "MostUsedMaskedCard",
    title: "Most Used Masked Card",
    Icon: CardIcon,
  },
  { id: "TrustedMaskedCards", title: "Trusted Masked Cards", Icon: CardIcon },
];

export const ActionTrustedIndicator: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  title = "Action Trusted Indicator",
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const rows = TRUSTED_DEF.map(({ id, title, Icon }) => ({
    id,
    label: title,
    data: staticInsights[id],
    icon: <Icon />,
  }));

  return createPortal(
    <div className="fixed inset-[500px] z-[1000] flex items-center justify-center w-[720px]">
      <div
        className="absolute inset-full bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="relative z-10 w-[90vw] max-w-5xl bg-white dark:bg-[#0B0E13] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center border rounded-lg dark:hover:bg-gray-800"
          >
            <CloseIcon className="dark:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 max-h-[800px] overflow-y-scroll">
          <Suspense fallback={null}>
            {/* First 6 in grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 w-[672px]">
              {rows.slice(0, 6).map((m) => (
                <ExpandableCard
                  key={m.id}
                  label={m.label}
                  data={m.data}
                  icon={m.icon}
                />
              ))}
            </div>

            {/* Rest stacked */}
            <div className="mt-5 space-y-3 w-[672px]">
              {rows.slice(6).map((m) => (
                <ExpandableCard
                  key={m.id}
                  label={m.label}
                  data={m.data}
                  icon={m.icon}
                />
              ))}
            </div>
          </Suspense>
        </div>

        {/* Footer */}
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
