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
import { options } from "../Main";
import { SelectorOption, SelectorProps } from "./DropdownMenu";

export function ComboBox({
  options,
  placeholder,
  selected,
  onSelect,
}: SelectorProps) {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredResults, setFilteredResults] =
    useState<SelectorOption[]>(options);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const extractedQuery = event.target.value.trim();
    setValue(extractedQuery);
    if (extractedQuery === "") {
      setFilteredResults(options);
    } else {
      const results = options.filter((option) =>
        option.label.toLowerCase().includes(value)
      );
      setFilteredResults(results);
    }
  };

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    middleware: [offset(4), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getFloatingProps, getReferenceProps } = useInteractions([
    click,
    dismiss,
  ]);

  return (
    <div className="relative">
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={clsx(
          "w-full h-11 flex items-center justify-between gap-x-1",
          "rounded-lg border border-gray-300 px-3 bg-white",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        )}
      >
        <input
          type="text"
          id="box"
          className="w-full h-8 p-2 border border-gray-300 rounded-lg"
          value={value}
          onChange={handleSearch}
          placeholder={placeholder}
        />
        <button
          className="h-5 w-5 text-gray-400 flex-shrink-0"
          onClick={() => {}}
        >
          <ChevronDown />
        </button>
      </div>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-50 min-w-[8rem] w-full"
        >
          <div className="overflow-y-auto max-h-64 rounded-lg border border-gray-200 bg-white shadow-lg">
            <ul className="py-1">
              {filteredResults.map((option) => (
                <li
                  key={option.key}
                  onClick={() => {
                    onSelect(option.key);
                    setValue(option.label);
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
