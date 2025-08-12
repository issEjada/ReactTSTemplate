import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  type DotProps,
} from "recharts";
 
function CustomDotDetected({ cx, cy }: DotProps) {
  return (
    <circle cx={cx} cy={cy} r={8} fill="#FEC84B" stroke="#DC6803" strokeWidth={2} />
  );
}
 
function CustomDotBlocked({ cx, cy }: DotProps) {
  return (
    <circle cx={cx} cy={cy} r={8} fill="#6172F3" stroke="#194185" strokeWidth={2} />
  );
}
 
type LineChartContent = {
  data: {
    Month: string;
    Viewed: number;
    NotViewed: number;
  }[];
};
 
export default function SessionActivity({ data = [] }: LineChartContent) {
  // Compute safe Y domain even if data is empty
  const allVals = data.flatMap((d) => [d?.Viewed ?? 0, d?.NotViewed ?? 0]);
  const yMin = Math.min(0, ...(allVals.length ? allVals : [0]));
  const yMax = Math.max(1, ...(allVals.length ? allVals : [1]));
 
  const viewedTotal = data.reduce((sum, item) => sum + (item.Viewed || 0), 0);
  const notViewedTotal = data.reduce((sum, item) => sum + (item.NotViewed || 0), 0);
 
  return (
    <div className="bg-white dark:bg-[#121418] dark:border-gray-800 p-4 sm:p-6 w-full border border-[#E9EAEB] rounded-[12px] shadow-[0_1px_2px_0_#0A0D120F,0_1px_3px_0_#0A0D121A]">
      {/* Header / Legend (wraps on small screens) */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
        <p className="text-black dark:text-white font-semibold text-[16px] leading-[20px]">
          Sessions Activity Overview
        </p>
        <div className="h-[20px] w-px bg-[#1C1C1C33] dark:bg-white" />
        <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
          <div className="flex items-center gap-2 text-[#1C1C1C] font-normal">
            <span className="w-2 h-2 rounded-full bg-[#1637C4]" />
            <span className="dark:text-white">
              Viewed Sessions{" "}
              <strong className="font-semibold">{viewedTotal}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#1C1C1C] font-normal">
            <span className="w-2 h-2 rounded-full bg-[#F79009]" />
            <span className="dark:text-white">
              Not Viewed Sessions{" "}
              <strong className="font-semibold">{notViewedTotal}</strong>
            </span>
          </div>
        </div>
      </div>
 
      {/* Chart container (responsive height) */}
      <div className="w-full h-72 sm:h-[420px] md:h-[480px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 24, right: 24, left: 12, bottom: 16 }}>
            <CartesianGrid horizontal stroke="#e5e7eb" />
            <YAxis
              domain={[yMin, yMax]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickMargin={12}
            />
            <XAxis
              dataKey="Month"
              interval={0}
              axisLine={{ stroke: "#d1d5db" }}
              tickSize={4}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickMargin={12}
            />
            <Tooltip
              contentStyle={{
                background: "#F3F4F6",
                boxShadow: "none",
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #E5E7EB",
              }}
            />
            <Line
              type="linear"
              dataKey="Viewed"
              stroke="#F79009"
              strokeWidth={3}
              dot={<CustomDotDetected />}
              activeDot={{ r: 6 }}
            />
            <Line
              type="linear"
              dataKey="NotViewed"
              stroke="#1637C4"
              strokeWidth={3}
              dot={<CustomDotBlocked />}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}