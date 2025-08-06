import React from "react";
const CheckIcon = React.lazy(
  () => import(`/src/assets/svg/Check.svg?react`) // Green check icon
);

interface RulesPopupProps {
  isAdding?: boolean; // true if adding mode
  isEditing?: boolean; // true if editing mode
  onConfirm: () => void; // For "Create New Rule" button in add mode
  onCancel: () => void; // For "Back" button
}

const RulesPopupJsx = ({
  isAdding = false,
  isEditing = false,
  onConfirm,
  onCancel,
}: RulesPopupProps) => {
  // Determine what to show
  const title = isAdding
    ? "New Rule Created"
    : isEditing
    ? "Successfully Edited"
    : "";

  const message = isAdding
    ? "Congratulations, your new rule is created successfully."
    : isEditing
    ? "The scoring rule details has been successfully edited."
    : "";

  return (
    <div className="flex flex-col items-center text-center">
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
        <CheckIcon className="w-6 h-6" />
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
        {isAdding && (
          <>
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white bg-white hover:bg-gray-50 dark:bg-transparent dark:hover:bg-gray-700 shadow-sm"
            >
              Back
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 rounded-md bg-blue-700 text-white font-medium hover:bg-blue-800 transition-colors"
            >
              Create New Rule
            </button>
          </>
        )}

        {/* If editing: show only Back button */}
        {isEditing && (
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white bg-white hover:bg-gray-50 dark:bg-transparent dark:hover:bg-gray-700 shadow-sm"
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
};

export default RulesPopupJsx;
