import React from "react";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import { ResumeProvider } from "../ResumeContext";
import Main from "../components/Main";

export default function Home() {
  return (
    <ResumeProvider>
      <Main />
    </ResumeProvider>
  );
}
