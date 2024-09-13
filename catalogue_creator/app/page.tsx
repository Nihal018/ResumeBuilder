import React from "react";
import { ResumeProvider } from "../ResumeContext";
import Main from "../components/Main";

export default function Home() {
  return (
    <ResumeProvider>
      <Main />
    </ResumeProvider>
  );
}
