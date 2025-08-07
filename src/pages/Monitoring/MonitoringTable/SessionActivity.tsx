import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
 
import type { DotProps } from "recharts";


// Your data
const data = [
  { Month: "January", Viewed: -400, NotViewed: -400 },
  { Month: "February", Viewed: 1000, NotViewed: -100 },
  { Month: "March", Viewed: 600, NotViewed: -300 },
  { Month: "April", Viewed: 380, NotViewed: -150 },
  { Month: "May", Viewed: 200, NotViewed: 100 },
  { Month: "June", Viewed: 0, NotViewed: -200 },
  { Month: "June", Viewed: 600, NotViewed: 250 },
];
 
// Custom dot for Detected (orange)
function CustomDotDetected({ cx, cy } : DotProps) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={8}
      fill="#FEC84B"
      stroke="#DC6803"
      strokeWidth={2}
    />
  );
}
 
 
 
// Custom dot for Blocked (blue)
function CustomDotBlocked({ cx, cy } : DotProps) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={8}
      fill="#6172F3"
      stroke="#194185"
      strokeWidth={2}
    />
  );
}
 
 
export default function SessionActivity() {
  return (
    <div className="bg-[#FFFFFF] py-[24px] px-[16px] w-[1144px] h-[578px] border border-[#E9EAEB] rounded-[12px] gap-[28px] shadow-[0_1px_2px_0_#0A0D120F,0_1px_3px_0_#0A0D121A]">
      <div className="flex items-center justify-start mb-4 ml-[16px] w-[1112px] mt-[14px] h-[22px] rounded-[8px] gap-[16px]">
        <p className="text-black font-semibold text-[16px]  h-[20px] leading-[20px] space-x-[12px]  pr-[16px]">
          Sessions Activity Overview
        </p>
        <div className="h-[20px] w-px bg-[#1C1C1C33]" />
        <div className="flex space-x-4 text-sm font-medium pl-[16px]">
          <div className="flex items-center space-x-1 text-[#1C1C1C] font-normal h-[22px] py-[2px] pr-[8px] pl-[4px]">
            <span className="w-2 h-2 rounded-full bg-[#1637C4]" />
            <span>
              Viewed Sessions <strong className="font-semibold">201</strong>
            </span>
          </div>
          <div className="flex items-center space-x-1 text-[#1C1C1C] font-normal h-[22px] py-[2px] pr-[8px] pl-[4px]">
            <span className="w-2 h-2 rounded-full bg-[#F79009]" />
            <span>
              Not Viewed Sessions <strong className="font-semibold">123</strong>
            </span>
          </div>
        </div>
      </div>
 
      <div className="w-[1112px] h-[480px]">
        <ResponsiveContainer width={1112} height={480}>
          <LineChart
            data={data}
            margin={{ top: 29, right: 80, left: 30, bottom: 24 }} // <- ADJUST for Figma match
          >
            <CartesianGrid  horizontal={true} stroke="#e5e7eb"/>
            <YAxis
              domain={[-400, 1000]}
              ticks={[-400, -200, 0, 200, 400, 600, 800, 1000]}
              interval={0}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickMargin={40.5}
            />
            <XAxis
              dataKey="Month"
              interval={0}
              axisLine={{ stroke: "#d1d5db" }}
              tickSize={4}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickMargin={32.5}
              
            />
            <Tooltip
              contentStyle={{
                background: "#F3F4F6",
                boxShadow: "none",
                padding: "8px 12px",
              }}
            />
            <Line
              type="linear"
              dataKey="Viewed"
              stroke="#F79009"
              strokeWidth={3}
              dot={CustomDotDetected}
            />
            <Line
              type="linear"
              dataKey="NotViewed"
              stroke="#1637C4"
              strokeWidth={3}
              dot={CustomDotBlocked}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}