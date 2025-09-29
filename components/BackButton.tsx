import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { vw, vh } from "@/helpers/responsive";
import { usePreviousRoute } from "@/hooks/use-previous-route";

type BackButtonProps = {
  label?: string; // fallback if we don’t detect previous
  onPress?: () => void;
};

export default function BackButton({ label = "Back", onPress }: BackButtonProps) {
  const tint = useThemeColor({}, "tint");
  const previousRoute = usePreviousRoute();

  // derive a clean label (last part of route)
  const autoLabel = label;

  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => router.back()}
      style={styles.container}
      activeOpacity={0.7}
    >
      <Ionicons name="chevron-back" size={24} color={tint} />
      <ThemedText style={[styles.label, { color: tint }]}>
        Back
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    //paddingHorizontal: vw(2),
   // paddingVertical: vh(1),
  },
  label: {
    fontSize: vh(2),
    fontWeight: "500",
    marginLeft: -4,
    textTransform: "capitalize",
  },
});
