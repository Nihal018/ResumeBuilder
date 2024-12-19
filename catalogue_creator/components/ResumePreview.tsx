"use client";

import React, { useEffect, useMemo } from "react";

import {
  Page,
  PDFViewer,
  View,
  Text,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

import { fontFamilyMap } from "./fonts";
import { useResume } from "./context/ResumeContext";
import { useTheme } from "./context/ThemeContext";
import { useSectionOrder } from "./context/SectionOrderContext";

export function ResumePreview() {
  const { resumeData } = useResume();
  const { theme } = useTheme();
  const { sectionOrder } = useSectionOrder();

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
        backgroundColor: theme.colors.background || "#FFFFFF",
        padding: 40,
        fontFamily: fontFamilyMap[theme.fonts.body] || "Ruluko",
      },
      header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: theme.colors.primary,
        fontFamily: fontFamilyMap[theme.fonts.heading] || "Ruluko",
      },
      sectionTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
        borderBottom: `1px solid ${theme.colors.primary}`,
        color: theme.colors.primary,
        fontFamily: theme.fonts.heading,
      },
      text: {
        fontSize: 12,
        lineHeight: 1.5,
        color: theme.colors.text,
        fontFamily: theme.fonts.body,
      },
      bulletText: {
        fontSize: 12,
        marginBottom: 5,
        paddingLeft: 15,
        color: theme.colors.text,
        fontFamily: theme.fonts.body,
      },
      bulletPoint: {
        position: "absolute",
        left: 5,
        color: theme.colors.primary,
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
        color: theme.colors.text,
        fontFamily: theme.fonts.body,
      },
      companyText: {
        fontSize: 12,
        fontWeight: "bold",
        color: theme.colors.secondary,
        fontFamily: theme.fonts.body,
      },
      institutionText: {
        fontSize: 12,
        fontWeight: "bold",
        color: theme.colors.secondary,
        fontFamily: theme.fonts.body,
      },
      dateText: {
        fontSize: 12,
        color: theme.colors.secondary,
        fontFamily: theme.fonts.body,
        textAlign: "right",
      },
      contactInfo: {
        fontSize: 12,
        textAlign: "center",
        marginBottom: 10,
        color: theme.colors.text,
        fontFamily: theme.fonts.body,
      },
    });
  }, [theme]);

  const renderBulletPoint = (text: string) => (
    <View style={styles.bulletContainer}>
      <Text style={styles.bulletPoint}>•</Text>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );

  const splitIntoBullets = (description: string) => {
    return description.split(". ").filter((bullet) => bullet.trim().length > 0);
  };

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case "personalInfo":
        return (
          <>
            <Text style={styles.header}>{resumeData.personalInfo.name}</Text>
            <Text style={styles.contactInfo}>
              {resumeData.personalInfo.email} | {resumeData.personalInfo.phone}
            </Text>
            <Text style={styles.contactInfo}>
              {resumeData.personalInfo.linkedinURL} |{" "}
              {resumeData.personalInfo.githubURL}
            </Text>
          </>
        );
      case "education":
        return (
          <>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            {resumeData.education.map((edu, index) => (
              <View key={index} style={styles.table}>
                <View style={styles.tableColumn}>
                  <Text style={styles.institutionText}>{edu.institution}</Text>
                  <Text style={styles.tableText}>{edu.degree}</Text>
                </View>
                <View style={styles.tableColumn}>
                  <Text style={styles.dateText}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
              </View>
            ))}
          </>
        );
      case "workExperience":
        return (
          <>
            <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
            {resumeData.workExperience.map((work, index) => (
              <View key={index}>
                <View style={styles.table}>
                  <View style={styles.tableColumn}>
                    <Text style={styles.companyText}>{work.company}</Text>
                    <Text style={styles.tableText}>{work.jobTitle}</Text>
                  </View>
                  <View style={styles.tableColumn}>
                    <Text style={styles.dateText}>
                      {work.startDate} - {work.endDate}
                    </Text>
                  </View>
                </View>
                <View style={{ marginTop: 5, marginBottom: 12 }}>
                  {splitIntoBullets(work.description).map(
                    (bullet, bulletIndex) => renderBulletPoint(bullet)
                  )}
                </View>
              </View>
            ))}
          </>
        );
      case "projects":
        return (
          <>
            <Text style={styles.sectionTitle}>PROJECTS</Text>
            {resumeData.projects.map((project, index) => (
              <View key={index}>
                <View style={styles.table}>
                  <View style={styles.tableColumn}>
                    <Text style={styles.companyText}>{project.name}</Text>
                  </View>
                  <View style={styles.tableColumn}>
                    <Text style={styles.dateText}>{project.date}</Text>
                  </View>
                </View>
                <View style={{ marginTop: 5, marginBottom: 12 }}>
                  {splitIntoBullets(project.description).map(
                    (bullet, bulletIndex) => renderBulletPoint(bullet)
                  )}
                </View>
              </View>
            ))}
          </>
        );
      case "skills":
        return (
          <>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            <Text style={styles.tableText}>{resumeData.skills}</Text>
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
          {sectionOrder.map((sectionId) => renderSection(sectionId))}
        </Page>
      </Document>
    </PDFViewer>
  );
}
