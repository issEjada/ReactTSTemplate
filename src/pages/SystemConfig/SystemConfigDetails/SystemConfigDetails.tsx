import React, { Suspense, useMemo } from "react";
import {
  useSystemConfigDetails,
  type FieldConfig,
} from "./useSystemConfigDetails";
import { DynamicTable } from "../../../components/DynamicTable";
import type { ColumnDef } from "@tanstack/react-table";
import type { Attribute } from "../systemConfigService";
import FullScreenSpinner from "../../../components/FullScreenSpinner";
import { useNavigate } from "react-router-dom";
import PopupLayout from "../../../components/Popup/LayoutPopup";
import SystemConfigPopup from "../../../components/Popup/SystemConfigPopup";
import { SystemConfigForm } from "./SystemConfigForm";
import { ScoringDimensionForm } from "./ScoringDimensionForm";

const EditIcon = React.lazy(() => import("../../../assets/svg/Edit.svg?react"));
const DeleteIcon = React.lazy(
  () => import("../../../assets/svg/recycleBin.svg?react")
);

const LockIcon = React.lazy(
  () => import("../../../assets/svg/settings.svg?react")
);
const BackgroundCircle = React.lazy(
  () => import("../../../assets/svg/BackgroundCircle.svg?react")
);

const PlusBorderIcon = React.lazy(
  () => import("../../../assets/svg/PlusBorderIcon.svg?react")
);

