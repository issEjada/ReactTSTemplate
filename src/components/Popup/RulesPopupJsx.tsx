import React from "react";
const CheckIcon = React.lazy(() => import(`/src/assets/svg/Check.svg?react`));
const AlertIcon = React.lazy(
  () => import(`/src/assets/svg/AlertIcon.svg?react`)
);

const AlerTraingletIcon = React.lazy(
  () => import(`/src/assets/svg/alert-triangle.svg?react`)
);

interface RulesPopupProps {
  isAdding?: boolean;
  isEditing?: boolean;
  isDeleting?: boolean;
  isError?: boolean;
  isConfirm?: boolean;
  errorMessage?: string | ApiError;
  onConfirm: () => void;
  onCancel: () => void;
}

interface ApiError {
  message?: string;
  descriptionEn?: string;
}

const RulesPopupJsx = ({
  isAdding = false,
  isEditing = false,
  isDeleting = false,
  isError = false,
  isConfirm,
  errorMessage,
  onConfirm,
  onCancel,
}: RulesPopupProps) => {
  const title = isError
    ? "Error"
    : isAdding
    ? "New Rule Created"
    : isEditing
    ? "Updated Successfully"
    : isDeleting
    ? "Delete Scoring Rule?"
    : isConfirm
    ? "Critical Change"
    : "";

  const message = isError
    ? typeof errorMessage === "object" && errorMessage !== null
      ? `${(errorMessage as ApiError).message || ""}${
          (errorMessage as ApiError).descriptionEn
            ? `\n${(errorMessage as ApiError).descriptionEn}`
            : ""
        }`
      : String(errorMessage)
    : isAdding
    ? "Congratulations, your new rule is created successfully."
    : isEditing
    ? "The scoring rule details has been updated successfully."
    : isDeleting
    ? "Are you sure you want to delete this scoring rule?"
    : isConfirm
    ? "Changing this option will clear the Conditions Editor. \nDo you wont to Proceed ?"
    : "";

  const icon = isConfirm ? (
    <AlerTraingletIcon className="w-6 h-6" />
  ) : isError || isDeleting ? (
    <AlertIcon className="w-6 h-6" />
  ) : (
    <CheckIcon className="w-6 h-6" />
  );
  const iconBgClass =
    isError || isDeleting || isConfirm
      ? "bg-red-100 text-red-600"
      : "bg-green-100 text-green-600";

  return (
    <div className="flex flex-col items-center text-center">
      {/* Icon */}
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 ${iconBgClass}`}
      >
        {icon}
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 whitespace-pre-wrap">
        {message}
      </p>

      {/* Buttons */}
      <div className="mt-6 w-full flex justify-center gap-3">
        {/* If adding: show Back + Create New Rule buttons */}
        {isAdding && !isError && (
          <>
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 rounded-[8px] border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white bg-white hover:bg-gray-50 dark:bg-transparent dark:hover:bg-gray-700 shadow-sm"
            >
              Back
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 rounded-[8px] bg-blue-700 text-white font-medium hover:bg-blue-800 transition-colors"
            >
              Create New Rule
            </button>
          </>
        )}

        {(isEditing || isError) && (
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-[8px] border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white bg-white hover:bg-gray-50 dark:bg-transparent dark:hover:bg-gray-700 shadow-sm"
          >
            Back
          </button>
        )}

        {isDeleting && (
          <>
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 rounded-[8px] border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white bg-white hover:bg-gray-50 dark:bg-transparent dark:hover:bg-gray-700 shadow-sm"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-800 rounded-[8px] text-white font-medium hover:bg-red-700 transition-colors"
            >
              Confirm Delete
            </button>
          </>
        )}

        {isConfirm && (
          <>
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 rounded-[8px] border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white bg-white hover:bg-gray-50 dark:bg-transparent dark:hover:bg-gray-700 shadow-sm"
            >
              Discard
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-800 rounded-[8px] text-white font-medium hover:bg-red-700 transition-colors"
            >
              Confirm
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RulesPopupJsx;
