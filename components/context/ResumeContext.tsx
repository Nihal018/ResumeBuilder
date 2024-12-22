"use client";
import React, { createContext, useState, ReactNode, useCallback } from "react";
import isEqual from "lodash-es/isEqual";
import { initialValues, ResumeData } from "../../types";
import { DEFAULT_TEMPLATE, ResumeTemplateType } from "../constants";
import { ResumeExamples } from "../example-data";

interface ResumeContextProps {
  template: ResumeTemplateType;
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  setTemplate: (template: ResumeTemplateType) => void;
}

const ResumeContext = createContext<ResumeContextProps>(
  {} as ResumeContextProps
);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [resumeData, setResumeDataState] = useState<ResumeData>(
    ResumeExamples[0].data
  );
  const [selectedTemplate, setSelectedTemplate] =
    useState<ResumeTemplateType>(DEFAULT_TEMPLATE);

  const setResumeData = useCallback((newData: ResumeData) => {
    setResumeDataState((prevData) =>
      isEqual(prevData, newData) ? prevData : newData
    );
  }, []);

  const contextValue: ResumeContextProps = React.useMemo(
    () => ({
      resumeData,
      setResumeData,
      template: selectedTemplate,
      setTemplate: setSelectedTemplate,
    }),
    [resumeData, selectedTemplate, setResumeData]
  );

  return (
    <ResumeContext.Provider value={contextValue}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = React.useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
