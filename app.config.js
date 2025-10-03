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
        foregroundImage: "./assets/images/icon.png",
        backgroundImage: "./assets/images/icon.png",
        monochromeImage: "./assets/images/icon.png",
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
          image: "./assets/images/icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#2563EB",
          dark: {
            backgroundColor: "#2563EB",
          },
        },
      ],
      [
        "react-native-google-mobile-ads",
        {
          androidAppId: "ca-app-pub-1071099494556372~7315321846", // ✅ camelCase
          iosAppId: "ca-app-pub-1071099494556372~7779190426", // ✅ use test ID if you don’t have iOS yet
          userTrackingUsageDescription:
            "Used to deliver personalized ads.",
        },
      ],
       [
        "react-native-purchases",
        {
          ios: {
            use_frameworks: "static"
          }
        }
      ]
    ],

    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },

    updates: {
      url: "https://u.expo.dev/dad24bc5-36ff-401e-9ed4-4d3e86c89da0",
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
        projectId: "dad24bc5-36ff-401e-9ed4-4d3e86c89da0",
      },
    },
  },
};
