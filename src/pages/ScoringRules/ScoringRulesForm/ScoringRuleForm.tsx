import React, { useState, useEffect, useRef } from "react";
import DropdownMenu from "../../../components/DropDown";
import { Controller } from "react-hook-form";
import type { ViewScoringRulesFormValues } from "../scoringRulesServices";
import { ConditionEditor } from "../../../components/ConditionEditor/ConditionEditor";
import { useNavigate } from "react-router-dom";
import PopupLayout from "../../../components/Popup/PopupLayout";
import RulesPopupJsx from "../../../components/Popup/DynamicPopupJsx";
import useViewScoringRules from "./useScoringRuleForm";
import Spinner from "../../../components/Spinner";

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
    isEditing,
    popupType,
    popupMessage,
    loadingState,
    isFormValid,
    formValues,
  } = useViewScoringRules();

  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const previousValues = useRef({
    aspectCode: "",
    controlCode: "",
    platform: "",
    scoring_scheme: "",
    scheme: "",
    eventSourceDevice: "",
  });

  useEffect(() => {
    if (!formValues) return;

    if (!editorContent) {
      previousValues.current = {
        aspectCode: formValues.aspectCode,
        controlCode: formValues.controlCode,
        platform: formValues.platform,
        scoring_scheme: formValues.scoring_scheme || "",
        scheme: formValues.scheme || "",
        eventSourceDevice: formValues.eventSourceDevice,
      };
      return;
    }
    const hasChanged = (
      Object.keys(previousValues.current) as Array<
        keyof typeof previousValues.current
      >
    ).some((key) => {
      if (previousValues.current[key] === "") {
        return false;
      }
      return previousValues.current[key] !== formValues[key];
    });

    if (hasChanged) {
      setShowConfirmModal(true);
    }
  }, [
    formValues?.scheme,
    formValues?.scoring_scheme,
    formValues?.platform,
    formValues?.aspectCode,
    formValues?.controlCode,
    formValues?.eventSourceDevice,
  ]);

  const handleCancel = () => {
    reset();
    navigate(-1);
  };

  const handleDeleteClick = () => {
    setIsDeletePopupOpen(true);
  };

  const handleConfirmClear = () => {
    setEditorContent("");
    setShowConfirmModal(false);
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
      {loadingState === "loading" && <Spinner />}

      {showConfirmModal && (
        <PopupLayout isOpen={showConfirmModal} className="w-[30%]">
          <RulesPopupJsx
            isConfirm
            onConfirm={handleConfirmClear}
            onCancel={() => setShowConfirmModal(false)}
          />
        </PopupLayout>
      )}

      <div className="relative h-auto md:flex md:flex-row items-start px-6 pt-5 md:py-5">
        <div className="block flex-col gap-2 md:w-[352px] ">
          <label
            htmlFor="ruleName"
            className="block text-md font-medium text-gray-700 mb-2 dark:text-white"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            Rule Name
          </label>
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
                  disabled={screenAction === "view"}
                  className={`text-sm sm:text-base rounded-[8px] shadow-sm px-[14px] py-[10px] w-full h-[44px] font-medium cursor-pointer dark:text-white
            focus:outline-none focus:ring-2
            ${
              fieldState.error
                ? "border border-red-500 bg-red-50 placeholder-red-400 text-gray-800 dark:bg-darkTheme dark:border-gray-800"
                : "border border-gray-300 bg-white text-gray-500 dark:bg-darkTheme dark:border-gray-800"
            }
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
        {(screenAction === "view" || screenAction === "edit") && (
          <button
            type="button"
            onClick={handleDeleteClick}
            className="ml-auto mr-12  flex items-center gap-[4px] px-[16px] py-[10px] rounded-[8px] bg-red-600 border border-red-600 text-white font-medium text-sm hover:bg-red-700 transition duration-100"
          >
            Delete Rule
          </button>
        )}
      </div>

      <div className="relative flex flex-col md:gap-[12px] md:h-[400px] w-full md:gap-y-[20px]">
        <div className=" w-full md:w-[1136px]  md:h-[70px] flex-wrap md:flex-nowrap flex items-center justify-between px-6 md:py-5 gap-[16px]">
          <DropdownMenu<ViewScoringRulesFormValues>
            control={control}
            name="identifier.eventSourceDevice"
            label="Event Source Device"
            options={eventSourceDeviceValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-[100%]"
            disabled={
              screenAction == "view" ||
              screenAction === "edit" ||
              eventSourceDeviceValues.length === 0
            }
            required
          />

          <DropdownMenu<ViewScoringRulesFormValues>
            control={control}
            name="identifier.scheme"
            label="Scheme"
            options={schemeValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-[100%]"
            disabled={
              screenAction == "view" ||
              screenAction === "edit" ||
              schemeValues.length === 0
            }
            required
          />

          <DropdownMenu<ViewScoringRulesFormValues>
            control={control}
            name="identifier.aspectCode"
            label="Aspect"
            options={asapectValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-[100%]"
            disabled={
              screenAction == "view" ||
              screenAction === "edit" ||
              asapectValues.length === 0
            }
            required
          />
        </div>

        <div className=" w-full md:w-[1136px] md:h-[70px] flex-wrap md:flex-nowrap flex items-center justify-between px-6 py-5 gap-[16px]">
          <DropdownMenu<ViewScoringRulesFormValues>
            control={control}
            name="identifier.controlCode"
            label="Control"
            options={controlValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-[100%]"
            disabled={
              screenAction == "view" ||
              screenAction === "edit" ||
              controlValues.length === 0
            }
            required
          />

          <DropdownMenu<ViewScoringRulesFormValues>
            control={control}
            name="identifier.platform"
            label="Platform"
            options={platfromValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-[100%]"
            disabled={
              screenAction == "view" ||
              screenAction === "edit" ||
              platfromValues.length === 0
            }
            required
          />
        </div>

        <div className=" w-full md:w-[1136px]  md:h-[70px] flex-wrap md:flex-nowrap flex items-center justify-between px-6 py-5 gap-[16px]">
          <DropdownMenu<ViewScoringRulesFormValues>
            control={control}
            name="status"
            label="Status"
            options={statusValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-full md:w-[50%]"
            disabled={screenAction === "view" || statusValues.length === 0}
            required
          />
          <DropdownMenu<ViewScoringRulesFormValues>
            control={control}
            name="riskLevel"
            label="Risk Level"
            options={riskLevelValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-full md:w-[50%]"
            disabled={screenAction === "view" || riskLevelValues.length === 0}
            required
          />
        </div>

        <div className="w-full md:w-[1136px] h-[154px] gap-[6px] flex flex-col px-6">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700 mb-[6px] dark:text-white"
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
                  className={`w-full h-[128px] resize-none rounded-[8px] px-[14px] py-[10px] placeholder-gray-500 shadow-[#0A0D120D] focus:outline-none dark:bg-darkTheme dark:border-gray-800 dark:text-white ${
                    isDisabled
                      ? "border border-[#E4E7EC] bg-[#F9FAFB] text-[#A0A0A0] cursor-not-allowed"
                      : "border border-gray-300 bg-white text-gray-500"
                  }`}
                />
              );
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pl-6 pt-6">
        <div className="flex  justify-center items-center w-6 h-6 text-center bg-blue-50 border rounded-full dark:bg-darkTheme dark:border-gray-800">
          <ConditionIcon className="object-contain text-blue-700 dark:text-white" />{" "}
        </div>
        <h3 className="text-[1.2rem]">Condition Editor</h3>
      </div>

      {isFormValid ? (
        <ConditionEditor
          editorContent={editorContent}
          parametersData={parametersData}
          setEditorContent={setEditorContent}
          isReadOnly={screenAction === "view"}
        />
      ) : (
        <div className="px-6 py-4 text-red-500">
          Please complete all required fields to enable the Conditions.
          <ul className="mt-4">
            {Object.entries(formValues!).map(([field, isValid]) =>
              !isValid ? (
                <li
                  key={field}
                  className="text-sm text-red-600 list-disc list-inside"
                >
                  {field} is required.
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}

      <div className="flex justify-end pb-6 pr-[80px]">
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
            {isAdding && popupType === "successModal" && (
              <RulesPopupJsx
                title="Scoring Rule"
                isAdding
                onConfirm={() => {
                  setIsPopupOpen(false);
                  setEditorContent("");
                  reset();
                }}
                onCancel={() => {
                  setIsPopupOpen(false);
                  navigate(-1);
                }}
              />
            )}
            {isEditing && popupType === "successModal" && (
              <RulesPopupJsx
                title="Scoring Rule"
                isEditing
                onCancel={() => {
                  setIsPopupOpen(false);
                  navigate(-1);
                }}
              />
            )}
            {popupType === "errorModal" && (
              <RulesPopupJsx
                isError
                errorMessage={popupMessage}
                onConfirm={() => setIsPopupOpen(false)}
                onCancel={() => setIsPopupOpen(false)}
              />
            )}
          </PopupLayout>
        </div>
      )}
      {isDeletePopupOpen && (
        <div>
          <PopupLayout isOpen={isDeletePopupOpen} className="w-[30%]">
            <RulesPopupJsx
              title="Scoring Rule"
              isDeleting
              onConfirm={() => {
                setIsDeletePopupOpen(false);
                navigate(-1);
              }}
              onCancel={() => {
                setIsDeletePopupOpen(false);
              }}
            />
          </PopupLayout>
        </div>
      )}
    </form>
  );
};

export default RuleForm;