export const SystemConfigDetails = () => {
  const {
    totalCount,
    data,
    loadingState,
    error,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    attributes,
    rowProps,
    setIsDeletePopupOpen,
    isDeletePopupOpen,
    handleCancelDelete,
    handleConfirmDelete,
    setItemToDelete,
    configDesc,
    setConfigDesc,
    handleAddConfirm,
    isPopupOpen,
    popupFields,
    popupMode,
    setIsPopupOpen,
    setPopupFields,
    setPopupMode,
    handleSave,
    dropDownOptions,
    isSuccessPopupOpen,
    setIsSuccessPopupOpen,
    handleDescriptionUpdate,
    handleUpdateScoring,
    setData,
    setIsScoringPopupOpen,
    isScoringPopupOPen,
    setError,
  } = useSystemConfigDetails();

  const columns = useMemo(
    () =>
      getColumns(
        attributes ?? [],
        rowProps.allowAddRow,
        dropDownOptions ?? [],
        setItemToDelete,
        setIsDeletePopupOpen,
        setPopupFields,
        setPopupMode,
        setIsPopupOpen
      ),
    [attributes, dropDownOptions]
  );

  const navigate = useNavigate();
  if (loadingState === "loading") {
    return <FullScreenSpinner />;
  }

  return (
    <div className="p-6 bg-white shadow-sm dark:bg-black flex flex-col">
      <div className="mb-7">
        <div className="flex items-center pt-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {rowProps.name}
          </h2>
          <div className="ml-2 text-blue-50 bg-blue-100 px-1 py-1 rounded-full">
            <EditIcon className="sm:w-[15px] sm:h-[15px] text-blue-700" />
          </div>
        </div>
      </div>

      <div className="w-full h-[154px] gap-[6px] flex flex-col">
        <label
          htmlFor="description"
          className="text-sm font-medium text-[#414651] mb-[6px] dark:text-white"
        >
          Configuration Description
        </label>
        <textarea
          id="description"
          placeholder="Enter a description..."
          value={configDesc}
          onChange={(e) => setConfigDesc(e.target.value)}
          disabled={false}
          className={`w-full h-[128px] resize-none rounded-[8px] px-[14px] py-[10px] placeholder-[#717680] shadow-[#0A0D120D] focus:outline-none dark:bg-[#121418] dark:border-gray-800 dark:text-white ${
            false
              ? "border border-[#E4E7EC] bg-[#F9FAFB] text-[#A0A0A0] cursor-not-allowed"
              : "border border-[#D5D7DA] bg-[#FFFFFF] text-[#717680]"
          }`}
        />
      </div>

      <button
        type="button"
        onClick={() => handleDescriptionUpdate(configDesc)}
        disabled={configDesc === rowProps.desc}
        className={`my-7 self-end w-[150px] h-10 bg-blue-700 text-white px-4 border border-blue-700 rounded-[8px] text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-blue-800
            ${configDesc === rowProps.desc ? " cursor-not-allowed" : ""}`}
      >
        Save Changes
      </button>

      <div className="my-7 flex flex-row justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            {rowProps.name} Configurations
          </h2>
        </div>

        {rowProps.name === "Scoring Dimensions Weights" ? (
          <button
            type="button"
            onClick={handleUpdateScoring}
            className=" h-10 border border-[#D5D7DA] rounded-[8px] px-4 text-[#414651] text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 dark:text-white dark:hover:text-black"
          >
            <Suspense>
              <EditIcon className="w-4 h-4" />
            </Suspense>
            Update Dimantions
          </button>
        ) : (
          rowProps.allowAddRow && (
            <button
              type="button"
              onClick={handleAddConfirm}
              className=" h-10 border border-[#D5D7DA] rounded-[8px] px-4 text-[#414651] text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 dark:text-white dark:hover:text-black"
            >
              <Suspense>
                <PlusBorderIcon className="w-4 h-4" />
              </Suspense>
              {attributes ? `Add ${attributes[0]?.name}` : "Add New Item"}
            </button>
          )
        )}
      </div>

      {totalCount === 0 ? (
        <div className="w-full h-[75vh] flex flex-col items-center justify-center rounded-md border">
          {/* Wrapper for icon + background */}
          <div className="relative flex items-center justify-center mb-6 w-[80px] h-[80px]">
            {/* Background Circle positioned behind */}
            <div className="absolute z-0 w-[80px] h-[80px] flex items-center justify-center">
              <BackgroundCircle
                className="
                        absolute
                        left-1/2 top-[28%]
                        -translate-x-1/2 -translate-y-1/2
                        w-[400px] sm:w-[400px] md:w-[400px] lg:w-[400px]
                        h-[400px]
                        pointer-events-none select-none
                        z-0
                      "
              />
            </div>

            {/* Lock Icon in styled border */}
            <div className="relative z-10 flex items-center justify-center bg-white border border-[#D5D7DA] rounded-[16px] gap-[8px] p-[4px]">
              <div className="flex items-center justify-center bg-white border border-black/10 rounded-[12px] sm:w-[52px] sm:h-[52px] p-[12px] shadow-[0px_1px_2px_0px_#0000001A,0px_3px_3px_0px_#00000017]">
                <LockIcon className="sm:w-[28px] sm:h-[28px]" />
              </div>
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="text-lg font-medium text-gray-900 mb-1 mt-[48px] dark:text-white">
            You don’t have any {rowProps.name} yet
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            You don’t have any {rowProps.name} added yet.
          </p>
        </div>
      ) : (
        <DynamicTable<{ [key: string]: any }>
          data={(data ?? []).map((value) => {
            const row: { [key: string]: any } = { id: value.id };
            Object.keys(value).forEach((key) => {
              if (key !== "id") {
                row[key] = value[key];
              }
            });
            return row;
          })}
          columns={columns}
          totalCount={totalCount}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          title="System configurations"
          error={error}
          searchPlaceholder="Search"
        />
      )}

      <div className="w-full flex flex-row gap-3 pt-6 justify-end">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={`${"w-[100px]"} h-10 border border-[#D5D7DA] rounded-[8px] px-4 text-[#414651] text-[14px] font-semibold flex items-center justify-center hover:bg-gray-100 dark:text-white dark:hover:text-black`}
        >
          Back
        </button>
      </div>

      <PopupLayout
        isOpen={isDeletePopupOpen}
        className="md:w-[30%] lg:w-[35%] w-[90%]"
      >
        <SystemConfigPopup
          itemTitle={rowProps.name}
          isDeleting={true}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </PopupLayout>

      <PopupLayout
        isOpen={isPopupOpen}
        className="md:w-[30%] lg:w-[35%] w-[90%]"
      >
        <SystemConfigForm
          mode={popupMode}
          fields={popupFields}
          popupTitle={rowProps.name}
          onSave={handleSave}
          onCancel={() => setIsPopupOpen(false)}
          addRow={rowProps.allowAddRow}
        />
      </PopupLayout>

      <PopupLayout
        isOpen={isScoringPopupOPen}
        className="md:w-[30%] lg:w-[35%] w-[90%]"
      >
        <ScoringDimensionForm
          popupTitle={rowProps.name}
          content={data}
          setContent={setData}
          onSave={handleSave}
          onCancel={() => setIsScoringPopupOpen(false)}
        />
      </PopupLayout>

      <PopupLayout
        isOpen={isSuccessPopupOpen}
        className="md:w-[30%] lg:w-[35%] w-[90%]"
      >
        <SystemConfigPopup
          itemTitle={rowProps.name}
          isAdding={popupMode === "add" ? true : false}
          isEditing={popupMode === "update" ? true : false}
          isError={popupMode === "error" ? true : false}
          errorMessage={error ? error : ""}
          onConfirm={() => {
            if (popupMode === "error") {
              setPopupMode("update");
              setError(null);
            } else {
              setIsPopupOpen(false)
              setIsSuccessPopupOpen(false);
              handleAddConfirm();
            }
          }}
          onCancel={() => {
            setIsSuccessPopupOpen(false);
            setPopupMode("update");
            setError(null);
          }}
        />
      </PopupLayout>
    </div>
  );
};

