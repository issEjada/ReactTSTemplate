import React, { useState, useRef, useEffect } from "react";
import ChevronDown from "../assets/svg/chevronDown.svg";
 
interface LogicDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  widthclass?: string;
}
 
const LogicDropdown: React.FC<LogicDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  widthclass = "w-full",
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
 
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  return (
    <div className={`flex flex-col gap-[6px] ${widthclass}`} ref={dropdownRef}>
      {/* Label */}
      <label className="text-sm sm:text-base font-medium text-[#414651]">
        {label}
      </label>
 
      {/* Trigger */}
      <div
        className="relative"
        onClick={() => setOpen((prev) => !prev)}
      >
        {/* Styled button mimicking native select */}
        <div className="appearance-none w-full h-[44px] sm:h-[48px] px-[14px] py-[10px] text-sm sm:text-base text-[#717680] border border-[#D5D7DA] rounded-[8px] shadow-sm bg-white flex items-center justify-between cursor-pointer">
          <span>{value || `Choose ${label}`}</span>
          <img
            src={ChevronDown}
            alt="Dropdown icon"
            className="w-[10px] h-5 object-contain"
          />
        </div>
 
        {/* Dropdown Items */}
        {open && (
          <ul className="absolute z-50 mt-[4px] w-full bg-white border border-[#D5D7DA] rounded-[8px] shadow-md  overflow-y-auto">
            {options.map((opt, i) => (
              <li
                key={i}
                onClick={() => {
                  onChange(opt);
                  setOpen(true);
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
 