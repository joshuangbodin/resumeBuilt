import React, { useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { router } from "expo-router";

import ScreenHeader from "@/components/ScreenHeader";
import { ThemedText } from "@/components/themed-text";
import { vh, vw } from "@/helpers/responsive";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function HomeScreen() {
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

  // Theme colors
  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "card");
  const borderColor = useThemeColor({}, "border");
  const primary = useThemeColor({}, "tint");
  const secondary = useThemeColor({}, "accent");
  const textMuted = useThemeColor({}, "textMuted");

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader
        title="Overview"
        right={
          <TouchableOpacity onPress={() => router.push("signin")}>
            <ThemedText type="link">Sign In</ThemedText>
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={{ flex: 1, backgroundColor }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Header */}
        <ThemedText style={styles.header}>Welcome</ThemedText>
        <ThemedText style={[styles.subHeader, { color: textMuted }]}>
          Build a professional, ATS-friendly resume in minutes.
        </ThemedText>

        {/* Create Resume Card */}
        <Animated.View
          style={[
            styles.card,
            animatedStyle,
            { backgroundColor: cardColor, borderColor },
          ]}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
            }}
            style={styles.cardImage}
            contentFit="cover"
            transition={500}
            cachePolicy="disk"
          />
          <ThemedText style={styles.cardTitle}>Create Resume</ThemedText>
          <ThemedText style={[styles.cardSubtitle, { color: textMuted }]}>
            Start building your modern resume now
          </ThemedText>
          <TouchableOpacity
            onPress={() => router.push("UserData")}
            style={[styles.primaryBtn, { backgroundColor: primary }]}
          >
            <ThemedText style={styles.primaryBtnText}>
              Generate Resume
            </ThemedText>
          </TouchableOpacity>
        </Animated.View>

        {/* Premium Upgrade Card */}
        <Animated.View
          style={[
            styles.card,
            animatedStyle,
            { backgroundColor: cardColor, borderColor },
          ]}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
            }}
            style={styles.cardImage}
            contentFit="cover"
            transition={500}
            cachePolicy="disk"
          />
          <ThemedText style={styles.cardTitle}>Go Premium</ThemedText>
          <ThemedText style={[styles.cardSubtitle, { color: textMuted }]}>
            Unlock unlimited resume generations and premium templates
          </ThemedText>
          <TouchableOpacity
            onPress={() => router.push("/premium")}
            style={[styles.secondaryBtn, { backgroundColor: secondary }]}
          >
            <ThemedText style={styles.secondaryBtnText}>
              Upgrade to Premium
            </ThemedText>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: vw(5),
    paddingTop: vh(5),
  },
  header: {
    fontSize: vw(7),
    fontWeight: "700",
    marginBottom: vh(1),
  },
  subHeader: {
    fontSize: vw(4),
    marginBottom: vh(4),
  },
  card: {
    borderRadius: 20,
    padding: vw(5),
    marginBottom: vh(3),
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: vh(20),
    borderRadius: 16,
    marginBottom: vh(2),
  },
  cardTitle: {
    fontSize: vw(5),
    fontWeight: "600",
    marginBottom: vh(1),
  },
  cardSubtitle: {
    fontSize: vw(3.5),
    marginBottom: vh(2),
  },
  primaryBtn: {
    paddingVertical: vh(2),
    borderRadius: 12,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: vw(4),
  },
  secondaryBtn: {
    paddingVertical: vh(2),
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryBtnText: {
    color: "#111827",
    fontWeight: "600",
    fontSize: vw(4),
  },
});
