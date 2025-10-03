import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { GlassModalProvider } from "@/components/GlassModalContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Provider from "@/store/state/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : top + 20;
  const colorScheme = useColorScheme();

  return (
    <Provider>
      <GlassModalProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: "Overview",
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
      </GlassModalProvider>
    </Provider>
  );
}
