"use client";

import { FieldArray, Field, FieldArrayRenderProps } from "formik";
import React from "react";
import { Button } from "../UI/Button";
import { ResumeData } from "../../types";

export function Projects({
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
                      variant="secondary"
                    >
                      Add Project
                    </Button>

                    <Button
                      onClick={() => removeClick(arrayHelpers, index)}
                      variant="destructive"
                    >
                      Remove Project
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-end">
                <Button
                  onClick={() => addClick(arrayHelpers, "project")}
                  variant="default"
                >
                  Add Project
                </Button>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
}
