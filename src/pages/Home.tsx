import HomeWidgetGroup from "../components/HomeWidget";
import Chart from "../components/Charts/Chart.js";
import RecentActivityTable from "../components/RecentActivityTable";
import GlobalThreatMap from "../components/Charts/GlobalThreatMap.js";
import Top from "../components/DashboardOperations.js";
const Home = () => {
  return (
    <div className="flex flex-col gap-[28px] px-4 pb-4 w-full">
      <div className="mt-[24px]">
        <Top />
      </div>

      {/* Widgets */}

      <HomeWidgetGroup />

      {/* Line Chart */}
      <div className="flex flex-col-1 lg:flex-row mx-4 w-full gap-6">
        <Chart chartType="line" />
        <GlobalThreatMap />
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-6"></div>

      {/* Table + Pie Chart */}
      <div className="flex flex-col lg:flex-row mx-4 w-full gap-6">
        <RecentActivityTable />
        <Chart chartType="pie" />
      </div>
    </div>
  );
};

export default Home;
