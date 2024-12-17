import { University, Briefcase, Code, User } from "lucide-react";
import * as Yup from "yup";
import { FormSection } from "../types";

export const formSections: FormSection[] = [
  {
    id: "personalInfo",
    title: "Personal Information",
    icon: User,
    isArray: false,
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        validation: Yup.string().required("Name is required"),
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        validation: Yup.string().email().required("Email is required"),
      },
      {
        name: "phone",
        label: "Phone",
        type: "text",
        validation: Yup.string().required("Phone is required"),
      },
      {
        name: "linkedinURL",
        label: "Linkedin URL",
        type: "text",
      },
      {
        name: "githubURL",
        label: "Github URL",
        type: "text",
      },
    ],
  },
  {
    id: "education",
    title: "Education",
    icon: University,
    isArray: true,
    fields: [
      {
        name: "institution",
        label: "Institution",
        type: "text",
      },
      {
        name: "degree",
        label: "Degree",
        type: "text",
      },
      {
        name: "startDate",
        label: "Start Date",
        type: "date",
      },
      {
        name: "endDate",
        label: "End Date",
        type: "date",
      },
    ],
  },
  {
    id: "workExperience",
    title: "Work Experience",
    icon: Briefcase,
    isArray: true,
    fields: [
      {
        name: "company",
        label: "Company",
        type: "text",
      },
      {
        name: "jobTitle",
        label: "Job Title",
        type: "text",
      },
      {
        name: "startDate",
        label: "Start Date",
        type: "date",
      },
      {
        name: "endDate",
        label: "End Date",
        type: "date",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
      },
    ],
  },
  {
    id: "projects",
    title: "Projects",
    icon: Code,
    isArray: true,
    fields: [
      {
        name: "name",
        label: "Project Name",
        type: "text",
      },
      {
        name: "date",
        label: "Date",
        type: "date",
      },

      {
        name: "description",
        label: "Description",
        type: "textarea",
      },
    ],
  },
  {
    id: "skills",
    title: "Skills",
    isArray: false,
    fields: [
      {
        name: "skillsList",
        type: "textarea",
        placeholder: "For Ex: HTML, CSS, JavaScript",
        label: "",
      },
    ],
  },
  // ... other sections
];
