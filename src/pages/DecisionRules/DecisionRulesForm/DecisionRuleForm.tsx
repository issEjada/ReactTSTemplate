import { useEffect, useState, lazy } from "react";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useViewDecisionRules } from "./useDecisionRuleForm";
import type { DecisionRulesFormValues } from "../decisionRulesServices";
import DropdownMenu from "../../../components/DropDown";
import FullScreenSpinner from "../../../components/FullScreenSpinner";
import { LoadingState } from "../../../types/types";
import { ConditionEditor } from "../../../components/ConditionEditor/ConditionEditor";
import LayoutPopup from "../../../components/Popup/LayoutPopup";
import RulesPopupJsx from "../../../components/Popup/RulesPopupJsx";

const ConditionIcon = lazy(
  () => import("../../../assets/svg/ConditionIcon.svg?react")
);
const EditIcon = lazy(() => import("../../../assets/svg/Edit.svg?react"));

const DecisionForm = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  // const previousValues = useRef({ eventSourceDevice: "", scheme: "" });
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
    reset,
  } = useViewDecisionRules();

  // Track changes for confirm clear
  // useEffect(() => {
  //   if (!editorContent) {
  //     previousValues.current = {
  //       scheme: formValues!.scheme!,
  //       eventSourceDevice: formValues!.eventSourceDevice,
  //     };
  //     return;
  //   }
  //   const hasChanged = (
  //     Object.keys(previousValues.current) as Array<
  //       keyof typeof previousValues.current
  //     >
  //   ).some((key) => {
  //     if (previousValues.current[key] === "") return false;
  //     return previousValues.current[key] !== formValues![key];
  //   });

  //   // if (isAdding && hasChanged) {
  //   //   setShowConfirmModal(true);
  //   // }
  // }, [editorContent, isAdding, formValues]);

  const handleCancel = () => {
    reset();
    navigate("/decision-rules");
  };

  const handleEditClick = () => {
    setScreenAction("edit");
  };

  const handleDeleteClick = () => {
    setIsDeletePopupOpen(true);
  };

  // const handleConfirmClear = () => {
  //   setEditorContent("");
  //   // setShowConfirmModal(false);
  // };

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
    return <FullScreenSpinner />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[16px]"
    >
      <div className="h-auto flex flex-row items-start px-6 py-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="ruleName"
            className="block text-md font-medium text-[#414651] mb-2 dark:text-white"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            Decision Rule
            {isViewing && (
              <div
                className="cursor-pointer w-[28px] h-[28px] flex items-center justify-center rounded-[16px] bg-[#EFF8FF] p-[8px] gap-[4px]"
                onClick={handleEditClick}
              >
                <EditIcon className="w-[12px] h-[12px] object-contain text-blue-700" />
              </div>
            )}
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
                  className={`text-sm sm:text-base rounded-[8px] shadow-sm px-[14px] py-[10px] w-[320px] h-[44px] font-medium focus:outline-none focus:ring-2
                    ${
                      fieldState.error
                        ? "border border-red-500 bg-red-50 placeholder-red-400 text-[#252B37]"
                        : "border border-[#D5D7DA] bg-white text-[#717680] dark:bg-[#121418] dark:border-gray-800"
                    }
                    ${
                      isViewing
                        ? "bg-[#F9FAFB] text-[#A0A0A0] cursor-not-allowed dark:text-[#A0A0A0]"
                        : ""
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

        {!isAdding && (
          <div className="flex gap-4 ml-auto mr-12">
            {!isEditing && (
              <>
                <button
                  type="button"
                  onClick={handleDeleteClick}
                  className="flex items-center gap-[4px] px-[16px] py-[10px] rounded-[8px] bg-red-600 border border-red-600 text-white font-medium text-sm hover:bg-red-700 transition duration-100"
                >
                  Delete Rule
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Dropdowns */}
      <div className="flex flex-col gap-[12px] h-[400px] w-full gap-y-[20px]">
        <div className="w-[1136px] h-[67px] flex items-center justify-between px-6 py-5 gap-[16px]">
          <div className="">
            <label
              htmlFor="criteriaName"
              className="block text-sm font-medium text-[#414651] mb-2 dark:text-white"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              Criteria Name
            </label>
            <Controller
              name="criteriaName"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <input
                  {...field}
                  placeholder="Criteria Name"
                  disabled={isViewing}
                  className={`text-sm sm:text-base rounded-[8px] shadow-sm px-[14px] py-[10px] w-[320px] h-[44px] font-medium focus:outline-none focus:ring-2
                    ${
                      fieldState.error
                        ? "border border-red-500 bg-red-50 placeholder-red-400 text-[#252B37]"
                        : "border border-[#D5D7DA] bg-white text-[#717680] dark:bg-[#121418] dark:border-gray-800"
                    }
                    ${
                      isViewing
                        ? "bg-[#F9FAFB] text-[#A0A0A0] cursor-not-allowed dark:text-[#A0A0A0]"
                        : ""
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
            options={eventNameValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-[102%]"
            disabled={isViewing || isEditing || eventNameValues.length === 0}
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
          />
        </div>

        <div className="w-[1136px] h-[67px] flex items-center px-6 py-5 gap-[16px]">
          <DropdownMenu<DecisionRulesFormValues>
            control={control}
            name="decision"
            label="Decision"
            options={decisionValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-[50%]"
            disabled={screenAction === "view" || statusValues.length === 0}
          />
          <DropdownMenu<DecisionRulesFormValues>
            control={control}
            name="eventName"
            label="Event Name"
            options={eventNameValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-[47%]"
            disabled={isViewing || isEditing || eventNameValues.length === 0}
          />
        </div>

        <div className="w-[1136px] h-[67px] flex items-center px-6 py-5 gap-[16px]">
          <DropdownMenu<DecisionRulesFormValues>
            control={control}
            name="status"
            label="Status"
            options={statusValues.map((item) => ({
              key: item.key,
              node: item.valueEn,
            }))}
            className="w-[50%]"
            disabled={screenAction === "view" || statusValues.length === 0}
          />
        </div>

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
                  className={`w-full h-[128px] resize-none rounded-[8px] px-[14px] py-[10px] placeholder-[#717680] shadow-[#0A0D120D] focus:outline-none dark:bg-[#121418] dark:border-gray-800 dark:text-white ${
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

      {/* Conditions Editor */}
      <div className="flex items-center gap-2 pl-6 pt-6">
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

      {/* Actions */}
      <div className="flex justify-end gap-4 px-6 pb-6">
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
        <LayoutPopup isOpen={isPopupOpen} className="w-[30%]">
          {isAdding && popupType === "successModal" && (
            <RulesPopupJsx
              isAdding
              onConfirm={() => {
                setIsPopupOpen(false);
                navigate("/decision-rules/add");
              }}
              onCancel={() => {
                setIsPopupOpen(false);
                navigate("/decision-rules");
              }}
            />
          )}
          {isEditing && popupType === "successModal" && (
            <RulesPopupJsx
              isEditing
              onConfirm={() => {
                setIsPopupOpen(false);
                navigate("/decision-rules");
              }}
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
              onConfirm={() => setIsPopupOpen(false)}
              onCancel={() => setIsPopupOpen(false)}
            />
          )}
        </LayoutPopup>
      )}

      {/* Delete Popup */}
      {isDeletePopupOpen && (
        <LayoutPopup isOpen={isDeletePopupOpen} className="w-[30%]">
          <RulesPopupJsx
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
        </LayoutPopup>
      )}
    </form>
  );
};

export default DecisionForm;
