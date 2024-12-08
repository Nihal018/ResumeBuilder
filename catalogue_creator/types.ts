// types.ts
export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
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
