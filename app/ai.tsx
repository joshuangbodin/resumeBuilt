import { aICallResume } from "@/ai/resume_builder";
import BackButton from "@/components/BackButton";
import ScreenHeader from "@/components/ScreenHeader";
import { Colors } from "@/constants/theme";
import useStore from "@/hooks/use-store-context";
import { ResumeInput } from "@/types/app.types";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { ThemedText } from "@/components/themed-text";

const ResumeEditor = () => {
  const [resume, setResume] = useState("");
  const richTextRef = useRef<RichEditor>(null);
  const { store } = useStore();
  const theme = useColorScheme();
  const colors = Colors[theme ?? "light"];

  // Clean AI response
  const parseBold = (text: string) => {
    if (!text) return "";
    return text
      .replace("```html", "") // strip unwanted code fences
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
    education: [{ degree: "Ph.D. Sports", duration: "2034", institution: "Yale" }],
    skills: ["Freekick taking"],
  };

  useEffect(() => {
    const connectAi = async () => {
      const response = await aICallResume(/*store.resumeData*/ fakeData);
      const parsed = parseBold(response);
      setResume(parsed);
      richTextRef.current?.setContentHTML(parsed);
    };
    connectAi();
  }, []);

  // Save & Share PDF
  const saveAndSharePDF = async () => {
    try {
      if (!richTextRef.current) return;
      const htmlContent = await richTextRef.current.getContentHtml();
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
      });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { mimeType: "application/pdf" });
      } else {
        Alert.alert("Sharing not available on this device");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error generating PDF", `${error}`);
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
          ]}
          style={[styles.toolbar, { backgroundColor: colors.card, borderColor: colors.border }]}
          iconTint={colors.text}
        />
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {/* Toolbar at top */}
       

        {/* Editor below toolbar */}
        <RichEditor
          ref={richTextRef}
          style={[styles.editor, { backgroundColor: colors.card, borderColor: colors.border }]}
          placeholder="Your resume will appear here..."
          initialContentHTML={resume}
          editorStyle={{
            backgroundColor: theme == "light" ? "#fff" : "#1b1b1bff",
            color: colors.text,
            placeholderColor: colors.subtleText,
            contentCSSText: `font-size:16px; line-height:1.5;`,
          }}
        />

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
    borderRadius: 8,
  },
  shareButton: {
    marginTop: 16,
    marginBottom: 46,
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
