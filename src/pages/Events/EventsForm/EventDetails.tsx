import { useState, lazy, useEffect } from "react";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../../../components/DropDown";
import PopupLayout from "../../../components/Popup/PopupLayout";
import DynamicPopupJsx from "../../../components/Popup/DynamicPopupJsx";
import DynamicView from "../../../components/DynamicView";
import { useViewEvents } from "./useEventForm";
import type { EventFormValues } from "../eventsServices";
import Spinner from "../../../components/Spinner";
import { extractDateAndTime } from "../../../utils/helpers";

const EditIcon = lazy(() => import("../../../assets/svg/Edit.svg?react"));

const FieldLabel = ({
  children,
  onEdit,
  showEdit,
}: {
  children: React.ReactNode;
  onEdit?: () => void;
  showEdit?: boolean;
}) => (
  <div className="flex items-center justify-between mb-[14px]">
    <label className="text-sm font-medium text-gray-700 dark:text-white">
      {children}
    </label>
    {showEdit && (
      <button
        title="edit"
        type="button"
        onClick={onEdit}
        className="cursor-pointer w-[28px] h-[28px] flex items-center justify-center rounded-[8px] bg-blue-50 p-[8px]"
      >
        <EditIcon className="w-[12px] h-[12px] text-blue-700" />
      </button>
    )}
  </div>
);

const inputBase =
  "text-sm rounded-[8px] shadow-sm px-[14px] py-[10px] h-[44px] font-medium focus:outline-none focus:ring-2 border";

const EventDetails = () => {
  const {
    control,
    onSubmit,
    isAdding,
    isEditing,
    isViewing,
    setScreenAction,
    loadingState,
    eventSourceDeviceValues,
    schemeValues,
    statusValues,
    handleSubmit,
    reset,
    popupType,
    popupMessage,
    eventData,
  } = useViewEvents();

  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCancel = () => {
    reset();
    navigate(-1);
  };

  const handleEditClick = () => {
    setScreenAction("edit");
    if (isViewing) {
      navigate("/events/edit-event", {
        state: { id: eventData!.id, action: "edit" },
      });
    }
  };

  useEffect(() => {
    if (popupType === "successModal" && loadingState === "success") {
      setIsPopupOpen(true);
    } else if (popupType === "errorModal" && loadingState === "error") {
      setIsPopupOpen(true);
    }
  }, [popupType, loadingState]);

  if (loadingState === "loading" && (isViewing || isEditing)) {
    return <Spinner />;
  }

  if (isViewing) {
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
          {
            label: "Back",
            onClick: () => navigate("/events"),
            variant: "secondary",
          },
          {
            label: "Update Event",
            onClick: handleEditClick,
            variant: "primary",
          },
        ]}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 mb-[60px]"
    >
      {loadingState === "loading" && <Spinner />}

      <div className="px-6 pt-8 grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-[1140px]">
        {/* Event Name */}
        <div className="flex flex-col">
          <FieldLabel showEdit={isViewing} onEdit={handleEditClick}>
            Event Name
          </FieldLabel>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Event name is required." }}
            render={({ field, fieldState }) => (
              <div className="flex flex-col">
                <input
                  {...field}
                  placeholder="Event Name"
                  disabled={isViewing}
                  className={`${inputBase} ${
                    fieldState.error
                      ? "border-red-500 bg-red-50 placeholder-red-400 text-gray-800"
                      : "border-gray-300 bg-white text-gray-600 dark:bg-darkTheme dark:border-gray-800"
                  } ${
                    isViewing
                      ? "bg-[#F9FAFB] text-[#A0A0A0]"
                      : "dark:text-white"
                  }`}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <div className="flex flex-col ">
          <FieldLabel showEdit={isViewing} onEdit={handleEditClick}>
            Event Description
          </FieldLabel>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Enter Description"
                disabled={isViewing}
                className={`${inputBase} border-gray-300 bg-white text-gray-600 dark:bg-darkTheme dark:border-gray-800 ${
                  isViewing ? "bg-[#F9FAFB] text-[#A0A0A0]" : "dark:text-white"
                }`}
              />
            )}
          />
        </div>
      </div>

      <div className="px-6 grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-[1140px]">
        <DropdownMenu<EventFormValues>
          control={control}
          name="identifier.eventSourceDevice"
          label="Event Source Device"
          options={eventSourceDeviceValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-full"
          disabled={isViewing || isEditing}
          required
        />

        <DropdownMenu<EventFormValues>
          control={control}
          name="identifier.scheme"
          label="Scheme"
          options={schemeValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-full"
          disabled={isViewing || isEditing}
          required
        />
      </div>

      <div className="px-6 grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-[1140px]">
        <DropdownMenu<EventFormValues>
          control={control}
          name="status"
          label="Status"
          options={statusValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-full"
          disabled={isViewing}
          required
        />
      </div>

      <div className="flex justify-end gap-4 px-6 pt-6">
        <button
          type="submit"
          disabled={isViewing}
          className="bg-blue-700 w-[125px] h-[48px] text-white px-5 py-3 rounded-[8px] hover:bg-blue-900 disabled:opacity-50"
        >
          Save Event
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="w-[125px] h-[48px] px-5 py-3 border font-medium rounded-[8px] hover:bg-gray-100 dark:hover:text-black"
        >
          Cancel
        </button>
      </div>

      <div>
        <PopupLayout isOpen={isPopupOpen} className="w-[30%] max-w-[520px]">
          <DynamicPopupJsx
            title="Event"
            isAdding={isAdding && popupType === "successModal"}
            isEditing={isEditing && popupType === "successModal"}
            isError={popupType === "errorModal"}
            errorMessage={popupMessage}
            onConfirm={() => setIsPopupOpen(false)}
            onCancel={() => {
              setIsPopupOpen(false);
              navigate(-1);
            }}
          />
        </PopupLayout>
      </div>
    </form>
  );
};

export default EventDetails;
