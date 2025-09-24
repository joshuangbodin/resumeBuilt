import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { vh, vw } from "@/helpers/responsive";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function Onboarding() {
  const theme = useColorScheme() ?? "light";
  const router = useRouter();

  const gradientColors: any = () => {
    return theme == "dark"
      ? ["transparent", "rgba(0,0,0,.8)", "rgba(0,0,0,1)"]
      : ["transparent", "rgba(255,255,255,.8)", "rgba(255,255,255,1)"];
  };

  return (
    <ThemedView style={styles.container}>
      {/* Better Background Image — involving resume / document */}
      <Image
        source={require("@/assets/images/splash.png")}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        cachePolicy="disk"
      />

      {/* Gradient overlay for readability */}
      <LinearGradient
        colors={gradientColors()}
        style={StyleSheet.absoluteFill}
      />

      {/* Foreground content */}
      <View style={styles.content}>
        <ThemedText type="title" style={[styles.title]}>
          Welcome to ApplyEazy
        </ThemedText>

        <ThemedText style={[styles.subtitle]}>
          Build beautiful, professional resumes in minutes — powered by AI.
        </ThemedText>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors.light.tint }]}
            onPress={() => router.push("/home")}
          >
            <ThemedText style={[styles.buttonText, { color: "#fff" }]}>
              Get Started
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    padding: vw(6),
    marginBottom: vh(8),
  },
  title: {
    fontSize: vh(3.2),
    fontWeight: "700",
    marginBottom: vh(2),
    textAlign: "center",
  },
  subtitle: {
    fontSize: vw(4.2),
    lineHeight: vh(3.8),
    marginBottom: vh(6),
    textAlign: "center",
  },
  buttons: {
    gap: vh(2),
    flexDirection: "row",
  },
  button: {
    flex: 1,
    paddingVertical: vh(2),
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    fontSize: vw(4),
    fontWeight: "600",
    //color: "#000", // always white on tinted or semi-transparent backgrounds
  },
});
