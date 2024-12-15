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
    borderBottom: "1px solid #000",
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
  },
  bulletText: {
    fontSize: 12,
    marginBottom: 5,
    paddingLeft: 15,
  },
  bulletPoint: {
    position: "absolute",
    left: 5,
  },
  bulletContainer: {
    position: "relative",
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

  const renderBulletPoint = (text: string) => (
    <View style={styles.bulletContainer}>
      <Text style={styles.bulletPoint}>•</Text>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );

  // Function to split description into bullet points
  const splitIntoBullets = (description: string) => {
    return description.split(". ").filter((bullet) => bullet.trim().length > 0);
  };

  return (
    <PDFViewer style={{ width: "100%", height: "100%" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Resume Header */}
          <Text style={styles.header}>{resumeData.personalInfo.name}</Text>
          <Text style={styles.text}>
            {resumeData.personalInfo.email} | {resumeData.personalInfo.phone} |{" "}
            {resumeData.personalInfo.linkedinURL} |{" "}
            {resumeData.personalInfo.githubURL}
          </Text>

          {/* Education Section */}
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {resumeData.education.map((edu, index) => (
            <View key={index} style={styles.table}>
              <View style={styles.tableColumn}>
                <Text style={styles.tableText}>
                  Institution: {edu.institution}
                </Text>
                <Text style={styles.tableText}>Degree: {edu.degree}</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.tableText}>
                  {edu.startDate} - {edu.endDate}
                </Text>
              </View>
            </View>
          ))}

          <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
          {resumeData.workExperience.map((work, index) => (
            <View key={index}>
              <View style={styles.table}>
                <View style={styles.tableColumn}>
                  <Text style={styles.tableText}>Company: {work.company}</Text>
                  <Text style={styles.tableText}>
                    Job Title: {work.jobTitle}
                  </Text>
                </View>
                <View style={styles.tableColumn}>
                  <Text style={styles.tableText}>
                    {work.startDate} - {work.endDate}
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 5, marginBottom: 12 }}>
                {splitIntoBullets(work.description).map((bullet, bulletIndex) =>
                  renderBulletPoint(bullet)
                )}
              </View>
            </View>
          ))}

          <Text style={styles.sectionTitle}>PROJECTS</Text>
          {resumeData.projects.map((project, index) => (
            <View key={index}>
              <View style={styles.table}>
                <View style={styles.tableColumn}>
                  <Text style={styles.tableText}>Name: {project.name}</Text>
                </View>
                <View style={styles.tableColumn}>
                  <Text style={styles.tableText}>Date: {project.date}</Text>
                </View>
              </View>
              <View style={{ marginTop: 5, marginBottom: 12 }}>
                {splitIntoBullets(project.description).map(
                  (bullet, bulletIndex) => renderBulletPoint(bullet)
                )}
              </View>
            </View>
          ))}

          <Text style={styles.sectionTitle}>SKILLS</Text>
          <Text style={styles.tableText}>{resumeData.skills}</Text>
        </Page>
      </Document>
    </PDFViewer>
  );
}
