import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PieChartComponent from "../../components/Charts/PieChartComponent";
import useEventsTable from "../Events/EventsTable/useEventsTable";
import FullScreenSpinner from "../../components/FullScreenSpinner";

const MobileIcon = React.lazy(() => import(`/src/assets/svg/Mobile.svg?react`));

const PlusIcon = React.lazy(() => import(`/src/assets/svg/plus.svg?react`));

interface RecentEvent {
  id: number;
  name: string;
}

const DashboardEvents: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<RecentEvent[]>([]);
  const { data, loadingState } = useEventsTable();

  useEffect(() => {
    const formattedEvents = data.map((e: any) => ({
      id: e.id,
      name: e.name,
    }));
    setEvents(formattedEvents);
  }, [data]);

  const handleAddNewEvent = () => {
    navigate("/events/new-event", { state: { action: "add" } });
  };

  const handleViewDetails = (event: RecentEvent) => {
    navigate("/events/view-event", {
      state: { action: "view", id: event.id, event: event },
    });
  };

  if (loadingState === "loading") {
    return <FullScreenSpinner />;
  }

  return (
    <div className="flex flex-col min-w-[35%]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Events
          </h2>
          <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
            Keep track of all active or inactive events.
          </p>
        </div>

        <button
          onClick={handleAddNewEvent}
          className="h-10 w-10 rounded-xl ml-auto bg-gray-100  shadow-sm hover:bg-gray-150 flex items-center justify-center dark:bg-[#121418] dark:border-gray-800"
          aria-label="Add New Rule"
        >
          <PlusIcon className="w-[20px] h-[20px] text-blue-700 dark:text-gray-100" />
        </button>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-[#E5E7EB] dark:border-gray-800 bg-white dark:bg-[#121418] p-4 shadow-sm">
        <div className="space-y-3">
          {events.slice(0, 3).map((ev) => (
            <div
              key={ev.id}
              className="flex items-center justify-between rounded-lg border-b border-[#E5E7EB] dark:border-gray-800 px-3 py-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-[2rem] h-[2rem] rounded-md border border-gray-300 dark:border-gray-700 flex items-center justify-center text-[10px]">
                  <MobileIcon className="w-4 h-4 text-blue-700 dark:text-blue-600" />
                </div>
                <span className="text-sm text-[#101828] dark:text-white">
                  {ev.name}
                </span>
              </div>

              <button
                type="button"
                className="text-[12px] text-[#344054] dark:text-gray-300 hover:underline"
                onClick={() => handleViewDetails(ev)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        <div className="mb-2">
          {" "}
          <PieChartComponent />{" "}
        </div>
      </div>
    </div>
  );
};

export default DashboardEvents;
