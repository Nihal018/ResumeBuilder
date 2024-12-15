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
    padding: 40,
    fontFamily: "Times-Roman",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1A1A1A",
  },
  contactInfo: {
    textAlign: "center",
    fontSize: 11,
    marginBottom: 20,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    borderBottom: "2px solid #000",
    marginTop: 20,
    marginBottom: 15,
    paddingBottom: 5,
  },
  entryContainer: {
    flexDirection: "column",
    marginBottom: 15,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  companyName: {
    fontSize: 12,
    color: "#555",
  },
  dateRange: {
    fontSize: 10,
    color: "#666",
  },
  bulletContainer: {
    flexDirection: "row",
    marginTop: 5,
    paddingLeft: 10,
  },
  bulletPoint: {
    fontSize: 11,
    marginRight: 5,
    color: "#444",
  },
  bulletText: {
    fontSize: 11,
    color: "#444",
    flex: 1,
    lineHeight: 1.5,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillTag: {
    fontSize: 10,
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 5,
    paddingVertical: 2,
    margin: 2,
    borderRadius: 3,
  },
});

export function ProfessionalResumePreview() {
  const { resumeData } = useResume();

  const renderBulletPoints = (description: string) => {
    const bullets = description.split(". ").filter((bullet) => bullet.trim());
    return bullets.map((bullet, index) => (
      <View key={index} style={styles.bulletContainer}>
        <Text style={styles.bulletPoint}>•</Text>
        <Text style={styles.bulletText}>{bullet.trim()}</Text>
      </View>
    ));
  };

  return (
    <PDFViewer style={{ width: "100%", height: "100%" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <Text style={styles.header}>{resumeData.personalInfo.name}</Text>
          <Text style={styles.contactInfo}>
            {resumeData.personalInfo.email} | {resumeData.personalInfo.phone} |{" "}
            {resumeData.personalInfo.linkedinURL} {"  "}|{"\n"}
            {resumeData.personalInfo.githubURL}
          </Text>

          {/* Education Section */}
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {resumeData.education.map((edu, index) => (
            <View key={index} style={styles.entryContainer}>
              <View style={styles.entryHeader}>
                <Text style={styles.jobTitle}>{edu.degree}</Text>
                <Text style={styles.dateRange}>
                  {edu.startDate} - {edu.endDate}
                </Text>
              </View>
              <Text style={styles.companyName}>{edu.institution}</Text>
            </View>
          ))}

          {/* Work Experience Section */}
          <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
          {resumeData.workExperience.map((work, index) => (
            <View key={index} style={styles.entryContainer}>
              <View style={styles.entryHeader}>
                <Text style={styles.jobTitle}>{work.jobTitle}</Text>
                <Text style={styles.dateRange}>
                  {work.startDate} - {work.endDate}
                </Text>
              </View>
              <Text style={styles.companyName}>{work.company}</Text>
              {renderBulletPoints(work.description)}
            </View>
          ))}

          {/* Projects Section */}
          <Text style={styles.sectionTitle}>PROJECTS</Text>
          {resumeData.projects.map((project, index) => (
            <View key={index} style={styles.entryContainer}>
              <View style={styles.entryHeader}>
                <Text style={styles.jobTitle}>{project.name}</Text>
                <Text style={styles.dateRange}>{project.date}</Text>
              </View>
              {renderBulletPoints(project.description)}
            </View>
          ))}

          {/* Skills Section */}
          <Text style={styles.sectionTitle}>SKILLS</Text>
          <View style={styles.skillsContainer}>
            {resumeData.skills.split(",").map((skill, index) => (
              <Text key={index} style={styles.skillTag}>
                {skill.trim()}
              </Text>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
