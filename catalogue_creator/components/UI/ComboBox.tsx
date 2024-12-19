import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import {
  useFloating,
  useClick,
  useDismiss,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import { clsx } from "clsx";

import { SelectorOption, SelectorProps } from "./DropdownMenu";

export function ComboBox({
  options,
  placeholder,
  selected,
  onSelect,
}: SelectorProps) {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [filteredResults, setFilteredResults] =
    useState<SelectorOption[]>(options);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Set highlighted index to 0 when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
    }
  }, [isOpen]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const extractedQuery = event.target.value.trim();
    setValue(extractedQuery);
    setHighlightedIndex(0);

    if (extractedQuery === "") {
      setFilteredResults(options);
    } else {
      const results = options.filter((option) =>
        option.label.toLowerCase().includes(extractedQuery.toLowerCase())
      );
      setFilteredResults(results);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === "Enter" || event.key === "ArrowDown") {
        setIsOpen(true);
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex < filteredResults.length - 1 ? prevIndex + 1 : 0
        );
        break;

      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : filteredResults.length - 1
        );
        break;

      case "Enter":
        event.preventDefault();
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredResults.length
        ) {
          const selectedOption = filteredResults[highlightedIndex];
          onSelect(selectedOption.key);
          setValue(selectedOption.label);
          setIsOpen(false);
        }
        break;

      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [highlightedIndex]);

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
          "w-full h-11 flex mt-4 items-center justify-between gap-x-1",
          "rounded-lg border border-gray-300 px-3 bg-white"
        )}
        onKeyDown={handleKeyDown}
      >
        <button
          className="w-full h-auto flex justify-between rounded-lg px-2 outline-none"
          onClick={() => setIsOpen(true)}
        >
          {value === "Modern" || value === "Professional" || value === "Regular"
            ? value
            : placeholder}
          <ChevronDown className="" />
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
            <div className="flex items-center px-2">
              <CiSearch className="ml-1 h-5 w-5 shrink-0 opacity-50" />
              <input
                ref={inputRef}
                type="text"
                id="box"
                className="w-full h-10 p-2 rounded-lg outline-none"
                value={value}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                autoComplete="off"
              />
            </div>

            <ul ref={listRef} className="py-1">
              {filteredResults.map((option, index) => (
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
                    option.key === selected && "bg-gray-100 font-medium",
                    index === highlightedIndex && "bg-gray-100"
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
