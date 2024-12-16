// types.ts
export interface FormSection {
  id: string;
  title: string;
  icon?: React.ComponentType;
  isArray?: boolean;
  fields: FormField[];
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "date" | "textarea" | "email";
  placeholder?: string;
  validation?: object;
  icon?: React.ComponentType;
}
export type FieldType = "text" | "date" | "textarea" | "email" | "tel";

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    linkedinURL: string;
    githubURL: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    fieldOfStudy: string;
  }>;
  workExperience: Array<{
    company: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  projects: Array<{
    name: string;
    date: string;
    description: string;
  }>;
  skills: string;
  // Add more sections as needed
}

// initialValues.ts
export const initialValues: ResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    linkedinURL: "",
    githubURL: "",
  },
  education: [
    {
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      fieldOfStudy: "",
    },
  ],
  workExperience: [
    {
      company: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  projects: [
    {
      name: "",
      date: "",
      description: "",
    },
  ],
  skills: "",
  // Initialize more sections if needed
};

export const sampleData: ResumeData = {
  personalInfo: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 123-456-7890",
    linkedinURL: "https://www.linkedin.com/in/johndoe/",
    githubURL: "https://github.com/johndoe",
  },
  education: [
    {
      institution: "Stanford University",
      degree: "Bachelor of Science",
      startDate: "2015-09-02",
      endDate: "2019-05-03",
      fieldOfStudy: "Computer Science",
    },
  ],
  workExperience: [
    {
      company: "Acme Corporation",
      jobTitle: "Software Engineer",
      startDate: "2020-01-02",
      endDate: "Present",
      description: "Developed and maintained web applications...",
    },
  ],
  projects: [
    {
      name: "Personal Portfolio Website",
      date: "2022-12-09",
      description: "Created a personal portfolio website using React...",
    },
  ],
  skills: "HTML, CSS, Javascript, TensorFlow, Python ,Numpy",
};
