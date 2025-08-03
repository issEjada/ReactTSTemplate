import { Controller } from "react-hook-form";
import type { Path, Control, FieldValues } from "react-hook-form";
import ChevronDown from "../assets/svg/ChevronDown.svg";

interface Option {
  key: string;
  node: string;
}

interface DropdownMenuProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
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
  return (
    <div className={`mb-2 ${className}`}>
      <Controller
        name={name}
        control={control}
        defaultValue={"" as any}
        render={({ field, fieldState }) => {
          const { onChange, value } = field;
          const { error } = fieldState;
          const dropdownId = `dropdown-${name}`;

          const toggleDropdown = () => {
            if (disabled) return;
            const dropdown = document.getElementById(dropdownId);
            dropdown?.classList.toggle("hidden");
          };

          const closeDropdown = () => {
            const dropdown = document.getElementById(dropdownId);
            dropdown?.classList.add("hidden");
          };

          return (
            <div className="flex flex-col gap-[6px] relative">
              <label className="text-sm sm:text-base font-medium text-[#414651] flex items-center gap-1">
                {label}
                {required && <span className="text-red-500">*</span>}
              </label>
              <div
                className={`
              appearance-none w-full h-[44px] sm:h-[48px] px-[14px] py-[10px] 
              text-sm sm:text-base border rounded-[8px] shadow-sm bg-white 
              flex items-center justify-between relative 
              ${
                error
                  ? "border-red-500 text-red-500"
                  : "border-[#D5D7DA] text-[#717680]"
              }
              ${
                disabled
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "cursor-pointer"
              }
            `}
                onClick={!disabled ? toggleDropdown : undefined}
              >
                <span>{value || `Choose ${label}`}</span>
                <img
                  src={ChevronDown}
                  alt="Dropdown icon"
                  className="w-[10px] h-5 object-contain"
                />
              </div>

              <ul
                id={dropdownId}
                className="absolute z-50 mt-[4px] w-full bg-white border border-[#D5D7DA] rounded-[8px] shadow-md overflow-y-auto max-h-60 hidden"
              >
                {options.map((opt) => (
                  <li
                    key={opt.key}
                    onClick={() => {
                      onChange(opt.node);
                      closeDropdown();
                    }}
                    className={`px-[14px] py-[10px] text-sm sm:text-base cursor-pointer hover:bg-gray-100 ${
                      opt.node === value
                        ? "bg-gray-100 font-medium text-blue-600"
                        : ""
                    }`}
                  >
                    {opt.node}
                  </li>
                ))}
              </ul>
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
