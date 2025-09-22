import { ThemedText } from "@/components/themed-text"; // assuming you already use ThemedText
import { useThemeColor } from "@/hooks/use-theme-color";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// const { width } = Dimensions.get("window");

export default function index() {
  const offset = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    offset.value = 0;
    opacity.value = 1;
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(offset.value, {
          duration: 800,
          easing: Easing.out(Easing.exp),
        }),
      },
    ],
    opacity: withTiming(opacity.value, { duration: 800 }),
  }));

  const backgroundColor = useThemeColor({}, "background");

  return (
    <View style={styles.container}>
      {/* Header */}
      <ThemedText style={styles.header}>Welcome 👋</ThemedText>
      <ThemedText style={styles.subHeader}>
        Build a professional, ATS-friendly resume in minutes.
      </ThemedText>

      {/* Animated Card */}
      <Animated.View style={[styles.card, animatedStyle, { backgroundColor }]}>
        <ThemedText style={styles.cardTitle}>Create Resume</ThemedText>
        <ThemedText style={styles.cardSubtitle}>
          Start building your modern resume now
        </ThemedText>

        <TouchableOpacity
          onPress={() => router.push("UserData")}
          style={styles.primaryBtn}
        >
          <ThemedText style={styles.primaryBtnText}>Generate Resume</ThemedText>
        </TouchableOpacity>
      </Animated.View>

      {/* Upgrade Card */}
      <Animated.View style={[styles.card, animatedStyle, { backgroundColor }]}>
        <ThemedText style={styles.cardTitle}>Go Premium 🚀</ThemedText>
        <ThemedText style={styles.cardSubtitle}>
          Unlock unlimited resume generations and premium templates
        </ThemedText>

        <TouchableOpacity
          onPress={() => router.push("/premium")}
          style={styles.secondaryBtn}
        >
          <ThemedText style={styles.secondaryBtnText}>
            Upgrade to Premium
          </ThemedText>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#F8FAFC", // clean minimal background
    padding: 20,
    paddingTop: 80,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 6,
    // color: "#111827",
  },
  subHeader: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 30,
  },
  card: {
    //backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 6,
    //color: "#111827",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 15,
  },
  primaryBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryBtn: {
    backgroundColor: "#FBBF24",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryBtnText: {
    color: "#111827",
    fontWeight: "600",
    fontSize: 16,
  },
});
