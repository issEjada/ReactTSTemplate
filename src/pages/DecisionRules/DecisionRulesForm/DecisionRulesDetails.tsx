import { useEffect, useState, lazy, useRef } from "react";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useViewDecisionRules } from "./useDecisionRuleForm";
import type { DecisionRulesFormValues } from "../decisionRulesServices";
import DropdownMenu from "../../../components/DropDown";
import { LoadingState } from "../../../types/types";
import { ConditionEditor } from "../../../components/ConditionEditor/ConditionEditor";
import PopupLayout from "../../../components/Popup/PopupLayout";
import RulesPopupJsx from "../../../components/Popup/DynamicPopupJsx";
import Spinner from "../../../components/Spinner";
import DynamicView from "../../../components/DynamicView";

const ConditionIcon = lazy(
  () => import("../../../assets/svg/ConditionIcon.svg?react")
);

const DecisionRulesDetails = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const previousValues = useRef({
    eventSourceDevice: "",
    scheme: "",
  });

  const navigate = useNavigate();

  const {
    control,
    onSubmit,
    editorContent,
    handleSubmit,
    setEditorContent,
    parametersData,
    isAdding,
    isEditing,
    isViewing,
    setScreenAction,
    popupType,
    popupMessage,
    deleteDecisionRule,
    eventNameValues,
    decisionValues,
    schemeValues,
    loadingState,
    isFormValid,
    formValues,
    statusValues,
    screenAction,
    eventSourceDeviceValues,
    reset,
    ruleData,
  } = useViewDecisionRules();

  useEffect(() => {
    if (!formValues) return;

    if (!editorContent) {
      previousValues.current = {
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
  }, [formValues?.scheme, formValues?.eventSourceDevice]);

  const handleCancel = () => {
    reset();
    navigate(-1);
  };

  const handleEditClick = () => {
    setScreenAction("edit");
    if (isViewing) {
      navigate("/decision-rules/edit-rule", {
        state: { id: ruleData?.id, action: "edit" },
      });
    }
  };

  const handleConfirmClear = () => {
    setEditorContent("");
    setShowConfirmModal(false);
  };

  useEffect(() => {
    if (popupType === "successModal" && loadingState === LoadingState.Success) {
      setIsPopupOpen(true);
    } else if (
      popupType === "errorModal" &&
      loadingState === LoadingState.Error
    ) {
      setIsPopupOpen(true);
    }
  }, [popupType, loadingState]);

  if (loadingState === LoadingState.Loading && !isAdding) {
    return <Spinner />;
  }

  if (isViewing) {
    if (loadingState === LoadingState.Error || !ruleData) {
      return (
        <div className="w-full min-h-screen flex items-center justify-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Decision Rule not found or an error occurred.
          </p>
        </div>
      );
    }

    return (
      <DynamicView
        title="Decision Rule details"
        fields={[
          { title: "Rule Name", value: ruleData?.name },
          { title: "Criteria Name", value: ruleData?.criteriaName },
          {
            title: "Event Source Device",
            value: ruleData?.identifier?.eventSourceDevice,
          },
          { title: "Scheme", value: ruleData?.identifier?.scheme },
          { title: "Decision", value: ruleData?.decision },
          { title: "Event Name", value: ruleData?.eventName },
          {
            title: "Status",
            value: ruleData?.status === "ENABLED" ? "Active" : "Inactive",
          },
          { title: "Description", value: ruleData?.description },
          { title: "Condition", value: ruleData?.condition },
        ]}
        actions={[
          {
            label: "Back",
            onClick: () => handleCancel(),
            variant: "secondary",
          },
          {
            label: "Update Rule",
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
      className="flex flex-col gap-[16px]"
    >
      {showConfirmModal && (
        <PopupLayout isOpen={showConfirmModal} className="w-[30%]">
          <RulesPopupJsx
            isConfirm
            onConfirm={handleConfirmClear}
            onCancel={() => setShowConfirmModal(false)}
          />
        </PopupLayout>
      )}
      <div className="px-6 pt-8 grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-[1140px]">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="ruleName"
            className="block text-md font-medium text-gray-700 mb-1 dark:text-white"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            Decision Rule
          </label>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Rule name is required." }}
            render={({ field, fieldState }) => (
              <div className="flex flex-col">
                <input
                  {...field}
                  placeholder="Rule Name"
                  disabled={isViewing}
                  className={`text-sm sm:text-base placeholder-gray-500 text-gray-700 rounded-[8px] shadow-sm px-[14px] py-[10px]  w-full md:w-[344px]  h-[44px] cursor-pointer dark:text-white
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
      </div>

      {/* Dropdowns */}
      <div className="relative flex flex-col md:gap-[12px] md:h-[400px] w-full md:gap-y-[20px]">
        <div className=" w-full md:w-[1136px]  md:h-[70px] flex-wrap md:flex-nowrap flex items-center justify-between px-6 md:py-5 gap-[16px]">
          <div className="w-full md:w-[368px] md:h-[120px]">
            <label
              htmlFor="criteriaName"
              className="block text-sm font-medium text-gray-700 mb-[6px] mt-2 md:mt-[20.8px] dark:text-white"
            >
              Criteria Name
              {isAdding && (
                <span
                  className="text-red-500 ml-1"
                  aria-hidden="true"
                  title="Required"
                >
                  *
                </span>
              )}
            </label>
            <Controller
              name="criteriaName"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <input
                  {...field}
                  placeholder="Criteria Name"
                  disabled={screenAction === "view"}
                  className={`text-sm sm:text-base placeholder-gray-500 text-gray-700 rounded-[8px] shadow-sm px-[14px] py-[10px]  w-full md:w-[344px]  h-[44px] cursor-pointer dark:text-white
            focus:outline-none focus:ring-2
            ${
              fieldState.error
                ? "border border-red-500 bg-red-50 placeholder-red-400 text-gray-800 dark:bg-darkTheme dark:border-gray-800"
                : "border border-gray-300 bg-white text-gray-500 dark:bg-darkTheme dark:border-gray-800"
            }
               
                  `}
                />
              )}
            />
          </div>

          <DropdownMenu<DecisionRulesFormValues>
            control={control}
            name="identifier.eventSourceDevice"
            label="Event Source Device"
            options={eventSourceDeviceValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-[102%]"
            disabled={
              isViewing || isEditing || eventSourceDeviceValues.length === 0
            }
            required
          />
          <DropdownMenu<DecisionRulesFormValues>
            control={control}
            name="identifier.scheme"
            label="Scheme"
            options={schemeValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-[102%]"
            disabled={isViewing || isEditing || schemeValues.length === 0}
            required
          />
        </div>

        <div className=" w-full md:w-[1136px]  md:h-[70px] flex-wrap md:flex-nowrap flex items-center px-6 py-5 gap-[16px]">
          <DropdownMenu<DecisionRulesFormValues>
            control={control}
            name="decision"
            label="Decision"
            options={decisionValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-full md:w-[50%]"
            disabled={screenAction === "view" || statusValues.length === 0}
            required
          />
          <DropdownMenu<DecisionRulesFormValues>
            control={control}
            name="eventName"
            label="Event Name"
            options={eventNameValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-full md:w-[50%]"
            disabled={isViewing || isEditing || eventNameValues.length === 0}
            required
          />
        </div>

        <div className=" w-full md:w-[1136px]  md:h-[70px] flex-wrap md:flex-nowrap flex items-center px-6 py-5 gap-[16px]">
          <DropdownMenu<DecisionRulesFormValues>
            control={control}
            name="status"
            label="Status"
            options={statusValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-full md:w-[49.3%]"
            disabled={screenAction === "view" || statusValues.length === 0}
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
                  className={`w-full h-[128px] resize-none rounded-[8px] px-[14px] py-[10px] placeholder-gray-500 shadow-[#0A0D120D] focus:outline-none dark:bg-darkTheme dark:border-gray-800 dark:text-white  ${
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

      {/* Conditions Editor */}
      <div className="relative flex items-center gap-2 pl-6 pt-[36px]">
        <div className="flex justify-center items-center w-6 h-6 text-center bg-blue-50 border rounded-full">
          <ConditionIcon className="object-contain text-blue-700" />
        </div>
        <h3 className="text-[1.2rem]">Conditions Editor</h3>
      </div>

      {isFormValid ? (
        <ConditionEditor
          editorContent={editorContent}
          parametersData={parametersData}
          setEditorContent={setEditorContent}
          isReadOnly={isViewing}
        />
      ) : (
        <div className="relative px-6 py-4 text-red-500">
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

      {/* Actions */}
      <div className="relative flex justify-end gap-4 px-6 pb-6">
        <button
          type="submit"
          disabled={isViewing}
          className="bg-blue-700 w-[125px] h-[48px] text-white px-5 py-3 rounded-[8px] hover:bg-blue-900 transition duration-100 disabled:opacity-50"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="w-[125px] h-[48px] px-5 py-3 border font-medium rounded-[8px] hover:bg-gray-100 transition duration-100"
        >
          Cancel
        </button>
      </div>

      {/* Success / Error Popup */}
      {isPopupOpen && (
        <PopupLayout isOpen={isPopupOpen} className="w-[30%]">
          {isAdding && popupType === "successModal" && (
            <RulesPopupJsx
              title="Decision Rule"
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
              title="Decision Rule"
              isEditing
              onCancel={() => {
                setIsPopupOpen(false);
                navigate("/decision-rules");
              }}
            />
          )}
          {popupType === "errorModal" && (
            <RulesPopupJsx
              isError
              errorMessage={popupMessage}
              onCancel={() => setIsPopupOpen(false)}
            />
          )}
        </PopupLayout>
      )}

      {/* Delete Popup */}
      {isDeletePopupOpen && (
        <PopupLayout isOpen={isDeletePopupOpen} className="w-[30%]">
          <RulesPopupJsx
            title="Decision Rule"
            isDeleting
            onConfirm={() => {
              setIsDeletePopupOpen(false);
              deleteDecisionRule();
              navigate("/decision-rules");
            }}
            onCancel={() => {
              setIsDeletePopupOpen(false);
            }}
          />
        </PopupLayout>
      )}
    </form>
  );
};

export default DecisionRulesDetails;
