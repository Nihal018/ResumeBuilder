"use client";
import React from "react";
import { ResumeProvider } from "../components/ResumeContext";
import { Main } from "../components/Main";
import { ThemeProvider } from "../components/ThemeContext";

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
