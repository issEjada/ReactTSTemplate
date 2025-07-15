import HomeWidgetGroup from "../components/HomeWidget";
import Chart from "../components/Charts/Chart.js";
import RecentActivityTable from "../components/RecentActivityTable";
const Home = () => {
  return (
    <div className="flex flex-col gap-[28px]  px-4 w-full">
      {/* Widgets */}
      <div className="mt-[96px]">
        <HomeWidgetGroup />
      </div>

      {/* Line Chart */}
      <div className="flex flex-col lg:flex-row w-full gap-6">
        <Chart chartType="line" />
      </div>

      {/* Table + Pie Chart */}
      <div className="flex flex-col lg:flex-row w-full gap-6">
        <RecentActivityTable />
        <Chart chartType="pie" />
      </div>
    </div>
  );
};

export default Home;
