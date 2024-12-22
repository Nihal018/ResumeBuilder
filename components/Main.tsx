import * as React from "react";
import { RenderSelectedTemplate } from "./TemplatePreviewSection";
import { ResumeForm } from "./form/ResumeForm";
import { TopNavigation } from "./UI/TopNavigation";
import { TemplateSelector } from "./TemplateSelector";
import clsx from "clsx";

export function Main() {
  const [isBrowser, setIsBrowser] = React.useState(false);

  React.useEffect(() => {
    setIsBrowser(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavigation />
      <main className="flex w-full max-w-screen-2xl mx-auto mt-20 relative">
        <div
          className={clsx(
            "fixed top-20 bottom-10 left-10 w-1/2 max-w-3xl h-full flex justify-start items-start"
          )}
        >
          <div className="w-full h-[90%] p-4 bg-white rounded-lg shadow-md">
            {isBrowser && <RenderSelectedTemplate />}
          </div>
        </div>

        <div className="flex-1"></div>

        <div
          className={clsx(
            "flex-1 p-2 flex flex-col m-3 max-w-3xl",
            "bg-white rounded-lg shadow-md py-5"
          )}
        >
          <div className="mb-4">
            <TemplateSelector />
          </div>

          <ResumeForm />
        </div>
      </main>
    </div>
  );
}
