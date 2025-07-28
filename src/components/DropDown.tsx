import React, { useState, useRef, useEffect } from "react";
import ChevronDown from "../assets/svg/ChevronDown.svg";

interface LogicDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  widthclass?: string;
  required?: boolean;
}

const LogicDropdown: React.FC<LogicDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  widthclass = "w-full",
  required = false,
}) => {
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const showError = required && touched && !value;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (open) {
          setTouched(true);
        }
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className={`flex flex-col gap-[6px] ${widthclass}`} ref={dropdownRef}>
      {/* Label with required asterisk */}
      <label className="text-sm sm:text-base font-medium text-[#414651] flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      {/* Trigger */}
      <div className="relative" onClick={() => setOpen((prev) => !prev)}>
        <div
          className={`appearance-none w-full h-[44px] sm:h-[48px] px-[14px] py-[10px] text-sm sm:text-base border rounded-[8px] shadow-sm bg-white flex items-center justify-between cursor-pointer ${
            showError
              ? "border-red-500 text-red-500"
              : "border-[#D5D7DA] text-[#717680]"
          }`}
        >
          <span>{value || `Choose ${label}`}</span>
          <img
            src={ChevronDown}
            alt="Dropdown icon"
            className="w-[10px] h-5 object-contain"
          />
        </div>

        {/* Options List */}
        {open && (
          <ul className="absolute z-50 mt-[4px] w-full bg-white border border-[#D5D7DA] rounded-[8px] shadow-md overflow-y-auto max-h-60">
            {options.map((opt, i) => (
              <li
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(opt);
                  setOpen(false);
                  setTouched(false);
                }}
                className={`px-[14px] py-[10px] text-sm sm:text-base cursor-pointer hover:bg-gray-100 ${
                  opt === value ? "bg-gray-100 font-medium text-blue-600" : ""
                }`}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LogicDropdown;
