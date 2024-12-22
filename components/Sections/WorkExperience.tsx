"use client";

import { FieldArray, Field, FieldArrayRenderProps } from "formik";
import React from "react";
import { Button } from "../UI/Button";
import { ResumeData } from "../../types";

export function WorkExperience({
  values,
  addClick,
  removeClick,
}: {
  values: ResumeData;
  addClick: (arrayHelpers: FieldArrayRenderProps, section: string) => void;
  removeClick: (arrayHelpers: FieldArrayRenderProps, index: number) => void;
}) {
  return (
    <div className="mb-6 mt-4">
      <h2 className="text-lg font-semibold text-gray-900">Work Experience</h2>
      <FieldArray
        name="workExperience"
        render={(arrayHelpers) => (
          <div className="mt-1">
            {values.workExperience && values.workExperience.length > 0 ? (
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
                      onClick={() => addClick(arrayHelpers, "work experience")}
                      variant="secondary"
                    >
                      Add Job
                    </Button>

                    <Button
                      onClick={() => removeClick(arrayHelpers, index)}
                      variant="destructive"
                    >
                      Remove Job
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-end">
                <Button
                  onClick={() => addClick(arrayHelpers, "work experience")}
                  variant="secondary"
                >
                  Add Job
                </Button>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
}
