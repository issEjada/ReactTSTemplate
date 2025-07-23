import React from "react";

interface PopupProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const GeneralPopup: React.FC<PopupProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    // The backdrop overlay
    <div className="m-0 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[16px] bg-[#434C5FB2]">
      {/* The popup modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-[544px]">
        {/* Close Button */}

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default GeneralPopup;
