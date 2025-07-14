import React from "react";
import ShieldIcon from "../assets/svg/Icon.svg";
import ArrowRise from "../assets/svg/arrowRise.svg";
import ActiveAlerts from "../assets/svg/Icon (2).svg";
import Threatblock from "../assets/svg/Vector.svg";
import ResponseTime from "../assets/svg/Icon (3).svg";

import ArrowDown from "../assets/svg/IconSet.svg";

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
    <div className="w-[265px] h-[112px] bg-[#FDFDFD] border border-[#D5D7DA] rounded-[16px] shadow-sm px-5 py-4 flex flex-col justify-between">
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-[#111827] leading-[20px]">
          {title}
        </p>
        <div className="w-[36px] h-[36px] p-[4px] bg-[rgba(28,28,28,0.05)] rounded-[8px] flex items-center justify-center">
          <img src={icon} alt="Icon" className="w-[28px] h-[28px]" />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-center w-[217px]">
        <h2
          className="w-[45px] h-[36px] text-[24px] leading-[36px] font-semibold text-[#111827]"
          style={{
            fontFamily: "Inter, sans-serif",
            letterSpacing: "0px",
            wordSpacing: "18px",
          }}
        >
          {typeof value === "number" ? value.toFixed(2) : value}
        </h2>

        <div className="flex items-center w-[64px] h-[18px] gap-[4px] rounded-[8px]">
          <span
            className="w-[44px] h-[18px] flex items-center justify-center rounded-[8px] text-[12px] font-normal leading-[18px] text-black"
            style={{
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0px",
              wordSpacing: "10px",
            }}
          >
            {percentage}
          </span>
          <img src={arrowIcon} alt="Arrow Icon" className="w-[16px] h-[16px]" />
        </div>
      </div>
    </div>
  );
};

const HomeWidgetGroup: React.FC = () => {
  return (
    <div className="w-full h-auto flex gap-[28px]">
      <HomeWidget
        title="Active Rules"
        value={378}
        percentage="+11.01%"
        icon={ShieldIcon}
        arrowIcon={ArrowRise}
      />
      <HomeWidget
        title="Threat Blocked"
        value={18}
        percentage="+15.03%"
        icon={Threatblock}
        arrowIcon={ArrowRise}
      />
      <HomeWidget
        title="Active Alerts"
        value={1.219}
        percentage="-0.03%"
        icon={ActiveAlerts}
        arrowIcon={ArrowDown}
      />
      <HomeWidget
        title="Response Time"
        value="0.8S"
        percentage="+6.08%"
        icon={ResponseTime}
        arrowIcon={ArrowRise}
      />
    </div>
  );
};

export default HomeWidgetGroup;
