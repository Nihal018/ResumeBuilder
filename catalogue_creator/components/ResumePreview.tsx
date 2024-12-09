"use client";

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
import { Header } from "./UI/Header";
import { Education } from "./UI/Education";

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
  },
  bulletText: {
    fontSize: 10,
    marginBottom: 5,
  },
  table: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableColumn: {
    width: "45%",
  },
  tableText: {
    fontSize: 12,
    marginBottom: 2,
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
    <PDFViewer style={{ width: "100%", height: "100%" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Resume Header */}
          <Header />
          {/* Education Section  */}
          <Education />

          <Text style={styles.sectionTitle}>Work Experience</Text>
          {resumeData.workExperience.map((work, index) => (
            <>
              <View key={index} style={styles.table}>
                <View style={styles.tableColumn}>
                  <Text style={styles.tableText}>
                    Company: {resumeData.workExperience[index].company}
                  </Text>
                  <Text style={styles.tableText}>
                    Job Title: {resumeData.workExperience[index].jobTitle}
                  </Text>
                </View>
                <View style={styles.tableColumn}>
                  <Text style={styles.tableText}>
                    {resumeData.workExperience[index].startDate} -{" "}
                    {resumeData.workExperience[index].endDate}
                  </Text>
                </View>
              </View>
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.text}>
                  Job Description:{" "}
                  {resumeData.workExperience[index].description}
                </Text>
              </View>
            </>
          ))}

          <Text style={styles.sectionTitle}>Projects</Text>
          {resumeData.projects.map((_, index) => (
            <>
              <View key={index} style={styles.table}>
                <View style={styles.tableColumn}>
                  <Text style={styles.tableText}>
                    Name: {resumeData.projects[index].name}
                  </Text>
                </View>
                <View style={styles.tableColumn}>
                  <Text style={styles.tableText}>
                    Date: {resumeData.projects[index].date}
                  </Text>
                </View>
              </View>
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.text}>
                  {resumeData.projects[index].description}
                </Text>
              </View>
            </>
          ))}

          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.tableText}>{resumeData.skills}</Text>
        </Page>
      </Document>
    </PDFViewer>
  );
}
