// components/CustomSectionCreator.tsx
import { useState } from "react";
import { Button } from "./UI/Button";
import { useFormikContext } from "formik";
import {
  ResumeData,
  FormField,
  FormSection,
  CustomSectionData,
} from "../types";
import { useSectionOrder } from "./context/SectionOrderContext";
import { Input } from "./UI/input";
import { formSections } from "../config/formSections";

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
    if (!sectionTitle || fields.some((f) => !f.name || !f.label)) return;

    const sectionId = `custom_${Date.now()}`;

    // Create new form section
    const newFormSection: FormSection = {
      id: sectionId,
      title: sectionTitle,
      isCustom: true,
      isArray: false,
      fields: fields.map((f) => ({
        id: `${sectionId}_${f.name}`,
        name: f.name,
        label: f.label,
        type: f.type,
        isRequired: false,
      })),
    };

    // Update formSections globally
    formSections.push(newFormSection);

    // Initialize empty values in the form
    setFieldValue(
      `customSections.${sectionId}`,
      fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
      }, {} as CustomSectionData)
    );

    // Add to section order
    setSectionOrder([...sectionOrder, sectionId]);

    // Reset form
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
                  Field Label
                </label>
                <Input
                  type="text"
                  value={field.label}
                  onChange={(e) =>
                    updateField(index, { label: e.target.value })
                  }
                  placeholder="e.g., Certification Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Field Type
                </label>
                <select
                  value={field.type}
                  onChange={(e) =>
                    updateField(index, { type: e.target.value as any })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="text">Text</option>
                  <option value="textarea">Text Area</option>
                  <option value="date">Date</option>
                  <option value="email">Email</option>
                </select>
              </div>
            </div>
            <Button
              onClick={() => removeField(index)}
              variant="destructive"
              customStyles="mt-2"
            >
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
