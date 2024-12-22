import { useState } from "react";
import { ResumeTemplatesMap } from "./constants";
import { useResume } from "./context/ResumeContext";
import { CustomizationPanel } from "./customization/CustomizationPanel";
import { Button } from "./UI/Button";
import { ComboBox } from "./UI/ComboBox";

export function TemplateSelector() {
  const [openCustomization, setOpenCustomization] = useState(false);
  const { setTemplate, template } = useResume();

  return (
    <div className="flex flex-col gap-y-2 px-4">
      <div className="flex flex-col  items-start">
        <ComboBox
          options={ResumeTemplatesMap.map((template) => ({
            key: template.name,
            label: template.name,
          }))}
          placeholder="Select a template"
          onSelect={(key) => setTemplate(key as any)}
          selected={template}
        />
        <Button
          onClick={() => {
            setOpenCustomization(!openCustomization);
          }}
          variant={"link"}
        >
          Customise font and colors ?
        </Button>
      </div>
      {openCustomization && <CustomizationPanel />}
    </div>
  );
}
