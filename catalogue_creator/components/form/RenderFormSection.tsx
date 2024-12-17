import { FieldArrayRenderProps, FieldArray } from "formik";
import { FormSection } from "../../types";
import { ArraySection } from "./ArraySection";
import { RenderFormField } from "./RenderFormField";
interface FormSectionProps {
  section: FormSection;
  values: any;
  arrayHelpers?: FieldArrayRenderProps;
}
export function RenderFormSection({ section, values }: FormSectionProps) {
  const Icon = section.icon;

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
