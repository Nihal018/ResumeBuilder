"use client";

import dynamic from "next/dynamic";
import React from "react";
import { useResume } from "../ResumeContext";
import {
  Page,
  PDFViewer,
  View,
  Text,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    borderBottom: "1px solid #000", // Simulating underline
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    color: "#333",
  },
  bulletText: {
    fontSize: 10,
    marginBottom: 5,
  },
  table: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tableColumn: {
    width: "45%",
  },
  tableText: {
    fontSize: 12,
  },
  subHeader: {
    fontSize: 12,
    fontWeight: "bold",
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
    height: 1,
    backgroundColor: "#E4E4E4",
  },
});

export function ResumePreview() {
  const { resumeData } = useResume();
  return (
    <PDFViewer style={{ width: "100%", height: "600px" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Resume Header */}
          <Text style={styles.header}>{resumeData.personalInfo.name}</Text>
          <Text style={styles.text}>
            {resumeData.personalInfo.email} | {resumeData.personalInfo.phone} |{" "}
          </Text>

          {/* Education Section  */}
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {resumeData.education.map((edu, index) => (
            <View key={index} style={styles.table}>
              <View style={styles.tableColumn}>
                <Text style={styles.tableText}>
                  Institution: {resumeData.education[index].institution}
                </Text>
                <Text style={styles.tableText}>
                  Degree: {resumeData.education[index].degree}
                </Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.tableText}>
                  {resumeData.education[index].startDate} -{" "}
                  {resumeData.education[index].endDate}
                </Text>
              </View>
            </View>
          ))}
        </Page>
      </Document>
    </PDFViewer>
  );
}
