"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, useFormikContext, FormikHelpers, Field } from "formik";
import { formSections } from "../../config/formSections";
import { CustomSectionField, ResumeData } from "../../types";
import { useSectionOrder } from "../context/SectionOrderContext";
import { Button } from "../UI/Button";
import { RenderFormSection } from "./RenderFormSection";
import { useResume } from "../context/ResumeContext";
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

function DebouncedResumeUpdate() {
  const { values } = useFormikContext<ResumeData>();
  const { setResumeData } = useResume();

  const debouncedValues = useDebounce(values, 500);

  useEffect(() => {
    setResumeData(debouncedValues);
  }, [debouncedValues, setResumeData]);

  return null;
}

const RenderSection = (sectionId: string, values: any) => {
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

export function ResumeForm() {
  const { resumeData, setResumeData } = useResume();
  const { sectionOrder, setSectionOrder } = useSectionOrder();
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);

  const handleSubmit = async (values: ResumeData) => {
    await new Promise((r) => setTimeout(r, 500));
    setResumeData(values);
  };

  const renderCustomSection = (sectionId: string, values: ResumeData) => {
    const customSectionData = values.customSections[sectionId];
    if (!customSectionData) return null;

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
    <div className="max-w-3xl mx-auto px-4 w-full">
      <Formik
        enableReinitialize
        initialValues={resumeData}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <DebouncedResumeUpdate />
            <div className="flex justify-end mb-4">
              <Button
                onClick={() => setShowCustomBuilder(!showCustomBuilder)}
                variant="secondary"
              >
                {showCustomBuilder
                  ? "Hide Custom Builder"
                  : "Add Custom Section"}
              </Button>
            </div>

            {showCustomBuilder && <CustomSectionCreator />}

            <div className="flex flex-col gap-y-4">
              {sectionOrder.map((sectionId) => {
                return sectionId.startsWith("custom_")
                  ? renderCustomSection(sectionId, values)
                  : RenderSection(sectionId, values);
              })}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
