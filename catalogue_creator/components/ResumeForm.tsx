"use client";
import React from "react";
import { Formik, Field, Form, FieldArray, FieldArrayRenderProps } from "formik";
import { University } from "lucide-react";
import { useResume } from "../ResumeContext";
import { Button } from "./UI/Button";

export function ResumeForm() {
  const { resumeData, setResumeData } = useResume();

  const addClick = (arrayHelpers: FieldArrayRenderProps) => {
    arrayHelpers.push({
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
    });
  };
  const removeClick = (arrayHelpers: FieldArrayRenderProps, index: number) => {
    arrayHelpers.remove(index);
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
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          setResumeData(values); // Update context with form values
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values }) => (
          <Form>
            <div className="mb-4 flex flex-row">
              <div className="flex-1 flex-col mr-2">
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
                />
              </div>

              <div className="flex-1 flex-col ml-2">
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
            </div>

            {/* Education Section */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Education</h2>
              <FieldArray
                name="education"
                render={(arrayHelpers) => (
                  <div>
                    {values.education && values.education.length > 0 ? (
                      values.education.map((_, index) => (
                        <div key={index} className="flex flex-col mb-4">
                          <div className="flex flex-row mb-2">
                            <div className="flex-1 flex-col mr-2">
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

                            <div className="flex-1 flex-col ml-2">
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
                          <div className="flex justify-between items-center mt-2">
                            <Button
                              onClick={() => addClick(arrayHelpers)}
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
                          onClick={() => addClick(arrayHelpers)}
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
