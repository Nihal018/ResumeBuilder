"use client";

import dynamic from "next/dynamic";
import Resume from "./Resume";
import React from "react";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
  }
);

export default function ResumePreview() {
  return (
    <PDFViewer>
      <Resume />
    </PDFViewer>
  );
}
