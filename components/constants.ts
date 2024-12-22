import { ModernResumePreview } from "./ModernResumePreview";
import { ProfessionalResumePreview } from "./ProfessionalResumePreview";
import { ResumePreview } from "./ResumePreview";

export type ResumeTemplateType = (typeof ResumeTemplatesMap)[number]["name"];
export const DEFAULT_TEMPLATE: ResumeTemplateType = "Regular" as const;

export const ResumeTemplatesMap = [
  {
    component: ResumePreview,
    name: "Regular",
  },
  {
    component: ModernResumePreview,
    name: "Modern",
  },
  {
    component: ProfessionalResumePreview,
    name: "Professional",
  },
];
