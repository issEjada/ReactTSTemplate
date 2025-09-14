import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useContext, useMemo } from "react";
import { ThemeContext } from "../../context/Context";
import { useSessionActivity } from "../../pages/Monitoring/MonitoringTable/useSessionActivity";
import { useDashboard } from "../../pages/Dashboard/useDashboard";

type RCTooltipProps = {
  active?: boolean;
  payload?: Array<{ value: number }>;
  total: number;
};

const DonutTooltip = ({ active, payload, total }: RCTooltipProps) => {
  if (!active || !payload?.length || total <= 0) return null;
  const pct = ((payload[0].value / total) * 100).toFixed(1);
  return (
    <div className="px-2 py-[2px] rounded-md bg-gray-800 text-white text-[11px] shadow">
      {pct}%
    </div>
  );
};

export default function PieChartComponent({
  type,
}: {
  type: "session" | "events";
}) {
  const { isDarkMode } = useContext(ThemeContext);

  // hooks
  const { statisticsData } = useSessionActivity();
  const { data } = useDashboard();

  // color palette
  const COLORS = useMemo(
    () =>
      isDarkMode
        ? {
            viewed: "#1E40D1",
            notViewed: "#252B37",
            inactive: "#F04438",
            all: "#98A2B3",
          }
        : {
            viewed: "#1637C4",
            notViewed: "#e5e7eb",
            inactive: "#F04438",
            all: "#98A2B3",
          },
    [isDarkMode]
  );

  // ===== SESSION DATA =====
  const sessionData = [
    { name: "viewed", value: statisticsData?.viewedSessions || 0 },
    { name: "not viewed", value: statisticsData?.notViewedSessions || 0 },
  ];

  // ===== EVENTS DATA =====
  const total = data?.events.totalRules ?? 0;
  const active = data?.events.activeRules ?? 0;
  const inactive = data?.events.inactiveRules ?? 0;
  const eventsData = [
    { name: "Active", value: active },
    { name: "Inactive", value: inactive },
  ];

  // ================== RENDER ==================
  if (type === "session") {
    return (
      <div className="flex-1 max-w-[272px] max-h-[289px] p-6 bg-white rounded-2xl shadow w-64 dark:bg-[#121418] dark:border-gray-800">
        <h2 className="font-semibold text-sm mb-4 text-black text-left dark:text-white">
          Session Activity Overview
        </h2>

        <div className="flex justify-center">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={sessionData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                <Cell fill={COLORS.viewed} />
                <Cell fill={COLORS.notViewed} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 space-y-2 text-sm text-black font-medium dark:text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: COLORS.viewed }}
              />
              <span className="font-light">Viewed Sessions</span>
            </div>
            <span className="text-blue-700">
              {statisticsData?.viewedSessions || 0}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: COLORS.notViewed }}
              />
              <span className="font-light">Not Viewed Sessions</span>
            </div>
            <span>{statisticsData?.notViewedSessions || 0}</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "events") {
    return (
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center w-full h-[310px] md:h-[200px] p-3 md:p-6 dark:bg-darkTheme">
        <div className="flex items-center justify-center w-[200px] h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={eventsData}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={80}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                <Cell fill={COLORS.viewed} />
                <Cell fill={COLORS.inactive} />
              </Pie>

              <Tooltip
                cursor={false}
                content={({ active, payload }) => (
                  <DonutTooltip
                    active={active}
                    payload={payload as Array<{ value: number }>}
                    total={total}
                  />
                )}
                wrapperStyle={{ outline: "none" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col justify-center md:ml-6 space-y-3 w-[80%] md:w-[45%] text-sm dark:text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: COLORS.all }}
              />
              <span className="text-gray-950 dark:text-gray-300 text-[12px]">
                Events
              </span>
            </div>
            <div className="text-gray-950 dark:text-gray-300 ml-auto text-[12px]">
              {total}
            </div>
          </div>

          <div className="flex justify-between items-center ">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: COLORS.viewed }}
              />
              <span className="text-gray-950 dark:text-gray-300 text-[12px]">
                Active
              </span>
            </div>
            <span className="text-gray-950 dark:text-gray-300 text-[12px]">
              {active}
            </span>
          </div>

          <div className="flex justify-between items-center ">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: COLORS.inactive }}
              />
              <span className="text-gray-950 dark:text-gray-300 text-[12px]">
                Inactive
              </span>
            </div>
            <span className="text-gray-950 dark:text-gray-300 text-[12px]">
              {inactive}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
