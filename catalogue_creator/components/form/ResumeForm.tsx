"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, useFormikContext, FormikHelpers } from "formik";
import { formSections } from "../../config/formSections";
import { FormSection, ResumeData, sampleData } from "../../types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useSectionOrder } from "../context/SectionOrderContext";

import { Button } from "../UI/Button";
import { RenderFormSection } from "./RenderFormSection";

import { CustomizationPanel } from "../customization/CustomizationPanel";
import { useResume } from "../context/ResumeContext";
import { useTheme } from "../context/ThemeContext";
import { DraggableSection } from "../DraggableSection";

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
  const { sectionOrder, setSectionOrder } = useSectionOrder();

  const handleSubmit = async (values: ResumeData) => {
    await new Promise((r) => setTimeout(r, 500));
    setResumeData(values);
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

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sectionOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSectionOrder(items);
  };

  const renderSection = (sectionId: string, values: any) => {
    const section = formSections.find((section) => section.id === sectionId);
    if (section === undefined) return null;
    return (
      <RenderFormSection
        key={`form-section-${sectionId}`}
        section={section}
        values={values}
      />
    );
  };

  const moveSection = (dragIndex: number, hoverIndex: number) => {
    const newSections = [...sectionOrder];
    const [draggedItem] = newSections.splice(dragIndex, 1);
    newSections.splice(hoverIndex, 0, draggedItem);
    setSectionOrder(newSections);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <CustomizationPanel />
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

            {/* {formSections.map((section) => {
              return renderSection(section,values)
              return (
              <RenderFormSection
                key={`form-section-${section.id}`}
                section={section}
                values={values}
              />
             )  }  )
            } */}
            <DndProvider backend={HTML5Backend}>
              <div className="space-y-4">
                {sectionOrder.map((sectionId, index) => (
                  <DraggableSection
                    key={sectionId}
                    id={sectionId}
                    index={index}
                    moveSection={moveSection}
                  >
                    {renderSection(sectionId, values)}
                  </DraggableSection>
                ))}
              </div>
            </DndProvider>

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
