import { aICallResume } from "@/ai/resume_builder";
import BackButton from "@/components/BackButton";
import ScreenHeader from "@/components/ScreenHeader";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { vh, vw } from "@/helpers/responsive";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import useStore from "@/hooks/use-store-context";
import { ResumeInput } from "@/types/app.types";
import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

const ResumeEditor = () => {
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);
  const richTextRef = useRef<RichEditor>(null);
  const { store } = useStore();
  const theme = useColorScheme();
  const colors = Colors[theme ?? "light"];

  // Clean AI response
  const parseBold = (text: string) => {
    if (!text) return "";
    return text
      .replace("```html", "")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\`\`\`/, "  .\n") // strip unwanted code fences
      .split("\n")
      .map((line) => `<p>${line}</p>`)
      .join("");
  };

  // Fake demo data (replace with store.resumeData)
  const fakeData: ResumeInput = {
    name: "John Doe",
    contact: "09030303904",
    jobRole: "Sport Coach",
    experience: [
      {
        company: "Benfica",
        role: "Head Coach",
        duration: "2039",
        responsibilities: "I trained the players",
      },
    ],
    education: [
      { degree: "Ph.D. Sports", duration: "2034", institution: "Yale" },
    ],
    skills: ["Freekick taking"],
  };

  useEffect(() => {
    const connectAi = async () => {
      setLoading(true);
      const response = await aICallResume(store.resumeData || fakeData);
      const parsed = parseBold(response);
      setResume(parsed);
      richTextRef.current?.setContentHTML(parsed);
      setLoading(false);
    };
    connectAi();
  }, []);

  // Save & Share PDF
  const saveAndSharePDF = async () => {
    try {
      if (!richTextRef.current) return;
      const content = await richTextRef.current.getContentHtml();

      // Wrap HTML content with your template
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Resume</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 12pt;
      line-height: 1.5;
      color: #000;
      margin: 40px;
    }
    h1, h2, h3 {
      margin-bottom: 0.2em;
      font-weight: bold;
    }
    h1 {
      font-size: 20pt;
    }
    h2 {
      font-size: 14pt;
      border-bottom: 1px solid #000;
      padding-bottom: 4px;
      margin-top: 20px;
    }
    h3 {
      font-size: 12pt;
      margin-top: 12px;
    }
    p, li {
      margin: 0 0 8px 0;
    }
    ul {
      margin: 0 0 12px 20px;
      padding: 0;
    }
    .section {
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>
`;

      // Step 1: Create PDF in cache
      const { uri: cacheUri } = await Print.printToFileAsync({
        html: htmlContent,
      });

      // Step 2: Build a safe filename (use store data if available)
      const rawName = (
        store?.resumeData?.name ||
        fakeData.name ||
        "Resume"
      ).trim();
      const safe = rawName
        .replace(/\s+/g, "_")
        .replace(/[^A-Za-z0-9_\-\.]/g, "");
      const fileName = `${safe || "Resume"}_Resume.pdf`;

      // Step 3: Destination path in app’s document directory
      const destUri = `${FileSystem.documentDirectory}${fileName}`;

      // Step 4: Copy from cache → documents
      await FileSystem.copyAsync({ from: cacheUri, to: destUri });

      // Step 5: Share from documents
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(destUri, { mimeType: "application/pdf" });
      } else {
        Alert.alert("Sharing not available on this device");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error generating PDF", String(error));
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScreenHeader left={<BackButton />} title="Your Resume" />
      <RichToolbar
        editor={richTextRef}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
          actions.undo,
          actions.redo,
          actions.alignCenter,
          actions.alignFull,
          actions.alignLeft,
          actions.alignRight,
        ]}
        style={[
          styles.toolbar,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
        iconTint={colors.text}
      />
      <ScrollView contentContainerStyle={{}}>
        {/* Toolbar at top */}

        {/* Editor below toolbar */}
        {loading ? (
          <View style={{ flex: 1, marginVertical: vh(20) }}>
            <ActivityIndicator />
          </View>
        ) : (
          <RichEditor
            ref={richTextRef}
            style={[
              styles.editor,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            placeholder="Your resume will appear here..."
            initialContentHTML={resume}
            editorStyle={{
              backgroundColor: "rgba(100 , 100 , 100 , .1)",
              color: colors.text,
              placeholderColor: colors.subtleText,
              contentCSSText: `font-size:12px; line-height:1.5; padding-bottom:14px;`,
            }}
          />
        )}

        {/* Save button */}
        <TouchableOpacity
          style={[styles.shareButton, { backgroundColor: colors.tint }]}
          onPress={saveAndSharePDF}
        >
          <ThemedText style={styles.shareText}>Save & Share as PDF</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResumeEditor;

const styles = StyleSheet.create({
  container: { flex: 1 },
  editor: {
    minHeight: 400,
    borderWidth: 1,
    borderRadius: 8,
    padding: 6,
    marginTop: 5,
  },
  toolbar: {
    marginVertical: 5,
    borderWidth: 1,
    //borderRadius: 8,
  },
  shareButton: {
    marginTop: 16,
    marginBottom: 46,
    marginHorizontal: vw(3),
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  shareText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
