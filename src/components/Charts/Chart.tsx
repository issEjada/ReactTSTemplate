import LineChartComponent from "./LineChartComponent";
import PieChartComponent from "./PieChartComponent";
type ChartProps = {
  chartType: "line" | "pie";
};

export default function Chart({ chartType }: ChartProps) {
  switch (chartType) {
    case "line":
      return <LineChartComponent />;
    case "pie":
      return <PieChartComponent />;
    default:
      return <div>No chart type selected</div>;
  }
}
