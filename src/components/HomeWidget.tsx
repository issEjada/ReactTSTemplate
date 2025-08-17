import React from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "../routes/AppRoutes";

import ShieldIcon from "../assets/svg/ShieldIcon.svg";
import Threatblock from "../assets/svg/Threatblock.svg";
import ActiveAlerts from "../assets/svg/ActiveAlerts.svg";

interface HomeWidgetProps {
  title: string;
  icon: string;
  active: number;
  inactive: number;
  total: number;
}

const HomeWidget: React.FC<HomeWidgetProps> = ({
  title,
  icon,
  active,
  inactive,
  total,
}) => {
  const routeMap: Record<string, string> = {
    "Scoring Rules": AppRoutes.scoringRules,
    "Decision Rules": AppRoutes.decisionRules,
    Events: AppRoutes.events,
  };

  const route = routeMap[title] ?? "#";

  return (
    <div className="w-full h-[112px] bg-[#FDFDFD] dark:bg-[#121418] dark:border-gray-800 border border-gray-300 rounded-[16px] shadow-sm px-5 py-4 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <Link
          to={route}
          className="text-sm font-semibold leading-[20px] text-black dark:text-white hover:underline"
        >
          {title}
        </Link>
        <div className="w-[36px] h-[36px] p-[4px] bg-[#1C1C1C0D] dark:bg-gray-800 rounded-[8px] flex items-center justify-center">
          <img src={icon} alt="Icon" className="w-[28px] h-[28px]" />
        </div>
      </div>

      <div className="flex justify-between items-center mt-2 text-sm">
        <div className="flex flex-col">
          <span className="opacity-70">Active</span>
          <span className="font-semibold">{active}</span>
        </div>
        <div className="flex flex-col">
          <span className="opacity-70">Inactive</span>
          <span className="font-semibold">{inactive}</span>
        </div>
        <div className="flex flex-col">
          <span className="opacity-70">Total</span>
          <span className="font-semibold">{total}</span>
        </div>
      </div>
    </div>
  );
};

const HomeWidgetGroup: React.FC = () => {
  const widgetData: HomeWidgetProps[] = [
    {
      title: "Scoring Rules",
      icon: ShieldIcon,
      active: 120,
      inactive: 35,
      total: 155,
    },
    {
      title: "Decision Rules",
      icon: Threatblock,
      active: 80,
      inactive: 20,
      total: 100,
    },
    {
      title: "Events",
      icon: ActiveAlerts,
      active: 900,
      inactive: 50,
      total: 950,
    },
  ];

  return (
    <div className="max-w-[1144px] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px]">
      {widgetData.map((item, index) => (
        <HomeWidget
          key={index}
          title={item.title}
          icon={item.icon}
          active={item.active}
          inactive={item.inactive}
          total={item.total}
        />
      ))}
    </div>
  );
};

export default HomeWidgetGroup;
