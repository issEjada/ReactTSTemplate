import { useState, lazy } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../../../components/DropDown";
import LayoutPopup from "../../../components/Popup/LayoutPopup";
import RulesPopupJsx from "../../../components/Popup/RulesPopupJsx";

const EditIcon = lazy(() => import("../../../assets/svg/Edit.svg?react"));

type EventFormValues = {
  name: string;
  eventSourceDevice: string;
  scheme: string;
  description: string;
};

const EventsForm = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding] = useState(true);

  const { control, handleSubmit, reset } = useForm<EventFormValues>({
    defaultValues: {
      name: "",
      eventSourceDevice: "",
      scheme: "",
      description: "",
    },
  });

  const eventSourceDeviceValues = [
    { key: "MOBILE", valueEn: "Mobile App" },
    { key: "WEB", valueEn: "Web App" },
    { key: "BACKEND", valueEn: "Backend Service" },
  ];
  const schemeValues = [
    { key: "KYC", valueEn: "KYC" },
    { key: "AML", valueEn: "AML" },
    { key: "TX", valueEn: "Transaction Monitoring" },
  ];

  const onSubmit = (data: EventFormValues) => {
    console.log("Submitted Event:", data);
    setIsPopupOpen(true);
  };

  const handleCancel = () => {
    reset();
    navigate("/events");
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setIsViewing(false);
  };

  const handleDeleteClick = () => {
    setIsDeletePopupOpen(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[16px]"
    >
      <div className="h-auto flex flex-row items-start px-6 py-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-md font-medium text-[#414651] mb-2 dark:text-white flex items-center gap-2"
          >
            New Event Name
            {isViewing && (
              <div
                className="cursor-pointer w-[28px] h-[28px] flex items-center justify-center rounded-[16px] bg-[#EFF8FF] p-[8px]"
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
                  className={`text-sm rounded-[8px] shadow-sm px-[14px] py-[10px] w-[320px] h-[44px] font-medium focus:outline-none focus:ring-2
                    ${
                      fieldState.error
                        ? "border border-red-500 bg-red-50 placeholder-red-400 text-[#252B37]"
                        : "border border-[#D5D7DA] bg-white text-[#717680] dark:bg-[#121418] dark:border-gray-800"
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

        {!isAdding && (
          <div className="flex gap-4 ml-auto mr-12">
            {!isEditing && (
              <button
                type="button"
                onClick={handleDeleteClick}
                className="flex items-center gap-[4px] px-[16px] py-[10px] rounded-[8px] bg-red-600 text-white font-medium text-sm hover:bg-red-700"
              >
                Delete Event
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-6 px-6">
        <DropdownMenu<EventFormValues>
          control={control}
          name="eventSourceDevice"
          label="Event Source Device"
          options={eventSourceDeviceValues.map((i) => ({
            key: i.key,
            node: i.valueEn,
          }))}
          disabled={isViewing || isEditing}
          required
        />
        <DropdownMenu<EventFormValues>
          control={control}
          name="scheme"
          label="Scheme"
          options={schemeValues.map((i) => ({
            key: i.key,
            node: i.valueEn,
          }))}
          disabled={isViewing || isEditing}
          required
        />
      </div>

      <div className="flex flex-col px-6">
        <label
          htmlFor="description"
          className="text-sm font-medium text-[#414651] mb-[6px] dark:text-white"
        >
          Description
        </label>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <textarea
              {...field}
              id="description"
              placeholder="Enter a description..."
              disabled={isViewing}
              className={`w-full h-[128px] resize-none rounded-[8px] px-[14px] py-[10px] placeholder-[#717680] shadow focus:outline-none dark:bg-[#121418] dark:border-gray-800 dark:text-white ${
                isViewing
                  ? "border border-[#E4E7EC] bg-[#F9FAFB] text-[#A0A0A0]"
                  : "border border-[#D5D7DA] bg-[#FFFFFF] text-[#717680]"
              }`}
            />
          )}
        />
      </div>

      <div className="flex justify-end gap-4 px-6 pb-6">
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

      {isPopupOpen && (
        <LayoutPopup isOpen={isPopupOpen} className="w-[30%]">
          <RulesPopupJsx
            isAdding={isAdding}
            isEditing={isEditing}
            onConfirm={() => {
              setIsPopupOpen(false);
              navigate("/EventsManagement");
            }}
            onCancel={() => setIsPopupOpen(false)}
          />
        </LayoutPopup>
      )}

      {isDeletePopupOpen && (
        <LayoutPopup isOpen={isDeletePopupOpen} className="w-[30%]">
          <RulesPopupJsx
            isDeleting
            onConfirm={() => {
              setIsDeletePopupOpen(false);
              console.log("Deleted event");
              navigate("/EventsManagement");
            }}
            onCancel={() => setIsDeletePopupOpen(false)}
          />
        </LayoutPopup>
      )}
    </form>
  );
};

export default EventsForm;
