import React, { useEffect, useState } from "react";
import type { Value } from "../systemConfigService";
import { validateNumberRange } from "./ValidationSchema";

const EditPopupIcon = React.lazy(
  () => import("../../../assets/svg/EditPopupIcon.svg?react")
);

interface ScoringDimensionFormProps {
  data: Value[];
  onSave: (values: Value[]) => void;
  onCancel: () => void;
  popupTitle: string;
}
interface FieldError {
  isValid: boolean;
  message: string;
}

export const ScoringDimensionForm = ({
  onCancel,
  data,
  onSave,
  popupTitle,
}: ScoringDimensionFormProps) => {
  const [content, setContent] = useState<Value[]>(data);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<Record<string, FieldError>>(
    {}
  );
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );

  // Validate all fields whenever content changes
  useEffect(() => {
    const allValid = content.every((item) => {
      // Check if the field is empty
      if (item.weight === "" || item.weight === undefined) {
        return false;
      }
      const validation = validateNumberRange(item.weight as string, 0, 100);
      return validation.isValid;
    });
    setIsSaveDisabled(!allValid);
  }, [content]);

  const handleInputChange = (id: string, field: string, value: string) => {
    setContent((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleBlur = (id: string) => {
    const item = content.find((i) => i.id === id);
    if (!item) return;

    setTouchedFields((prev) => ({ ...prev, [id]: true }));

    // Check if field is empty
    if (item.weight === "" || item.weight === undefined) {
      setFieldErrors((prev) => ({
        ...prev,
        [id]: {
          isValid: false,
          message: "This field is required",
        },
      }));
      return;
    }

    const validation = validateNumberRange(item.weight as string, 0, 100);
    setFieldErrors((prev) => ({ ...prev, [id]: validation }));
  };

  return (
    <div>
      <EditPopupIcon />
      <div className="mb-6">
        <div className="flex items-center justify-between pt-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {popupTitle} Config
          </h2>
        </div>
      </div>

      {content.map((item) => (
        <div key={item.id} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {item.dimension}
          </label>
          <input
            type="number"
            value={item.weight}
            onChange={(e) =>
              handleInputChange(item.id as string, "weight", e.target.value)
            }
            onBlur={() => handleBlur(item.id as string)}
            className={`mt-1 block w-full p-2 border  ext-sm sm:text-base rounded-[8px] shadow-sm px-[14px] py-[10px] h-[44px] font-medium cursor-pointer dark:text-white
            focus:outline-none focus:ring-2 ${
              fieldErrors[item.id as string]?.isValid === false &&
              touchedFields[item.id as string]
                ? "border border-red-500 bg-red-50 placeholder-red-400 text-[#252B37] dark:bg-[#121418] dark:border-gray-800"
                : "border border-[#D5D7DA] bg-white text-[#717680] dark:bg-[#121418] dark:border-gray-800"
            } rounded-md`}
            min="0"
            max="100"
            pattern="\d*"
            required
          />
          {fieldErrors[item.id as string]?.isValid === false &&
            touchedFields[item.id as string] && (
              <p className="mt-1 text-sm text-red-600">
                {fieldErrors[item.id as string].message}
              </p>
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
          onClick={() => onSave(content)}
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
