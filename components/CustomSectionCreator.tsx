import { useState } from "react";
import { Button } from "./UI/Button";
import { useFormikContext } from "formik";
import { ResumeData, FormSection, CustomSectionData } from "../types";
import { useSectionOrder } from "./context/SectionOrderContext";
import { Input } from "./UI/input";
import { formSections } from "../config/formSections";
import { DropdownMenu, SelectorOption } from "./UI/DropdownMenu";

interface FieldInput {
  name: string;
  type: "text" | "date" | "textarea" | "email";
  label: string;
}
interface CustomFieldInput {
  name: string;
  type: "text" | "date" | "textarea" | "email";
  label: string;
}

const options: SelectorOption[] = [
  {
    key: "text",
    label: "Text",
  },
  {
    key: "textarea",
    label: "Text Area",
  },
  {
    key: "date",
    label: "Date",
  },
  {
    key: "email",
    label: "Email",
  },
];

export function CustomSectionCreator() {
  const { setFieldValue } = useFormikContext<ResumeData>();
  const { sectionOrder, setSectionOrder } = useSectionOrder();
  const [sectionTitle, setSectionTitle] = useState("");
  const [fields, setFields] = useState<CustomFieldInput[]>([
    { name: "", type: "text", label: "" },
  ]);

  const addField = () => {
    setFields([...fields, { name: "", type: "text", label: "" }]);
  };

  const updateField = (index: number, field: Partial<FieldInput>) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], ...field };
    setFields(newFields);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleCreateSection = () => {
    if (!sectionTitle || fields.some((f) => !f.name)) return;

    const sectionId = `custom_${Date.now()}`;

    const newFormSection: FormSection = {
      id: sectionId,
      title: sectionTitle,
      isCustom: true,
      isArray: false,
      fields: fields.map((f) => ({
        id: `${sectionId}_${f.name}`,
        name: f.name,
        label: f.name,
        type: f.type,
        isRequired: false,
      })),
    };

    formSections.push(newFormSection);

    setFieldValue(
      `customSections.${sectionId}`,
      fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
      }, {} as CustomSectionData)
    );

    setSectionOrder([...sectionOrder, sectionId]);

    setSectionTitle("");
    setFields([{ name: "", type: "text", label: "" }]);
  };
  return (
    <div className="border rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold mb-4">Create Custom Section</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Section Title
          </label>
          <Input
            type="text"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            placeholder="e.g., Certifications, Awards"
            className="pl-4"
          />
        </div>

        {fields.map((field, index) => (
          <div key={index} className="p-4 border rounded">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Field Name
                </label>
                <Input
                  type="text"
                  value={field.name}
                  onChange={(e) => updateField(index, { name: e.target.value })}
                  placeholder="e.g., certificationName"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Field Type
                </label>
                <DropdownMenu
                  key={index}
                  onSelect={(key: string) => {
                    const selectedOption = options.find(
                      (option) => option.key === key
                    );
                    if (!selectedOption) {
                      return;
                    }
                    updateField(index, { type: selectedOption.key as any });
                  }}
                  placeholder="Select field type"
                  options={options}
                  selected="text"
                />
              </div>
            </div>
            <Button onClick={() => removeField(index)} variant="destructive">
              Remove Field
            </Button>
          </div>
        ))}

        <div className="flex justify-between">
          <Button onClick={addField} variant="secondary">
            Add Field
          </Button>
          <Button onClick={handleCreateSection}>Create Section</Button>
        </div>
      </div>
    </div>
  );
}
