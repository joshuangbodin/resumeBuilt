import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : top + 20;
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {},
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Overview",
            headerRight: () => (
              <Pressable onPress={() => router.push("signin")}>
                <ThemedText>Sign In</ThemedText>
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="UserData"
          options={{
            title: "Finish Setup",
          }}
        />
        <Stack.Screen
          name="signin"
          options={{
            title: "SignIn",
          }}
        />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
