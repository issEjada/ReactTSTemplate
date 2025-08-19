import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PieChartComponent from "./Charts/PieChartComponent";

const MobileIcon = React.lazy(
  () => import(`/src/assets/svg/Mobile.svg?react`))

const PlusIcon = React.lazy(
  () => import(`../assets/svg/PlusIconBlue.svg?react`));
;type RecentEvent = {
  id: string | number;
  name: string;
};

const DashboardEvents: React.FC = () => {
    const navigate = useNavigate();

  const [events, setEvents] = useState<RecentEvent[]>([]);
  const handleAddNewEvent = () => {
    navigate("/events/new-event", { state: { action: "add" } });
  };
  useEffect(() => {
    // TODO: replace with real endpoint
    (async () => {
      try {
        const res = await fetch("/api/events?limit=3"); 
        const json = await res.json();
        const top3 =
          Array.isArray(json?.items) ? json.items.slice(0, 3) : json.slice(0, 3);
        setEvents(
          top3.map((e: any, i: number) => ({
            id: e.id ?? i,
            name: e.name ?? e.title ?? "Event",
          }))
        );
      } catch {
        // minimal fallback list while API is not wired
        setEvents([
          { id: 1, name: "Login Attempt" },
          { id: 2, name: "Password Reset" },
          { id: 3, name: "New Device Registered" },
        ]);
      }
    })();
  }, []);

  return (
    <>
    <div className= "flex flex-col">
     <div className="flex items-center justify-between  p-6 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Events
          </h2>
          <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
            Keep track of all active or inactive events.
          </p>
        </div>

      <div className="ml-auto">
                <button
                onClick ={handleAddNewEvent}
                className="h-10 w-10 rounded-xl ml-auto bg-white border border-gray-200 shadow-sm hover:bg-gray-50 flex items-center justify-center dark:bg-[#121418] dark:border-gray-800"
                aria-label="Add New Rule"
              >
                <PlusIcon className="w-[20px] h-[20px]" />
              </button>
            </div>
      </div>
    <div className="rounded-2xl border border-[#E5E7EB] dark:border-gray-800 bg-white dark:bg-[#121418] p-4 shadow-sm">
     

      <div className="space-y-3">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="flex items-center justify-between rounded-lg border-b border-[#E5E7EB] dark:border-gray-800 px-3 py-3"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md border border-gray-300 dark:border-gray-700 flex items-center justify-center text-[10px]">
                <MobileIcon className="w-3 h-3"></MobileIcon>
              </div>
              <span className="text-sm text-[#101828] dark:text-white">
                {ev.name}
              </span>
            </div>

            <button
              type="button"
              className="text-[12px] text-[#344054] dark:text-gray-300 hover:underline"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <PieChartComponent />
      </div>
    </div>
    </div>
    </>
  );
};

export default DashboardEvents;
