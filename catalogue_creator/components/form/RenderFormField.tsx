import { FormField } from "../../types";
import { Field, ErrorMessage } from "formik";

interface FormFieldProps {
  field: FormField;
  prefix?: string;
}
export function RenderFormField({ field, prefix }: FormFieldProps) {
  const fieldName = prefix ? `${prefix}.${field.name}` : field.name;
  const Icon = field.icon;

  return (
    <div className="flex-1 flex-col mb-3">
      <label
        htmlFor={fieldName}
        className="block text-sm font-medium text-gray-700"
      >
        {field.label}
      </label>
      <div className="relative">
        {field.type === "textarea" ? (
          <Field
            as="textarea"
            id={fieldName}
            name={fieldName}
            placeholder={field.placeholder}
            className="mt-1 block w-full p-2 border border-gray-300 rounded 
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     min-h-[100px]"
          />
        ) : (
          <Field
            id={fieldName}
            name={fieldName}
            type={field.type}
            placeholder={field.placeholder}
            className={`
              mt-1 block w-full p-2 
              ${Icon ? "pl-10" : ""} 
              border border-gray-300 rounded 
              focus:outline-none focus:ring-2 focus:ring-blue-500

            `}
          />
        )}
        {Icon && <Icon />}
        <ErrorMessage
          name={fieldName}
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </div>
  );
}
