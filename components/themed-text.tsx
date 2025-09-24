import { StyleSheet, Text, type TextProps } from "react-native";

import { vh } from "@/helpers/responsive";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useFonts } from "expo-font";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  // assets\fonts\Inter-Regular.ttf
  const [fontsLoaded] = useFonts({
    // assets\fonts\AlanSans-Bold.ttf assets\fonts\AlanSans-Regular.ttf assets\fonts\AlanSans-SemiBold.ttf
    "MyCustomFont-Regular": require("@/assets/fonts/AlanSans-Regular.ttf"),
    "MyCustomFont-Bold": require("@/assets/fonts/AlanSans-Bold.ttf"),
    "MyCustomFont-semiBold": require("@/assets/fonts/AlanSans-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <></>; // keeps splash screen until fonts are ready
  }

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
        {
          fontFamily:
            type == "title"
              ? "MyCustomFont-semiBold"
              : type == "defaultSemiBold" 
              ? "MyCustomFont-semiBold"
              : "MyCustomFont-Regular",
        },
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: vh(1.8),
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: vh(1.8),
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: vh(2.8),
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: vh(2.2),
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: vh(1.8),
    color: "#0a7ea4",
  },
});
