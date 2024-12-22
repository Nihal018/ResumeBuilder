import * as React from "react";
import { useResume } from "./context/ResumeContext";
import { ResumeTemplatesMap } from "./constants";

export const RenderSelectedTemplate = () => {
  const { template } = useResume();

  const TemplateComponent = ResumeTemplatesMap.find((t) => {
    return t.name === template;
  })?.component;

  if (!TemplateComponent) {
    return <div>Template not found</div>;
  }

  return <TemplateComponent key={template} />;
};
