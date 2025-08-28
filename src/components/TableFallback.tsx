import React, { Suspense } from "react";

const BackgroundCircle = React.lazy(
  () => import("../assets/svg/BackgroundCircle.svg?react")
);

interface TableFallbackProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  minimal?: boolean;
  onButtonClick?: () => void;
}

export const TableFallback: React.FC<TableFallbackProps> = ({
  icon,
  title,
  description,
  buttonText,
  buttonIcon,
  minimal = false,
  onButtonClick,
}) => {
  return (
    <div
      className={`w-full ${
        minimal ? "h-[437px]" : "h-[600px]"
      } flex flex-col items-center justify-center rounded-2xl border relative overflow-hidden`}
    >
      <Suspense>
        <BackgroundCircle
          className="
            absolute
            top-0 left-1/2 -translate-x-1/2
            w-[400px] h-[400px]
            pointer-events-none select-none
            z-0 text-gray-200 dark:text-gray-500
          "
        />
      </Suspense>

      <div className="relative z-10 flex flex-col gap-20">
        <div
          className={`flex items-center justify-center w-[80px] ${
            minimal ? "h-[80px]" : ""
          }`}
        >
          <div
            className={`absolute left-1/2 ${
              minimal ? "top-[48%]" : "top-[32%]"
            } -translate-x-1/2 -translate-y-1/2`}
          >
            <div className="flex items-center justify-center bg-white border border-[#D5D7DA] rounded-[16px] p-[4px]">
              <div className="flex items-center justify-center bg-white border border-black/10 rounded-[12px] sm:w-[52px] sm:h-[52px] p-[12px] shadow-[2px_1px_2px_0px_#0000001A,0px_3px_3px_0px_#00000017]">
                {icon}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between mt-10 items-center gap-[0.8rem]">
          <h3 className="text-lg font-medium text-gray-900 mb-1 mt-[48px] dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mb-6 text-center">
            {description}
          </p>
          {buttonText && (
            <button
              onClick={onButtonClick}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-[8px] text-sm font-medium w-[352px] h-10 flex items-center justify-center gap-2"
            >
              {buttonIcon && <span>{buttonIcon}</span>}
              <span>{buttonText}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
