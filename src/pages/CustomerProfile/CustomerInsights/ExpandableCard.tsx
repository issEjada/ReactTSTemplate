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
          className={`flex gap-4 bg-white rounded-lg h-[72px] border border-blueGray-100 p-4 w-full ${
            hasMultiple ? "cursor-pointer" : ""
          }`}
        >
          <div className="flex justify-center items-center w-[28px] h-[28px] rounded-full bg-blueLight-100 border border-blueLight-50 border-4">
            {icon}
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">{label}</span>
            <span className="text-base text-gray-900">{firstItem}</span>
          </div>
        </div>
      ) : (
        // expanded version
        <div
          className="flex flex-col gap-[18px] p-4 bg-white w-full rounded-lg border border-blueGray-100"
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
                  className="w-full bg-blueGray-50 border border-blueGray-200 rounded-lg px-4 py-[10px] h-[40px]"
                >
                  {item}
                </div>
              ))
            ) : (
              <div className="w-full bg-blueGray-50 border border-blueGray-200 rounded-lg px-4 py-[10px] h-[40px]">
                {data}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
