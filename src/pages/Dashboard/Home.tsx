import HomeWidgetGroup from "./HomeWidget.js";
import { ScoringRulesTable } from "../ScoringRules/ScoringRulesTable/ScoringRulesTable.js";
import DashboardOperations from "./DashboardOperations.js";
import DashboardEvents from "./DashboardEvents.js";
import { useScoringRulesTable } from "../ScoringRules/ScoringRulesTable/useScoringRulesTable.js";
import Spinner from "../../components/Spinner.js";
const Home = () => {
  const values = useScoringRulesTable();
  console.log("loading States", values.loadingState);

  if (values.loadingState === "loading") {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-[28px] ps-6 pe-4 pb-2">
      <div className="mt-[24px]">
        <DashboardOperations />
      </div>
      {/* Widgets */}

      <HomeWidgetGroup />
      <div className="mb-[60px] flex gap-[24px] mt-[24px] max-xl:flex-wrap">
        <ScoringRulesTable fromDashboard={true} />
        <DashboardEvents />
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
