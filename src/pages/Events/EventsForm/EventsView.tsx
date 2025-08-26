import { useNavigate } from "react-router-dom";
import FullScreenSpinner from "../../../components/FullScreenSpinner";
import { useViewEvents } from "./useEventForm";
import DynamicView from "../../../components/DynamicView";

const EventView = () => {
  const { setScreenAction, loadingState, eventData } = useViewEvents();

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/events");
  };

  const handleEditClick = () => {
    setScreenAction("edit");
    navigate("/events/edit-event", {
      state: { id: eventData!.id, action: "edit" },
    });
  };

  if (loadingState === "loading") {
    return <FullScreenSpinner />;
  }

  // if (!eventData) {
  //   return (
  //     <div className="w-full min-h-screen flex items-center justify-center">
  //       <p className="text-lg text-gray-600 dark:text-gray-400">
  //         Event not found or an error occurred.
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <DynamicView
      title="Event Details"
      fields={[
        { title: "Event Name", value: eventData?.name },
        { title: "Event Code", value: eventData?.code },
      ]}
      actions={[
        { label: "Back", onClick: () => handleCancel(), variant: "secondary" },
        { label: "Update Event", onClick: handleEditClick, variant: "primary" },
      ]}
    />
  );
};

export default EventView;
