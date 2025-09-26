import "dotenv/config";

export default {
  expo: {
    name: "ApplyEazy",
    slug: "ApplyEazy",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "applyEazy",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.yourname.applyeazy",
      infoPlist: {
        NSAllowsArbitraryLoads: true,
      },
    },

    android: {
      softwareKeyboardLayoutMode: "resize", 
      package: "com.yourname.applyeazy",
      adaptiveIcon: {
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
        backgroundColor: "#E6F4FE",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },

    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },

    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },

    updates: {
      url: "https://u.expo.dev/your-project-id",
      fallbackToCacheTimeout: 0,
    },

    runtimeVersion: {
      policy: "sdkVersion",
    },

    assetBundlePatterns: ["**/*"],

    privacy: "public",
    platforms: ["ios", "android", "web"],

    extra: {
      geminiApiKey: process.env.EXPO_GEMINI_API_KEY,
      payStackKey: process.env.EXPO_PAYSTACK_PUB_KEY,
      supabaseUrl: process.env.EXPO_SUPABASE_URL,
      supabaseKey: process.env.EXPO_SUPABASE_KEY,
      eas: {
        projectId: "your-project-id", // Replace with your actual EAS project ID
      },
    },
  },
};
