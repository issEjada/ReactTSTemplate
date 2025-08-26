import React from "react";

interface Field {
  title: string;
  value?: string | number | null;
}

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

interface DynamicViewProps {
  title: string;
  fields?: Field[];
  loadingState?: "loading" | "success" | "error";
  emptyMessage?: string;
  showActions?: boolean;
  actions?: ActionButton[];
}

const DynamicView: React.FC<DynamicViewProps> = ({
  title,
  fields,
  emptyMessage = "No data found or an error occurred.",
  showActions = true,
  actions = [],
}) => {
  if (!fields || fields.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col pt-6 px-2 sm:px-4 md:px-6 gap-2">
      <div className="w-full px-1 py-5">
        <h1 className="text-[#181D27] text-lg md:text-xl font-medium leading-7 dark:text-white">
          {title}
        </h1>
      </div>

      <div className="w-full rounded-xl border border-[#E9EAEB] shadow-[0_1px_2px_0_#0A0D120F,0_1px_3px_0_#0A0D121A] p-4 sm:p-6 bg-white dark:bg-[#121418] dark:border-gray-800 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-6">
          {fields.map((field, idx) => (
            <div key={idx} className="min-h-[56px] flex flex-col gap-2">
              <span className="text-base font-normal text-[#181D27] dark:text-white">
                {field.title}
              </span>
              <span className="text-base font-normal text-[#717680] break-all">
                {field.value ?? "—"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {showActions && actions.length > 0 && (
        <div className="flex justify-end gap-3 pt-4">
          {actions.map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.onClick}
              className={`h-[44px] px-4 py-2 rounded-[8px] ${
                btn.variant === "primary"
                  ? "bg-blue-700 text-white hover:bg-blue-800 w-[141px]"
                  : "border border-gray-300 text-black bg-white hover:bg-gray-100 dark:bg-[#121418] dark:text-gray-300 dark:border-gray-700 w-[75px]"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DynamicView;
