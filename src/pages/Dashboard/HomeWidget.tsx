import React, { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../routes/AppRoutes";
import { useDashboard } from "./useDashboard";
import FullScreenSpinner from "../../components/FullScreenSpinner";

const ShieldIcon = React.lazy(
  () => import("../../assets/svg/ShieldIcon.svg?react")
);
const Threatblock = React.lazy(
  () => import("../../assets/svg/Threatblock.svg?react")
);
const ActiveAlerts = React.lazy(
  () => import("../../assets/svg/ActiveAlerts.svg?react")
);

interface HomeWidgetProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  active: number;
  inactive: number;
  total: number;
}

const HomeWidget: React.FC<HomeWidgetProps> = ({
  title,
  icon: Icon,
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
          <Suspense fallback={<div className="w-7 h-7 bg-gray-300 rounded" />}>
            <Icon className="w-[28px] h-[28px]" />
          </Suspense>
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
  const { data, loading, error } = useDashboard();
  const [widgetData, setWidgetData] = useState<HomeWidgetProps[]>([]);

  useEffect(() => {
    if (data) {
      setWidgetData([
        {
          title: "Scoring Rules",
          icon: ShieldIcon,
          active: data.scoringRules.activeRules,
          inactive: data.scoringRules.inactiveRules,
          total: data.scoringRules.totalRules,
        },
        {
          title: "Decision Rules",
          icon: Threatblock,
          active: data.decisionRules.activeRules,
          inactive: data.decisionRules.inactiveRules,
          total: data.decisionRules.totalRules,
        },
        {
          title: "Events",
          icon: ActiveAlerts,
          active: data.events.activeRules,
          inactive: data.events.inactiveRules,
          total: data.events.totalRules,
        },
      ]);
    }
  }, [data]);

  if (loading) {
    return <FullScreenSpinner />;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

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
