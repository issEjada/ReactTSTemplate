import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useContext } from "react";
import { ThemeContext } from "../../context/Context";
const data = [
  { time: "00.00", detected: 20, blocked: 35 },
  { time: "02.00", detected: 45, blocked: 25 },
  { time: "04.00", detected: 40, blocked: 20 },
  { time: "06.00", detected: 25, blocked: 30 },
  { time: "08.00", detected: 40, blocked: 45 },
  { time: "10.00", detected: 55, blocked: 43 },
];

export default function LineChartComponent() {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div className="p-4 bg-gray-50 rounded-2xl  w-[844px] dark:bg-[#121418] dark:border-gray-800 ">
      <div className="flex items-center justify-start gap-8 mb-4 ml-5">
        <p className=" text-black font-semibold text-14 dark:text-white">
          Threat Detection Timeline
        </p>
        <div className="h-7 w-px bg-gray-300" />
        <div className="flex space-x-4 text-sm font-medium">
          <div className="flex items-center space-x-1 text-black font-normal dark:text-white">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>
              Threat Detected <strong className="font-semibold">201</strong>
            </span>
          </div>
          <div className="flex items-center space-x-1 text-black font-normal ml-6 dark:text-white">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>
              Threat Blocked <strong className="font-semibold">123</strong>
            </span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width={800} height={250}>
        <LineChart data={data}>
          <CartesianGrid
            vertical={false}
            horizontal={true}
            stroke={isDarkMode ? "#252B37" : "#e5e7eb"}
          />
          <XAxis
            dataKey="time"
            padding={{ left: 45, right: 45 }}
            axisLine={{ stroke: isDarkMode ? "#252B37" : "#d1d5db" }}
            tickSize={4}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            tickMargin={18}
          />
          <YAxis
            tickCount={4}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            tickMargin={18}
          />
          <Tooltip
            contentStyle={{
              color: isDarkMode ? "white" : "",
              backgroundColor: isDarkMode ? "#1C1C1CCC" : "",
            }}
          />
          <Line
            type="natural"
            dataKey="detected"
            stroke="#1637C4"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="natural"
            dataKey="blocked"
            stroke={isDarkMode ? "#F97066" : "#F04438"}
            strokeWidth={3}
            strokeDasharray="4 4"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
