"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, useFormikContext, FormikHelpers, Field } from "formik";
import { formSections } from "../../config/formSections";
import {
  CustomSectionField,
  FormSection,
  ResumeData,
  sampleData,
} from "../../types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useSectionOrder } from "../context/SectionOrderContext";

import { Button } from "../UI/Button";
import { RenderFormSection } from "./RenderFormSection";

import { CustomizationPanel } from "../customization/CustomizationPanel";
import { useResume } from "../context/ResumeContext";
import { useTheme } from "../context/ThemeContext";
import { DraggableSection } from "../DraggableSection";
import { CustomSectionCreator } from "../CustomSectionCreator";

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
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);

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
  const renderCustomSection = (sectionId: string, values: ResumeData) => {
    // Get the custom section data
    const customSectionData = values.customSections[sectionId];
    if (!customSectionData) return null;

    // Get the section configuration from formSections
    const sectionConfig = formSections.find((s) => s.id === sectionId);
    if (!sectionConfig || !sectionConfig.isCustom) return null;

    return (
      <div className=" space-y-4 ">
        <h3 className="text-lg font-semibold ml-6">{sectionConfig.title}</h3>
        <div className=" p-4 border rounded-lg bg-gray-50">
          {(sectionConfig.fields as CustomSectionField[]).map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-medium mb-1">
                {field.label}
              </label>
              <Field
                name={`customSections.${sectionId}.${field.name}`}
                type={field.type === "textarea" ? undefined : field.type}
                as={field.type === "textarea" ? "textarea" : "input"}
                className={`w-full p-2 border rounded ${
                  field.type === "textarea" ? "h-32" : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const moveSection = (dragIndex: number, hoverIndex: number) => {
    const newSections = [...sectionOrder];
    const [draggedItem] = newSections.splice(dragIndex, 1);
    newSections.splice(hoverIndex, 0, draggedItem);
    setSectionOrder(newSections);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
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
            <div className="flex justify-between mb-4">
              <Button
                onClick={() => setShowCustomBuilder(!showCustomBuilder)}
                variant="secondary"
              >
                {showCustomBuilder
                  ? "Hide Custom Builder"
                  : "Add Custom Section"}
              </Button>
              <Button onClick={() => handleAutofill(setFieldValue)}>
                Autofill
              </Button>
            </div>

            {showCustomBuilder && <CustomSectionCreator />}

            <DndProvider backend={HTML5Backend}>
              <div className="space-y-4">
                {sectionOrder.map((sectionId, index) => (
                  <DraggableSection
                    key={sectionId}
                    id={sectionId}
                    index={index}
                    moveSection={moveSection}
                  >
                    {sectionId.startsWith("custom_")
                      ? renderCustomSection(sectionId, values)
                      : renderSection(sectionId, values)}
                  </DraggableSection>
                ))}
              </div>
            </DndProvider>

            <div>
              <Button type={"submit"} customStyles="w-36 mt-4">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
