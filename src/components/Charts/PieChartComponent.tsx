import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useContext, useMemo } from "react";
import { ThemeContext } from "../../context/Context";
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

export default function PieChartComponent() {
  const { isDarkMode } = useContext(ThemeContext);
  const { data } = useDashboard();

  const COLORS = useMemo(
    () =>
      isDarkMode
        ? { viewed: "#1E40D1", notViewed: "#F04438", all: "#98A2B3" }
        : { viewed: "#1637C4", notViewed: "#F04438", all: "#98A2B3" },
    [isDarkMode]
  );

  const total = data?.events.totalRules ?? 100;
  const active = data?.events.activeRules ?? 50;
  const inactive = data?.events.inactiveRules ?? 50;

  const eventsData = [
    { name: "Active", value: active },
    { name: "Inactive", value: inactive },
  ];

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
              <Cell fill={COLORS.notViewed} />
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

      <div className="flex flex-col justify-center items md:ml-6 space-y-3 w-[80%] md:w-[45%] text-sm dark:text-white">
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
              style={{ backgroundColor: COLORS.notViewed }}
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
