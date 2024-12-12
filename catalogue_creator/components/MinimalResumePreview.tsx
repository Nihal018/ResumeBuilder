"use client";

import React from "react";
import { useResume } from "./ResumeContext";
import {
  Page,
  PDFViewer,
  View,
  Text,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#333",
  },
  contactInfo: {
    textAlign: "center",
    fontSize: 10,
    marginBottom: 15,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    borderBottom: "1.5px solid #000",
    marginTop: 15,
    marginBottom: 10,
    paddingBottom: 5,
  },
  entryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  entryLeft: {
    flexDirection: "column",
    width: "70%",
  },
  entryRight: {
    flexDirection: "column",
    width: "30%",
    textAlign: "right",
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  companyName: {
    fontSize: 11,
    color: "#555",
  },
  description: {
    fontSize: 10,
    color: "#444",
    marginTop: 5,
  },
});

export function MinimalResumePreview() {
  const { resumeData } = useResume();

  return (
    <PDFViewer style={{ width: "100%", height: "100%" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <Text style={styles.header}>{resumeData.personalInfo.name}</Text>
          <Text style={styles.contactInfo}>
            {resumeData.personalInfo.email} | {resumeData.personalInfo.phone}
          </Text>

          {/* Education Section */}
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {resumeData.education.map((edu, index) => (
            <View key={index} style={styles.entryContainer}>
              <View style={styles.entryLeft}>
                <Text style={styles.jobTitle}>{edu.degree}</Text>
                <Text style={styles.companyName}>{edu.institution}</Text>
              </View>
              <View style={styles.entryRight}>
                <Text>
                  {edu.startDate} - {edu.endDate}
                </Text>
              </View>
            </View>
          ))}

          {/* Work Experience Section */}
          <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
          {resumeData.workExperience.map((work, index) => (
            <View key={index}>
              <View style={styles.entryContainer}>
                <View style={styles.entryLeft}>
                  <Text style={styles.jobTitle}>{work.jobTitle}</Text>
                  <Text style={styles.companyName}>{work.company}</Text>
                </View>
                <View style={styles.entryRight}>
                  <Text>
                    {work.startDate} - {work.endDate}
                  </Text>
                </View>
              </View>
              <Text style={styles.description}>{work.description}</Text>
            </View>
          ))}

          {/* Projects Section */}
          <Text style={styles.sectionTitle}>PROJECTS</Text>
          {resumeData.projects.map((project, index) => (
            <View key={index}>
              <View style={styles.entryContainer}>
                <View style={styles.entryLeft}>
                  <Text style={styles.jobTitle}>{project.name}</Text>
                </View>
                <View style={styles.entryRight}>
                  <Text>{project.date}</Text>
                </View>
              </View>
              <Text style={styles.description}>{project.description}</Text>
            </View>
          ))}

          {/* Skills Section */}
          <Text style={styles.sectionTitle}>SKILLS</Text>
          <Text style={styles.description}>{resumeData.skills}</Text>
        </Page>
      </Document>
    </PDFViewer>
  );
}
