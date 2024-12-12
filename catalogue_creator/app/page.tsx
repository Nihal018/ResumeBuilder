"use client";
import React from "react";
import { ResumeProvider } from "../components/ResumeContext";
import { Main } from "../components/Main";

export default function Home() {
  return (
    <div>
      <ResumeProvider>
        <Main />
      </ResumeProvider>
    </div>
  );
}
