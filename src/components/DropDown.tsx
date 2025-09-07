import React, { useRef, useEffect, useState, Suspense } from "react";
import { Controller } from "react-hook-form";
import type { Path, Control, FieldValues } from "react-hook-form";
const ChevronDown = React.lazy(
  () => import("../assets/svg/ChevronDown.svg?react")
);
import type { Option } from "../types/types";
import Spinner from "./Spinner";

interface DropdownMenuProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

const DropdownMenu = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  required = false,
  disabled = false,
  className = "w-full",
}: DropdownMenuProps<T>) => {
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
      <Controller
        name={name}
        control={control}
        defaultValue={"" as unknown as T[keyof T]}
        render={({ field, fieldState }) => {
          const { onChange, value } = field;
          const { error } = fieldState;

          return (
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
                  flex items-center justify-between relative dark:bg-darkTheme dark:border-gray-800
                  ${
                    error
                      ? "border-red-500 text-red-500"
                      : "border-gray-300 text-gray-500"
                  }
                  ${
                    disabled
                      ? "text-gray-700 cursor-not-allowed"
                      : "cursor-pointer dark:text-white"
                  }
                `}
                onClick={toggleDropdown}
              >
                <span
                  className={` 
                    ${
                      disabled
                        ? "text-gray-400 cursor-not-allowed"
                        : "cursor-pointer dark:text-white"
                    }
                  
                  `}
                >
                  {options.find((opt) => opt.key === value)?.node ||
                    `Choose ${label}`}
                </span>
                <Suspense fallback={<Spinner mode="inline" size="sm" />}>
                  <ChevronDown className="w-[10px] h-5 object-contain text-gray-500" />
                </Suspense>
              </div>

              {/* Dropdown Menu */}
              {open && (
                <ul className="absolute top-full left-0 z-50 mt-[4px] w-full bg-white border border-gray-300 rounded-[8px] shadow-md overflow-y-auto max-h-60 dark:bg-darkTheme dark:border-gray-800">
                  {options.map((opt) => (
                    <li
                      key={opt.key}
                      onClick={() => {
                        onChange(opt.key);
                        closeDropdown();
                      }}
                      className={`
                      px-[14px] py-[10px] text-sm sm:text-base cursor-pointer dark:bg-darkTheme dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800
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

              {error && (
                <span className="text-sm text-red-500 mt-1">
                  {error.message}
                </span>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default DropdownMenu;
