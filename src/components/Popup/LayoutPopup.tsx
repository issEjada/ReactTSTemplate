import React from "react";

interface PopupProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const LayoutPopup: React.FC<PopupProps> = ({ isOpen, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center 
        transition-opacity duration-300
        ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 backdrop-blur-[16px] bg-[#434C5FB2] dark:bg-[#181D27C9]" />

      {/* Popup Content */}
      <div className="relative bg-white dark:bg-black rounded-xl shadow-2xl p-6 w-[544px] z-10">
        {children}
      </div>
    </div>
  );
};

export default LayoutPopup;
