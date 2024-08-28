"use client";
import React from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import { University } from "lucide-react";
import { useResume } from "../ResumeContext";

export default function ResumeForm() {
  const { resumeData, setResumeData } = useResume();
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
          <Form className="">
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
                  htmlFor="education.0.institution"
                  className="block text-sm font-medium text-gray-700"
                >
                  University
                </label>
                <div className="relative">
                  <Field
                    id="education.0.institution"
                    name="education.0.institution"
                    placeholder="IET"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                  />
                  <University className="absolute top-2.5 left-3 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="mb-4 flex flex-row ">
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
                  placeholder="123-456-7890"
                  type="number"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* <div className="mb-4">
              <h2>Education</h2>
              <FieldArray name="education">
                {({ insert, remove, push }) => (
                  <div>
                    {values.education.length > 0 &&
                      values.education.map((education, index) => (
                        <div key={index}>
                          <label
                            htmlFor={`education.${index}.institution`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Institution
                          </label>
                          <Field
                            id={`education.${index}.institution`}
                            name={`education.${index}.institution`}
                            placeholder="Institution"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />

                          <label
                            htmlFor={`education.${index}.degree`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Degree
                          </label>
                          <Field
                            id={`education.${index}.degree`}
                            name={`education.${index}.degree`}
                            placeholder="Degree"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />

                          <label
                            htmlFor={`education.${index}.startDate`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Start Date
                          </label>
                          <Field
                            id={`education.${index}.startDate`}
                            name={`education.${index}.startDate`}
                            placeholder="Start Date"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />

                          <label
                            htmlFor={`education.${index}.endDate`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            End Date
                          </label>
                          <Field
                            id={`education.${index}.endDate`}
                            name={`education.${index}.endDate`}
                            placeholder="End Date"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />

                          <button type="button" onClick={() => remove(index)}>
                            Remove
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={() =>
                        push({
                          institution: "",
                          degree: "",
                          startDate: "",
                          endDate: "",
                        })
                      }
                    >
                      Add Education
                    </button>
                  </div>
                )}
              </FieldArray>
            </div> */}
            {/* Repeat similar blocks for Work Experience, Skills, etc. */}

            <div className="">
              <button
                type="submit"
                className="w-40 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
