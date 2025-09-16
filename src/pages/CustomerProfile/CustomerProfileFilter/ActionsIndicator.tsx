import React, { useEffect} from "react";
import { createPortal } from "react-dom";
import MetricCard from "../ActionAnalytics/MetricCard";

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

type MetricId = "total" | "auth" | "accepted" | "rejected" | "mfa" | "sca";

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  /** Only values come from API; titles & icons are fixed here */
  values?: Partial<Record<MetricId, number | string>>;
};

const METRICS_DEF: Array<{
  id: MetricId;
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
  className?: string;
}> = [
  {
    id: "total",
    title: "Total Actions",
    Icon: TotalActionIcon,
    className: "text-blue-700",
  },
  {
    id: "auth",
    title: "Authenticated Actions",
    Icon: AuthActionIcon,
    className: "text-purple-700",
  },
  {
    id: "accepted",
    title: "Accepted Actions",
    Icon: AcceptedIcon,
    className: "text-success-600",
  },
  {
    id: "rejected",
    title: "Rejected Actions",
    Icon: RejectedIcon,
    className: "text-red-600",
  },
  {
    id: "mfa",
    title: "MFA Actions",
    Icon: MfaIcon,
    className: "text-warning-600",
  },
  {
    id: "sca",
    title: "SCA Actions",
    Icon: ScaIcon,
    className: "text-blueLight-600",
  },
];

export const ActionIndicator: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  title = "Action Statistics Indicator",
  values,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const rows = METRICS_DEF.map(({ id, title, Icon, className }) => ({
    id,
    title,
    value: values?.[id] ?? 0,
    icon: <Icon className={className} />,
  }));

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="relative z-8 w-[90vw] max-w-2xl bg-white dark:bg-[#0B0E13] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4  dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="h-8 w-8 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
          >
            <CloseIcon className="text-gray-500"></CloseIcon>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
            {rows.map((m) => (
              <MetricCard
                key={m.id}
                title={m.title}
                value={m.value}
                icon={m.icon}
              />
            ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 flex justify-end  dark:border-gray-800">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-lg border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Back
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
