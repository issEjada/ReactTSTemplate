import React, { useState } from "react";

type ExpandableCardProps = {
  icon: React.ReactNode;
  label: string;
  data: React.ReactNode[] | number;
};

export default function ExpandableCard({
  icon,
  label,
  data = [],
}: ExpandableCardProps) {
  const [expanded, setExpanded] = useState(false);

  const hasMultiple = Array.isArray(data) && data.length > 1;
  const firstItem = data
    ? Array.isArray(data)
      ? React.isValidElement(data[0])
        ? (
            data[0] as React.ReactElement<{ children?: React.ReactNode }>
          ).props?.children?.toString() || ""
        : String(data[0])
      : String(data)
    : "";

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
          <div className="flex justify-center items-center w-[28px] h-[28px] rounded-full bg-blueLight-100 border border-blueLight-50 border-4">
            {icon}
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-600 dark:text-gray-200">{label}</span>
            <span className="text-base text-gray-900 dark:text-white">{firstItem}</span>
          </div>
        </div>
      ) : (
        // expanded version
        <div
          className="flex flex-col gap-[18px] p-4 bg-white dark:bg-gray-800 dark:border-gray-900 w-full rounded-lg border border-blueGray-100"
          onClick={() => setExpanded(false)}
        >
          <div className="flex justify-start gap-[10px]">
            <div className="flex justify-center items-center w-[28px] h-[28px] rounded-full bg-blueLight-100 border border-blueLight-50 border-4">
              {icon}
            </div>
            <span className="font-medium">{label}</span>
          </div>
          <div className="flex flex-col gap-2">
            {Array.isArray(data) ? (
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
                {data}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
