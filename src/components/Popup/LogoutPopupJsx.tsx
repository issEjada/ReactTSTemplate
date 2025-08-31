import React, { useState, Suspense } from "react";
import FullScreenSpinner from "../FullScreenSpinner";

const AlertIcon = React.lazy(
  () => import(`/src/assets/svg/AlertIcon.svg?react`)
);
interface LogoutPopupProps {
  onConfirm: () => void;
  onCancel: () => void;
  dontShowPreference: boolean;
  onSetDontShowPreference: (value: boolean) => void;
}

const LogoutPopup = ({
  onConfirm,
  onCancel,
  dontShowPreference,
  onSetDontShowPreference,
}: LogoutPopupProps) => {
  const [dontShow, setDontShow] = useState(dontShowPreference);

  if (dontShowPreference) {
    return null;
  }

  const handleConfirm = () => {
    onSetDontShowPreference(dontShow);
    onConfirm();
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDontShow(e.target.checked);
  };

  return (
    <div className="flex items-start gap-4 ">
      {/* Icon */}
      <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-gray-200 border-2 border-gray-100 text-blue-700 mt-1 dark:bg-blueGray-500 dark:border-blueGray-400 dark:text-blueGray-100">
        <Suspense fallback={<FullScreenSpinner />}>
          <AlertIcon className="w-6 h-6" />
        </Suspense>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Logout
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Are you sure you want to logout?
        </p>

        {/* Bottom Section: Checkbox + Buttons in one row */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          {/* Checkbox */}
          <div className="flex items-center">
            <input
              id="dont-show"
              type="checkbox"
              className="form-checkbox h-4 w-4 rounded"
              checked={dontShow}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="dont-show"
              className="ml-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Don’t show again
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100 bg-white hover:bg-gray-50 dark:bg-transparent dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 dark:bg-blueGray-500"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
