import clsx from "clsx";
import { Button } from "./Button";
import { ArrowDown, ChevronDown } from "lucide-react";
import {
  safePolygon,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import { useState } from "react";
import { ResumeExamples } from "../example-data";
import { useResume } from "../context/ResumeContext";
import { PDFDownloadLink } from "@react-pdf/renderer";

function ExamplePopover() {
  const { setResumeData } = useResume();
  const [isOpen, setIsOpen] = useState(false);
  const { refs, context, floatingStyles } = useFloating({
    middleware: [],
    placement: "bottom-end",
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const hover = useHover(context, {
    handleClose: safePolygon(),
    restMs: 50,
  });
  const { getFloatingProps, getReferenceProps } = useInteractions([hover]);

  return (
    <div className="flex flex-col items-center">
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="flex items-center gap-x-1"
      >
        <span>Examples</span>
        <span>
          <ChevronDown size={14} />
        </span>
      </button>

      {isOpen && (
        <div
          className="border py-3 px-3 bg-white rounded-md shadow-md flex flex-col gap-y-3"
          ref={refs.setFloating}
          style={{ ...floatingStyles }}
          {...getFloatingProps()}
        >
          {ResumeExamples.map((example) => (
            <button
              className="text-left text-sm"
              key={example.label}
              onClick={() => {
                setResumeData(example.data);
                setIsOpen(false);
              }}
            >
              {example.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function TopNavigation({}: {}) {
  return (
    <header
      className={clsx(
        "bg-gray-50 border-b h-16 flex-shrink-0 top-0 z-50 ",
        "fixed top-0 inset-x-0"
      )}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between">
        <div className="flex h-16">
          {/* Logo/Brand */}
          <div className="flex items-center ml-6 ">
            <svg
              className="w-6 h-6 text-blue-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h1 className="text-base font-semibold text-gray-900 ">
              Resume Builder
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          <ExamplePopover />
        </div>
      </div>
    </header>
  );
}
