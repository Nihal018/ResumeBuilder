"use client";

import { FieldArray, Field, FieldArrayRenderProps } from "formik";
import { values } from "lodash";
import { University } from "lucide-react";
import React from "react";
import { Button } from "../UI/Button";
import { ResumeData } from "../../types";

export function Education({
  values,
  addClick,
  removeClick,
}: {
  values: ResumeData;
  addClick: (arrayHelpers: FieldArrayRenderProps, section: string) => void;
  removeClick: (arrayHelpers: FieldArrayRenderProps, index: number) => void;
}) {
  return (
    <div className="mb-6 mt-8">
      <h2 className="text-lg font-semibold text-gray-900 ">Education</h2>
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
                      onClick={() => addClick(arrayHelpers, "education")}
                      variant="secondary"
                    >
                      Add Education
                    </Button>

                    <Button
                      onClick={() => removeClick(arrayHelpers, index)}
                      variant="destructive"
                    >
                      Remove Education
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-end">
                <Button
                  onClick={() => addClick(arrayHelpers, "education")}
                  variant="secondary"
                >
                  Add Education
                </Button>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
}
