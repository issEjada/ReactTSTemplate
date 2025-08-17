import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useContext } from "react";
import { ThemeContext } from "../../context/Context";
import { useSessionActivity } from "../../pages/Monitoring/MonitoringTable/useSessionActivity";
import type { GetStatisticsResponse } from "../../pages/Monitoring/monitoringServices";

interface PayloadType {
  name: string;
  value: number;
}

interface CustomTooltipProps {
  viewed?: boolean;
  payload?: PayloadType[];
  statisticsData? : GetStatisticsResponse;
}

const CustomTooltip = ({ viewed, payload, statisticsData }: CustomTooltipProps) => {
  if (viewed && payload && payload.length) {
    const total = statisticsData?.totalSessions || 0
    const percent = ((payload[0].value / total) * 100).toFixed(1);
    console.log("Total:", total);
    console.log("Percent:", percent);
    return (
      <div className="px-2 py-1 bg-black text-white text-xs rounded-md shadow">
        {percent}%
      </div>
    );
  }
  return null;
};

export default function PieChartComponent() {
  const { isDarkMode } = useContext(ThemeContext);
  const { statisticsData } = useSessionActivity();
  const data = [
    { name: "Viewed", value: statisticsData?.viewedSessions || 0 },
    { name: "Not Viewed", value: statisticsData?.notViewedSessions || 0 },
  ];

  const COLORS = isDarkMode
    ? ["#1637C4", "#F04438"] // blue + gray for dark mode
    : ["#1637C4", "#F04438"]; // original light mode colors

  return (
    <div className="flex w-[410px] h-[232px] p-6 bg-white rounded-2xl shadow w-64 dark:bg-[#121418] dark:border-gray-800">

      <div className="flex justify-center">
        <ResponsiveContainer width={183} height={183}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip viewed payload={data} statisticsData={statisticsData}/>} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col justify-center mt-4 space-y-2 text-sm text-black font-medium dark:text-white">
        <div className="flex justify-between items-center w-[162px]">
          <div className="flex items-center space-x-2">
            <span className={`w-2 h-2 rounded-full bg-gray-400`} />
            <span className="text-gray-900 dark:text-gray-400 font-inter font-normal text-[12px] leading-[18px] tracking-[0] text-right">All Events</span>
          </div>
          <span className="text-gray-900 dark:text-gray-400 font-inter font-normal text-[12px] leading-[18px] tracking-[0] text-right">
            {statisticsData?.totalSessions || 0}
          </span>
        </div>

        <div className="flex justify-between items-center w-[162px]">
          <div className="flex items-center space-x-2">
            <span className={`w-2 h-2 rounded-full bg-[${COLORS[0]}]`} />
            <span className="text-gray-900 dark:text-gray-400 font-inter font-normal text-[12px] leading-[18px] tracking-[0] text-right">Viewed</span>
          </div>
          <span className="text-gray-900 dark:text-gray-400 font-inter font-normal text-[12px] leading-[18px] tracking-[0] text-right">
            {statisticsData?.viewedSessions || 0}
          </span>
        </div>

        <div className="flex justify-between items-center w-[162px]">
          <div className="flex items-center space-x-2">
            <span className={`w-2 h-2 rounded-full bg-[${COLORS[1]}]`} />
            <span className="text-gray-900 dark:text-gray-400 font-inter font-normal text-[12px] leading-[18px] tracking-[0] text-right">Not Viewed</span>
          </div>
          <span className="text-gray-900 dark:text-gray-400 font-inter font-normal text-[12px] leading-[18px] tracking-[0] text-right">
            {statisticsData?.notViewedSessions || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
