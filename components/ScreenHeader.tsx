import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { vh, vw } from "@/helpers/responsive";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export default function ScreenHeader({
  title,
  subtitle,
  left,
  right,
}: ScreenHeaderProps) {
  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "border");
  const textMuted = useThemeColor({}, "textMuted");
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderBottomColor: borderColor,
          paddingTop: insets.top + vh(1.5), // add safe area + spacing
        },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.side}>{left}</View>

        <View style={styles.center}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          {subtitle ? (
            <ThemedText style={[styles.subtitle, { color: textMuted }]}>
              {subtitle}
            </ThemedText>
          ) : null}
        </View>

        <View style={styles.side}>{right}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: vw(5),
    paddingBottom: vh(1.5),
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  side: {
    width: vw(15),
    alignItems: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: vw(5),
    fontWeight: "700",
  },
  subtitle: {
    fontSize: vw(3.5),
    marginTop: vh(0.5),
  },
});
