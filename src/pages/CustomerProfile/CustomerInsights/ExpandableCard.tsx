import React, { useState } from "react";

type ExpandableCardProps = {
  icon: React.ReactNode;
  label: string;
  data?: React.ReactNode[] | number | string | null;
};

const ChevronDown = React.lazy(
  () => import("../../../assets/svg/chevronDown.svg?react")
);

export default function ExpandableCard({
  icon,
  label,
  data,
}: ExpandableCardProps) {
  const [expanded, setExpanded] = useState(false);

  const hasMultiple = Array.isArray(data) && data.length > 1;

  const firstItem =
    data == null
      ? ""
      : Array.isArray(data)
      ? data.length > 0
        ? data[0]
        : ""
      : data;

  return (
    <>
      {!expanded ? (
        // collapsed version
        <div
          onClick={() => hasMultiple && setExpanded(true)}
          className={`flex gap-4 bg-white dark:bg-gray-800 dark:border-gray-900 rounded-lg h-[72px] border border-blueGray-100 p-4 w-full ${
            hasMultiple ? "cursor-pointer" : ""
          }`}
        >
          <div className="flex justify-center items-center w-[32px] h-[32px] rounded-full bg-blueLight-100 border border-blueLight-50 border-4">
            {icon}
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center w-full">
              <span className="text-sm text-gray-600 dark:text-gray-200">
                {label}
              </span>
              {hasMultiple && <ChevronDown />}
            </div>
            <span className="text-base text-gray-900 dark:text-white">
              {firstItem || ""}
            </span>
          </div>
        </div>
      ) : (
        // expanded version
        <div
          className="flex flex-col gap-[18px] p-4 bg-white dark:bg-gray-800 dark:border-gray-900 w-full rounded-lg border border-blueGray-100"
          onClick={() => setExpanded(false)}
        >
          <div className="flex justify-start gap-[10px] items-center">
            <div className="flex justify-center items-center w-[32px] h-[32px] rounded-full bg-blueLight-100 border border-blueLight-50 border-4">
              {icon}
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="font-medium">{label}</span>
              {hasMultiple && <ChevronDown className="rotate-180" />}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center w-full bg-blueGray-50 border border-blueGray-200 rounded-lg px-4 py-[10px] h-[40px] dark:bg-gray-700 dark:border-gray-800"
                >
                  {item}
                </div>
              ))
            ) : (
              <div className="flex items-center w-full bg-blueGray-50 border border-blueGray-200 rounded-lg px-4 py-[10px] h-[40px] dark:bg-gray-700 dark:border-gray-800">
                {data || ""}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
