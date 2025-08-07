import React from "react";
import DropdownMenu from "../../../components/DropDown";
import { Controller } from "react-hook-form";
import type { ViewRulesFormValues } from "../RulesFilter/useRulesFilter";
import useViewScoringRules from "./useRuleForm";
import { ConditionEditor } from "../../../components/ConditionEditor/ConditionEditor";
import { useNavigate } from "react-router-dom";
import PopupLayout from "../../../components/Popup/LayoutPopup";
import RulesPopup from "./RulesPopupJsx";

const ConditionIcon = React.lazy(
  () => import("../../../assets/svg/ConditionIcon.svg?react")
);

const RuleForm = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    asapectValues,
    controlValues,
    schemeValues,
    platfromValues,
    eventSourceDeviceValues,
    screenAction,
    riskLevelValues,
    statusValues,
    ruleName,
    reset,
    parametersData,
    editorContent,
    setEditorContent,
    isAdding,
    isPopupOpen,
    isEditing,
    setIsPopupOpen,
  } = useViewScoringRules();

  // const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();

  const handleCancel = () => {
    reset(); // Clear form values
    navigate("/rules"); // Navigate back to rules table
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[16px]"
    >
      {/* Rule name editable area */}
      <div className="h-[67px] flex items-center justify-between px-6 py-5 gap-[16px]">
        <Controller
          name="name"
          control={control}
          defaultValue={ruleName ?? ""}
          rules={{ required: "Rule name is required." }}
          render={({ field, fieldState }) => (
            <div className="flex flex-col">
              <input
                {...field}
                placeholder="Rule Name"
                className={`text-sm sm:text-base rounded-[8px] shadow-sm px-[14px] py-[10px] w-[320px] h-[44px] font-medium cursor-pointer
          focus:outline-none focus:ring-2
          ${
            fieldState.error
              ? "border border-red-500 bg-red-50 placeholder-red-400 text-[#252B37]"
              : "border border-[#D5D7DA] bg-white text-[#717680] dark:bg-[#121418] dark:border-gray-800"
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

      {/* Form Body */}
      <div className="flex flex-col gap-[12px] h-[400px] w-full gap-y-[20px]">
        <div className="w-[1136px] h-[67px] flex items-center justify-between px-6 py-5 gap-[16px]">
          <DropdownMenu<ViewRulesFormValues>
            control={control}
            name="identifier.eventSourceDevice"
            label="Event Source Device"
            options={eventSourceDeviceValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-[102%]"
            disabled={
              screenAction == "view" ||
              screenAction === "edit" ||
              eventSourceDeviceValues.length === 0
            }
            required
          />

          <DropdownMenu<ViewRulesFormValues>
            control={control}
            name="identifier.scheme"
            label="Scheme"
            options={schemeValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-[102%]"
            disabled={
              screenAction == "view" ||
              screenAction === "edit" ||
              schemeValues.length === 0
            }
          />

          <DropdownMenu<ViewRulesFormValues>
            control={control}
            name="identifier.aspectCode"
            label="Aspect"
            options={asapectValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-[102%]"
            disabled={
              screenAction == "view" ||
              screenAction === "edit" ||
              asapectValues.length === 0
            }
          />
        </div>

        <div className="w-[1136px] h-[67px] flex items-center justify-between px-6 py-5 gap-[16px]">
          <DropdownMenu<ViewRulesFormValues>
            control={control}
            name="identifier.controlCode"
            label="Control"
            options={controlValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-[105%]"
            disabled={
              screenAction == "view" ||
              screenAction === "edit" ||
              controlValues.length === 0
            }
          />

          <DropdownMenu<ViewRulesFormValues>
            control={control}
            name="identifier.platform"
            label="Platform"
            options={platfromValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-[105%]"
            disabled={
              screenAction == "view" ||
              screenAction === "edit" ||
              platfromValues.length === 0
            }
          />
        </div>

        <div className="w-[1136px] h-[67px] flex items-center justify-between px-6 py-5 gap-[16px]">
          <DropdownMenu<ViewRulesFormValues>
            control={control}
            name="status"
            label="Status"
            options={statusValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-[47%]"
            disabled={screenAction == "view" || statusValues.length === 0}
          />
          <DropdownMenu<ViewRulesFormValues>
            control={control}
            name="riskLevel"
            label="Risk Level"
            options={riskLevelValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-[47%]"
            disabled={screenAction === "view" || riskLevelValues.length === 0}
          />
        </div>

        {/* Description Textarea */}
        <div className="w-[1136px] h-[154px] gap-[6px] flex flex-col px-6">
          <label
            htmlFor="description"
            className="text-sm font-medium text-[#414651] mb-[14px]"
          >
            Description
          </label>
          <Controller
            control={control}
            name="description"
            render={({ field }) => {
              const isDisabled = screenAction === "view";
              return (
                <textarea
                  {...field}
                  id="description"
                  placeholder="Enter a description..."
                  disabled={isDisabled}
                  className={`w-full h-[128px] resize-none rounded-[8px] px-[14px] py-[10px] placeholder-[#717680] shadow-[#0A0D120D] focus:outline-none ${
                    isDisabled
                      ? "border border-[#E4E7EC] bg-[#F9FAFB] text-[#A0A0A0] cursor-not-allowed"
                      : "border border-[#D5D7DA] bg-[#FFFFFF] text-[#717680]"
                  }`}
                />
              );
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pl-6 pt-6">
        <div className="flex  justify-center items-center w-6 h-6 text-center bg-blue-50 border rounded-full ">
          <ConditionIcon className="object-contain text-blue-700" />{" "}
        </div>
        <h3 className="text-[1.2rem]   ">Condition Editor</h3>
      </div>

      <ConditionEditor
        editorContent={editorContent}
        parametersData={parametersData}
        setEditorContent={setEditorContent}
      />
      {/* {isEditing && ( */}
      <div className="flex justify-end">
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-700 w-[125px] h-[48px] text-white px-5 py-3 rounded-[8px] ml-auto mt-10 hover:bg-blue-900 transition duration-100"
          >
            Save Rule
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="w-[125px] h-[48px] px-5 py-3 border font-medium rounded-[8px] ml-auto mt-10 hover:bg-gray-100 transition duration-100"
          >
            Cancel
          </button>
        </div>
      </div>
      {isPopupOpen && (
        <div>
          <PopupLayout isOpen={isPopupOpen} className="w-[30%]">
            {isAdding && (
              <RulesPopup
                isAdding
                onConfirm={() => {
                  setIsPopupOpen(false); // Close popup
                  navigate("/rules/add"); // Navigate to /rules/add
                }}
                onCancel={() => {
                  setIsPopupOpen(false); // Close popup
                  navigate("/rules"); // Navigate to /rules/add
                }}
              />
            )}
            {isEditing && (
              <RulesPopup
                isEditing
                onConfirm={() => {
                  setIsPopupOpen(false); // Close popup
                  navigate("/rules/add"); // Navigate to /rules/add
                }}
                onCancel={() => {
                  setIsPopupOpen(false); // Close popup
                  navigate("/rules"); // Navigate to /rules/add
                }}
              />
            )}
          </PopupLayout>
        </div>
      )}
    </form>
  );
};

export default RuleForm;
