import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ThemedText } from "@/components/themed-text";

const { width } = Dimensions.get("window");

export default function ResumeForm() {
  const [step, setStep] = useState(0);
  const translateX = useSharedValue(0);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      translateX.value = withTiming(-(step + 1) * width, { duration: 400 });
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      translateX.value = withTiming(-(step - 1) * width, { duration: 400 });
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Animated Steps Container */}
      <Animated.View
        style={[styles.stepsContainer, animatedStyle]}
      >
        {/* Step 1 - Basic Info */}
        <View style={styles.step}>
          <ThemedText style={styles.header}>Basic Information</ThemedText>
          <TextInput style={styles.input} placeholder="Full Name" />
          <TextInput style={styles.input} placeholder="Contact Details" />
          <TextInput style={styles.input} placeholder="Desired Job Role" />
        </View>

        {/* Step 2 - Experience */}
        <View style={styles.step}>
          <ThemedText style={styles.header}>Work Experience</ThemedText>
          <TextInput style={styles.input} placeholder="Company" />
          <TextInput style={styles.input} placeholder="Role" />
          <TextInput style={styles.input} placeholder="Duration" />
          <TextInput style={styles.input} placeholder="Responsibilities" />
        </View>

        {/* Step 3 - Education */}
        <View style={styles.step}>
          <ThemedText style={styles.header}>Education</ThemedText>
          <TextInput style={styles.input} placeholder="Institution" />
          <TextInput style={styles.input} placeholder="Degree" />
          <TextInput style={styles.input} placeholder="Duration" />
        </View>

        {/* Step 4 - Skills */}
        <View style={styles.step}>
          <ThemedText style={styles.header}>Skills</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="E.g. React, TypeScript, Git"
          />
        </View>

        {/* Step 5 - Review */}
        <View style={styles.step}>
          <ThemedText style={styles.header}>Review & Submit</ThemedText>
          <ThemedText style={styles.subText}>
            Check all your details before submitting your resume.
          </ThemedText>
        </View>
      </Animated.View>

      {/* Navigation Buttons */}
      <View style={styles.navContainer}>
        {step > 0 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ThemedText style={styles.navText}>Back</ThemedText>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <ThemedText style={styles.navText}>
            {step === 4 ? "Submit" : "Next"}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  stepsContainer: {
    flexDirection: "row",
    width: width * 5, // 5 steps
    flex: 1,
  },
  step: {
    width,
   // gap: 45,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
  },
  subText: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    //backgroundColor: "#fafafa",
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  backButton: {
    backgroundColor: "#eee",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  nextButton: {
    backgroundColor: "#007AFF", // iOS blue
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  navText: {
    fontSize: 16,
    color: "#fff",
  },
});
