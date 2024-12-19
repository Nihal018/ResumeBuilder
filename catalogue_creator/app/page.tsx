"use client";
import React from "react";

import { Main } from "../components/Main";
import { ResumeProvider } from "../components/context/ResumeContext";
import { ThemeProvider } from "../components/context/ThemeContext";
import { SectionOrderProvider } from "../components/context/SectionOrderContext";

export default function Home() {
  return (
    <div>
      <ThemeProvider>
        <ResumeProvider>
          <SectionOrderProvider>
            <Main />
          </SectionOrderProvider>
        </ResumeProvider>
      </ThemeProvider>
    </div>
  );
}
