import React, { Suspense } from "react";
import FullScreenSpinner from "../FullScreenSpinner";

const CheckIcon = React.lazy(() => import(`/src/assets/svg/Check.svg?react`));
const AlertIcon = React.lazy(
  () => import(`/src/assets/svg/AlertIcon.svg?react`)
);

interface SystemConfigProps {
  isAdding?: boolean;
  isEditing?: boolean;
  isDeleting?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onConfirm: () => void;
  onCancel: () => void;
  itemTitle?: string;
}

const SystemConfigPopup = ({
  isAdding = false,
  isEditing = false,
  isDeleting = false,
  isError = false,
  errorMessage,
  onConfirm,
  onCancel,
  itemTitle,
}: SystemConfigProps) => {
  const title = isError
    ? "Error"
    : isAdding
    ? `New ${itemTitle ? itemTitle : "Configuration"} Created`
    : isEditing
    ? "Updated Successfully"
    : isDeleting
    ? "Delete Configuration"
    : "";

  const message = isError
    ? errorMessage
    : isAdding
    ? `Congratulations, the ${
        itemTitle ? itemTitle : "configuration"
      } created successfully.`
    : isEditing
    ? `The ${
        itemTitle ? itemTitle : "configuration"
      } has been updated successfully.`
    : isDeleting
    ? "Are you sure you want to delete this configuration?"
    : "";

  const icon =
    isError || isDeleting ? (
      <Suspense fallback={<FullScreenSpinner />}>
        <AlertIcon className="w-6 h-6" />
      </Suspense>
    ) : (
      <Suspense fallback={<FullScreenSpinner />}>
        <CheckIcon className="w-6 h-6 text-success-600" />
      </Suspense>
    );
  const iconBgClass =
    isError || isDeleting
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
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{message}</p>

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
      </div>
    </div>
  );
};

export default SystemConfigPopup;
