import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  useFloating,
  useClick,
  useDismiss,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
  useRole,
  FloatingFocusManager,
} from "@floating-ui/react";
import { clsx } from "clsx";

export type SelectorOption = {
  key: string;
  label: string;
};

export type SelectorProps = {
  options: SelectorOption[];
  selected?: string;
  placeholder?: string;
  onSelect: (key: string) => void;
};

export function DropdownMenu({
  options,
  placeholder,
  selected,
  onSelect,
}: SelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    middleware: [offset(4), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const selectedItem = options.find((option) => option.key === selected);

  return (
    <div className="relative">
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className={clsx(
          "w-full h-11 flex items-center justify-between gap-x-1",
          "rounded-lg border border-gray-300 px-3 bg-white",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        )}
      >
        <span
          className={clsx(
            "text-base truncate",
            !selectedItem && "text-gray-500"
          )}
        >
          {selectedItem ? selectedItem.label : placeholder}
        </span>
        <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
      </button>

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-50 min-w-[8rem] w-full"
        >
          <div className="overflow-y-auto max-h-64 rounded-lg border border-gray-200 bg-white shadow-lg">
            <ul className="py-1">
              {options.map((option) => (
                <li
                  key={option.key}
                  onClick={() => {
                    onSelect(option.key);
                    setIsOpen(false);
                  }}
                  className={clsx(
                    "px-3 py-2 text-base cursor-pointer",
                    "hover:bg-gray-100 transition-colors",
                    option.key === selected && "bg-gray-50 font-medium"
                  )}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
