import React, { useState } from "react";
import { ResumeForm } from "./ResumeForm";
import { ResumePreview } from "./ResumePreview";
import { DropdownMenu } from "./UI/DropdownMenu";
import { ModernResumePreview } from "./ModernResumePreview";
import { ProfessionalResumePreview } from "./ProfessionalResumePreview";
import { ComboBox } from "./UI/ComboBox";

const templateComponents = {
  "1": ResumePreview,
  "2": ModernResumePreview,
  "3": ProfessionalResumePreview,
};

export const options: { key: string; label: string }[] = [
  { key: "1", label: "Regular" },
  { key: "2", label: "Modern" },
  { key: "3", label: "Professional" },
];
export function Main() {
  const isBrowser = typeof window !== "undefined"; // hydration error occurs due to this
  const [selectedTemplate, setSelectedTemplate] = useState<string>("1");

  const onSelectTemplate = (key: string) => {
    setSelectedTemplate(key);
  };

  const renderSelectedTemplate = () => {
    if (selectedTemplate === "") return null;

    const TemplateComponent =
      templateComponents[selectedTemplate as keyof typeof templateComponents];

    if (!TemplateComponent) {
      return <div>Template not found</div>;
    }

    return <TemplateComponent />;
  };

  return (
    <main className="overflow-hidden h-screen">
      <div className="my-4 flex flex-row " style={{ height: "98vh" }}>
        <div className="border border-black flex-1 mx-2 p-2 overflow-y-auto ">
          {/* template forms */}

          <div className="">
            <p className="text-center">Templates</p>
            <div className="min-w-fit w-8/12 mx-auto ">
              {/* <DropdownMenu
                options={options}
                placeholder="Select a Template"
                onSelect={onSelectTemplate}
                selected="1"
              /> */}

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
          {isBrowser && renderSelectedTemplate()}
        </div>
      </div>
    </main>
  );
}
