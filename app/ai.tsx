import ScreenHeader from "@/components/ScreenHeader";
import { ThemedText } from "@/components/themed-text";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const ai = () => {
  const [resume, setResume] = useState("");

  useEffect(() => {
    const connectAi = async () => {
      const falseData: any = {
        name: "John Doe",
        contact: "080123456789",
        jobRole: "developer",
        experience: [],
        education: [],
        skills: [],
      };
      //const response = await aICallResume(data||falseData);
      // setResume(response);
    };
    connectAi();
  }, []);
  return (
    <View>
      <ScreenHeader title="Your Resume" />
      <ThemedText>{resume}</ThemedText>
      {/* <ThemedText>{JSON.stringify(data)}</ThemedText> */}
    </View>
  );
};

export default ai;

const styles = StyleSheet.create({});
