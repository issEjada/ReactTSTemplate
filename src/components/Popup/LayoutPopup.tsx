import React from "react";

interface PopupProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}

const LayoutPopup: React.FC<PopupProps> = ({
  isOpen,
  children,
  className = "w-full",
}) => {
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
      <div className="absolute inset-0 backdrop-blur-[16px] bg-[#434C5FB2] dark:bg-gray-900/[0.788]" />

      {/* Popup Content */}
      <div
        className={`relative bg-white dark:bg-black rounded-xl shadow-2xl ${className} p-6  z-10`}
      >
        {children}
      </div>
    </div>
  );
};

export default LayoutPopup;
