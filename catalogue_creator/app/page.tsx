"use client";
import React from "react";

import { Main } from "../components/Main";
import { ResumeProvider } from "../components/context/ResumeContext";
import { ThemeProvider } from "../components/context/ThemeContext";

export default function Home() {
  return (
    <div>
      <ThemeProvider>
        <ResumeProvider>
          <Main />
        </ResumeProvider>
      </ThemeProvider>
    </div>
  );
}
