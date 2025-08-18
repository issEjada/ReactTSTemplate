import React, { Suspense } from "react";

const BackgroundCircle = React.lazy(
  () => import("../assets/svg/BackgroundCircle.svg?react")
);

interface TableFallbackProps {
  icon: React.ReactNode; // The main empty-state icon (center)
  title: string;
  description: string;
  buttonText: string;
  buttonIcon?: React.ReactNode; // Optional button icon
  onButtonClick: () => void;
}

export const TableFallback: React.FC<TableFallbackProps> = ({
  icon,
  title,
  description,
  buttonText,
  buttonIcon,
  onButtonClick,
}) => {
  return (
    <div className="w-full h-[75vh] flex flex-col items-center justify-center rounded-md border">
      {/* Main Icon with background circle */}
      <div className="relative flex items-center justify-center mb-6 w-[80px] h-[80px]">
        <div className="absolute z-0 w-[80px] h-[80px] flex items-center justify-center">
          <Suspense>
            <BackgroundCircle
              className="
                absolute
                left-1/2 top-[60%]
                -translate-x-1/2 -translate-y-1/2
                w-[400px] h-[400px]
                pointer-events-none select-none
                z-0
              "
            />
          </Suspense>
        </div>

        {/* Foreground Icon box */}
        <div className="relative z-10 flex items-center justify-center bg-white border border-[#D5D7DA] rounded-[16px] p-[4px] mt-[70px]">
          <div className="flex items-center justify-center bg-white border border-black/10 rounded-[12px] sm:w-[52px] sm:h-[52px] p-[12px] shadow-[2px_1px_2px_0px_#0000001A,0px_3px_3px_0px_#00000017]">
            {icon}
          </div>
        </div>
      </div>

      {/* Title & Description */}
      <h3 className="text-lg font-medium text-gray-900 mb-1 mt-[48px] dark:text-white">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mb-6 text-center">{description}</p>

      {/* Action Button */}
      <button
        onClick={onButtonClick}
        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-[8px] text-sm font-medium w-[352px] h-10 flex items-center justify-center gap-2"
      >
        {buttonIcon && <span>{buttonIcon}</span>}
        <span>{buttonText}</span>
      </button>
    </div>
  );
};
