import React, { useState } from "react";
import { ComboBox } from "./UI/ComboBox";

import dynamic from "next/dynamic";
import { RenderSelectedTemplate } from "./TemplatePreviewSection";
import { ResumeForm } from "./form/ResumeForm";
import { Header } from "./UI/Header";

const DynamicRenderSelectedTemplate = dynamic(
  () =>
    import("./TemplatePreviewSection").then(
      (mod) => mod.RenderSelectedTemplate
    ),
  { ssr: false }
);

export const options: { key: string; label: string }[] = [
  { key: "1", label: "Regular" },
  { key: "2", label: "Modern" },
  { key: "3", label: "Professional" },
];
export function Main() {
  const [isBrowser, setIsBrowser] = React.useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("1");

  const onSelectTemplate = (key: string) => {
    setSelectedTemplate(key);
  };

  React.useEffect(() => {
    setIsBrowser(true);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 flex overflow-hidden">
        {/* Left Column */}
        <div className="flex-1 p-2 overflow-hidden flex flex-col border border-black m-3">
          <div className="mb-4">
            <p className="text-center font-medium text-gray-700">Templates</p>
            <div className="max-w-3xl w-9/12 mx-auto mt-2">
              <ComboBox
                options={options}
                placeholder="Select a template"
                onSelect={onSelectTemplate}
                selected="1"
              />
            </div>
          </div>

          {/* Form with proper scrolling */}
          <div className="flex-1 overflow-y-auto">
            <ResumeForm />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 p-4 overflow-y-auto border border-black m-3">
          {isBrowser && (
            <RenderSelectedTemplate selectedTemplate={selectedTemplate} />
          )}
        </div>
      </main>
    </div>
  );
}
