import * as React from "react";
import { ModernResumePreview } from "./ModernResumePreview";
import { ProfessionalResumePreview } from "./ProfessionalResumePreview";
import { ResumePreview } from "./ResumePreview";

const templateComponents = {
  "1": ResumePreview,
  "2": ModernResumePreview,
  "3": ProfessionalResumePreview,
};

export const RenderSelectedTemplate = ({
  selectedTemplate,
}: {
  selectedTemplate: string;
}) => {
  if (selectedTemplate === "") return null;

  const TemplateComponent =
    templateComponents[selectedTemplate as keyof typeof templateComponents];

  if (!TemplateComponent) {
    return <div>Template not found</div>;
  }

  return <TemplateComponent />;
};
