"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, useFormikContext, FormikHelpers } from "formik";
import { formSections } from "../../config/formSections";
import { ResumeData, sampleData } from "../../types";
import { useResume } from "../ResumeContext";
import { Button } from "../UI/Button";
import { RenderFormSection } from "./RenderFormSection";

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

  const debouncedValues = useDebounce(values, 500);

  useEffect(() => {
    // Update context only when debounced values change
    setResumeData(debouncedValues);
  }, [debouncedValues, setResumeData]);

  return null;
}

export function ResumeForm() {
  const { resumeData, setResumeData } = useResume();
  const [isAutofilled, setIsAutofilled] = useState(false);

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

            {formSections.map((section) => (
              <RenderFormSection
                key={`form-section-${section.id}`}
                section={section}
                values={values}
              />
            ))}

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
