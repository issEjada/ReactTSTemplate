import { useState, lazy, useEffect } from "react";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../../../components/DropDown";
import LayoutPopup from "../../../components/Popup/LayoutPopup";
import RulesPopupJsx from "../../../components/Popup/DynamicPopupJsx";
import { useViewEvents } from "./useEventForm";
import type { EventFormValues } from "../eventsServices";
import FullScreenSpinner from "../../../components/FullScreenSpinner";

const EditIcon = lazy(() => import("../../../assets/svg/Edit.svg?react"));

const EventsForm = () => {
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
  } = useViewEvents();

  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCancel = () => {
    reset();
    navigate(-1);
  };

  const handleEditClick = () => {
    setScreenAction("edit");
  };

  useEffect(() => {
    if (popupType === "successModal" && loadingState === "success") {
      setIsPopupOpen(true);
    } else if (popupType === "errorModal" && loadingState === "error") {
      setIsPopupOpen(true);
    }
  }, [popupType, loadingState]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[16px]"
    >
      {loadingState === "loading" && <FullScreenSpinner />}

      {/* Header / Title + Edit / Delete */}
      <div className="h-[130px] flex flex-row items-start px-6 py-[44px] gap-6">
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 mb-[14px] dark:text-white"
          >
            Event Name
            {isViewing && (
              <div
                className="cursor-pointer w-[28px] h-[28px] flex items-center justify-center rounded-[8px] bg-blue-50 p-[8px]"
                onClick={handleEditClick}
              >
                <EditIcon className="w-[12px] h-[12px] text-blue-700" />
              </div>
            )}
          </label>

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
                  className={`text-sm rounded-[8px] shadow-sm px-[14px] py-[10px] w-[556px] h-[44px] font-medium focus:outline-none focus:ring-2
                     ${
                       fieldState.error
                         ? "border border-red-500 bg-red-50 placeholder-red-400 text-gray-800 dark:bg-darkTheme dark:border-gray-800"
                         : "border border-gray-300 bg-white text-gray-500 dark:bg-darkTheme dark:border-gray-800"
                     }
                    ${isViewing ? "bg-[#F9FAFB] text-[#A0A0A0]" : ""}
                  `}
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
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 mb-[14px] dark:text-white"
          >
            Event Description
            {isViewing && (
              <div
                className="cursor-pointer w-[28px] h-[28px] flex items-center justify-center rounded-[8px] bg-blue-50 p-[8px]"
                onClick={handleEditClick}
              >
                <EditIcon className="w-[12px] h-[12px] text-blue-700" />
              </div>
            )}
          </label>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <input
                  {...field}
                  placeholder="Enter Description"
                  disabled={isViewing}
                  className="text-sm rounded-[8px] shadow-sm px-[14px] py-[10px] w-[556px] h-[44px] font-medium focus:outline-none focus:ring-2 border border-gray-300 bg-white text-gray-500 dark:bg-darkTheme dark:border-gray-800"
                />
              </div>
            )}
          />
        </div>
      </div>

      {/* Row: Event Code + Event Source Device */}
      <div className="flex gap-6 px-6">
        {/* Event Code */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-[6px] dark:text-white">
            Event Code<span className="text-red-500"> *</span>
          </label>
          <Controller
            name="code"
            control={control}
            rules={{ required: "Event code is required." }}
            render={({ field, fieldState }) => (
              <>
                <input
                  {...field}
                  placeholder="Enter event code"
                  disabled={isViewing}
                  className={`text-sm rounded-[8px] shadow-sm px-[14px] py-[10px] w-[556px] h-[44px] font-medium focus:outline-none focus:ring-2
                    ${
                      fieldState.error
                        ? "border border-red-500 bg-red-50 placeholder-red-400 text-gray-800"
                        : "border border-gray-300 bg-white text-gray-500 dark:bg-darkTheme dark:border-gray-800"
                    }
                    ${isViewing ? "bg-[#F9FAFB] text-[#A0A0A0]" : ""}
                  `}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Event Source Device */}
        <DropdownMenu<EventFormValues>
          control={control}
          name="identifier.eventSourceDevice"
          label="Event Source Device"
          options={eventSourceDeviceValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-[556px]"
          disabled={isViewing || isEditing}
          required
        />
      </div>

      {/* Row: Scheme + Status (as dropdown) */}
      <div className="flex gap-6 px-6">
        <DropdownMenu<EventFormValues>
          control={control}
          name="identifier.scheme"
          label="Scheme"
          options={schemeValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-[556px]"
          disabled={isViewing || isEditing}
          required
        />

        {/* Status dropdown */}
        <DropdownMenu<EventFormValues>
          control={control}
          name="status"
          label="Status"
          options={statusValues.map((item) => ({
            key: item.key,
            node: item.valueEn,
          }))}
          className="w-[556px]"
          disabled={isViewing}
          required
        />
      </div>

      {/* Footer Buttons */}
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

      {/* Confirm / Delete Popups */}

      <div>
        <LayoutPopup isOpen={isPopupOpen} className="w-[30%]">
          <RulesPopupJsx
            title="Event"
            isAdding={isAdding && popupType === "successModal"}
            isEditing={isEditing && popupType === "successModal"}
            isError={popupType === "errorModal"}
            errorMessage={popupMessage}
            onConfirm={() => {
              setIsPopupOpen(false);
            }}
            onCancel={() => {
              setIsPopupOpen(false);
              navigate(-1);
            }}
          />
        </LayoutPopup>
      </div>
    </form>
  );
};

export default EventsForm;
