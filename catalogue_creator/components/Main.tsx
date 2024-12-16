import React, { useState } from "react";
import { ResumeForm } from "./ResumeForm";
import { ComboBox } from "./UI/ComboBox";

import dynamic from "next/dynamic";
import { RenderSelectedTemplate } from "./TemplatePreviewSection";

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
    <main className="overflow-hidden h-screen">
      <div className="my-4 flex flex-row " style={{ height: "98vh" }}>
        <div className="border border-black flex-1 mx-2 p-2 overflow-y-auto ">
          <div className="">
            <p className="text-center">Templates</p>
            <div className="min-w-fit w-8/12 mx-auto ">
              <ComboBox
                options={options}
                placeholder="Select a template"
                onSelect={onSelectTemplate}
                selected="1"
              />
            </div>

            <ResumeForm />
          </div>
        </div>

        <div className="flex-1 border border-black  mx-2 p-2 overflow-y-auto">
          {/* Preview Section */}
          {isBrowser && (
            <RenderSelectedTemplate selectedTemplate={selectedTemplate} />
          )}
        </div>
      </div>
    </main>
  );
}
