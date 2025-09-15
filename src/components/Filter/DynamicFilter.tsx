import React, { useEffect, useRef } from "react";
import { Controller } from "react-hook-form";
import type { Control, Path, FieldValues } from "react-hook-form";
import FilterLayout from "./FilterLayout";
import DropdownMenu from "../DropDown";

export interface FilterField<T> {
  type: "text" | "dropdown" | "date";
  name: Path<T>;
  label: string;
  placeholder?: string;
  options?: { key: string; node: string }[];
}

interface DynamicFilterFormProps<T extends FieldValues> {
  title: string;
  isOpen: boolean;
  closeDrawer: () => void;
  handleClear: () => void;
  fields: FilterField<T>[];
  control: Control<T>;
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
}

export function DynamicFilterForm<T extends FieldValues>({
  title,
  isOpen,
  closeDrawer,
  handleClear,
  fields,
  control,
  onSubmit,
}: DynamicFilterFormProps<T>) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        closeDrawer();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDrawer]);

  return (
    <FilterLayout title={title} isOpen={isOpen} onClose={closeDrawer}>
      <form className="flex flex-col h-full" onSubmit={onSubmit} ref={formRef}>
        {fields.map((field) => {
          if (field.type === "text") {
            return (
              <div key={field.name}>
                <label className="text-sm font-medium">{field.label}</label>
                <Controller
                  control={control}
                  name={field.name}
                  render={({ field: inputField }) => (
                    <input
                      {...inputField}
                      type="text"
                      placeholder={field.placeholder}
                      className="w-full h-[44px] px-[14px] py-[10px] border border-gray-300 rounded-md placeholder:text-base placeholder:text-gray-500
                           dark:bg-darkTheme dark:border-gray-800 mt-2 mb-2"
                    />
                  )}
                />
              </div>
            );
          }

          if (field.type === "dropdown" && field.options) {
            return (
              <DropdownMenu
                key={field.name}
                control={control}
                name={field.name}
                label={field.label}
                options={field.options}
                className="w-full mb-2 mt-2"
              />
            );
          }

          if (field.type === "date") {
            return (
              <div key={field.name}>
                <label className="text-sm font-medium">{field.label}</label>
                <Controller
                  control={control}
                  name={field.name}
                  render={({ field: inputField }) => (
                    <input
                      {...inputField}
                      type="date"
                      className="w-full h-[44px] mt-2 px-[14px] py-[10px] rounded-md text-base text-gray-500 mb-2
                           border border-gray-300 uppercase
                           dark:bg-darkTheme dark:border-gray-800
                           dark:placeholder:text-gray-500
                           dark:text-gray-500
                           [color-scheme:light] dark:[color-scheme:dark]"
                    />
                  )}
                />
              </div>
            );
          }

          return null;
        })}

        <div className="mt-auto  py-2">
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-primary-700 text-white text-sm px-4 py-2 rounded-md"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="text-sm text-gray-700 hover:underline hover:bg-gray-100
                 dark:text-white dark:hover:bg-white dark:hover:text-black
                 border border-gray-200 rounded-md px-4 py-2"
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </FilterLayout>
  );
}
