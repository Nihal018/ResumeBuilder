import { FieldArrayRenderProps } from "formik";
import { FormSection } from "../../types";
import { Button } from "../UI/Button";
import { RenderFormField } from "./RenderFormField";

interface ArraySectionProps {
  section: FormSection;
  values: Record<string, any>;
  arrayHelpers: FieldArrayRenderProps;
  disabled?: boolean;
}
export function ArraySection({
  section,
  values,
  arrayHelpers,
}: ArraySectionProps) {
  const items = values[section.id] || [];

  return (
    <div className="space-y-4">
      {items.length > 0 ? (
        items.map((_: any, index: number) => (
          <div
            key={`${section.id}-item-${index}`}
            className="p-4 border rounded-lg bg-gray-50"
          >
            {section.fields.map((field) => (
              <RenderFormField
                key={`${section.id}-${index}-${field.name}`}
                field={field}
                prefix={`${section.id}.${index}`}
              />
            ))}

            <div className="flex justify-end gap-2 mt-4">
              {index === items.length - 1 && (
                <Button type="button" onClick={() => arrayHelpers.push({})}>
                  Add {section.title}
                </Button>
              )}
              <Button
                type="button"
                variant="destructive"
                onClick={() => arrayHelpers.remove(index)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <Button type="button" onClick={() => arrayHelpers.push({})}>
          Add {section.title}
        </Button>
      )}
    </div>
  );
}
