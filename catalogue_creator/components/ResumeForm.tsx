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
      <select
        className="block w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => {}}
      >
        <option value="#">Basic Resume Template</option>
      </select>

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
              <button
                type="button"
                onClick={() => handleAutofill(setFieldValue)}
                disabled={isAutofilled}
              >
                Autofill
              </button>
            </div>

            <div className="flex-1 flex-col mb-3">
              <label
                htmlFor="personalInfo.name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Field
                id="personalInfo.name"
                name="personalInfo.name"
                placeholder="John Doe"
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                //   handleChange(event);
                //   new Promise((r) => setTimeout(r, 500));
                //   // Trigger form submission
                //   handleSubmit(values);
                // }}
              />
            </div>

            <div className="mb-4 flex flex-row">
              <div className="flex-1 flex-col mr-2">
                <label
                  htmlFor="personalInfo.email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  id="personalInfo.email"
                  name="personalInfo.email"
                  placeholder="jane@acme.com"
                  type="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex-1 flex-col ml-2">
                <label
                  htmlFor="personalInfo.phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <Field
                  id="personalInfo.phone"
                  name="personalInfo.phone"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-4 flex flex-row">
              <div className="flex-1 flex-col mr-2">
                <label
                  htmlFor="personalInfo.linkedinURL"
                  className="block text-sm font-medium text-gray-700"
                >
                  LinkedIn URL
                </label>
                <Field
                  id="personalInfo.linkedinURL"
                  name="personalInfo.linkedinURL"
                  placeholder=""
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex-1 flex-col ml-2">
                <label
                  htmlFor="personalInfo.githubURL"
                  className="block text-sm font-medium text-gray-700"
                >
                  GitHub URL
                </label>
                <Field
                  id="personalInfo.githubURL"
                  name="personalInfo.githubURL"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Education Section */}
            <div className="mb-6 mt-8">
              <h2 className="text-lg font-semibold text-gray-900 ">
                Education
              </h2>
              <FieldArray
                name="education"
                render={(arrayHelpers) => (
                  <div className="mt-1">
                    {values.education && values.education.length > 0 ? (
                      values.education.map((_, index) => (
                        <div key={index} className="flex flex-col mb-2">
                          <div className="flex-1 flex-col mb-3">
                            <label
                              htmlFor={`education.${index}.institution`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Institution
                            </label>
                            <div className="relative">
                              <Field
                                id={`education.${index}.institution`}
                                name={`education.${index}.institution`}
                                placeholder="University Name"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                              />
                              <University className="absolute top-2.5 left-3 w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                          <div className="flex flex-row mb-3">
                            <div className="flex-1 flex-col mr-2">
                              <label
                                htmlFor={`education.${index}.degree`}
                                className="block text-sm font-medium text-gray-700"
                              >
                                Degree
                              </label>
                              <Field
                                id={`education.${index}.degree`}
                                name={`education.${index}.degree`}
                                placeholder="Degree (e.g. B.Sc, M.Sc)"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="flex-1 flex-col ml-2">
                              <label
                                htmlFor={`education.${index}.fieldOfStudy`}
                                className="block text-sm font-medium text-gray-700"
                              >
                                Field of Study
                              </label>
                              <Field
                                id={`education.${index}.fieldOfStudy`}
                                name={`education.${index}.fieldOfStudy`}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>

                          <div className="flex flex-row">
                            <div className="flex-1 flex-col mr-2">
                              <label
                                htmlFor={`education.${index}.startDate`}
                                className="block text-sm font-medium text-gray-700"
                              >
                                Start Date
                              </label>
                              <Field
                                id={`education.${index}.startDate`}
                                name={`education.${index}.startDate`}
                                placeholder="YYYY-MM"
                                type="date"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>

                            <div className="flex-1 flex-col ml-2">
                              <label
                                htmlFor={`education.${index}.endDate`}
                                className="block text-sm font-medium text-gray-700"
                              >
                                End Date
                              </label>
                              <Field
                                id={`education.${index}.endDate`}
                                name={`education.${index}.endDate`}
                                placeholder="YYYY-MM"
                                type="date"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>

                          {/* Side-by-side Add and Remove Buttons */}
                          <div className="flex justify-between items-center mt-4">
                            <Button
                              onClick={() =>
                                addClick(arrayHelpers, "education")
                              }
                              styles={
                                "text-gray-500 hover:text-gray-700 text-sm font-semibold border-b-2 border-transparent hover:border-gray-700"
                              }
                              buttonText="Add Education"
                            />

                            <Button
                              onClick={() => removeClick(arrayHelpers, index)}
                              styles="text-red-500 hover:text-red-700 text-sm font-semibold border-b-2 border-transparent hover:border-red-700"
                              buttonText="Remove Education"
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-end">
                        <Button
                          onClick={() => addClick(arrayHelpers, "education")}
                          styles={
                            "text-gray-500 hover:text-gray-700 text-sm font-semibold border-b-2 border-transparent hover:border-gray-700"
                          }
                          buttonText="Add Education"
                        />
                      </div>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="mb-6 mt-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Work Experience
              </h2>
              <FieldArray
                name="workExperience"
                render={(arrayHelpers) => (
                  <div className="mt-1">
                    {values.workExperience &&
                    values.workExperience.length > 0 ? (
                      values.workExperience.map((_, index) => (
                        <div key={index} className="flex flex-col mb-4">
                          <div className="flex flex-row mb-2">
                            <div className="flex-1 flex-col mr-2 mb-2">
                              <label
                                htmlFor={`workExperience.${index}.company`}
                                className="block text-sm font-medium text-gray-700"
                              >
                                Company
                              </label>
                              <div className="relative">
                                <Field
                                  id={`workExperience.${index}.company`}
                                  name={`workExperience.${index}.company`}
                                  placeholder="Company Name"
                                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
                                />
                              </div>
                            </div>

                            <div className="flex-1 flex-col ml-2">
                              <label
                                htmlFor={`workExperience.${index}.jobTitle`}
                                className="block text-sm font-medium text-gray-700"
                              >
                                Job Title
                              </label>
                              <Field
                                id={`workExperience.${index}.jobTitle`}
                                name={`workExperience.${index}.jobTitle`}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>

                          <div className="flex flex-row mb-2">
                            <div className="flex-1 flex-col mr-2 mb-2">
                              <label
                                htmlFor={`workExperience.${index}.startDate`}
                                className="block text-sm font-medium text-gray-700"
                              >
                                Start Date
                              </label>
                              <Field
                                id={`workExperience.${index}.startDate`}
                                name={`workExperience.${index}.startDate`}
                                placeholder="YYYY-MM"
                                type="date"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>

                            <div className="flex-1 flex-col ml-2">
                              <label
                                htmlFor={`workExperience.${index}.endDate`}
                                className="block text-sm font-medium text-gray-700"
                              >
                                End Date
                              </label>
                              <Field
                                id={`workExperience.${index}.endDate`}
                                name={`workExperience.${index}.endDate`}
                                placeholder="YYYY-MM"
                                type="date"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                          <div className="flex-1 flex-col ">
                            <label
                              htmlFor={`workExperience.${index}.description`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Description
                            </label>
                            <Field
                              id={`workExperience.${index}.description`}
                              name={`workExperience.${index}.description`}
                              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          {/* Side-by-side Add and Remove Buttons */}
                          <div className="flex justify-between items-center mt-4">
                            <Button
                              onClick={() =>
                                addClick(arrayHelpers, "work experience")
                              }
                              styles={
                                "text-gray-500  hover:text-gray-700 text-sm font-semibold border-b-2 border-transparent hover:border-gray-700"
                              }
                              buttonText="Add Job"
                            />

                            <Button
                              onClick={() => removeClick(arrayHelpers, index)}
                              styles="text-red-500 hover:text-red-700 text-sm font-semibold border-b-2 border-transparent hover:border-red-700"
                              buttonText="Remove Job"
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-end">
                        <Button
                          onClick={() =>
                            addClick(arrayHelpers, "work experience")
                          }
                          styles={
                            "text-gray-500 hover:text-gray-700 text-sm font-semibold border-b-2 border-transparent hover:border-gray-700"
                          }
                          buttonText="Add Job"
                        />
                      </div>
                    )}
                  </div>
                )}
              />
            </div>

            {/* project section */}
            <div className="mb-6 mt-4">
              <h2 className="text-lg font-semibold text-gray-900">Project</h2>
              <FieldArray
                name="projects"
                render={(arrayHelpers) => (
                  <div className="mt-1">
                    {values.projects && values.projects.length > 0 ? (
                      values.projects.map((_, index) => (
                        <div key={index} className="flex flex-col mb-4">
                          <div className="flex flex-row mb-2">
                            <div className="flex-1 flex-col mr-2 mb-2">
                              <label
                                htmlFor={`projects.${index}.name`}
                                className="block text-sm font-medium text-gray-700"
                              >
                                Project Name
                              </label>
                              <div className="relative">
                                <Field
                                  id={`projects.${index}.name`}
                                  name={`projects.${index}.name`}
                                  placeholder="Project Name"
                                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
                                />
                              </div>
                            </div>

                            <div className="flex-1 flex-col ml-2">
                              <label
                                htmlFor={`projects.${index}.date`}
                                className="block text-sm font-medium text-gray-700"
                              >
                                Date
                              </label>
                              <Field
                                id={`projects.${index}.date`}
                                name={`projects.${index}.date`}
                                placeholder="YYYY-MM"
                                type="date"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>

                          <div className="flex-1 flex-col ">
                            <label
                              htmlFor={`projects.${index}.description`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Description
                            </label>
                            <Field
                              id={`projects.${index}.description`}
                              name={`projects.${index}.description`}
                              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          {/* Side-by-side Add and Remove Buttons */}
                          <div className="flex justify-between items-center mt-4">
                            <Button
                              onClick={() => addClick(arrayHelpers, "project")}
                              styles={
                                "text-gray-500  hover:text-gray-700 text-sm font-semibold border-b-2 border-transparent hover:border-gray-700"
                              }
                              buttonText="Add Project"
                            />

                            <Button
                              onClick={() => removeClick(arrayHelpers, index)}
                              styles="text-red-500 hover:text-red-700 text-sm font-semibold border-b-2 border-transparent hover:border-red-700"
                              buttonText="Remove Project"
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-end">
                        <Button
                          onClick={() => addClick(arrayHelpers, "project")}
                          styles={
                            "text-gray-500 hover:text-gray-700 text-sm font-semibold border-b-2 border-transparent hover:border-gray-700"
                          }
                          buttonText="Add Project"
                        />
                      </div>
                    )}
                  </div>
                )}
              />
            </div>

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
              <button
                type="submit"
                className="w-40 py-2 px-4 bg-blue-400 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
