import "dotenv/config";

export default {
  expo: {
    name: "gemini-demo",
    slug: "gemini-demo",
    extra: {
      geminiApiKey: process.env.EXPO_GEMINI_API_KEY,
      payStackKey :process.env.EXPO_PAYSTACK_PUB_KEY
    },
  },
};
