import React from "react";
import ResumeForm from "../components/ResumeForm";

export default function Home() {
  return (
    <main className="">
      <div>
        <div className="border border-black ">
          {/* template forms */}
          <div className=" flex flex-row">
            <p>Templates</p>
            <ResumeForm />
          </div>
        </div>

        <div>{/* Preview Section */}</div>
      </div>
    </main>
  );
}
