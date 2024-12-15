"use client";

import { Field } from "formik";
import React from "react";

export function PersonalInfo() {
  return (
    <>
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
    </>
  );
}
