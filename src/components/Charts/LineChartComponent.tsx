import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { time: "00.00", detected: 20, blocked: 35 },
  { time: "02.00", detected: 45, blocked: 25 },
  { time: "04.00", detected: 40, blocked: 20 },
  { time: "06.00", detected: 25, blocked: 30 },
  { time: "08.00", detected: 40, blocked: 45 },
  { time: "10.00", detected: 55, blocked: 43 },
];

export default function LineChartComponent() {
  return (
    <div className="p-4 bg-gray-50 rounded-2xl  w-[844px]">
      <div className="flex items-center justify-start gap-8 mb-4 ml-5">
        <p className=" text-black font-semibold text-14">
          Threat Detection Timeline
        </p>
        <div className="h-7 w-px bg-gray-300" />
        <div className="flex space-x-4 text-sm font-medium">
          <div className="flex items-center space-x-1 text-black font-normal">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>
              Threat Detected <strong className="font-semibold">201</strong>
            </span>
          </div>
          <div className="flex items-center space-x-1 text-black font-normal ml-6">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>
              Threat Blocked <strong className="font-semibold">123</strong>
            </span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width={800} height={250}>
        <LineChart data={data}>
          <CartesianGrid vertical={false} horizontal={true} stroke="#e5e7eb" />
          <XAxis
            dataKey="time"
            padding={{ left: 45, right: 45 }}
            axisLine={{ stroke: "#d1d5db	" }}
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
          <Tooltip />
          <Line
            type="natural"
            dataKey="detected"
            stroke="#2563eb"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="natural"
            dataKey="blocked"
            stroke="#ef4444"
            strokeWidth={3}
            strokeDasharray="4 4"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
