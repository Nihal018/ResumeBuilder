import { FieldArrayRenderProps, FieldArray, Field, ErrorMessage } from "formik";
import { CustomSectionField, FormSection } from "../../types";
import { ArraySection } from "./ArraySection";
import { RenderFormField } from "./RenderFormField";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDownIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
interface FormSectionProps {
  section: FormSection;
  values: any;
  arrayHelpers?: FieldArrayRenderProps;
}
export function RenderFormSection({ section, values }: FormSectionProps) {
  const Icon = section.icon;
  const isCustomSection = section.isCustom;
  const [isOpen, setIsOpen] = useState(true);

  if (isCustomSection) {
    return (
      <div className="mb-6 mt-2">
        <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
        {(section.fields as CustomSectionField[]).map((field) => (
          <div key={field.id} className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {field.label}
            </label>
            <Field
              type={field.type === "textarea" ? undefined : field.type}
              as={field.type === "textarea" ? "textarea" : "input"}
              name={`customSections.${section.id}.${field.name}`}
              className={`w-full p-2 border rounded ${
                field.type === "textarea" ? "h-32" : ""
              }`}
              placeholder={field.placeholder}
            />
            <ErrorMessage
              name={`customSections.${section.id}.${field.name}`}
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="border p-4 rounded-md flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && <Icon />}
          <h2 className="text-lg font-semibold">{section.title}</h2>
        </div>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className={clsx(
            "w-6 h-6 rounded-full border border-gray-600",
            "inline-flex justify-center items-center opacity-80"
          )}
        >
          {isOpen ? <MinusIcon size={16} /> : <PlusIcon size={16} />}
        </button>
      </div>

      <div className={clsx(!isOpen && "hidden")}>
        {section.isArray ? (
          <FieldArray
            name={section.id}
            render={(arrayHelpers) => (
              <ArraySection
                section={section}
                values={values}
                arrayHelpers={arrayHelpers}
              />
            )}
          />
        ) : (
          <div className="space-y-4">
            {section.fields.map((field) => (
              <RenderFormField
                key={`${section.id}-${field.name}`}
                field={{
                  ...field,
                  name: section.id === "skills" ? "skills" : field.name,
                }}
                prefix={section.id === "skills" ? "" : section.id} // Add prefix for nested objects like personalInfo
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
