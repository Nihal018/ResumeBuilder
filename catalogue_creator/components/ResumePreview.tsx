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
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export function ResumePreview() {
  const { resumeData } = useResume();
  return (
    <PDFViewer style={{ width: "100%", height: "500px" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Name: {resumeData.personalInfo.name}</Text>
            <Text>Email : {resumeData.personalInfo.email} </Text>
            <Text>Institute : {resumeData.education[0].institution} </Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
