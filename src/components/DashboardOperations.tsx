import React from "react";
import ActivityIcon from "../assets/svg/activity.svg?react";
import Plus from "../assets/svg/plus.svg";

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
        <button className="flex items-center gap-[8px] h-[36px] px-[14px] rounded-[8px] bg-gradient-to-br from-gray-900 to-gray-600 shadow-[0_1px_2px_#0A0D120D] dark:bg-none dark:from-transparent dark:to-transparent dark:bg-blue-700 ">
          <ActivityIcon className="w-[16px] h-[16px] text-[#FFFFFF]" />

          <span className="text-[#FFFFFF] text-[12px] font-medium">
            Live Monitoring
          </span>
        </button>

        <div className="w-[36px] h-[36px] p-[8px] border-[1.5px] border-blue-700 rounded-[8px] bg-[#1637C4] flex items-center justify-center dark:bg-gray-800">
          <img
            src={Plus}
            alt="Plus"
            className="w-[20px] h-[20px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Top;
