import { useRef, useEffect, useState } from "react";
import ChevronDown from "../../../assets/svg/ChevronDown.svg";

interface Option {
  key: string;
  node: string;
}

interface PopupDropdownMenuProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
}

const PopupDropdownMenu = ({
  label,
  options,
  value,
  onChange,
  required = false,
  disabled = false,
  className = "w-full",
  error,
}: PopupDropdownMenuProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    if (!disabled) setOpen((prev) => !prev);
  };

  const closeDropdown = () => setOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`mb-2 ${className}`} ref={dropdownRef}>
      <div className="flex flex-col gap-[6px] relative dark:border-gray-800">
        <label className="text-sm font-medium text-gray-700 dark:text-white flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>

        {/* Dropdown Trigger */}
        <div
          className={`
            appearance-none w-full h-[44px] sm:h-[44px] px-[14px] py-[10px]
            text-sm sm:text-base border rounded-[8px] shadow-sm
            flex items-center justify-between relative dark:bg-[#121418] dark:border-gray-800
            ${
              error
                ? "border-red-500 text-red-500"
                : "border-[#D5D7DA] text-[#717680]"
            }
            ${
              disabled
                ? "bg-white text-gray-400 cursor-not-allowed"
                : "cursor-pointer dark:text-white"
            }
          `}
          onClick={toggleDropdown}
        >
          <span className="text-gray-700 dark:text-white">
            {options.find((opt) => opt.key === value)?.node || `Choose ${label}`}
          </span>
          <img
            src={ChevronDown}
            alt="Dropdown icon"
            className="w-[10px] h-5 object-contain"
          />
        </div>

        {/* Dropdown Menu */}
        {open && (
          <ul className="absolute top-full left-0 z-50 mt-[4px] w-full bg-white border border-[#D5D7DA] rounded-[8px] shadow-md overflow-y-auto max-h-60 dark:bg-[#121418] dark:border-gray-800">
            {options.map((opt) => (
              <li
                key={opt.key}
                onClick={() => {
                  onChange(opt.key);
                  closeDropdown();
                }}
                className={`
                  px-[14px] py-[10px] text-sm sm:text-base cursor-pointer dark:bg-[#121418] dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800
                  ${
                    opt.key === value
                      ? "bg-gray-100 font-medium text-blue-600"
                      : ""
                  }
                `}
              >
                {opt.node}
              </li>
            ))}
          </ul>
        )}

        {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
      </div>
    </div>
  );
};

export default PopupDropdownMenu;
