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
  }>;
  workExperience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: string[];
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
    },
  ],
  workExperience: [
    {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  skills: [],
  // Initialize more sections if needed
};
