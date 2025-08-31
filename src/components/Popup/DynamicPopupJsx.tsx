import React, { Suspense } from "react";
import FullScreenSpinner from "../FullScreenSpinner";

const CheckIcon = React.lazy(() => import(`/src/assets/svg/Check.svg?react`));
const AlertIcon = React.lazy(
  () => import(`/src/assets/svg/AlertIcon.svg?react`)
);

const AlertTraingletIcon = React.lazy(
  () => import(`/src/assets/svg/ActiveAlerts.svg?react`)
);

interface RulesPopupProps {
  isAdding?: boolean;
  isEditing?: boolean;
  isDeleting?: boolean;
  isError?: boolean;
  isConfirm?: boolean;
  errorMessage?: string | ApiError;
  title?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ApiError {
  message?: string;
  descriptionEn?: string;
}

const DynamicPopupJsx = ({
  isAdding = false,
  isEditing = false,
  isDeleting = false,
  isError = false,
  isConfirm,
  errorMessage,
  title: propTitle,
  onConfirm,
  onCancel,
}: RulesPopupProps) => {
  const title = isError
    ? "Error"
    : isAdding
    ? `New ${propTitle} Created`
    : isEditing
    ? `Updated ${propTitle} Successfully`
    : isDeleting
    ? `Delete ${propTitle}?`
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
    ? `Congratulations, your new ${propTitle} is created successfully.`
    : isEditing
    ? `The ${propTitle} details have been updated successfully.`
    : isDeleting
    ? `Are you sure you want to delete this ${propTitle}?`
    : isConfirm
    ? "Changing this option will clear the Conditions Editor. \nDo you wont to Proceed?"
    : "";

  const icon = isConfirm ? (
    <Suspense fallback={<FullScreenSpinner />}>
      <AlertTraingletIcon className="w-5 h-5" />
    </Suspense>
  ) : isError || isDeleting ? (
    <Suspense fallback={<FullScreenSpinner />}>
      <AlertIcon className="w-5 h-5" />
    </Suspense>
  ) : (
    <Suspense fallback={<FullScreenSpinner />}>
      <CheckIcon className="w-5 h-5 text-success-600" />
    </Suspense>
  );
  const iconBgClass = isConfirm
    ? "bg-warning-100 border-8 border-warning-50 text-warning-600"
    : isError || isDeleting
    ? "bg-red-100 text-red-600 border-8 border-red-50"
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
              onClick={(e) => {
                e.stopPropagation();
                onCancel?.();
              }}
              className="flex-1 px-4 py-2 rounded-[8px] border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white bg-white hover:bg-gray-50 dark:bg-transparent dark:hover:bg-gray-700 shadow-sm"
            >
              Back
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onConfirm?.();
              }}
              className="flex-1 px-4 py-2 rounded-[8px] bg-blue-700 text-white font-medium hover:bg-blue-800 transition-colors"
            >
              Create New Rule
            </button>
          </>
        )}

        {(isEditing || isError) && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCancel?.();
            }}
            className="px-6 py-2 rounded-[8px] border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white bg-white hover:bg-gray-50 dark:bg-transparent dark:hover:bg-gray-700 shadow-sm"
          >
            Back
          </button>
        )}

        {isDeleting && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCancel?.();
              }}
              className="flex-1 px-4 py-2 rounded-[8px] border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white bg-white hover:bg-gray-50 dark:bg-transparent dark:hover:bg-gray-700 shadow-sm"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onConfirm?.();
              }}
              className="flex-1 px-4 py-2 bg-red-800 rounded-[8px] text-white font-medium hover:bg-red-700 transition-colors"
            >
              Confirm Delete
            </button>
          </>
        )}

        {isConfirm && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCancel?.();
              }}
              className="flex-1 px-4 py-2 rounded-[8px] border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white bg-white hover:bg-gray-50 dark:bg-transparent dark:hover:bg-gray-700 shadow-sm"
            >
              Discard
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onConfirm?.();
              }}
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

export default DynamicPopupJsx;
