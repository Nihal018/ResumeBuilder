import { FieldArrayRenderProps, FieldArray, Field, ErrorMessage } from "formik";
import { CustomSectionField, FormSection } from "../../types";
import { ArraySection } from "./ArraySection";
import { RenderFormField } from "./RenderFormField";
interface FormSectionProps {
  section: FormSection;
  values: any;
  arrayHelpers?: FieldArrayRenderProps;
}
export function RenderFormSection({ section, values }: FormSectionProps) {
  const Icon = section.icon;
  const isCustomSection = section.isCustom;
  if (isCustomSection) {
    return (
      <div className="mb-6 mt-8">
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
    <div className="mb-6 mt-8">
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon />}
        <h2 className="text-lg font-semibold">{section.title}</h2>
      </div>

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
  );
}
