import { createContext, useContext, useState } from "react";

interface SectionOrderContextType {
  sectionOrder: string[];
  setSectionOrder: (order: string[]) => void;
}

const defaultSections = [
  "personalInfo",
  "education",
  "workExperience",
  "projects",
  "skills",
];

const SectionOrderContext = createContext<SectionOrderContextType>({
  sectionOrder: defaultSections,
  setSectionOrder: () => {},
});

export function SectionOrderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sectionOrder, setSectionOrder] = useState(defaultSections);

  return (
    <SectionOrderContext.Provider value={{ sectionOrder, setSectionOrder }}>
      {children}
    </SectionOrderContext.Provider>
  );
}

export const useSectionOrder = () => useContext(SectionOrderContext);
