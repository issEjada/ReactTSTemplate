import React from "react";
import ShieldIcon from "../assets/svg/ShieldIcon.svg";
import ArrowRise from "../assets/svg/ArrowRise.svg";
import ActiveAlerts from "../assets/svg/ActiveAlerts.svg";
import Threatblock from "../assets/svg/Threatblock.svg";
import ResponseTime from "../assets/svg/ResponseTime.svg";
import ArrowDown from "../assets/svg/ArrowDown.svg";

interface HomeWidgetProps {
  title: string;
  value: number | string;
  percentage: string;
  icon: string;
  arrowIcon: string;
}

const HomeWidget: React.FC<HomeWidgetProps> = ({
  title,
  value,
  percentage,
  icon,
  arrowIcon,
}) => {
  return (
    <div className="w-full sm:w-[265px] h-[112px] bg-[#FDFDFD] dark:bg-[#121418] dark:border-gray-800 border border-gray-300 rounded-[16px] shadow-sm px-5 py-4 flex flex-col justify-between">
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold leading-[20px]">{title}</p>
        <div className="w-[36px] h-[36px] p-[4px] bg-[#1C1C1C0D] dark:bg-gray-800 rounded-[8px] flex items-center justify-center">
          <img src={icon} alt="Icon" className="w-[28px] h-[28px]" />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-center mt-2">
        <h2 className="text-[24px] leading-[36px] font-semibold">{value}</h2>
        <div className="flex items-center gap-[4px]">
          <span className="text-[12px] font-normal leading-[18px]">
            {percentage}
          </span>
          <img src={arrowIcon} alt="Arrow Icon" className="w-[16px] h-[16px]" />
        </div>
      </div>
    </div>
  );
};

const HomeWidgetGroup: React.FC = () => {
  const titles = [
    "Active Rules",
    "Threat Blocked",
    "Active Alerts",
    "Response Time",
  ];
  const icons = [ShieldIcon, Threatblock, ActiveAlerts, ResponseTime];

  const valueData = [
    { value: 378, percentage: "+11.01%" },
    { value: 18, percentage: "+15.03%" },
    { value: "1,219", percentage: "-0.03%" },
    { value: "0.8S", percentage: "+6.08%" },
  ];

  return (
    <div className="w-full flex flex-wrap gap-4 sm:gap-[28px] sm:justify-start px-4">
      {valueData.map((item, index) => {
        const arrowIcon = item.percentage.startsWith("-")
          ? ArrowDown
          : ArrowRise;

        return (
          <HomeWidget
            key={index}
            title={titles[index]}
            value={item.value}
            percentage={item.percentage}
            icon={icons[index]}
            arrowIcon={arrowIcon}
          />
        );
      })}
    </div>
  );
};

export default HomeWidgetGroup;