const getColumns = (
  attributes: Attribute[],
  allowAddRow: boolean,
  dropDownOptions: { key: string; node: string }[],
  setItemToDelete: React.Dispatch<React.SetStateAction<string | null>>,
  setIsDeletePopupOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setPopupFields: React.Dispatch<React.SetStateAction<FieldConfig[]>>,
  setPopupMode: React.Dispatch<
    React.SetStateAction<"add" | "update" | "error">
  >,
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<{ [key: string]: any }>[] => {
  if (!attributes.length) return [];

  const dynamicColumns = attributes.map((attribute) => ({
    header: attribute.name,
    accessorKey: attribute.key,
    cell: (row: any) => {
      const node = row.cell.getValue() as string;
      const displayValue = attribute.hasLov
        ? dropDownOptions.find((option) => option.key === node)?.node || node
        : node;
      return (
        <span className="font-medium text-gray-900  dark:text-white">
          {displayValue}
        </span>
      );
    },
  }));

  // to disappear edit icon in every row in scoring dimension screen
  if (attributes[0].name !== "Dimension") {
    const threeDotsMenuColumn = {
      header: "",
      accessorKey: "action",
      cell: (row: any) => {
        const rowData = row.row.original;

        return (
          <div className="flex flex-row">
            {allowAddRow ? (
              <>
                <EditIcon
                  onClick={() => {
                    const fields = attributes.map((attr) => ({
                      id: rowData.id,
                      label: attr.name,
                      key: attr.key,
                      value: rowData[attr.key] || "",
                      hasLov: attr.hasLov,
                      options: attr.hasLov ? dropDownOptions : undefined,
                      disabled: !attr.editable,
                    }));
                    setPopupFields(fields);
                    setPopupMode("update");
                    setIsPopupOpen(true);
                  }}
                  className="sm:w-[20px] sm:h-[20px] text-[#A4A7AE] mr-5"
                />
                <DeleteIcon
                  onClick={() => {
                    setItemToDelete(rowData.id);
                    setIsDeletePopupOpen(true);
                  }}
                  className="sm:w-[20px] sm:h-[20px] text-[#A4A7AE] ml-5"
                />
              </>
            ) : (
              <>
                <EditIcon
                  onClick={() => {
                    const fields = attributes.map((attr) => ({
                      id: rowData.id,
                      label: attr.name,
                      key: attr.key,
                      value: rowData[attr.key] || "",
                      disabled: !attr.editable,
                    }));
                    setPopupFields(fields);
                    setPopupMode("update");
                    setIsPopupOpen(true);
                  }}
                  className="sm:w-[20px] sm:h-[20px] text-[#A4A7AE] mr-5"
                />
                {/* show Update Pop  */}
              </>
            )}
          </div>
        );
      },
    };
    return [...dynamicColumns, threeDotsMenuColumn];
  }

  return dynamicColumns;
};
