"use client";

import React, { useMemo } from "react";

import {
  Page,
  PDFViewer,
  View,
  Text,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { useResume } from "./context/ResumeContext";
import { useTheme } from "./context/ThemeContext";
import { fontFamilyMap } from "./fonts";
import { useSectionOrder } from "./context/SectionOrderContext";

const LEFT_COLUMN_SECTIONS = ["personalInfo", "skills", "education"];
const RIGHT_COLUMN_SECTIONS = ["workExperience", "projects"];

export function ModernResumePreview() {
  const { resumeData } = useResume();
  const { theme } = useTheme();
  const { sectionOrder } = useSectionOrder();

  const leftColumnSections = useMemo(
    () =>
      sectionOrder.filter((section) => LEFT_COLUMN_SECTIONS.includes(section)),
    [sectionOrder]
  );

  const rightColumnSections = useMemo(
    () =>
      sectionOrder.filter((section) => RIGHT_COLUMN_SECTIONS.includes(section)),
    [sectionOrder]
  );

  const documentKey = useMemo(
    () =>
      JSON.stringify({
        colors: theme.colors,
        fonts: theme.fonts,
      }),
    [theme]
  );

  const styles = useMemo(() => {
    return StyleSheet.create({
      page: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        fontFamily: fontFamilyMap[theme.fonts.body] || "Ruluko",
      },
      leftColumn: {
        width: "30%",
        backgroundColor: "#2C3E50",
        padding: 20,
        color: "white",
      },
      rightColumn: {
        width: "70%",
        padding: 30,
      },
      header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
        fontFamily: fontFamilyMap[theme.fonts.heading] || "Ruluko",
      },
      subHeader: {
        fontSize: 14,
        color: "#95A5A6",
        marginBottom: 20,
      },
      leftSectionTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
        color: "#3498DB",
        fontFamily: fontFamilyMap[theme.fonts.heading] || "Ruluko",
        borderBottom: "1px solid #3498DB",
        paddingBottom: 5,
      },
      rightSectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 15,
        marginBottom: 10,
        color: theme.colors.primary,
        fontFamily: fontFamilyMap[theme.fonts.heading] || "Ruluko",
        borderBottom: "2px solid #3498DB",
        paddingBottom: 5,
      },
      contactText: {
        fontSize: 10,
        marginBottom: 5,
        color: "#ECF0F1",
      },
      skillTag: {
        fontSize: 10,
        backgroundColor: "#34495E",
        color: "white",
        padding: 4,
        marginBottom: 5,
        borderRadius: 3,
      },
      experienceBlock: {
        marginBottom: 15,
      },
      companyHeader: {
        color: theme.colors.primary,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
        fontFamily: fontFamilyMap[theme.fonts.heading] || "Ruluko",
      },
      companyName: {
        fontSize: 14,
        fontWeight: "bold",
        color: theme.colors.secondary,
        fontFamily: fontFamilyMap[theme.fonts.body] || "Ruluko",
      },
      dateText: {
        fontSize: 12,
        color: theme.colors.text,
      },
      jobTitle: {
        fontSize: 12,
        color: theme.colors.secondary,
        marginBottom: 5,
        fontFamily: fontFamilyMap[theme.fonts.body] || "Ruluko",
      },
      bulletContainer: {
        flexDirection: "row",
        marginBottom: 3,
        paddingLeft: 10,
      },
      bullet: {
        width: 10,
        fontSize: 12,
        color: theme.colors.secondary,
      },
      bulletText: {
        fontSize: 10,
        color: theme.colors.text,
        flex: 1,
        lineHeight: 1.4,
      },
      educationBlock: {
        marginBottom: 10,
      },
      institutionName: {
        fontSize: 12,
        color: "#2C3E50",
        fontFamily: fontFamilyMap[theme.fonts.heading] || "Ruluko",
      },
      degree: {
        fontSize: 12,
        color: "#7F8C8D",
        marginBottom: 3,
      },
      projectBlock: {
        marginBottom: 15,
        fontFamily: fontFamilyMap[theme.fonts.body] || "Ruluko",
      },
      projectName: {
        fontSize: 12,
        color: theme.colors.secondary,
        fontFamily: fontFamilyMap[theme.fonts.heading] || "Ruluko",
        marginBottom: 3,
      },
    });
  }, [theme]);

  const renderBulletPoints = (description: string) => {
    if (description === "") return "";
    return description
      .split(". ")
      .filter((bullet) => bullet.trim())
      .map((bullet, index) => (
        <View key={index} style={styles.bulletContainer}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>{bullet.trim()}</Text>
        </View>
      ));
  };

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case "personalInfo":
        return (
          <>
            {/* Contact Information */}
            <Text style={styles.leftSectionTitle}>CONTACT</Text>
            <Text style={styles.contactText}>
              {resumeData.personalInfo.email}
            </Text>
            <Text style={styles.contactText}>
              {resumeData.personalInfo.phone}
            </Text>
            <Text style={styles.contactText}>
              {resumeData.personalInfo.linkedinURL}
            </Text>
            <Text style={styles.contactText}>
              {resumeData.personalInfo.githubURL}
            </Text>
          </>
        );
      case "education":
        return (
          <>
            <Text style={styles.leftSectionTitle}>EDUCATION</Text>
            {resumeData.education.map((edu, index) => (
              <View key={index} style={styles.educationBlock}>
                <Text
                  style={[styles.contactText, { fontFamily: "Helvetica-Bold" }]}
                >
                  {edu.institution}
                </Text>
                <Text style={styles.contactText}>{edu.degree}</Text>
                <Text style={[styles.contactText, { color: "#3498DB" }]}>
                  {edu.startDate} - {edu.endDate}
                </Text>
              </View>
            ))}
          </>
        );
      case "workExperience":
        return (
          <>
            <Text style={styles.rightSectionTitle}>
              PROFESSIONAL EXPERIENCE
            </Text>
            {resumeData.workExperience.map((work, index) => (
              <View key={index} style={styles.experienceBlock}>
                <View style={styles.companyHeader}>
                  <Text style={styles.companyName}>{work.company}</Text>
                  <Text style={styles.dateText}>
                    {work.startDate} - {work.endDate}
                  </Text>
                </View>
                <Text style={styles.jobTitle}>{work.jobTitle}</Text>
                {renderBulletPoints(work.description)}
              </View>
            ))}
          </>
        );
      case "projects":
        return (
          <>
            <Text style={styles.rightSectionTitle}>PROJECTS</Text>
            {resumeData.projects.map((project, index) => (
              <View key={index} style={styles.projectBlock}>
                <View style={styles.companyHeader}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Text style={styles.dateText}>{project.date}</Text>
                </View>
                {renderBulletPoints(project.description)}
              </View>
            ))}
          </>
        );
      case "skills":
        return (
          <>
            <Text style={styles.leftSectionTitle}>SKILLS</Text>
            {resumeData.skills.split(",").map((skill, index) => (
              <Text key={index} style={styles.skillTag}>
                {skill.trim()}
              </Text>
            ))}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <PDFViewer style={{ width: "100%", height: "100%" }}>
      <Document key={documentKey}>
        <Page size="A4" style={styles.page}>
          <View style={styles.leftColumn}>
            {/* Personal Info is always at top */}
            <Text style={styles.header}>{resumeData.personalInfo.name}</Text>

            {/* Render left column sections in order */}
            {leftColumnSections.map((sectionId) => (
              <View key={sectionId}>{renderSection(sectionId)}</View>
            ))}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Render right column sections in order */}
            {rightColumnSections.map((sectionId) => (
              <View key={sectionId}>{renderSection(sectionId)}</View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
