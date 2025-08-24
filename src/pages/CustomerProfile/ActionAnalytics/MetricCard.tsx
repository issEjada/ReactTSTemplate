import React from "react";

export type MetricCardProps = {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  className?: string;
};

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  className = "w-full",
}) => {
  return (
    <div
      className={`${className} bg-white dark:bg-[#121418] border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 flex items-center justify-between shadow-sm`}
    >
      <div>
        <p className="text-xs text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-semibold text-gray-600 dark:text-white mt-1">
          {value}
        </p>
      </div>
      <div className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
};

export default MetricCard;
