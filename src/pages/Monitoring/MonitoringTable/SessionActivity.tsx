import { useEffect, useRef, useState, useContext } from "react";
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

import { ThemeContext } from "../../../context/Context";

function CustomDotDetected({ cx, cy }: DotProps) {
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
function CustomDotBlocked({ cx, cy }: DotProps) {
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

type LineChartContent = {
  data: { Month: string; Viewed: number; NotViewed: number }[];
};

export default function SessionActivity({ data = [] }: LineChartContent) {
  const allVals = data.flatMap((d) => [d?.Viewed ?? 0, d?.NotViewed ?? 0]);
  const yMin = Math.min(0, ...(allVals.length ? allVals : [0]));
  const yMax = Math.max(1, ...(allVals.length ? allVals : [1]));
  const { isDarkMode } = useContext(ThemeContext);
  const viewedTotal = data.reduce((s, d) => s + (d.Viewed || 0), 0);
  const notViewedTotal = data.reduce((s, d) => s + (d.NotViewed || 0), 0);

  // --- new: compute a natural chart width and enable horizontal scroll ONLY when needed
  const outerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!outerRef.current) return;

    const measure = () => {
      const w = outerRef.current?.getBoundingClientRect().width ?? 0;
      setContainerWidth(w);
    };

    measure(); // initial measure
    const ro = new ResizeObserver(() => measure());
    ro.observe(outerRef.current);

    // ensure Windows/Chrome gets an initial value after layout
    const id = requestAnimationFrame(measure);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(id);
    };
  }, []);

  // keep the original look; give each point some space (~90px) so labels/dots don’t collide
  const naturalWidth = Math.max(560, data.length * 90);
  const innerWidth = Math.max(containerWidth, naturalWidth);

  return (
    <div className="bg-white dark:bg-darkTheme dark:border-gray-800 p-4 sm:p-6 w-full border border-gray-200 rounded-[12px] shadow-[0_1px_2px_0_#0A0D120F,0_1px_3px_0_#0A0D121A]">
      {/* header/legend */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
        <p className="text-black dark:text-white font-semibold text-[16px] leading-[20px]">
          Sessions Activity Overview
        </p>
        <div className="h-[20px] w-px bg-gray-950/20 dark:bg-white" />
        <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
          <div className="flex items-center gap-2 text-gray-950 font-normal">
            <span className="w-2 h-2 rounded-full bg-blue-700" />
            <span className="dark:text-white">
              Viewed Sessions{" "}
              <strong className="font-semibold">{viewedTotal}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-950 font-normal">
            <span className="w-2 h-2 rounded-full bg-[#F79009]" />
            <span className="dark:text-white">
              Not Viewed Sessions{" "}
              <strong className="font-semibold">{notViewedTotal}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* chart wrapper: scroll wrapper outside measured container */}
      <div className="w-full overflow-x-auto">
        <div
          ref={outerRef}
          className="h-72 sm:h-[420px] md:h-[480px] min-w-[560px]"
        >
          <div style={{ width: innerWidth, height: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 28, right: 95, left: 17.5, bottom: 38 }}
              >
                <CartesianGrid horizontal stroke="#e5e7eb" />
                <YAxis
                  domain={[yMin, yMax]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  tickMargin={44}
                />
                <XAxis
                  dataKey="Month"
                  interval={0}
                  axisLine={{ stroke: "#d1d5db" }}
                  tickSize={4}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  tickMargin={38}
                />
                <Tooltip
                  contentStyle={{
                    color: isDarkMode ? "white" : "",
                    backgroundColor: isDarkMode ? "#1F2937" : "white",
                    boxShadow: "none",
                    padding: "8px 12px",
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
      </div>
    </div>
  );
}
