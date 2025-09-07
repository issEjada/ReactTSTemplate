import React, { useEffect, useState } from "react";
import type { Value } from "../systemConfigService";
import type { FieldConfig } from "./useSystemConfigDetails";
import { validations } from "./ValidationSchema";
import PopupDropdownMenu from "./PopupDropDownsMenue";
import type { FieldError } from "../../../types/types";

const EditPenIcon = React.lazy(
  () => import("../../../assets/svg/EditPen.svg?react")
);


interface SystemConfigFormProps {
  mode: "add" | "update" | "error";
  fields: FieldConfig[];
  onSave: (values: Value) => void;
  onCancel: () => void;
  addRow: boolean;
  popupTitle: string;
}

export const SystemConfigForm = ({
  mode,
  fields,
  onSave,
  onCancel,
  addRow,
  popupTitle,
}: SystemConfigFormProps) => {
  const [fieldValues, setFieldValues] = useState<Value>({});
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<Record<string, FieldError>>(
    {}
  );
  const [, setFocusedField] = useState<string | null>(null);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [initialValues, setInitialValues] = useState<Value>({});

  useEffect(() => {
    const initialValues: Value = fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.key]: field.value,
      }),
      {} as Record<string, string | number>
    );
    setFieldValues(initialValues);
    setInitialValues(initialValues);
  }, [fields]);

  // Validate when field values change
  useEffect(() => {
    const { errors, isValid } = validateAllFields();
    setFieldErrors(errors);
    updateSaveButtonState(isValid);
  }, [fieldValues]);

  const validateAllFields = () => {
    const errors: Record<string, FieldError> = {};
    let isValid = true;

    fields.forEach((field, index) => {
      // First field is required
      if (
        index === 0 &&
        (fieldValues[field.key] === "" || fieldValues[field.key] === undefined)
      ) {
        errors[field.key] = {
          isValid: false,
          message: "This field is required",
        };
        isValid = false;
      }

      // Second field is required when addRow is false
      if (
        !addRow &&
        index === 1 &&
        (fieldValues[field.key] === "" || fieldValues[field.key] === undefined)
      ) {
        errors[field.key] = {
          isValid: false,
          message: "This field is required",
        };
        isValid = false;
      }

      if (field.key === "ip") {
        const validation = validations.ip(String(fieldValues[field.key]));
        errors[field.key] = validation;
        if (!validation.isValid) isValid = false;
      }
      if (field.key === "phoneNumber") {
        const validation = validations.phoneNumber(
          String(fieldValues[field.key])
        );
        errors[field.key] = validation;
        if (!validation.isValid) isValid = false;
      }
    });

    return { errors, isValid };
  };

  // Check if save should be disabled
  const updateSaveButtonState = (isValid: boolean) => {
    // Check if second field is empty when addRow is false
    const secondFieldEmpty =
      !addRow &&
      fields[1] &&
      (fieldValues[fields[1].key] === "" ||
        fieldValues[fields[1].key] === undefined);
    if (mode === "add") {
      // Only check first field for empty value
      const firstFieldEmpty =
        fieldValues[fields[0].key] === "" ||
        fieldValues[fields[0].key] === undefined;
      setIsSaveDisabled(firstFieldEmpty || !isValid);
    } else {
      const hasChanges = fields.some(
        (field) =>
          String(fieldValues[field.key]) !== String(initialValues[field.key])
      );
      setIsSaveDisabled(secondFieldEmpty || !hasChanges || !isValid);
    }
  };

  const handleFieldChange = (key: string, value: string | number) => {
    setFieldValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleFocus = (key: string) => {
    setFocusedField(key);
  };

  const handleBlur = (key: string) => {
    setFocusedField(null);
    if (!touchedFields[key]) {
      setTouchedFields((prev) => ({ ...prev, [key]: true }));
    }

    if (key === "ip") {
      const validation = validations.ip(String(fieldValues[key]));
      setFieldErrors((prev) => ({ ...prev, [key]: validation }));
    }

    if (key === "phoneNumber") {
      const validation = validations.phoneNumber(String(fieldValues[key]));
      setFieldErrors((prev) => ({ ...prev, [key]: validation }));
    }

    // Validate second field when addRow is false
    const secondField = fields[1];
    if (!addRow && secondField && key === secondField.key) {
      const value = String(fieldValues[key]);
      // Re-check for decimal point in case it was pasted
      if (value.includes(".")) {
        setFieldErrors((prev) => ({
          ...prev,
          [key]: {
            isValid: false,
            message: "Decimal values are not allowed",
          },
        }));
        setIsSaveDisabled(true);
      }
      // check on the negative score
      else if (secondField.label.includes("Negative") && parseInt(value) >= 0) {
        setFieldErrors((prev) => ({
          ...prev,
          [key]: {
            isValid: false,
            message: "Value must be less than 0",
          },
        }));
        setIsSaveDisabled(true);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full bg-blue-100 border border-blue-50 border-8">
        <EditPenIcon className="text-blue-700"/>
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-between pt-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {popupTitle} Config
          </h2>
        </div>
      </div>

      {fields.map((field, index) => (
        <div key={field.key} className="mb-4">
          {field.hasLov && field.options ? (
            <PopupDropdownMenu
              label={field.label}
              options={field.options}
              value={String(fieldValues[field.key])}
              onChange={(value: string) => handleFieldChange(field.key, value)}
              //   disabled={mode === "update"}
            />
          ) : (
            <>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type={
                  !addRow && index === 1
                    ? "number"
                    : typeof field.value === "number"
                    ? "number"
                    : "text"
                }
                value={fieldValues[field.key] ?? ""}
                onChange={(e) => {
                  handleFieldChange(field.key, e.target.value);
                }}
                onFocus={() => handleFocus(field.key)}
                onBlur={() => handleBlur(field.key)}
                disabled={mode === "add" ? false : field.disabled}
                className={`mt-1 block w-full p-2 border  ext-sm sm:text-base rounded-[8px] shadow-sm px-[14px] py-[10px] h-[44px] font-medium cursor-pointer dark:text-white
            focus:outline-none focus:ring-2 ${
              fieldErrors[field.key]?.isValid === false &&
              touchedFields[field.key]
                ? "border border-red-500 bg-red-50 placeholder-red-400 text-gray-800 dark:bg-darkTheme dark:border-gray-800"
                : "border border-gray-300 bg-white text-gray-500 dark:bg-darkTheme dark:border-gray-800"
            } rounded-md`}
                pattern="\d*"
                required={!addRow && index === 1}
                placeholder="Type here"
              />
              {fieldErrors[field.key]?.isValid === false &&
                touchedFields[field.key] && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors[field.key].message}
                  </p>
                )}
            </>
          )}
        </div>
      ))}
      <div className="mt-6 w-full flex justify-center gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 rounded-[8px] border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white bg-white hover:bg-gray-50 dark:bg-transparent dark:hover:bg-gray-700 shadow-sm"
        >
          Back
        </button>
        <button
          onClick={() => onSave(fieldValues)}
          disabled={isSaveDisabled ? true : false}
          className={`flex-1 px-4 py-2 rounded-[8px] bg-blue-700 text-white font-medium hover:bg-blue-800 transition-colors ${
            isSaveDisabled ? " cursor-not-allowed" : ""
          }`}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};
