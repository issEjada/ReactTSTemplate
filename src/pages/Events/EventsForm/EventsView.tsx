import { useNavigate } from "react-router-dom";
import FullScreenSpinner from "../../../components/FullScreenSpinner";

const EventsView = () => {
  const isLoading = false;
  const navigate = useNavigate();

  const handleAddNewEvent = () => {
    // navigate("/events/new-event", { state: { action: "add" } });
    navigate("/events/new-event");
  };

  return (
    <>
      {isLoading ? (
        <FullScreenSpinner />
      ) : (
        <div className="w-full min-h-screen flex flex-col pt-6 px-2 sm:px-4 md:px-6 gap-2">
          <div className="w-full px-1 py-5">
            <h1 className="text-[#181D27] text-lg md:text-xl font-medium leading-7 dark:text-white">
              Events Details
            </h1>
          </div>

          {/* Card */}
          <div className="w-full rounded-xl border border-[#E9EAEB] shadow-[0_1px_2px_0_#0A0D120F,0_1px_3px_0_#0A0D121A] p-4 sm:p-6 bg-white dark:bg-[#121418] dark:border-gray-800 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-6">
              {/* Event Code */}
              <div className="min-h-[56px] flex flex-col gap-2">
                <span className="text-base font-normal text-[#181D27] dark:text-white">
                  Event Code
                </span>
                <span className="text-base font-normal text-[#717680] break-all">
                  {data.eventCode}
                </span>
              </div>

              {/* Event Source device */}
              <div className="min-h-[56px] flex flex-col gap-2">
                <span className="text-base font-normal text-[#181D27] dark:text-white">
                  Event Source Device
                </span>
                <span className="text-base font-normal text-[#717680] break-all">
                  {data.eventSourceDevice}
                </span>
              </div>

              {/* Scheme */}
              <div className="min-h-[56px] flex flex-col gap-2">
                <span className="text-base font-normal text-[#181D27] dark:text-white">
                  Scheme
                </span>
                <span className="text-base font-normal text-[#717680] break-all">
                  {data.scheme}
                </span>
              </div>

              {/* Description */}
              <div className="min-h-[56px] flex flex-col gap-2">
                <span className="text-base font-normal text-[#181D27] dark:text-white">
                  Description
                </span>
                <span className="text-base font-normal text-[#717680] break-all">
                  {data.description}
                </span>
              </div>

              {/* Creation Date */}
              <div className="min-h-[56px] flex flex-col gap-2">
                <span className="text-base font-normal text-[#181D27] dark:text-white">
                  Creation Date
                </span>
                <span className="text-base font-normal text-[#717680] break-all">
                  {data.creationDate}
                </span>
              </div>

              {/* Creation Time */}
              <div className="min-h-[56px] flex flex-col gap-2">
                <span className="text-base font-normal text-[#181D27] dark:text-white">
                  Creation Time
                </span>
                <span className="text-base font-normal text-[#717680] break-all">
                  {data.creationTime}
                </span>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              className="w-[75px] h-[44px]  px-4 py-2 rounded-[8px] border border-gray-300 text-black bg-white hover:bg-gray-100 dark:bg-[#121418] dark:text-gray-300 dark:border-gray-700"
              onClick={handleCancel}
            >
              Back
            </button>
            <button className="w-[141px] h-[44px] px-4 py-2 rounded-[8px] bg-blue-700 text-white hover:bg-blue-700">
              Update Event
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EventsView;
