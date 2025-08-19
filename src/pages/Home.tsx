import HomeWidgetGroup from "../components/HomeWidget";
import { ScoringRulesTable } from "./ScoringRules/ScoringRulesTable/ScoringRulesTable.js";
import DashboardOperations from "../components/DashboardOperations.js";
import DashboardEvents from "../components/DashboardEvents.js";
const Home = () => {
  return (
    <div className="flex flex-col gap-[28px] px-4 pb-4 w-full">
      <div className="mt-[24px]">
        <DashboardOperations />
      </div>
      {/* Widgets */}

      <HomeWidgetGroup />
      <div className="flex h-[507px] gap-[24px]">
        <ScoringRulesTable fromDashboard={true} />
        <DashboardEvents/>
      </div>
  
      
      {/* Line Chart */}
      {/* <div className="flex flex-col-1 lg:flex-row mx-4 w-full gap-6">
        <Chart chartType="line" />
        <GlobalThreatMap />
      </div> */}

      {/* <div className="flex flex-col lg:flex-row w-full gap-6"></div> */}

      {/* Table + Pie Chart */}
      {/* <div className="flex flex-col lg:flex-row mx-4 w-full gap-6">
        <RecentActivityTable />
        <Chart chartType="pie" />
      </div> */}
    </div>
  );
};

export default Home;
