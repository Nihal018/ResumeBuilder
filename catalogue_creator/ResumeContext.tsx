"use client";

import React, { createContext, useState, ReactNode, useCallback } from "react";
import { initialValues, ResumeData } from "./types";
import { isEqual } from "lodash";

interface ResumeContextProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
}

const ResumeContext = createContext<ResumeContextProps>(
  {} as ResumeContextProps
);
export const ResumeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [resumeData, setResumeDataState] = useState<ResumeData>(initialValues);

  // Optimize setResumeData to prevent unnecessary updates
  const setResumeData = useCallback((newData: ResumeData) => {
    // Only update if the new data is different from the current data
    setResumeDataState((prevData) =>
      isEqual(prevData, newData) ? prevData : newData
    );
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(
    () => ({
      resumeData,
      setResumeData,
    }),
    [resumeData, setResumeData]
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
