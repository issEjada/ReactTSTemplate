import React from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "../routes/AppRoutes";

const ActivityIcon = React.lazy(
  () => import(`/src/assets/svg/activity.svg?react`)
);

const Top: React.FC = () => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-[16px] px-6 ">
      {/* Left: Title + Subtitle */}
      <div className="flex flex-col">
        <h1 className="text-[14px] font-semibold text-[#000000] leading-[24px] dark:text-white">
          Security Operations Dashboard
        </h1>
        <p className="text-[14px] text-[#535862] leading-[20px] dark:text-gray-500">
          Real-Time monitoring and decision management
        </p>
      </div>

      {/* Right: Buttons */}
      <div className="flex flex-row items-center gap-[8px]">
        <Link
          to={AppRoutes.monitoring}
          className="flex items-center gap-[8px] h-[36px] px-[14px] rounded-[8px]
                    bg-gradient-to-br from-gray-900 to-gray-600
                  dark:bg-blue-700 dark:from-blue-700 dark:to-blue-700
                  text-white text-[12px] font-medium
                   transition-all duration-200 ease-in-out
                   hover:from-gray-1000 hover:to-gray-700 hover:shadow-md
                  dark:hover:bg-blue-800 shadow-[0_1px_2px_#0A0D120D]
"
        >
          <ActivityIcon className="w-[16px] h-[16px] text-white" />
          <span>Live Monitoring</span>
        </Link>
      </div>
    </div>
  );
};

export default Top;
