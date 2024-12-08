import React from "react";
import { ResumeForm } from "./ResumeForm";
import { ResumePreview } from "./ResumePreview";

export function Main() {
  const isBrowser = typeof window !== "undefined";

  return (
    <main className="">
      <div className="my-4 flex flex-row">
        <div className="border border-black flex-1 mx-2 p-2">
          {/* template forms */}
          <div className="">
            <p className="text-center">Templates</p>
            <ResumeForm />
          </div>
        </div>

        <div className="flex-1 border border-black  mx-2 p-2">
          {/* Preview Section */}
          {isBrowser && <ResumePreview />}
        </div>
      </div>
    </main>
  );
}
