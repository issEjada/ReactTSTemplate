import React, { useState } from "react";
import Edit from "../../../assets/svg/Edit.svg";
import Ignore from "../../../assets/svg/ignore.svg";
import Submit from "../../../assets/svg/Submit.svg";
import DropdownMenu from "../../../components/DropDown";
import { Controller } from "react-hook-form";
import type { ViewRulesFormValues } from "../RulesFilter/useRulesFilter";
import useViewScoringRules from "./useRuleForm";
import { ConditionEditor } from "../../../components/ConditionEditor/ConditionEditor";
import { useNavigate } from "react-router-dom";

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

    // isAdding,
  } = useViewScoringRules();

  const [draftName, setDraftName] = useState(ruleName ?? "New Rule Name");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSaveName = () => {
    if (!draftName.trim()) {
      setError(true);
      return;
    }
    setDraftName(draftName);
    setIsEditing(false);
    setError(false);
  };

  const handleCancelName = () => {
    setIsEditing(false);
    setError(false);
  };

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
        <div className="flex items-center gap-2 h-[28px]">
          {isEditing ? (
            <>
              <div className="flex flex-col relative">
                <input
                  value={draftName}
                  onChange={(e) => {
                    setDraftName(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="New Rule Name.."
                  className={`w-[320px] h-[44px] font-medium text-[#252B37] rounded-[8px] px-[14px] py-[10px] focus:outline-none ${
                    error
                      ? "border border-red-500 bg-red-50 placeholder-red-400"
                      : "border border-[#2E90FA] bg-[#EFF8FF]"
                  }`}
                />
              </div>
              <button
                type="button"
                className="w-[48px] h-[44px] flex items-center justify-center rounded-[8px] bg-[#12B76A] border border-[#12B76A]"
                onClick={handleSaveName}
              >
                <img
                  src={Submit}
                  alt="Save"
                  className="w-[13.33px] h-[9.17px] object-contain"
                />
              </button>

              <button
                type="button"
                className="w-[48px] h-[44px] flex items-center justify-center rounded-[8px] bg-[#F04438] border border-[#F04438]"
                onClick={handleCancelName}
              >
                <img
                  src={Ignore}
                  alt="Cancel"
                  className="w-[10px] h-[10px] object-contain"
                />
              </button>
            </>
          ) : (
            <>
              <h1 className="font-medium text-[#181D27]">
                {ruleName?.trim() || "New Rule Name"}
              </h1>

              {screenAction !== "view" && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="w-[28px] h-[28px] flex items-center justify-center rounded-[16px] bg-[#EFF8FF] p-[8px] gap-[4px]"
                >
                  <img
                    src={Edit}
                    alt="Edit"
                    className="w-[12px] h-[12px] object-contain"
                  />
                </button>
              )}
            </>
          )}
        </div>
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
            className="w-[95%]"
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
            className="w-[95%]"
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
            className="w-[95%]"
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
            className="w-[95%]"
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
            className="w-[95%]"
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
      {/* )} */}
    </form>
  );
};

export default RuleForm;
