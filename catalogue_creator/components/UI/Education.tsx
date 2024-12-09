"use client";

import React from "react";
import { useResume } from "../../ResumeContext";
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

export function Education() {
  const { resumeData } = useResume();
  return (
    <>
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
    </>
  );
}
