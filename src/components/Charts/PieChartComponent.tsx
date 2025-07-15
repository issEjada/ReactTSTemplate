import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

//temporary static data
const data = [
  { name: "Active", value: 223 },
  { name: "Inactive", value: 1243 },
];

const COLORS = ["#1637C4", "#e5e7eb"];

interface PayloadType {
  name: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadType[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const total = data.reduce((sum, entry) => sum + entry.value, 0);
    const percent = ((payload[0].value / total) * 100).toFixed(1);
    return (
      <div className="px-2 py-1 bg-black text-white text-xs rounded-md shadow">
        {percent}%
      </div>
    );
  }
  return null;
};

export default function PieChartComponent() {
  return (
    <div className="flex-1 max-w-[272px] p-6 bg-white rounded-2xl shadow w-64">
      <h2 className="font-semibold text-sm mb-4 text-black text-left">
        Total Events
      </h2>

      <div className="flex justify-center">
        <ResponsiveContainer width={160} height={160}>
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
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-2 text-sm text-black font-medium">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="text-black font-light">Active</span>
          </div>
          <span className="text-black">223</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-gray-300" />
            <span className="text-black font-light">Inactive</span>
          </div>
          <span className="text-black">1243</span>
        </div>
      </div>
    </div>
  );
}
