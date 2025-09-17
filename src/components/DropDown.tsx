import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Controller } from "react-hook-form";
import type { Path, Control, FieldValues } from "react-hook-form";
const ChevronDown = React.lazy(
  () => import("../assets/svg/ChevronDown.svg?react")
);
import type { Option } from "../types/types";

interface DropdownMenuProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  portal?: boolean;
}

const getScrollParents = (node: Element | null) => {
  const parents: (Window | Element)[] = [];
  let el = node?.parentElement;
  while (el) {
    const style = getComputedStyle(el);
    const overflow = `${style.overflow}${style.overflowY}${style.overflowX}`;
    if (/(auto|scroll|overlay)/.test(overflow)) parents.push(el);
    el = el.parentElement;
  }
  parents.push(window);
  return parents;
};

const DropdownMenu = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  required = false,
  disabled = false,
  className = "w-full",
  portal = false,
}: DropdownMenuProps<T>) => {
  const triggerRef = useRef<HTMLDivElement | null>(null); // trigger wrapper
  const menuRef = useRef<HTMLUListElement | null>(null); // menu (portal) ref
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<DOMRect | null>(null);

  const updateCoords = () => {
    if (triggerRef.current) {
      setCoords(triggerRef.current.getBoundingClientRect());
    }
  };

  // open/close handlers
  const toggleDropdown = (disabledFlag = disabled) => {
    if (disabledFlag) return;
    if (!open && portal) {
      // compute coords immediately on open
      updateCoords();
    }
    setOpen((prev) => !prev);
  };
  const closeDropdown = () => setOpen(false);

  // click outside — must consider portal menu as inside
  useEffect(() => {
    const handleClickOutside = (ev: MouseEvent) => {
      const target = ev.target as Node | null;
      if (
        triggerRef.current &&
        (triggerRef.current.contains(target) ||
          (portal && menuRef.current && menuRef.current.contains(target)))
      ) {
        // click inside trigger or inside portal menu -> do nothing
        return;
      }
      // otherwise close
      closeDropdown();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [portal]);

  // When open in portal mode, listen for scroll/resize and observe trigger resize.
  useEffect(() => {
    if (!open || !portal || !triggerRef.current) return;

    updateCoords();
    const parents = getScrollParents(triggerRef.current);

    const onScrollOrResize = () => {
      // update position while open
      updateCoords();
    };

    const listeners: { node: Window | Element; fn: EventListener }[] = [];

    parents.forEach((p) => {
      const node = p === window ? window : (p as Element);
      node.addEventListener("scroll", onScrollOrResize, { passive: true });
      listeners.push({ node, fn: onScrollOrResize });
    });

    window.addEventListener("resize", onScrollOrResize);

    const ro = new ResizeObserver(onScrollOrResize);
    ro.observe(triggerRef.current);

    return () => {
      // cleanup
      listeners.forEach(({ node, fn }) =>
        node.removeEventListener("scroll", fn)
      );
      window.removeEventListener("resize", onScrollOrResize);
      ro.disconnect();
    };
  }, [open, portal]);

  return (
    <div className={`mb-2 ${className}`} ref={triggerRef}>
      <Controller
        name={name}
        control={control}
        defaultValue={"" as unknown as T[keyof T]}
        render={({ field, fieldState }) => {
          const { onChange, value } = field;
          const { error } = fieldState;

          const DropdownList = (
            <ul
              ref={menuRef}
              role="listbox"
              aria-hidden={!open}
              className="z-50 mt-[4px] bg-white border border-gray-300 rounded-[8px] shadow-md overflow-y-auto max-h-60 dark:bg-darkTheme dark:border-gray-800"
              style={
                portal && coords
                  ? ({
                      position: "fixed",
                      top: coords.bottom + 4,
                      left: coords.left,
                      width: coords.width,
                    } as React.CSSProperties)
                  : ({
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      width: "100%",
                    } as React.CSSProperties)
              }
            >
              {options.map((opt) => (
                <li
                  key={opt.key}
                  onClick={() => {
                    onChange(opt.key);
                    closeDropdown();
                  }}
                  className={`px-[14px] py-[10px] text-sm sm:text-base cursor-pointer
                    dark:bg-darkTheme dark:border-gray-800
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    ${
                      opt.key === value
                        ? "bg-gray-100 font-medium text-blue-600"
                        : ""
                    }`}
                >
                  {opt.node}
                </li>
              ))}
            </ul>
          );

          return (
            <div className="flex flex-col gap-[6px] relative dark:border-gray-800">
              {label ? (
                <label className="text-sm font-medium text-gray-700 dark:text-white flex items-center gap-1">
                  {label}
                  {required && <span className="text-red-500">*</span>}
                </label>
              ) : null}

              {/* Trigger */}
              <div
                className={`
                  appearance-none w-full h-[44px] px-[14px] py-[10px]
                  text-sm sm:text-base border rounded-[8px] shadow-sm
                  flex items-center justify-between relative dark:bg-darkTheme dark:border-gray-800
                  ${
                    error
                      ? "border-red-500 text-red-500"
                      : "border-gray-300 text-gray-500"
                  }
                  ${disabled ? " cursor-not-allowed" : "cursor-pointer"}
                `}
                onClick={() => toggleDropdown(disabled)}
              >
                <span
                  className={`${
                    disabled
                      ? "text-gray-400 dark:text-gray-400 cursor-not-allowed"
                      : !value
                      ? "text-gray-500 dark:text-gray-200"
                      : "text-gray-600 dark:text-white"
                  }`}
                >
                  {options.find((opt) => opt.key === value)?.node ||
                    `Choose ${label}`}
                </span>
                <ChevronDown className="w-[10px] h-5 object-contain text-gray-500" />
              </div>

              {/* Menu: portal vs inline */}
              {open &&
                (portal
                  ? createPortal(DropdownList, document.body)
                  : DropdownList)}

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
