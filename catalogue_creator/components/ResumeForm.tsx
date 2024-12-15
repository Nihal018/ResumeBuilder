"use client";
import React, { useEffect } from "react";
import {
  Formik,
  Field,
  Form,
  FieldArray,
  FieldArrayRenderProps,
  useFormikContext,
  FormikHelpers,
} from "formik";
import { University } from "lucide-react";
import { useResume } from "./ResumeContext";
import { Button } from "./UI/Button";
import { ResumeData, sampleData } from "../types";

import { useState } from "react";
import { Education } from "./Sections/Education";
import { WorkExperience } from "./Sections/WorkExperience";
import { Projects } from "./Sections/Projects";
import { PersonalInfo } from "./Sections/PersonalInfo";
import { DropdownMenu } from "./UI/DropdownMenu";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Separate component to handle debounced context updates
function DebouncedResumeUpdate() {
  const { values } = useFormikContext<ResumeData>();
  const { setResumeData } = useResume();

  // Debounce the entire values object with a 500ms delay
  const debouncedValues = useDebounce(values, 500);

  useEffect(() => {
    // Update context only when debounced values change
    setResumeData(debouncedValues);
  }, [debouncedValues, setResumeData]);

  return null; // This component doesn't render anything
}

const onSelectTemplate = (key: string) => {
  console.log(key);
};

export function ResumeForm() {
  const { resumeData, setResumeData } = useResume();
  const [isAutofilled, setIsAutofilled] = useState(false);

  const addClick = (arrayHelpers: FieldArrayRenderProps, section: string) => {
    if (section === "education") {
      arrayHelpers.push({
        institution: "",
        degree: "",
        startDate: "",
        endDate: "",
      });
    } else if (section === "work experience") {
      arrayHelpers.push({
        company: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    } else if (section === "project") {
      arrayHelpers.push({
        name: "",
        date: "",
        description: "",
      });
    } else {
    }
  };
  const removeClick = (arrayHelpers: FieldArrayRenderProps, index: number) => {
    arrayHelpers.remove(index);
  };

  const handleSubmit = async (values: ResumeData) => {
    await new Promise((r) => setTimeout(r, 500));
    setResumeData(values); // Update context with form values
  };

  const handleAutofill = (
    setFieldValue: FormikHelpers<ResumeData>["setFieldValue"]
  ) => {
    (Object.keys(sampleData) as (keyof ResumeData)[]).forEach((key) => {
      const dataForKey = sampleData[key];

      if (
        typeof dataForKey === "object" &&
        dataForKey !== null &&
        !Array.isArray(dataForKey)
      ) {
        (Object.keys(dataForKey) as (keyof typeof dataForKey)[]).forEach(
          (nestedKey) => {
            setFieldValue(`${key}.${nestedKey}`, dataForKey[nestedKey]);
          }
        );
      } else if (Array.isArray(dataForKey)) {
        setFieldValue(key, dataForKey);
      } else {
        setFieldValue(key, dataForKey);
      }
    });
    setIsAutofilled(true);
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Formik
        initialValues={resumeData}
        onSubmit={(values) => {
          handleSubmit(values);
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <DebouncedResumeUpdate />
            <div className="flex justify-end mb-4">
              <Button onClick={() => handleAutofill(setFieldValue)}>
                Autofill
              </Button>
            </div>

            <PersonalInfo />

            <Education
              values={values}
              addClick={addClick}
              removeClick={removeClick}
            />

            <WorkExperience
              values={values}
              addClick={addClick}
              removeClick={removeClick}
            />

            {/* project section */}
            <Projects
              values={values}
              addClick={addClick}
              removeClick={removeClick}
            />

            <div className="mb-6 mt-4">
              <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
              <Field
                id="skills"
                name="skills"
                placeholder="For Ex: HTML"
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Button type={"submit"} customStyles="w-36">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
