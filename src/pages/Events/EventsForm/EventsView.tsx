import { useNavigate } from "react-router-dom";
import { useViewEvents } from "./useEventForm";
import DynamicView from "../../../components/DynamicView";
import { extractDateAndTime } from "../../../utils/helpers";
import Spinner from "../../../components/Spinner";

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
    return <Spinner />;
  }
  const creationTimestamp = extractDateAndTime(
    eventData?.creationTimestamp || ""
  );
  const lastUpdatedTimestamp = extractDateAndTime(
    eventData?.lastUpdatedTimestamp || ""
  );

  return (
    <DynamicView
      title="Event Details"
      fields={[
        { title: "Event Name", value: eventData?.name },
        { title: "Event Code", value: eventData?.code },
        { title: "Description", value: eventData?.description },
        {
          title: "Event Source Device",
          value: eventData?.identifier?.eventSourceDevice,
        },
        { title: "Scheme", value: eventData?.identifier?.scheme },
        { title: "Status", value: eventData?.status },
        { title: "Creation Date", value: creationTimestamp.date },
        { title: "Creation Time", value: creationTimestamp.time },
        {
          title: "Last Updated Date",
          value: lastUpdatedTimestamp.date,
        },
        { title: "Last Updated Time", value: lastUpdatedTimestamp.time },
      ]}
      actions={[
        { label: "Back", onClick: () => handleCancel(), variant: "secondary" },
        { label: "Update Event", onClick: handleEditClick, variant: "primary" },
      ]}
    />
  );
};

export default EventView;
